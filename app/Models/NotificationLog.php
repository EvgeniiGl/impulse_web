<?php

declare(strict_types=1);

namespace App\Models;

use Phalcon\Mvc\Model;
use Ramsey\Uuid\Uuid;

class NotificationLog extends Model
{
    public ?string $id              = null;
    public string  $schedule_id;
    public string  $user_id;
    public string  $card_id;
    public string  $status;
    public ?string $error_message   = null;
    public ?string $sent_at         = null;
    public ?string $clicked_at      = null;
    public string  $channel         = 'web_push'; // 'web_push' | 'fcm' | 'apns'
    public ?string $device_token_id = null;

    public function initialize()
    {
        $this->setSource('notification_logs');

        $this->belongsTo('schedule_id', CardNotificationSchedule::class, 'id', [
            'alias'      => 'schedule',
            'foreignKey' => true
        ]);

        $this->belongsTo('user_id', User::class, 'id', [
            'alias'      => 'user',
            'foreignKey' => true
        ]);

        $this->belongsTo('card_id', Card::class, 'id', [
            'alias'      => 'card',
            'foreignKey' => true
        ]);
    }

    public function beforeCreate()
    {
        $this->id      = Uuid::uuid4()->toString();
        $this->sent_at = date('Y-m-d H:i:s');
    }
}