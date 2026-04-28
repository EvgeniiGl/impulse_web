<?php

declare(strict_types=1);

namespace App\Models;

use Phalcon\Mvc\Model;
use Ramsey\Uuid\Uuid;

class CardNotificationSchedule extends Model
{
    public ?string $id           = null;
    public string  $card_id;
    public string  $user_id;
    public string  $frequency;
    public string  $scheduled_at;
    public ?string $last_sent_at = null;
    public string  $next_send_at;
    public ?bool   $is_active    = true;
    public ?string $created_at   = null;
    public ?string $updated_at   = null;
    public ?int    $repeat_count;
    public int     $sent_count   = 0;
    public ?string $end_date;

    public function initialize()
    {
        $this->setSource('card_notification_schedules');

        $this->belongsTo('card_id', Card::class, 'id', [
            'alias'      => 'card',
            'foreignKey' => true
        ]);

        $this->belongsTo('user_id', User::class, 'id', [
            'alias'      => 'user',
            'foreignKey' => true
        ]);

        $this->hasMany('id', NotificationLog::class, 'schedule_id', [
            'alias' => 'logs'
        ]);
    }

    public function beforeCreate()
    {
        $this->id         = Uuid::uuid4()->toString();
        $this->created_at = date('Y-m-d H:i:s');
        $this->updated_at = date('Y-m-d H:i:s');
        $this->sent_count = 0;

        if (empty($this->next_send_at)) {
            $this->next_send_at = $this->scheduled_at;
        }
    }

    public function beforeUpdate()
    {
        $this->updated_at = date('Y-m-d H:i:s');
    }

    /**
     * Вычисляет следующее время отправки на основе частоты
     * @throws \DateMalformedStringException
     */
    public function calculateNextSendAt(): ?string
    {
        $now = new \DateTime();

        // Если одноразовая отправка
        if ($this->frequency === 'once') {
            return null;
        }

        // Если следующая отправка еще не наступила, оставляем как есть
        if ($this->next_send_at && new \DateTime($this->next_send_at) > $now) {
            return $this->next_send_at;
        }

        // Получаем базовую дату для расчетов
        $baseDate = $this->scheduled_at
            ? new \DateTime($this->scheduled_at)
            : new \DateTime($this->created_at ?? 'now');

        // Если базовая дата в будущем, используем её
        if ($baseDate > $now) {
            return $baseDate->format('Y-m-d H:i:s');
        }

        // Рассчитываем количество пропущенных интервалов
        $interval = $this->getDateInterval();
        if (!$interval) {
            return null;
        }

        $diff             = $baseDate->diff($now);
        $missingIntervals = $this->calculateMissingIntervals($diff, $this->frequency);

        // Пропускаем пропущенные интервалы и получаем следующую актуальную дату
        $nextDate = clone $baseDate;
        $nextDate->add($this->multiplyInterval($interval, $missingIntervals + 1));

        // Проверяем ограничения
        if ($this->repeat_count !== null) {
            $totalOccurrences = $missingIntervals + $this->sent_count + 1;
            if ($totalOccurrences > $this->repeat_count) {
                return null;
            }
        }

        if ($this->end_date !== null && $nextDate > new \DateTime($this->end_date)) {
            return null;
        }

        return $nextDate->format('Y-m-d H:i:s');
    }

    /**
     * Возвращает DateInterval для заданной частоты
     */
    private function getDateInterval(): ?\DateInterval
    {
        switch ($this->frequency) {
            case 'hourly':
                return new \DateInterval('PT1H');
            case 'daily':
                return new \DateInterval('P1D');
            case 'weekly':
                return new \DateInterval('P1W');
            case 'monthly':
                return new \DateInterval('P1M');
            case 'yearly':
                return new \DateInterval('P1Y');
            default:
                return null;
        }
    }

    /**
     * Умножает DateInterval на заданное число
     */
    private function multiplyInterval(\DateInterval $interval, int $multiplier): \DateInterval
    {
        $result    = new \DateInterval('P0D');
        $result->y = $interval->y * $multiplier;
        $result->m = $interval->m * $multiplier;
        $result->d = $interval->d * $multiplier;
        $result->h = $interval->h * $multiplier;
        $result->i = $interval->i * $multiplier;
        $result->s = $interval->s * $multiplier;
        return $result;
    }

    /**
     * Рассчитывает количество пропущенных интервалов
     */
    private function calculateMissingIntervals(\DateInterval $diff, string $frequency): int
    {
        $totalMinutes = $diff->days * 24 * 60 + $diff->h * 60 + $diff->i;

        switch ($frequency) {
            case 'hourly':
                return (int)($totalMinutes / 60);
            case 'daily':
                return (int)($diff->days / 1);
            case 'weekly':
                return (int)($diff->days / 7);
            case 'monthly':
                return (int)($diff->days / 30); // Приблизительно
            case 'yearly':
                return (int)($diff->days / 365); // Приблизительно
            default:
                return 0;
        }
    }
}