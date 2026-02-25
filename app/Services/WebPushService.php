<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\PushSubscription;
use App\Models\CardNotificationSchedule;
use App\Models\NotificationLog;
use App\Models\Card;
use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;

class WebPushService
{
    private WebPush $webPush;
    private string  $publicKey;
    private string  $privateKey;

    public function __construct()
    {
        // Получаем ключи из переменных окружения
        $publicKey  = $_ENV['VAPID_PUBLIC_KEY'] ?? $_SERVER['VAPID_PUBLIC_KEY'] ?? null;
        $privateKey = $_ENV['VAPID_PRIVATE_KEY'] ?? $_SERVER['VAPID_PRIVATE_KEY'] ?? null;
        $subject    = $_ENV['VAPID_SUBJECT'] ?? $_SERVER['VAPID_SUBJECT'] ?? 'mailto:geka_nkz@mail.ru';

        // Проверяем, что ключи установлены
        if ($publicKey === false || empty($publicKey)) {
            throw new \RuntimeException(
                'VAPID_PUBLIC_KEY not set in environment variables. ' .
                'Please run: php generate-vapid-keys.php'
            );
        }

        if ($privateKey === false || empty($privateKey)) {
            throw new \RuntimeException(
                'VAPID_PRIVATE_KEY not set in environment variables. ' .
                'Please run: php generate-vapid-keys.php'
            );
        }

        $this->publicKey  = $publicKey;
        $this->privateKey = $privateKey;

        $auth = [
            'VAPID' => [
                'subject'    => $subject ?: 'mailto:admin@example.com',
                'publicKey'  => $this->publicKey,
                'privateKey' => $this->privateKey,
            ],
        ];

        try {
            $this->webPush = new WebPush($auth);
        } catch (\Exception $e) {
            throw new \RuntimeException(
                'Failed to initialize WebPush: ' . $e->getMessage()
            );
        }
    }

