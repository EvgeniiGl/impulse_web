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
class HiddenCard extends Model
{
    public ?string $id         = null;
    public string  $card_id;
    public string  $user_id;
    public ?string $created_at = null;

    public function initialize(): void
    {
        $this->setSource('hidden_cards');

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
     * Проверить, скрыта ли карточка для пользователя
     */
    public static function isHidden(string $cardId, string $userId): bool
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
     * Получить ID скрытых карточек пользователя
     */
    public static function getHiddenCardIds(string $userId): array
    {
        $records = self::find([
            'conditions' => 'user_id = :user_id:',
            'bind'       => ['user_id' => $userId],
            'columns'    => 'card_id'
        ]);

        $ids = [];
        foreach ($records as $record) {
            $ids[] = $record->card_id;
        }

        return $ids;
    }
}
