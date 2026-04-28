<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\MobileDeviceToken;
use App\Models\CardNotificationSchedule;
use App\Models\NotificationLog;
use App\Models\Card;
use App\Repositories\MobileDeviceTokenRepository;

class MobilePushService
{
    private MobileDeviceTokenRepository $repository;
    private ?string                     $fcmServiceAccountPath;
    private ?string                     $fcmProjectId;

    public function __construct()
    {
        $this->repository = new MobileDeviceTokenRepository();

        // Конфигурация Firebase
        $this->fcmServiceAccountPath = $_ENV['FCM_SERVICE_ACCOUNT_PATH']
            ?? $_SERVER['FCM_SERVICE_ACCOUNT_PATH']
            ?? null;

        $this->fcmProjectId = $_ENV['FCM_PROJECT_ID']
            ?? $_SERVER['FCM_PROJECT_ID']
            ?? null;
    }

    /**
     * Регистрация / обновление токена устройства
     */
    public function registerToken(
        string  $userId,
        string  $deviceToken,
        string  $platform,
        ?string $deviceName = null,
        ?string $appVersion = null,
        ?string $osVersion = null
    ): MobileDeviceToken
    {
        // Если этот токен уже привязан к другому пользователю — деактивируем
        $existing = $this->repository->findByDeviceToken($deviceToken);
        if ($existing && $existing->user_id !== $userId) {
            $this->repository->deactivateToken($existing);
        }

        // Ищем существующий токен у текущего пользователя
        $token = $this->repository->findByUserAndToken($userId, $deviceToken);

        if (!$token) {
            $token               = new MobileDeviceToken();
            $token->user_id      = $userId;
            $token->device_token = $deviceToken;
            $token->platform     = $platform;
        }

        $token->device_name  = $deviceName;
        $token->app_version  = $appVersion;
        $token->os_version   = $osVersion;
        $token->is_active    = true;
        $token->last_used_at = date('Y-m-d H:i:s');

        if (!$this->repository->save($token)) {
            throw new \RuntimeException('Failed to save device token');
        }

        return $token;
    }

    /**
     * Удаление (деактивация) токена устройства
     */
    public function unregisterToken(string $userId, string $tokenId): bool
    {
        $token = $this->repository->findByIdAndUser($tokenId, $userId);

        if (!$token) {
            return false;
        }

        return $this->repository->deactivateToken($token);
    }

    /**
     * Удаление конкретного токена (полное удаление)
     */
    public function deleteToken(string $userId, string $tokenId): bool
    {
        $token = $this->repository->findByIdAndUser($tokenId, $userId);

        if (!$token) {
            return false;
        }

        return $this->repository->delete($token);
    }

    /**
     * Получение всех устройств пользователя
     */
    public function getUserDevices(string $userId): array
    {
        return $this->repository->getAllByUser($userId);
    }

    /**
     * Получение активных устройств пользователя
     */
    public function getActiveDevices(string $userId): array
    {
        return $this->repository->getActiveByUser($userId);
    }

    /**
     * Отправка push-уведомления на все мобильные устройства пользователя
     */
    public function sendNotification(CardNotificationSchedule $schedule, array $payload): array
    {
        $devices = $this->repository->getActiveByUser($schedule->user_id);

        if (empty($devices)) {
            return [];
        }

        $results = [];

        foreach ($devices as $device) {
            try {
                $success = false;

                if ($device['platform'] === 'android') {
                    $success = $this->sendFcmNotification($device['device_token'], $payload);
                } elseif ($device['platform'] === 'ios') {
                    // Для iOS тоже используем FCM (Firebase поддерживает APNs через FCM)
                    $success = $this->sendFcmNotification($device['device_token'], $payload, true);
                }

                $channel = $device['platform'] === 'ios' ? 'apns' : 'fcm';

                $results[] = [
                    'device_token_id' => $device['id'],
                    'platform'        => $device['platform'],
                    'channel'         => $channel,
                    'success'         => $success,
                ];

                // Обновляем last_used_at
                $tokenModel = $this->repository->findByIdAndUser($device['id'], $schedule->user_id);
                if ($tokenModel) {
                    $tokenModel->touchLastUsed();
                }
            } catch (\Exception $e) {
                error_log("Error sending mobile push to {$device['platform']}: " . $e->getMessage());

                $results[] = [
                    'device_token_id' => $device['id'],
                    'platform'        => $device['platform'],
                    'channel'         => $device['platform'] === 'ios' ? 'apns' : 'fcm',
                    'success'         => false,
                    'error'           => $e->getMessage(),
                ];

                // Деактивируем при определённых ошибках (токен невалиден)
                if ($this->isInvalidTokenError($e->getMessage())) {
                    $tokenModel = $this->repository->findByIdAndUser($device['id'], $schedule->user_id);
                    if ($tokenModel) {
                        $this->repository->deactivateToken($tokenModel);
                        error_log("Deactivated invalid token: {$device['id']}");
                    }
                }
            }
        }

        return $results;
    }

