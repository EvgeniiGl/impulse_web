<?php
declare(strict_types=1);

namespace App\Models;

use Phalcon\Encryption\Security;
use Phalcon\Mvc\Model;
use Ramsey\Uuid\Uuid;

/**
 * @property string $id
 * @property string $name
 * @property string $email
 * @property int|null $age
 * @property string $password_hash
 * @property bool $is_active
 * @property string $created_at
 * @property string $updated_at
 *
 * @property Card[] $cards
 * @property AccessRule[] $accessRules
 * @property Card[] $sharedCards
 */
class User extends Model
{
    public string   $id;
    public string   $name;
    public string   $email;
    public int|null $age;
    public string   $password_hash;
    public bool     $is_active = true;
    public string   $created_at;
    public string   $updated_at;

    private string $password;

    public function onConstruct()
    {
        $this->id = Uuid::uuid4()->toString();
    }

    public function initialize(): void
    {
        $this->setSource('users');
        // Карточки, созданные пользователем
        $this->hasMany(
            'id',
            Card::class,
            'creator_id',
            [
                'alias'    => 'cards',
                'reusable' => true
            ]
        );

        // Правила доступа пользователя
        $this->hasMany(
            'id',
            AccessRule::class,
            'user_id',
            [
                'alias'    => 'accessRules',
                'reusable' => true
            ]
        );

        // Карточки, к которым пользователь имеет доступ
        $this->hasManyToMany(
            'id',
            AccessRule::class,
            'user_id',
            'card_id',
            Card::class,
            'id',
            [
                'alias'    => 'sharedCards',
                'reusable' => true
            ]
        );
    }

    public function beforeCreate(): void
    {
        $this->id         = Uuid::uuid4()->toString();
        $this->created_at = date('Y-m-d H:i:s');
        $this->updated_at = date('Y-m-d H:i:s');

        if (!empty($this->password)) {
            /** @var Security $security */
            $security            = $this->getDI()->get('security');
            $this->password_hash = $security->hash($this->password);
        }
    }

    public function beforeUpdate(): void
    {
        $this->updated_at = date('Y-m-d H:i:s');

        if (!empty($this->password)) {
            /** @var Security $security */
            $security            = $this->getDI()->get('security');
            $this->password_hash = $security->hash($this->password);
        }
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    public function verifyPassword(string $password): bool
    {
        /** @var Security $security */
        $security = $this->getDI()->get('security');
        return $security->checkHash($password, $this->password_hash);
    }

    /**
     * Получает все карточки, доступные пользователю
     */
    public function getAllAccessibleCards(): array
    {
        $cards = [];

        // Карточки, созданные пользователем
        $createdCards = $this->getCards();
        foreach ($createdCards as $card) {
            $cards[] = [
                'card'        => $card,
                'access_type' => 'owner',
                'permission'  => 'admin'
            ];
        }

        // Общие карточки, к которым пользователь имеет доступ
        $sharedCards = $this->getSharedCards();
        foreach ($sharedCards as $card) {
            // Получаем уровень доступа
            $accessRule = AccessRule::findFirst([
                'conditions' => 'card_id = :card_id: AND user_id = :user_id:',
                'bind'       => [
                    'card_id' => $card->id,
                    'user_id' => $this->id
                ]
            ]);

            if ($accessRule) {
                $cards[] = [
                    'card'        => $card,
                    'access_type' => 'shared',
                    'permission'  => $accessRule->permission
                ];
            }
        }

        // Публичные карточки других пользователей
        $publicCards = Card::find([
            'conditions' => 'access_type = :public: AND creator_id != :creator_id:',
            'bind'       => [
                'public'     => Card::ACCESS_PUBLIC,
                'creator_id' => $this->id
            ]
        ]);

        foreach ($publicCards as $card) {
            $cards[] = [
                'card'        => $card,
                'access_type' => 'public',
                'permission'  => 'read'
            ];
        }

        return $cards;
    }

    public function validation(): bool
    {
        $validator = new \Phalcon\Filter\Validation();

        $validator->add(
            'email',
            new \Phalcon\Filter\Validation\Validator\Email([
                'message' => 'Invalid email format'
            ])
        );

        $validator->add(
            'email',
            new \Phalcon\Filter\Validation\Validator\Uniqueness([
                'model'   => $this,
                'message' => 'Email already exists'
            ])
        );

        return $this->validate($validator);
    }

    /**
     * Блокировка пользователя
     */
    public function block(): bool
    {
        $this->is_active  = false;
        $this->updated_at = date('Y-m-d H:i:s');

        return $this->save();
    }

    /**
     * Разблокировка пользователя
     */
    public function unblock(): bool
    {
        $this->is_active  = true;
        $this->updated_at = date('Y-m-d H:i:s');

        return $this->save();
    }

    /**
     * Проверка активности пользователя
     */
    public function isActive(): bool
    {
        return $this->is_active;
    }

    /**
     * Получить карточки пользователя с правом записи, которые не привязаны к коллекциям
     */
    public function getMyCardsWithWriteAccess(): array
    {
        $result = [];

        // Подзапрос для карточек, привязанных к коллекциям
        $inCollectionSubquery = 'SELECT [App\Models\CollectionCard].card_id FROM [App\Models\CollectionCard]';

        // 1. Собственные карточки (владелец = текущий пользователь) БЕЗ коллекций
        $ownCards = Card::find([
            'conditions' => 'creator_id = :user_id: AND id NOT IN (' . $inCollectionSubquery . ')',
            'bind'       => ['user_id' => $this->id]
        ]);

        foreach ($ownCards as $card) {
            $result[] = [
                'card'        => $card,
                'access_type' => 'owner',
                'permission'  => 'admin'
            ];
        }

        // 2. Карточки с правом записи/администрирования через правила доступа (исключая свои и карточки в коллекциях)
        $sharedCardsQuery = AccessRule::query()
            ->where('user_id = :user_id:')
            ->andWhere('permission IN ({permissions:array})');
        $bind             = [
            'user_id'     => $this->id,
            'permissions' => ['write', 'admin'],
        ];
        if ($ownCards->count() > 0) {
            $sharedCardsQuery->andWhere('card_id NOT IN ({own_ids:array})');
            $bind['own_ids'] = $ownCards->count() > 0
                ? array_column($ownCards->toArray(), 'id')
                : ['0'];
        }
        $sharedCardsQuery->andWhere('card_id NOT IN (' . $inCollectionSubquery . ')');
        $sharedCardsQuery->bind($bind);

        foreach ($sharedCardsQuery->execute() as $rule) {
            $card = Card::findFirst($rule->card_id);
            if ($card && $card->is_active) {
                $result[] = [
                    'card'        => $card,
                    'access_type' => 'shared',
                    'permission'  => $rule->permission
                ];
            }
        }

        return $result;
    }
}