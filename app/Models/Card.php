<?php
declare(strict_types=1);

namespace App\Models;

use Phalcon\Mvc\Model;
use Ramsey\Uuid\Uuid;

/**
 * @property string $id
 * @property string $title
 * @property string|null $description
 * @property string $url
 * @property string $object_path
 * @property string $file_name
 * @property string $original_name
 * @property string $creator_id
 * @property string $access_type
 * @property bool $is_active
 * @property bool $show_title_on_image
 * @property string $created_at
 * @property string $updated_at
 *
 * @property User $creator
 * @property AccessRule[] $accessRules
 * @property Collection[] $collections
 * @property CollectionCard[] $collectionCards
 */
class Card extends Model
{
    public const string ACCESS_PRIVATE = 'private';
    public const string ACCESS_SHARED  = 'shared';
    public const string ACCESS_PUBLIC  = 'public';

    public ?string $id                  = null;
    public string  $title;
    public string  $title_color;
    public string  $description;
    public string  $url;
    public string  $object_path         = '';
    public string  $file_name           = '';
    public string  $original_name       = '';
    public string  $creator_id;
    public string  $access_type         = self::ACCESS_PRIVATE;
    public bool    $is_active           = true;
    public bool    $show_title_on_image = false;
    public ?string $created_at          = null;
    public ?string $updated_at          = null;

    public function initialize(): void
    {
        $this->setSource('cards');

        // Связь с создателем
        $this->belongsTo(
            'creator_id',
            User::class,
            'id',
            [
                'alias'    => 'creator',
                'reusable' => true
            ]
        );

        // Связь с правилами доступа
        $this->hasMany(
            'id',
            AccessRule::class,
            'card_id',
            [
                'alias'    => 'accessRules',
                'reusable' => true
            ]
        );

        // Связь с пользователями через правила доступа (многие-ко-многим)
        $this->hasManyToMany(
            'id',
            AccessRule::class,
            'card_id',
            'user_id',
            User::class,
            'id',
            [
                'alias'    => 'sharedUsers',
                'reusable' => true
            ]
        );

        // Связь с коллекциями через промежуточную таблицу collection_cards
        $this->hasManyToMany(
            'id',
            CollectionCard::class,
            'card_id',
            'collection_id',
            Collection::class,
            'id',
            [
                'alias'    => 'collections',
                'reusable' => true,
                'params'   => [
                    'order' => '[App\Models\CollectionCard].[created_at] DESC' // Явно указываем таблицу для сортировки
                ]
            ]
        );

        // Связь с промежуточной таблицей collection_cards
        $this->hasMany(
            'id',
            CollectionCard::class,
            'card_id',
            [
                'alias'    => 'collectionCards',
                'reusable' => true
            ]
        );
    }

    public function beforeCreate(): void
    {
        $this->id         = Uuid::uuid4()->toString();
        $this->created_at = date('Y-m-d H:i:s');
        $this->updated_at = date('Y-m-d H:i:s');

        // Генерация уникального имени файла, если не указано
        if (empty($this->file_name)) {
            $this->file_name = 'card_' . $this->id . '_' . time();
        }

        // Установка оригинального имени, если не указано
        if (empty($this->original_name)) {
            $this->original_name = 'unknown_file';
        }
    }

    public function beforeUpdate(): void
    {
        $this->updated_at = date('Y-m-d H:i:s');
    }

    /**
     * Получить коллекции карточки
     *
     * @param array|null $params Дополнительные параметры запроса
     * @return \Phalcon\Mvc\Model\Resultset\Simple
     */
    public function getCollections(?array $params = null): \Phalcon\Mvc\Model\Resultset\Simple
    {
        $r = $this->getRelated('collections', $params);

        return $r;
    }

    /**
     * Получить количество коллекций карточки
     *
     * @return int
     */
    public function getCollectionsCount(): int
    {
        return $this->getRelated('collections')->count();
    }

    /**
     * Проверить, находится ли карточка в указанной коллекции
     *
     * @param string $collectionId
     * @return bool
     */
    public function isInCollection(string $collectionId): bool
    {
        return CollectionCard::count([
                'conditions' => 'card_id = :card_id: AND collection_id = :collection_id:',
                'bind'       => [
                    'card_id'       => $this->id,
                    'collection_id' => $collectionId
                ]
            ]) > 0;
    }

    /**
     * Добавить карточку в коллекцию
     *
     * @param string $collectionId
     * @return bool
     */
    public function addToCollection(string $collectionId): bool
    {
        // Проверяем, не добавлена ли уже карточка в коллекцию
        if ($this->isInCollection($collectionId)) {
            return true;
        }

        $collectionCard                = new CollectionCard();
        $collectionCard->card_id       = $this->id;
        $collectionCard->collection_id = $collectionId;

        return $collectionCard->save();
    }

    /**
     * Удалить карточку из коллекции
     *
     * @param string $collectionId
     * @return bool
     */
    public function removeFromCollection(string $collectionId): bool
    {
        $collectionCard = CollectionCard::findFirst([
            'conditions' => 'card_id = :card_id: AND collection_id = :collection_id:',
            'bind'       => [
                'card_id'       => $this->id,
                'collection_id' => $collectionId
            ]
        ]);

        if ($collectionCard) {
            return $collectionCard->delete();
        }

        return true;
    }