    /**
     * Отправка уведомления по расписанию (вызывается из NotificationTask)
     */
    public function sendScheduledNotification(CardNotificationSchedule $schedule): bool
    {
        try {
            $card = Card::findFirst([
                'conditions' => 'id = :id:',
                'bind'       => ['id' => $schedule->card_id],
            ]);

            if (!$card) {
                error_log("Card not found: {$schedule->card_id}");
                return false;
            }

            $payload = [
                'title' => $card->title ?: 'Напоминание',
                'body'  => $card->description ?: 'Напоминание о карточке',
                'image' => $card->url ?: null,
                'data'  => [
                    'url'         => '/card/' . $card->id,
                    'card_id'     => $card->id,
                    'schedule_id' => $schedule->id,
                    'type'        => 'card_reminder',
                ],
            ];

            $results = $this->sendNotification($schedule, $payload);

            $success = false;
            foreach ($results as $result) {
                $log                  = new NotificationLog();
                $log->schedule_id     = $schedule->id;
                $log->user_id         = $schedule->user_id;
                $log->card_id         = $schedule->card_id;
                $log->channel         = $result['channel'];
                $log->device_token_id = $result['device_token_id'];

                if ($result['success']) {
                    $log->status = 'sent';
                    $success     = true;
                } else {
                    $log->status        = 'failed';
                    $log->error_message = $result['error'] ?? 'Unknown error';
                }

                if (!$log->save()) {
                    error_log("Failed to save mobile notification log");
                }
            }

            return $success;
        } catch (\Exception $e) {
            error_log("Error sending mobile scheduled notification: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Отправка через Firebase Cloud Messaging (HTTP v1 API)
     */
    private function sendFcmNotification(string $deviceToken, array $payload, bool $isApns = false): bool
    {
        if (!$this->fcmProjectId) {
            throw new \RuntimeException(
                'FCM_PROJECT_ID not set. Please configure Firebase credentials.'
            );
        }

        $accessToken = $this->getFcmAccessToken();

        $message = [
            'message' => [
                'token'        => $deviceToken,
                'notification' => [
                    'title' => $payload['title'] ?? 'Уведомление',
                    'body'  => $payload['body'] ?? '',
                ],
                'data'         => array_map('strval', $payload['data'] ?? []),
            ],
        ];

        // Добавляем изображение если есть
        if (!empty($payload['image'])) {
            $message['message']['notification']['image'] = $payload['image'];
        }

        // Android-специфичные настройки
        $message['message']['android'] = [
            'priority'     => 'high',
            'notification' => [
                'channel_id'        => 'card_reminders',
                'click_action'      => 'OPEN_CARD',
                'default_sound'     => true,
                'notification_count' => 1,
            ],
        ];

        // APNs-специфичные настройки (для iOS через FCM)
        $message['message']['apns'] = [
            'headers' => [
                'apns-priority' => '10',
            ],
            'payload' => [
                'aps' => [
                    'alert'    => [
                        'title' => $payload['title'] ?? 'Уведомление',
                        'body'  => $payload['body'] ?? '',
                    ],
                    'sound'    => 'default',
                    'badge'    => 1,
                    'category' => 'CARD_REMINDER',
                ],
            ],
        ];

        $url = "https://fcm.googleapis.com/v1/projects/{$this->fcmProjectId}/messages:send";

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER     => [
                'Authorization: Bearer ' . $accessToken,
                'Content-Type: application/json',
            ],
            CURLOPT_POSTFIELDS     => json_encode($message),
            CURLOPT_TIMEOUT        => 30,
            CURLOPT_CONNECTTIMEOUT => 10,
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error    = curl_error($ch);
        curl_close($ch);

        if ($error) {
            throw new \RuntimeException("FCM cURL error: {$error}");
        }

        if ($httpCode !== 200) {
            $responseData = json_decode($response, true);
            $errorMessage = $responseData['error']['message'] ?? "HTTP {$httpCode}";
            throw new \RuntimeException("FCM error: {$errorMessage}");
        }

        return true;
    }

    /**
     * Получение OAuth 2.0 access token для FCM HTTP v1 API
     */
    private function getFcmAccessToken(): string
    {
        if (!$this->fcmServiceAccountPath || !file_exists($this->fcmServiceAccountPath)) {
            throw new \RuntimeException(
                'FCM service account file not found. Set FCM_SERVICE_ACCOUNT_PATH in .env'
            );
        }

        $serviceAccount = json_decode(file_get_contents($this->fcmServiceAccountPath), true);

        if (!$serviceAccount) {
            throw new \RuntimeException('Invalid FCM service account JSON file');
        }

        $now = time();

        // Создаём JWT для OAuth
        $header = base64_encode(json_encode([
            'alg' => 'RS256',
            'typ' => 'JWT',
        ]));

        $claims = base64_encode(json_encode([
            'iss'   => $serviceAccount['client_email'],
            'scope' => 'https://www.googleapis.com/auth/firebase.messaging',
            'aud'   => 'https://oauth2.googleapis.com/token',
            'iat'   => $now,
            'exp'   => $now + 3600,
        ]));

        $signature = '';
        $privateKey = openssl_pkey_get_private($serviceAccount['private_key']);
        openssl_sign(
            "{$header}.{$claims}",
            $signature,
            $privateKey,
            OPENSSL_ALGO_SHA256
        );

        $jwt = "{$header}.{$claims}." . base64_encode($signature);

        // Обмениваем JWT на access token
        $ch = curl_init('https://oauth2.googleapis.com/token');
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POSTFIELDS     => http_build_query([
                'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                'assertion'  => $jwt,
            ]),
            CURLOPT_TIMEOUT        => 10,
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode !== 200) {
            throw new \RuntimeException("Failed to obtain FCM access token: HTTP {$httpCode}");
        }

        $data = json_decode($response, true);

        if (!isset($data['access_token'])) {
            throw new \RuntimeException('FCM OAuth response missing access_token');
        }

        return $data['access_token'];
    }

    /**
     * Проверка, является ли ошибка признаком невалидного токена
     */
    private function isInvalidTokenError(string $errorMessage): bool
    {
        $invalidPatterns = [
            'UNREGISTERED',
            'INVALID_ARGUMENT',
            'not a valid FCM registration token',
            'Requested entity was not found',
            'InvalidRegistration',
            'NotRegistered',
        ];

        foreach ($invalidPatterns as $pattern) {
            if (stripos($errorMessage, $pattern) !== false) {
                return true;
            }
        }

        return false;
    }
}
