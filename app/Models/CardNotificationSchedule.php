<?php

declare(strict_types=1);

namespace App\Models;

use Phalcon\Mvc\Model;

class CardNotificationSchedule extends Model
{
    public string  $id;
    public string  $card_id;
    public string  $user_id;
    public string  $frequency;
    public string  $scheduled_at;
    public ?string $last_sent_at;
    public string  $next_send_at;
    public bool    $is_active;
    public string  $created_at;
    public string  $updated_at;
    public ?int    $repeat_count;
    public int     $sent_count;
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
     */
    public function calculateNextSendAt(): ?string
    {
        $current = new \DateTime($this->next_send_at);

        switch ($this->frequency) {
            case 'once':
                return null; // Больше не отправляем

            case 'minutely':
                $current->modify('+1 minute');
                break;

            case 'hourly':
                $current->modify('+1 hour');
                break;

            case 'daily':
                $current->modify('+1 day');
                break;

            case 'weekly':
                $current->modify('+1 week');
                break;

            case 'monthly':
                $current->modify('+1 month');
                break;

            case 'yearly':
                $current->modify('+1 year');
                break;
        }

        // Проверяем, не превышен ли лимит повторений
        if ($this->repeat_count !== null && $this->sent_count >= $this->repeat_count) {
            return null;
        }

        // Проверяем, не прошла ли дата окончания
        if ($this->end_date !== null && $current > new \DateTime($this->end_date)) {
            return null;
        }

        return $current->format('Y-m-d H:i:s');
    }
}