    /**
     * Синхронизировать коллекции карточки
     *
     * @param array $collectionIds Массив ID коллекций
     * @return bool
     */
    public function syncCollections(array $collectionIds): bool
    {
        // Начинаем транзакцию
        $this->getDI()->get('db')->begin();

        try {
            // Удаляем все текущие связи
            $this->getRelated('collectionCards')->delete();

            // Добавляем новые связи
            foreach ($collectionIds as $collectionId) {
                if (empty($collectionId)) {
                    continue;
                }

                $collectionCard                = new CollectionCard();
                $collectionCard->card_id       = $this->id;
                $collectionCard->collection_id = $collectionId;

                if (!$collectionCard->save()) {
                    $this->getDI()->get('db')->rollback();
                    return false;
                }
            }

            $this->getDI()->get('db')->commit();
            return true;

        } catch (\Exception $e) {
            $this->getDI()->get('db')->rollback();
            return false;
        }
    }

    /**
     * Получить ID всех коллекций карточки
     *
     * @return array
     */
    public function getCollectionIds(): array
    {
        $collectionIds   = [];
        $collectionCards = $this->getRelated('collectionCards');

        foreach ($collectionCards as $collectionCard) {
            $collectionIds[] = $collectionCard->collection_id;
        }

        return $collectionIds;
    }

    public function getAccessTypeLabel(): string
    {
        return match ($this->access_type) {
            self::ACCESS_PRIVATE => 'Private',
            self::ACCESS_SHARED => 'Shared',
            self::ACCESS_PUBLIC => 'Public',
            default => 'Unknown'
        };
    }

    /**
     * Проверяет, имеет ли пользователь доступ к карточке
     */
    public function hasAccess(?User $user, string $requiredPermission = 'read'): bool
    {
        // Для публичных карточек - доступ на чтение всем
        if ($this->access_type === self::ACCESS_PUBLIC && $requiredPermission === 'read') {
            return true;
        }

        // Если пользователь - создатель, у него полный доступ
        if ($this->creator_id === $user->id) {
            return true;
        }

        // Для общих карточек - проверка правил доступа
        if ($this->access_type === self::ACCESS_SHARED) {
            return $this->checkAccessRule($user, $requiredPermission);
        }

        return false;
    }

    /**
     * Проверяет правило доступа для пользователя
     */
    private function checkAccessRule(User $user, string $requiredPermission): bool
    {
        $accessRule = AccessRule::findFirst([
            'conditions' => 'card_id = :card_id: AND user_id = :user_id:',
            'bind'       => [
                'card_id' => $this->id,
                'user_id' => $user->id
            ]
        ]);

        if (!$accessRule) {
            return false;
        }

        // Проверка уровня доступа
        $permissionHierarchy = [
            'read'  => 1,
            'write' => 2,
            'admin' => 3
        ];

        $userPermissionLevel = $permissionHierarchy[$accessRule->permission] ?? 0;
        $requiredLevel       = $permissionHierarchy[$requiredPermission] ?? 0;

        return $userPermissionLevel >= $requiredLevel;
    }

    /**
     * Добавляет правило доступа для пользователя
     */
    public function addAccessRule(User $user, string $permission = 'read'): bool
    {
        // Проверяем, не существует ли уже правило
        $existingRule = AccessRule::findFirst([
            'conditions' => 'card_id = :card_id: AND user_id = :user_id:',
            'bind'       => [
                'card_id' => $this->id,
                'user_id' => $user->id
            ]
        ]);

        if ($existingRule) {
            $existingRule->permission = $permission;
            return $existingRule->save();
        }

        // Создаем новое правило
        $accessRule             = new AccessRule();
        $accessRule->card_id    = $this->id;
        $accessRule->user_id    = $user->id;
        $accessRule->permission = $permission;

        return $accessRule->save();
    }

    /**
     * Удаляет правило доступа для пользователя
     */
    public function removeAccessRule(User $user): bool
    {
        $accessRule = AccessRule::findFirst([
            'conditions' => 'card_id = :card_id: AND user_id = :user_id:',
            'bind'       => [
                'card_id' => $this->id,
                'user_id' => $user->id
            ]
        ]);

        if ($accessRule) {
            return $accessRule->delete();
        }

        return true;
    }

    /**
     * Получает всех пользователей с доступом к карточке
     */
    public function getUsersWithAccess(): array
    {
        $users = [];

        // Добавляем создателя
        $creator = $this->getCreator();
        if ($creator) {
            $users[] = [
                'user'       => $creator,
                'permission' => 'admin',
                'is_creator' => true
            ];
        }

        // Добавляем пользователей из правил доступа
        $accessRules = $this->getAccessRules([
            'conditions' => 'card_id = :card_id:',
            'bind'       => ['card_id' => $this->id],
            'with'       => ['user']
        ]);

        foreach ($accessRules as $accessRule) {
            $user = $accessRule->getUser();
            if ($user) {
                $users[] = [
                    'user'       => $user,
                    'permission' => $accessRule->permission,
                    'is_creator' => false
                ];
            }
        }

        return $users;
    }

    /**
     * Проверяет уникальность имени файла
     */
    public function validation(): bool
    {
        $validator = new \Phalcon\Filter\Validation();

        $validator->add(
            'file_name',
            new \Phalcon\Filter\Validation\Validator\Uniqueness([
                'model'   => $this,
                'message' => 'File name must be unique'
            ])
        );

        $validator->add(
            'access_type',
            new \Phalcon\Filter\Validation\Validator\InclusionIn([
                'domain'  => [
                    self::ACCESS_PRIVATE,
                    self::ACCESS_SHARED,
                    self::ACCESS_PUBLIC
                ],
                'message' => 'Invalid access type'
            ])
        );

        return $this->validate($validator);
    }
}