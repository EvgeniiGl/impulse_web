<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\MobileDeviceToken;

class MobileDeviceTokenRepository
{
    /**
     * Найти токен по user_id и device_token
     */
    public function findByUserAndToken(string $userId, string $deviceToken): ?MobileDeviceToken
    {
        $result = MobileDeviceToken::findFirst([
            'conditions' => 'user_id = :user_id: AND device_token = :device_token:',
            'bind'       => [
                'user_id'      => $userId,
                'device_token' => $deviceToken,
            ],
        ]);

        return $result ?: null;
    }

    /**
     * Получить все активные токены пользователя
     */
    public function getActiveByUser(string $userId): array
    {
        $tokens = MobileDeviceToken::find([
            'conditions' => 'user_id = :user_id: AND is_active = true',
            'bind'       => ['user_id' => $userId],
            'order'      => 'last_used_at DESC, created_at DESC',
        ]);

        return $tokens->toArray();
    }

    /**
     * Получить все токены пользователя (активные и неактивные)
     */
    public function getAllByUser(string $userId): array
    {
        $tokens = MobileDeviceToken::find([
            'conditions' => 'user_id = :user_id:',
            'bind'       => ['user_id' => $userId],
            'order'      => 'is_active DESC, last_used_at DESC, created_at DESC',
        ]);

        return $tokens->toArray();
    }

    /**
     * Получить активные токены по платформе
     */
    public function getActiveByUserAndPlatform(string $userId, string $platform): array
    {
        $tokens = MobileDeviceToken::find([
            'conditions' => 'user_id = :user_id: AND platform = :platform: AND is_active = true',
            'bind'       => [
                'user_id'  => $userId,
                'platform' => $platform,
            ],
            'order'      => 'last_used_at DESC',
        ]);

        return $tokens->toArray();
    }

    /**
     * Найти токен по ID и user_id
     */
    public function findByIdAndUser(string $id, string $userId): ?MobileDeviceToken
    {
        $result = MobileDeviceToken::findFirst([
            'conditions' => 'id = :id: AND user_id = :user_id:',
            'bind'       => [
                'id'      => $id,
                'user_id' => $userId,
            ],
        ]);

        return $result ?: null;
    }

    /**
     * Деактивировать токен
     */
    public function deactivateToken(MobileDeviceToken $token): bool
    {
        $token->is_active = false;
        return $token->save();
    }

    /**
     * Деактивировать все токены пользователя
     */
    public function deactivateAllByUser(string $userId): int
    {
        $tokens = MobileDeviceToken::find([
            'conditions' => 'user_id = :user_id: AND is_active = true',
            'bind'       => ['user_id' => $userId],
        ]);

        $count = 0;
        foreach ($tokens as $token) {
            $token->is_active = false;
            if ($token->save()) {
                $count++;
            }
        }

        return $count;
    }

    /**
     * Удалить токен
     */
    public function delete(MobileDeviceToken $token): bool
    {
        return $token->delete();
    }

    /**
     * Сохранить или обновить токен
     */
    public function save(MobileDeviceToken $token): bool
    {
        return $token->save();
    }

    /**
     * Найти токен по device_token (для обнаружения дубликатов у других пользователей)
     */
    public function findByDeviceToken(string $deviceToken): ?MobileDeviceToken
    {
        $result = MobileDeviceToken::findFirst([
            'conditions' => 'device_token = :device_token: AND is_active = true',
            'bind'       => ['device_token' => $deviceToken],
        ]);

        return $result ?: null;
    }
}
