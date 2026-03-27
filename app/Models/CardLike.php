<?php

declare(strict_types=1);

namespace App\Models;

use Phalcon\Mvc\Model;
use Ramsey\Uuid\Uuid;

/**
 * @property string $id
 * @property string $card_id
 * @property string $user_id
 * @property string $created_at
 *
 * @property Card $card
 * @property User $user
 */
class CardLike extends Model
{
    public ?string $id         = null;
    public string  $card_id;
    public string  $user_id;
    public ?string $created_at = null;

    public function initialize(): void
    {
        $this->setSource('card_likes');

        $this->belongsTo(
            'card_id',
            Card::class,
            'id',
            [
                'alias'    => 'card',
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
     * Получить карточку
     */
    public function getCard(): ?Card
    {
        return $this->getRelated('card');
    }

    /**
     * Получить пользователя
     */
    public function getUser(): ?User
    {
        return $this->getRelated('user');
    }

    /**
     * Проверить, лайкнул ли пользователь карточку
     */
    public static function isLiked(string $cardId, string $userId): bool
    {
        return self::count([
            'conditions' => 'card_id = :card_id: AND user_id = :user_id:',
            'bind'       => [
                'card_id' => $cardId,
                'user_id' => $userId
            ]
        ]) > 0;
    }

    /**
     * Получить количество лайков карточки
     */
    public static function getCardLikesCount(string $cardId): int
    {
        return (int) self::count([
            'conditions' => 'card_id = :card_id:',
            'bind'       => ['card_id' => $cardId]
        ]);
    }
}
