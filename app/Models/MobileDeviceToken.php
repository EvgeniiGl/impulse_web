<?php

declare(strict_types=1);

namespace App\Models;

use Phalcon\Mvc\Model;
use Ramsey\Uuid\Uuid;

class MobileDeviceToken extends Model
{
    public ?string $id           = null;
    public string  $user_id;
    public string  $device_token;
    public string  $platform;     // 'ios' | 'android'
    public ?string $device_name   = null;
    public ?string $app_version   = null;
    public ?string $os_version    = null;
    public bool    $is_active     = true;
    public ?string $last_used_at  = null;
    public ?string $created_at    = null;
    public ?string $updated_at    = null;

    public function initialize(): void
    {
        $this->setSource('mobile_device_tokens');

        $this->belongsTo('user_id', User::class, 'id', [
            'alias'      => 'user',
            'foreignKey' => true,
        ]);
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
     * Обновить время последнего использования
     */
    public function touchLastUsed(): bool
    {
        $this->last_used_at = date('Y-m-d H:i:s');
        return $this->save();
    }

    /**
     * Валидация платформы
     */
    public static function isValidPlatform(string $platform): bool
    {
        return in_array($platform, ['ios', 'android'], true);
    }
}
