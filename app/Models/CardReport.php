<?php

declare(strict_types=1);

namespace App\Models;

use Phalcon\Mvc\Model;
use Ramsey\Uuid\Uuid;

/**
 * @property string $id
 * @property string $card_id
 * @property string $user_id
 * @property string $reason
 * @property string $status
 * @property bool $telegram_sent
 * @property string|null $telegram_sent_at
 * @property string|null $reviewed_at
 * @property string $created_at
 * @property string $updated_at
 *
 * @property Card $card
 * @property User $user
 */
class CardReport extends Model
{
    public const string STATUS_PENDING   = 'pending';
    public const string STATUS_REVIEWED  = 'reviewed';
    public const string STATUS_RESOLVED  = 'resolved';
    public const string STATUS_DISMISSED = 'dismissed';

    public const array VALID_REASONS = [
        'sexual_content',
        'violent_content',
        'hateful_content',
        'harassment',
        'harmful_actions',
        'self_harm',
        'misinformation',
        'child_abuse',
        'terrorism',
        'spam',
    ];

    public const array REASON_LABELS = [
        'sexual_content'  => 'Сексуальный контент',
        'violent_content' => 'Жестокий или отталкивающий контент',
        'hateful_content' => 'Оскорбительный контент',
        'harassment'      => 'Травля или буллинг',
        'harmful_actions' => 'Опасные действия',
        'self_harm'       => 'Суицид, членовредительство',
        'misinformation'  => 'Дезинформация',
        'child_abuse'     => 'Жестокое обращение с детьми',
        'terrorism'       => 'Пропаганда терроризма',
        'spam'            => 'Спам или мошенничество',
    ];

    public ?string $id               = null;
    public string  $card_id;
    public string  $user_id;
    public string  $reason;
    public string  $status           = self::STATUS_PENDING;
    public bool    $telegram_sent    = false;
    public ?string $telegram_sent_at = null;
    public ?string $reviewed_at      = null;
    public ?string $created_at       = null;
    public ?string $updated_at       = null;

    public function initialize(): void
    {
        $this->setSource('card_reports');

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
        $this->updated_at = date('Y-m-d H:i:s');
    }

    public function beforeUpdate(): void
    {
        $this->updated_at = date('Y-m-d H:i:s');
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
     * Получить человекочитаемую причину
     */
    public function getReasonLabel(): string
    {
        return self::REASON_LABELS[$this->reason] ?? $this->reason;
    }

    /**
     * Валидация причины жалобы
     */
    public static function isValidReason(string $reason): bool
    {
        return in_array($reason, self::VALID_REASONS, true);
    }

    /**
     * Количество жалоб на карточку
     */
    public static function getCardReportsCount(string $cardId): int
    {
        return (int)self::count([
            'conditions' => 'card_id = :card_id:',
            'bind'       => ['card_id' => $cardId]
        ]);
    }

    /**
     * Проверить, отправлял ли уже пользователь жалобу на эту карточку
     */
    public static function hasUserReported(string $cardId, string $userId): bool
    {
        return self::count([
                'conditions' => 'card_id = :card_id: AND user_id = :user_id:',
                'bind'       => [
                    'card_id' => $cardId,
                    'user_id' => $userId
                ]
            ]) > 0;
    }
}
