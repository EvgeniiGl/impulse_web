<?php

declare(strict_types=1);

namespace App\Models;

use Phalcon\Mvc\Model;

class PushSubscription extends Model
{
    public string  $id;
    public string  $user_id;
    public string  $endpoint;
    public string  $p256dh_key;
    public string  $auth_key;
    public ?string $user_agent;
    public bool    $is_active;
    public string  $created_at;
    public string  $updated_at;

    public function initialize()
    {
        $this->setSource('push_subscriptions');

        $this->belongsTo('user_id', User::class, 'id', [
            'alias'      => 'user',
            'foreignKey' => true
        ]);
    }

    public function beforeCreate()
    {
        $this->created_at = date('Y-m-d H:i:s');
        $this->updated_at = date('Y-m-d H:i:s');
    }

    public function beforeUpdate()
    {
        $this->updated_at = date('Y-m-d H:i:s');
    }
}