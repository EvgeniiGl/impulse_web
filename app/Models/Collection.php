<?php

declare(strict_types=1);

namespace App\Models;

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Relation;
use Ramsey\Uuid\Uuid;

class Collection extends Model
{
    public ?string $id          = null;
    public string  $name;
    public string  $creator_id;
    public string  $access_type = 'private';
    public bool    $is_active   = true;
    public ?string $created_at  = null;
    public ?string $updated_at  = null;

    public function initialize(): void
    {
        $this->setSource('collections');

        // Отношения
        $this->belongsTo(
            'creator_id',
            User::class,
            'id',
            [
                'alias'      => 'creator',
                'foreignKey' => [
                    'message' => 'Creator does not exist'
                ]
            ]
        );

        $this->hasManyToMany(
            'id',
            CollectionCard::class,
            'collection_id',
            'card_id',
            Card::class,
            'id',
            [
                'alias' => 'cards'
            ]
        );

        $this->hasManyToMany(
            'id',
            UserCollection::class,
            'collection_id',
            'user_id',
            User::class,
            'id',
            [
                'alias' => 'sharedUsers'
            ]
        );

        // Поведения
        $this->addBehavior(
            new \Phalcon\Mvc\Model\Behavior\Timestampable([
                'beforeCreate' => [
                    'field'  => ['created_at', 'updated_at'],
                    'format' => 'Y-m-d H:i:s',
                ],
                'beforeUpdate' => [
                    'field'  => 'updated_at',
                    'format' => 'Y-m-d H:i:s',
                ]
            ])
        );
    }

    public function beforeCreate(): void
    {
        $this->id         = Uuid::uuid4()->toString();
        $this->created_at = date('Y-m-d H:i:s');
        $this->updated_at = date('Y-m-d H:i:s');
    }

    public function validation(): bool
    {
        $validator = new \Phalcon\Filter\Validation();

        $validator->add(
            'name',
            new \Phalcon\Filter\Validation\Validator\PresenceOf([
                'message' => 'Collection name is required'
            ])
        );

        $validator->add(
            'access_type',
            new \Phalcon\Filter\Validation\Validator\InclusionIn([
                'domain'  => ['private', 'public', 'shared'],
                'message' => 'Invalid access type'
            ])
        );

        return $this->validate($validator);
    }

    public function beforeValidationOnCreate(): void
    {
        if (!isset($this->access_type)) {
            $this->access_type = 'private';
        }

        if (!isset($this->is_active)) {
            $this->is_active = true;
        }
    }

    /**
     * Проверка доступа пользователя к коллекции
     */
    public function hasAccess(string $userId): bool
    {
        if ($this->creator_id === $userId) {
            return true;
        }

        if ($this->access_type === 'public') {
            return true;
        }

        $shared = UserCollection::findFirst([
            'conditions' => 'collection_id = :collectionId: AND user_id = :userId:',
            'bind'       => [
                'collectionId' => $this->id,
                'userId'       => $userId,
            ]
        ]);

        return $shared !== false;
    }

    /**
     * Проверка прав владельца
     */
    public function isOwner(string $userId): bool
    {
        return $this->creator_id === $userId;
    }

    /**
     * Получить коллекции пользователя
     */
    public function getUserCollections(User $user): array
    {
        $phql = "
            SELECT 
                c.*,
                u.name as creator_name,
                COUNT(DISTINCT cc.card_id) as card_count
            FROM App\Models\Collection c
            LEFT JOIN App\Models\User u ON c.creator_id = u.id
            LEFT JOIN App\Models\CollectionCard cc ON c.id = cc.collection_id
            WHERE c.creator_id = :userId: 
               OR c.id IN (
                   SELECT uc.collection_id 
                   FROM App\Models\UserCollection uc 
                   WHERE uc.user_id = :userId:
               )
            GROUP BY c.id, u.name
            ORDER BY c.created_at DESC
        ";

        $query = $this->getModelsManager()->createQuery($phql);
        return $query->execute(['userId' => $user->id])->toArray();
    }

    /**
     * Получить коллекцию с карточками
     */
    public function getWithCards(string $collectionId, User $user): ?array
    {
        $collection = self::findFirst([
            'conditions' => 'id = :id:',
            'bind'       => [
                'id' => $collectionId,
            ]
        ]);
        if (!$collection || !$collection->hasAccess($user->id)) {
            return null;
        }

        $data                 = $collection->toArray();
        $data['creator_name'] = $collection->creator->username;
        $data['cards']        = [];

        foreach ($collection->cards as $card) {
            $data['cards'][] = $card->toArray();
        }

        return $data;
    }
}