    /**
     * Сохранение подписки пользователя
     */
    public function saveSubscription(string $userId, array $subscriptionData): bool
    {
        try {
            // Проверяем наличие необходимых данных
            if (!isset($subscriptionData['endpoint']) ||
                !isset($subscriptionData['keys']['p256dh']) ||
                !isset($subscriptionData['keys']['auth'])) {
                error_log("Invalid subscription data structure");
                return false;
            }

            $subscription = PushSubscription::findFirst([
                'conditions' => 'user_id = :user_id: AND endpoint = :endpoint:',
                'bind'       => [
                    'user_id'  => $userId,
                    'endpoint' => $subscriptionData['endpoint']
                ]
            ]);

            if (!$subscription) {
                $subscription           = new PushSubscription();
                $subscription->user_id  = $userId;
                $subscription->endpoint = $subscriptionData['endpoint'];
            }

            $subscription->p256dh_key = $subscriptionData['keys']['p256dh'];
            $subscription->auth_key   = $subscriptionData['keys']['auth'];
            $subscription->user_agent = $_SERVER['HTTP_USER_AGENT'] ?? null;
            $subscription->is_active  = true;

            if (!$subscription->save()) {
                $messages = $subscription->getMessages();
                foreach ($messages as $message) {
                    error_log("Error saving subscription: " . $message);
                }
                return false;
            }

            return true;
        } catch (\Exception $e) {
            error_log("Error saving subscription: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Отправка уведомления конкретному пользователю
     */
    public function sendNotification(CardNotificationSchedule $schedule, array $payload): array
    {
        $subscriptions = PushSubscription::find([
            'conditions' => 'user_id = :user_id: AND is_active = true',
            'bind'       => ['user_id' => $schedule->user_id]
        ]);

        if (count($subscriptions) === 0) {
            error_log("No active subscriptions found for user: {$schedule->user_id}");
            return [];
        }

        $results = [];

        foreach ($subscriptions as $sub) {
            try {
                $subscription = Subscription::create([
                    'endpoint' => $sub->endpoint,
                    'keys'     => [
                        'p256dh' => $sub->p256dh_key,
                        'auth'   => $sub->auth_key
                    ]
                ]);

                $this->webPush->queueNotification(
                    $subscription,
                    json_encode($payload)
                );

                $results[] = [
                    'subscription_id' => $sub->id,
                    'success'         => true
                ];
            } catch (\Exception $e) {
                error_log("Error queuing notification: " . $e->getMessage());
                $results[] = [
                    'subscription_id' => $sub->id,
                    'success'         => false,
                    'error'           => $e->getMessage()
                ];
            }
        }

        // Отправка всех уведомлений
        try {
            foreach ($this->webPush->flush() as $report) {
                $endpoint = $report->getRequest()->getUri()->__toString();

                if (!$report->isSuccess()) {
                    error_log("Failed to send notification to: {$endpoint}");
                    error_log("Reason: " . $report->getReason());

                    // Деактивируем неработающие подписки
                    $failedSub = PushSubscription::findFirst([
                        'conditions' => 'endpoint = :endpoint:',
                        'bind'       => ['endpoint' => $endpoint]
                    ]);

                    if ($failedSub) {
                        $failedSub->is_active = false;
                        $failedSub->save();
                    }
                    $log                = new NotificationLog();
                    $log->schedule_id   = $schedule->id;
                    $log->user_id       = $schedule->user_id;
                    $log->card_id       = $schedule->card_id;
                    $log->error_message = $report->getReason();
                    $log->status        = 'failed';

                    if (!$log->save()) {
                        error_log("Failed to save notification log");
                    }
                } else {
                    error_log("Successfully sent notification to: {$endpoint}");
                }
            }
        } catch (\Exception $e) {
            error_log("Error flushing notifications: " . $e->getMessage());
        }

        return $results;
    }

    /**
     * Отправка уведомления по расписанию
     */
    public function sendScheduledNotification(CardNotificationSchedule $schedule): bool
    {
        try {
            $card = Card::findFirst([
                'conditions' => 'id = :id:',
                'bind'       => ['id' => $schedule->card_id]
            ]);
            if (!$card) {
                error_log("Card not found: {$schedule->card_id}");
                throw new \Exception("Card not found");
            }

            $payload = [
                'title'   => $card->title,
                'body'    => $card->description ?? 'Напоминание о карточке',
                'icon'    => $card->url,
                'badge'   => '/icon-badge.png',
                'data'    => [
                    'url'         => '/card/' . $card->id,
                    'card_id'     => $card->id,
                    'schedule_id' => $schedule->id
                ],
                'actions' => [
                    [
                        'action' => 'open',
                        'title'  => 'Открыть'
                    ],
                    [
                        'action' => 'close',
                        'title'  => 'Закрыть'
                    ]
                ]
            ];

            $results = $this->sendNotification($schedule, $payload);

            $success = false;
            foreach ($results as $result) {
                if ($result['success']) {
                    $success = true;

                    // Логируем успешную отправку
                    $log              = new NotificationLog();
                    $log->schedule_id = $schedule->id;
                    $log->user_id     = $schedule->user_id;
                    $log->card_id     = $schedule->card_id;
                    $log->status      = 'sent';

                    if (!$log->save()) {
                        error_log("Failed to save notification log");
                    }
                } else {
                    // Логируем ошибку
                    $log                = new NotificationLog();
                    $log->schedule_id   = $schedule->id;
                    $log->user_id       = $schedule->user_id;
                    $log->card_id       = $schedule->card_id;
                    $log->status        = 'failed';
                    $log->error_message = $result['error'] ?? 'Unknown error';

                    if (!$log->save()) {
                        error_log("Failed to save error log");
                    }
                }
            }

            if ($success) {
                // Обновляем расписание
                $schedule->last_sent_at = date('Y-m-d H:i:s');
                $schedule->sent_count++;

                $nextSend = $schedule->calculateNextSendAt();
                if ($nextSend === null) {
                    $schedule->is_active = false;
                    error_log("Schedule {$schedule->id} completed, marking as inactive");
                } else {
                    $schedule->next_send_at = $nextSend;
                    error_log("Schedule {$schedule->id} next send at: {$nextSend}");
                }

                if (!$schedule->save()) {
                    error_log("Failed to update schedule");
                    $messages = $schedule->getMessages();
                    foreach ($messages as $message) {
                        error_log("Schedule error: " . $message);
                    }
                }
            }

            return $success;
        } catch (\Exception $e) {
            error_log("Error sending scheduled notification: " . $e->getMessage());
            error_log("Stack trace: " . $e->getTraceAsString());
            return false;
        }
    }

    /**
     * Получение публичного VAPID ключа
     */
    public function getPublicKey(): string
    {
        return $this->publicKey;
    }
}