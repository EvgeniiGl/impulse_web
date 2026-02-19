<?php

declare(strict_types=1);

namespace App\Models;

use Phalcon\Mvc\Model;

class NotificationLog extends Model
{
    public string  $id;
    public string  $schedule_id;
    public string  $user_id;
    public string  $card_id;
    public string  $status;
    public ?string $error_message;
    public string  $sent_at;
    public ?string $clicked_at;

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
        $this->sent_at = date('Y-m-d H:i:s');
    }
}