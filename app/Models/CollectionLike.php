<?php

declare(strict_types=1);

namespace App\Models;

use Phalcon\Mvc\Model;
use Ramsey\Uuid\Uuid;

/**
 * @property string $id
 * @property string $collection_id
 * @property string $user_id
 * @property string $created_at
 *
 * @property Collection $collection
 * @property User $user
 */
class CollectionLike extends Model
{
    public ?string $id            = null;
    public string  $collection_id;
    public string  $user_id;
    public ?string $created_at    = null;

    public function initialize(): void
    {
        $this->setSource('collection_likes');

        $this->belongsTo(
            'collection_id',
            Collection::class,
            'id',
            [
                'alias'    => 'collection',
                'reusable' => true
            ]
        );

        $this->belongsTo(
            'user_id',
            User::class,
            'id',
            [
                'alias'    => 'user',
                'reusable' => true
            ]
        );
    }

    public function beforeCreate(): void
    {
        $this->id         = Uuid::uuid4()->toString();
        $this->created_at = date('Y-m-d H:i:s');
    }

    /**
     * Получить коллекцию
     */
    public function getCollection(): ?Collection
    {
        return $this->getRelated('collection');
    }

    /**
     * Получить пользователя
     */
    public function getUser(): ?User
    {
        return $this->getRelated('user');
    }

    /**
     * Проверить, лайкнул ли пользователь коллекцию
     */
    public static function isLiked(string $collectionId, string $userId): bool
    {
        return self::count([
            'conditions' => 'collection_id = :collection_id: AND user_id = :user_id:',
            'bind'       => [
                'collection_id' => $collectionId,
                'user_id'       => $userId
            ]
        ]) > 0;
    }

    /**
     * Получить количество лайков коллекции
     */
    public static function getCollectionLikesCount(string $collectionId): int
    {
        return (int) self::count([
            'conditions' => 'collection_id = :collection_id:',
            'bind'       => ['collection_id' => $collectionId]
        ]);
    }
}
