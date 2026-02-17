<?php
declare(strict_types=1);

namespace App\Models;

use Phalcon\Mvc\Model;
use Ramsey\Uuid\Uuid;

/**
 * @property string $id
 * @property string $name
 * @property string $creator_id
 * @property string $access_type
 * @property bool $is_active
 * @property string $created_at
 * @property string $updated_at
 *
 * @property User $creator
 * @property CollectionCard[] $collectionCards
 * @property Card[] $cards
 */
class Collection extends Model
{
    public const string ACCESS_PRIVATE = 'private';
    public const string ACCESS_SHARED  = 'shared';
    public const string ACCESS_PUBLIC  = 'public';

    public ?string $id          = null;
    public string  $name;
    public string  $creator_id;
    public string  $access_type = self::ACCESS_PRIVATE;
    public bool    $is_active   = true;
    public ?string $created_at  = null;
    public ?string $updated_at  = null;

    public function initialize(): void
    {
        $this->setSource('collections');

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

        // Связь с промежуточной таблицей collection_card
        $this->hasMany(
            'id',
            CollectionCard::class,
            'collection_id',
            [
                'alias'    => 'collectionCards',
                'reusable' => true
            ]
        );

        // Связь с карточками через промежуточную таблицу с явным указанием полей
        $this->hasManyToMany(
            'id',
            CollectionCard::class,
            'collection_id',
            'card_id',
            Card::class,
            'id',
            [
                'alias'    => 'cards',
                'reusable' => true,
                'params'   => [
                    'order' => '[App\Models\CollectionCard].[created_at] DESC' // Явно указываем таблицу для сортировки
                ]
            ]
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
            'name',
            new \Phalcon\Filter\Validation\Validator\StringLength([
                'min'            => 2,
                'max'            => 100,
                'messageMinimum' => 'Collection name must be at least 2 characters',
                'messageMaximum' => 'Collection name must not exceed 100 characters'
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
//
//        if ($this->access_type === 'public') {
//            return true;
//        }

//        $shared = UserCollection::findFirst([
//            'conditions' => 'collection_id = :collectionId: AND user_id = :userId:',
//            'bind'       => [
//                'collectionId' => $this->id,
//                'userId'       => $userId,
//            ]
//        ]);
//
//        return $shared !== false;
        return false;
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
            c.id,
            c.name,
            c.creator_id,
            c.access_type,
            c.is_active,
            c.created_at,
            c.updated_at,
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
        GROUP BY c.id, c.name, c.creator_id, c.access_type, c.is_active, c.created_at, c.updated_at, u.name
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
