План разработки системы push-уведомлений для карточек

1. Структура базы данных

1.1. Таблица для расписания уведомлений

```sql
-- Миграция для создания таблицы расписаний
CREATE TYPE notification_frequency AS ENUM (
    'once', -- однократное
    'minutely', -- каждую минуту
    'hourly', -- каждый час
    'daily', -- каждый день
    'weekly', -- каждую неделю
    'monthly', -- каждый месяц
    'yearly' -- каждый год
    );

CREATE TABLE card_notification_schedules
(
    id           UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
    card_id      UUID                                   NOT NULL
        CONSTRAINT fk_schedules_card
            REFERENCES cards (id)
            ON DELETE CASCADE,
    user_id      UUID                                   NOT NULL
        CONSTRAINT fk_schedules_user
            REFERENCES users (id)
            ON DELETE CASCADE,
    frequency    notification_frequency                 NOT NULL,
    scheduled_at TIMESTAMP WITH TIME ZONE               NOT NULL, -- дата/время первого показа
    last_sent_at TIMESTAMP WITH TIME ZONE,                        -- когда последний раз отправлено
    next_send_at TIMESTAMP WITH TIME ZONE               NOT NULL, -- следующая отправка
    is_active    BOOLEAN                  DEFAULT true  NOT NULL,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,

    -- Дополнительные параметры для повторяющихся уведомлений
    repeat_count INTEGER,                                         -- сколько раз повторить (NULL = бесконечно)
    sent_count   INTEGER                  DEFAULT 0     NOT NULL, -- сколько раз уже отправлено
    end_date     TIMESTAMP WITH TIME ZONE,                        -- дата окончания повторений

    CONSTRAINT unique_user_card_schedule UNIQUE (user_id, card_id, scheduled_at)
);

CREATE INDEX idx_schedules_next_send ON card_notification_schedules (next_send_at) WHERE is_active = true;
CREATE INDEX idx_schedules_user ON card_notification_schedules (user_id);
CREATE INDEX idx_schedules_card ON card_notification_schedules (card_id);
```

1.2. Таблица для push-подписок (Web Push)

```sql
CREATE TABLE push_subscriptions
(
    id         UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
    user_id    UUID                                   NOT NULL
        CONSTRAINT fk_subscriptions_user
            REFERENCES users (id)
            ON DELETE CASCADE,
    endpoint   TEXT                                   NOT NULL,
    p256dh_key TEXT                                   NOT NULL, -- публичный ключ для шифрования
    auth_key   TEXT                                   NOT NULL, -- ключ аутентификации
    user_agent TEXT,
    is_active  BOOLEAN                  DEFAULT true  NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,

    CONSTRAINT unique_user_endpoint UNIQUE (user_id, endpoint)
);

CREATE INDEX idx_subscriptions_user ON push_subscriptions (user_id) WHERE is_active = true;
```

1.3. Таблица логов отправленных уведомлений

```sql
CREATE TYPE notification_status AS ENUM ('sent', 'failed', 'clicked', 'dismissed');

CREATE TABLE notification_logs
(
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    schedule_id UUID NOT NULL
        CONSTRAINT fk_logs_schedule
            REFERENCES card_notification_schedules (id)
            ON DELETE CASCADE,
    user_id     UUID NOT NULL ```sql
CREATE TYPE notification_status AS ENUM ('sent', 'failed', 'clicked', 'dismissed');

CREATE TABLE notification_logs
(
    id            UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
    schedule_id   UUID                                   NOT NULL
        CONSTRAINT fk_logs_schedule
            REFERENCES card_notification_schedules (id)
            ON DELETE CASCADE,
    user_id       UUID                                   NOT NULL
        CONSTRAINT fk_logs_user
            REFERENCES users (id)
            ON DELETE CASCADE,
    card_id       UUID                                   NOT NULL
        CONSTRAINT fk_logs_card
            REFERENCES cards (id)
            ON DELETE CASCADE,
    status        notification_status                    NOT NULL,
    error_message TEXT,
    sent_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    clicked_at    TIMESTAMP WITH TIME ZONE,

    CONSTRAINT check_clicked_at CHECK (
        (status = 'clicked' AND clicked_at IS NOT NULL) OR
        (status != 'clicked' AND clicked_at IS NULL)
        )
);

CREATE INDEX idx_logs_schedule ON notification_logs (schedule_id);
CREATE INDEX idx_logs_user ON notification_logs (user_id);
CREATE INDEX idx_logs_sent_at ON notification_logs (sent_at);
```

2. Backend (PHP Phalcon)

2.1. Установка зависимостей

```composer require minishlink/web-push```

Обновите
composer.json
:

```json
{
  "require": {
    "minishlink/web-push": "^9.0"
  }
}
```

2.2. Модели

```app/Models/CardNotificationSchedule.php```

```php
<?php

<?php

namespace App\Models;

use Phalcon\Mvc\Model;

class CardNotificationSchedule extends Model
{
    public string $id;
    public string $card_id;
    public string $user_id;
    public string $frequency;
    public string $scheduled_at;
    public ?string $last_sent_at;
    public string $next_send_at;
    public bool $is_active;
    public string $created_at;
    public string $updated_at;
    public ?int $repeat_count;
    public int $sent_count;
    public ?string $end_date;

    public function initialize()
    {
        $this->setSource('card_notification_schedules');
        
        $this->belongsTo('card_id', Card::class, 'id', [
            'alias' => 'card',
            'foreignKey' => true
        ]);
        
        $this->belongsTo('user_id', User::class, 'id', [
            'alias' => 'user',
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
```

php

```app/Models/PushSubscription.php```

```php
<?php

namespace App\Models;

use Phalcon\Mvc\Model;

class PushSubscription extends Model
{
    public string $id;
    public string $user_id;
    public string $endpoint;
    public string $p256dh_key;
    public string $auth_key;
    public ?string $user_agent;
    public bool $is_active;
    public string $created_at;
    public string $updated_at;

    public function initialize()
    {
        $this->setSource('push_subscriptions');
        
        $this->belongsTo('user_id', User::class, 'id', [
            'alias' => 'user',
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
```

```app/Models/NotificationLog.php```

```php
<?php

namespace App\Models;

use Phalcon\Mvc\Model;

class NotificationLog extends Model
{
    public string $id;
    public string $schedule_id;
    public string $user_id;
    public string $card_id;
    public string $status;
    public ?string $error_message;
    public string $sent_at;
    public ?string $clicked_at;

    public function initialize()
    {
        $this->setSource('notification_logs');
        
        $this->belongsTo('schedule_id', CardNotificationSchedule::class, 'id', [
            'alias' => 'schedule',
            'foreignKey' => true
        ]);
        
        $this->belongsTo('user_id', User::class, 'id', [
            'alias' => 'user',
            'foreignKey' => true
        ]);
        
        $this->belongsTo('card_id', Card::class, 'id', [
            'alias' => 'card',
            'foreignKey' => true
        ]);
    }

    public function beforeCreate()
    {
        $this->sent_at = date('Y-m-d H:i:s');
    }
}
```

2.3. Сервис для работы с Web Push

```app/Services/WebPushService.php```

```php
<?php

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
    private string $publicKey;
    private string $privateKey;

    public function __construct()
    {
        // Генерация ключей: vendor/bin/web-push generate-vapid-keys
        $this->publicKey = getenv('VAPID_PUBLIC_KEY');
        $this->privateKey = getenv('VAPID_PRIVATE_KEY');
        
        $auth = [
            'VAPID' => [
                'subject' => getenv('VAPID_SUBJECT') ?: 'mailto:admin@example.com',
                'publicKey' => $this->publicKey,
                'privateKey' => $this->privateKey,
            ],
        ];

        $this->webPush = new WebPush($auth);
    }

    /**
     * Сохранение подписки пользователя
     */
    public function saveSubscription(string $userId, array $subscriptionData): bool
    {
        try {
            $subscription = PushSubscription::findFirst([
                'conditions' => 'user_id = :user_id: AND endpoint = :endpoint:',
                'bind' => [
                    'user_id' => $userId,
                    'endpoint' => $subscriptionData['endpoint']
                ]
            ]);

            if (!$subscription) {
                $subscription = new PushSubscription();
                $subscription->user_id = $userId;
                $subscription->endpoint = $subscriptionData['endpoint'];
            }

            $subscription->p256dh_key = $subscriptionData['keys']['p256dh'];
            $subscription->auth_key = $subscriptionData['keys']['auth'];
            $subscription->user_agent = $_SERVER['HTTP_USER_AGENT'] ?? null;
            $subscription->is_active = true;

            return $subscription->save();
        } catch (\Exception $e) {
            error_log("Error saving subscription: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Отправка уведомления конкретному пользователю
     */
    public function sendNotification(string $userId, array $payload): array
    {
        $subscriptions = PushSubscription::find([
            'conditions' => 'user_id = :user_id: AND is_active = true',
            'bind' => ['user_id' => $userId]
        ]);

        $results = [];
        
        foreach ($subscriptions as $sub) {
            try {
                $subscription = Subscription::create([
                    'endpoint' => $sub->endpoint,
                    'keys' => [
                        'p256dh' => $sub->p256dh_key,
                        'auth' => $sub->auth_key
                    ]
                ]);

                $this->webPush->queueNotification(
                    $subscription,
                    json_encode($payload)
                );

                $results[] = [
                    'subscription_id' => $sub->id,
                    'success' => true
                ];
            } catch (\Exception $e) {
                $results[] = [
                    'subscription_id' => $sub->id,
                    'success' => false,
                    'error' => $e->getMessage()
                ];
            }
        }

        // Отправка всех уведомлений
        foreach ($this->webPush->flush() as $report) {
            $endpoint = $report->getRequest()->getUri()->__toString();
            
            if (!$report->isSuccess()) {
                // Деактивируем неработающие подписки
                $failedSub = PushSubscription::findFirst([
                    'conditions' => 'endpoint = :endpoint:',
                    'bind' => ['endpoint' => $endpoint]
                ]);
                
                if ($failedSub) {
                    $failedSub->is_active = false;
                    $failedSub->save();
                }
            }
        }

        return $results;
    }

    /**
     * Отправка уведомления по расписанию
     */
    public function sendScheduledNotification(CardNotificationSchedule $schedule): bool
    {
        try {
            $card = Card::findFirst($schedule->card_id);
            
            if (!$card) {
                throw new \Exception("Card not found");
            }

            $payload = [
                'title' => $card->title,
                'body' => $card->description ?? 'Напоминание о карточке',
                'icon' => $card->url,
                'badge' => '/icon-badge.png',
                'data' => [
                    'url' => '/card/' . $card->id,
                    'card_id' => $card->id,
                    'schedule_id' => $schedule->id
                ],
                'actions' => [
                    [
                        'action' => 'open',
                        'title' => 'Открыть'
                    ],
                    [
                        'action' => 'close',
                        'title' => 'Закрыть'
                    ]
                ]
            ];

            $results = $this->sendNotification($schedule->user_id, $payload);
            
            $success = false;
            foreach ($results as $result) {
                if ($result['success']) {
                    $success = true;
                    
                    // Логируем успешную отправку
                    $log = new NotificationLog();
                    $log->schedule_id = $schedule->id;
                    $log->user_id = $schedule->user_id;
                    $log->card_id = $schedule->card_id;
                    $log->status = 'sent';
                    $log->save();
                } else {
                    // Логируем ошибку
                    $log = new NotificationLog();
                    $log->schedule_id = $schedule->id;
                    $log->user_id = $schedule->user_id;
                    $log->card_id = $schedule->card_id;
                    $log->status = 'failed';
                    $log->error_message = $result['error'] ?? 'Unknown error';
                    $log->save();
                }
            }

            if ($success) {
                // Обновляем расписание
                $schedule->last_sent_at = date('Y-m-d H:i:s');
                $schedule->sent_count++;
                
                $nextSend = $schedule->calculateNextSendAt();
                if ($nextSend === null) {
                    $schedule->is_active = false;
                } else {
                    $schedule->next_send_at = $nextSend;
                }
                
                $schedule->save();
            }

            return $success;
        } catch (\Exception $e) {
            error_log("Error sending scheduled notification: " . $e->getMessage());
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

```

2.4. Контроллеры

app/Controllers/NotificationController.php

```php
<?php

namespace App\Controllers;

use App\Services\WebPushService;
use App\Models\CardNotificationSchedule;
use Phalcon\Mvc\Controller;

class NotificationController extends Controller
{
    private WebPushService $webPushService;

    public function initialize()
    {
        $this->webPushService = new WebPushService();
    }

    /**
     * Получение публичного VAPID ключа
     * GET /api/notifications/vapid-key
     */
    public function getVapidKeyAction()
    {
        return $this->response->setJsonContent([
            'success' => true,
            'data' => [
                'publicKey' => $this->webPushService->getPublicKey()
            ]
        ]);
    }

    /**
     * Сохранение подписки
     * POST /api/notifications/subscribe
     */
    public function subscribeAction()
    {
        try {
            $userId = $this->getUserId(); // Получаем из JWT токена
            $data = $this->request->getJsonRawBody(true);

            if (!isset($data['subscription'])) {
                return $this->response->setJsonContent([
                    'success' => false,
                    'message' => 'Subscription data required'
                ])->setStatusCode(400);
            }

            $success = $this->webPushService->saveSubscription(
                $userId,
                $data['subscription']
            );

            return $this->response->setJsonContent([
                'success' => $success,
                'message' => $success ? 'Subscription saved' : 'Failed to save subscription'
            ]);
        } catch (\Exception $e) {
            return $this->response->setJsonContent([
                'success' => false,
                'message' => $e->getMessage()
            ])->setStatusCode(500);
        }
    }

    /**
     * Создание расписания уведомлений
     * POST /api/notifications/schedules
     */
    public function createScheduleAction()
    {
        try {
            $userId = $this->getUserId();
            $data = $this->request->getJsonRawBody(true);

            $schedule = new CardNotificationSchedule();
            $schedule->card_id = $data['card_id'];
            $schedule->user_id = $userId;
            $schedule->frequency = $data['frequency'];
            $schedule->scheduled_at = $data['scheduled_at'];
            $schedule->next_send_at = $data['scheduled_at'];
            $schedule->repeat_count = $data['repeat_count'] ?? null;
            $schedule->end_date = $data['end_date'] ?? null;

            if ($schedule->save()) {
                return $this->response->setJsonContent([
                    'success' => true,
                    'data' => $schedule
                ]);
            } else {
                return $this->response->setJsonContent([
                    'success' => false,
                    'errors' => $schedule->getMessages()
                ])->setStatusCode(400);
            }
        } catch (\Exception $e) {
            return $this->response->setJsonContent([
                'success' => false,
                'message' => $e->getMessage()
            ])->setStatusCode(500);
        }
    }

    /**
     * Получение расписаний пользователя
     * GET /api/notifications/schedules
     */
    public function getSchedulesAction()
    {
        try {
            $userId = $this->getUserId();
            
            $schedules = CardNotificationSchedule::find([
                'conditions' => 'user_id = :user_id:',
                'bind' => ['user_id' => $userId],
                'order' => 'next_send_at ASC'
            ]);

            return $this->response->setJsonContent([
                'success' => true,
                'data' => $schedules
            ]);
        } catch (\Exception $e) {
            return $this->response->setJsonContent([
                'success' => false,
                'message' => $e->getMessage()
            ])->setStatusCode(500);
        }
    }

    /**
     * Обновление расписания
     * PUT /api/notifications/schedules/{id}
     */
    public function updateScheduleAction(string $id)
    {
        try {
            $userId = $this->getUserId();
            $data = $this->request->getJsonRawBody(true);

            $schedule = CardNotificationSchedule::findFirst([
                'conditions' => 'id = :id: AND user_id = :user_id:',
                'bind' => [
                    'id' => $id,
                    'user_id' => $userId
                ]
            ]);

            if (!$schedule) {
                return $this->response->setJsonContent([
                    'success' => false,
                    'message' => 'Schedule not found'
                ])->setStatusCode(404);
            }

            if (isset($data['is_active'])) {
                $schedule->is_active = $data['is_active'];
            }
            if (isset($data['frequency'])) {
                $schedule->frequency = $data['frequency'];
            }
            if (isset($data['scheduled_at'])) {
                $schedule->scheduled_at = $data['scheduled_at'];
                $schedule->next_send_at = $data['scheduled_at'];
            }

            if ($schedule->save()) {
                return $this->response->setJsonContent([
                    'success' => true,
                    'data' => $schedule
                ]);
            } else {
                return $this->response->setJsonContent([
                    'success' => false,
                    'errors' => $schedule->getMessages()
                ])->setStatusCode(400);
            }
        } catch (\Exception $e) {
            return $this->response->setJsonContent([
                'success' => false,
                'message' => $e->getMessage()
            ])->setStatusCode(500);
        }
    }

    /**
     * Удаление расписания
     * DELETE /api/notifications/schedules/{id}
     */
    public function deleteScheduleAction(string $id)
    {
        try {
            $userId = $this->getUserId();

            $schedule = CardNotificationSchedule::findFirst([
                'conditions' => 'id = :id: AND user_id = :user_id:',
                'bind' => [
                    'id' => $id,
                    'user_id' => $userId
                ]
            ]);

            if (!$schedule) {
                return $this->response->setJsonContent([
                    'success' => false,
                    'message' => 'Schedule not found'
                ])->setStatusCode(404);
            }

            if ($schedule->delete()) {
                return $this->response->setJsonContent([
                    'success' => true,
                    'message' => 'Schedule deleted'
                ]);
            } else {
                return $this->response->setJsonContent([
                    'success' => false,
                    'errors' => $schedule->getMessages()
                ])->setStatusCode(400);
            }
        } catch (\Exception $e) {
            return $this->response->setJsonContent([
                'success' => false,
                'message' => $e->getMessage()
            ])->setStatusCode(500);
        }
    }

    private function getUserId(): string
    {
        // Получение user_id из JWT токена
        // Реализация зависит от вашей системы аутентификации
        return $this->auth->getUserId();
    }
}
```

2.5. CLI команда для отправки уведомлений

app/Tasks/NotificationTask.php

```php
<?php

namespace App\Tasks;

use App\Models\CardNotificationSchedule;
use App\Services\WebPushService;
use Phalcon\Cli\Task;

class NotificationTask extends Task
{
    /**
     * Отправка запланированных уведомлений
     * php cli.php notification send
     */
    public function sendAction()
    {
        $webPushService = new WebPushService();
        
        // Находим все активные расписания, которые нужно отправить
        $schedules = CardNotificationSchedule::find([
            'conditions' => 'is_active = true AND next_send_at <= :now:',
            'bind' => ['now' => date('Y-m-d H:i:s')],
            'order' => 'next_send_at ASC'
        ]);

        $sent = 0;
        $failed = 0;

        foreach ($schedules as $schedule) {
            echo "Processing schedule {$schedule->id}...\n";
            
            if ($webPushService->sendScheduledNotification($schedule)) {
                $sent++;
                echo "✓ Sent\n";
            } else {
                $failed++;
                echo "✗ Failed\n";
            }
        }

        echo "\nTotal: {$schedules->count()}, Sent: {$sent}, Failed: {$failed}\n";
    }
}
```

2.6. Cron задача

Добавьте в crontab:

# Каждую минуту проверяем и отправляем уведомления

```bash
* * * * * cd /path/to/project && php cli.php notification send >> /var/log/notifications.log 2>&1
```

3. Frontend (React + TypeScript)

3.1. Service Worker

public/sw.js

```js
// Service Worker для обработки push-уведомлений
self.addEventListener('push', function (event) {
    console.log('Push received:', event);

    let data = {};

    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data = {
                title: 'Новое уведомление',
                body: event.data.text()
            };
        }
    }

    const title = data.title || 'Уведомление';
    const options = {
        body: data.body || '',
        icon: data.icon || '/icon-192x192.png',
        badge: data.badge || '/icon-badge.png',
        data: data.data || {},
        actions: data.actions || [],
        tag: data.data?.card_id || 'notification',
        requireInteraction: false,
        vibrate: [200, 100, 200]
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Обработка клика по уведомлению
self.addEventListener('notificationclick', function (event) {
    console.log('Notification clicked:', event);

    event.notification.close();

    if (event.action === 'close') {
        return;
    }

    const urlToOpen = event.notification.data?.url || '/';

    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then(function (clientList) {
            // Проверяем, есть ли уже открытое окно
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }

            // Открываем новое окно
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );

    // Отправляем статистику о клике
    if (event.notification.data?.schedule_id) {
        fetch('/api/notifications/clicked', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                schedule_id: event.notification.data.schedule_id
            })
        }).catch(err => console.error('Failed to log click:', err));
    }
});

// Обработка закрытия уведомления
self.addEventListener('notificationclose', function (event) {
    console.log('Notification closed:', event);
});

self.addEventListener('install', function (event) {
    console.log('Service Worker installing.');
    self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    console.log('Service Worker activating.');
    event.waitUntil(clients.claim());
});
```

3.2. Утилита для работы с push-уведомлениями

frontend/src/utils/notificationUtils.ts

```typescript
export interface NotificationSubscription {
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    };
}

export class NotificationManager {
    private static instance: NotificationManager;
    private vapidPublicKey: string | null = null;
    private registration: ServiceWorkerRegistration | null = null;

    private constructor() {
    }

    static getInstance(): NotificationManager {
        if (!NotificationManager.instance) {
            NotificationManager.instance = new NotificationManager();
        }
        return NotificationManager.instance;
    }

    /**
     * Проверка поддержки уведомлений
     */
    isSupported(): boolean {
        return 'Notification' in window &&
            'serviceWorker' in navigator &&
            'PushManager' in window;
    }

    /**
     * Получение текущего статуса разрешений
     */
    getPermissionStatus(): NotificationPermission {
        if (!this.isSupported()) {
            return 'denied';
        }
        return Notification.permission;
    }

    /**
     * Запрос разрешения на уведомления
     */
    async requestPermission(): Promise<NotificationPermission> {
        if (!this.isSupported()) {
            throw new Error('Notifications not supported');
        }

        const permission = await Notification.requestPermission();
        return permission;
    }

    /**
     * Регистрация Service Worker
     */
    async registerServiceWorker(): Promise<ServiceWorkerRegistration> {
        if (!this.isSupported()) {
            throw new Error('Service Worker not supported');
        }

        try {
            this.registration = await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registered:', this.registration);

            // Ждем, пока SW станет активным
            await navigator.serviceWorker.ready;

            return this.registration;
        } catch (error) {
            console.error('Service Worker registration failed:', error);
            throw error;
        }
    }

    /**
     * Получение VAPID ключа с сервера
     */
    async fetchVapidKey(): Promise<string> {
        try {
            const response = await fetch('/api/notifications/vapid-key');
            const data = await response.json();

            if (data.success && data.data.publicKey) {
                this.vapidPublicKey = data.data.publicKey;
                return this.vapidPublicKey;
            }

            throw new Error('Failed to fetch VAPID key');
        } catch (error) {
            console.error('Error fetching VAPID key:', error);
            throw error;
        }
    }

    /**
     * Конвертация VAPID ключа
     */
    private urlBase64ToUint8Array(base64String: string): Uint8Array {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    /**
     * Подписка на push-уведомления
     */
    async subscribe(): Promise<NotificationSubscription> {
        if (!this.registration) {
            await this.registerServiceWorker();
        }

        if (!this.vapidPublicKey) {
            await this.fetchVapidKey();
        }

        try {
            const subscription = await this.registration!.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey!)
            });

            const subscriptionData = subscription.toJSON();

            if (!subscriptionData.keys) {
                throw new Error('Invalid subscription data');
            }

            return {
                endpoint: subscriptionData.endpoint!,
                keys: {
                    p256dh: subscriptionData.keys.p256dh!,
                    auth: subscriptionData.keys.auth!
                }
            };
        } catch (error) {
            console.error('Failed to subscribe:', error);
            throw error;
        }
    }

    /**
     * Отправка подписки на сервер
     */
    async sendSubscriptionToServer(subscription: NotificationSubscription): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('/api/notifications/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({subscription})
            });

            const data = await response.json();
            return data.success;
        } catch (error) {
            console.error('Failed to send subscription to server:', error);
            return false;
        }
    }

    /**
     * Полная инициализация уведомлений
     */
    async initialize(): Promise<boolean> {
        try {
            // 1. Проверка поддержки
            if (!this.isSupported()) {
                console.warn('Notifications not supported');
                return false;
            }

            // 2. Проверка разрешений
            let permission = this.getPermissionStatus();

            if (permission === 'default') {
                permission = await this.requestPermission();
            }

            if (permission !== 'granted') {
                console.warn('Notification permission denied');
                return false;
            }

            // 3. Регистрация Service Worker
            await this.registerServiceWorker();

            // 4. Подписка на уведомления
            const subscription = await this.subscribe();

            // 5. Отправка подписки на сервер
            const success = await this.sendSubscriptionToServer(subscription);

            return success;
        } catch (error) {
            console.error('Failed to initialize notifications:', error);
            return false;
        }
    }

    /**
     * Отписка от уведомлений
     */
    async unsubscribe(): Promise<boolean> {
        try {
            if (!this.registration) {
                return true;
            }

            const subscription = await this.registration.pushManager.getSubscription();

            if (subscription) {
                await subscription.unsubscribe();
            }

            return true;
        } catch (error) {
            console.error('Failed to unsubscribe:', error);
            return false;
        }
    }

    /**
     * Показ тестового уведомления
     */
    async showTestNotification(): Promise<void> {
        if (!this.registration) {
            throw new Error('Service Worker not registered');
        }

        await this.registration.showNotification('Тестовое уведомление', {
            body: 'Уведомления работают!',
            icon: '/icon-192x192.png',
            badge: '/icon-badge.png',
            vibrate: [200, 100, 200]
        });
    }
}

export const notificationManager = NotificationManager.getInstance();
```

3.3. API для работы с расписаниями

frontend/src/api/notificationsApi.ts

```typescript
import ApiClient from "@/api/api";
import {config} from "@api/api_config.ts";

export type NotificationFrequency =
    | 'once'
    | 'minutely'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly';

export interface NotificationSchedule {
    id: string;
    card_id: string;
    user_id: string;
    frequency: NotificationFrequency;
    scheduled_at: string;
    last_sent_at: string | null;
    next_send_at: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    repeat_count: number | null;
    sent_count: number;
    end_date: string | null;
}

export interface CreateScheduleRequest {
    card_id: string;
    frequency: NotificationFrequency;
    scheduled_at: string;
    repeat_count?: number | null;
    end_date?: string | null;
}

export interface UpdateScheduleRequest {
    is_active?: boolean;
    frequency?: NotificationFrequency;
    scheduled_at?: string;
}

export interface GetSchedulesResponse {
    success: boolean;
    data: NotificationSchedule[];
}

export interface CreateScheduleResponse {
    success: boolean;
    data: NotificationSchedule;
}

export class Api extends ApiClient {
    async getVapidKey(): Promise<{ publicKey: string } | null> {
        try {
            const response = await this.get<{ success: boolean; data: { publicKey: string } }>(
                `${this.client.defaults.baseURL}/api/notifications/vapid-key`
            );
            return response?.data || null;
        } catch (error) {
            console.error('Failed to get VAPID key:', error);
            return null;
        }
    }

    async subscribe(subscription: any): Promise<boolean> {
        try {
            const response = await this.post<any, { success: boolean }>(
                `${this.client.defaults.baseURL}/api/notifications/subscribe`,
                {subscription}
            );
            return response?.success || false;
        } catch (error) {
            console.error('Failed to subscribe:', error);
            return false;
        }
    }

    async createSchedule(data: CreateScheduleRequest): Promise<CreateScheduleResponse | null> {
        try {
            const response = await this.post<CreateScheduleRequest, CreateScheduleResponse>(
                `${this.client.defaults.baseURL}/api/notifications/schedules`,
                data
            );
            return response;
        } catch (error) {
            console.error('Failed to create schedule:', error);
            throw error;
        }
    }

    async getSchedules(): Promise<GetSchedulesResponse | null> {
        try {
            const response = await this.get<GetSchedulesResponse>(
                `${this.client.defaults.baseURL}/api/notifications/schedules`
            );
            return response;
        } catch (error) {
            console.error('Failed to get schedules:', error);
            return null;
        }
    }

    async updateSchedule(id: string, data: UpdateScheduleRequest): Promise<CreateScheduleResponse | null> {
        try {
            const response = await this.put<UpdateScheduleRequest, CreateScheduleResponse>(
                `${this.client.defaults.baseURL}/api/notifications/schedules/${id}`,
                data
            );
            return response;
        } catch (error) {
            console.error('Failed to update schedule:', error);
            throw error;
        }
    }

    async deleteSchedule(id: string): Promise<boolean> {
        try {
            const response = await this.delete<{ success: boolean }>(
                `${this.client.defaults.baseURL}/api/notifications/schedules/${id}`
            );
            return response?.success || false;
        } catch (error) {
            console.error('Failed to delete schedule:', error);
            return false;
        }
    }
}

export const NotificationsApi = new Api(config);
```

3.4. Компонент для управления уведомлениями

frontend/src/components/Notifications/NotificationSettings.tsx

```typescript
import React, {useState, useEffect} from 'react';
import {notificationManager} from '@/utils/notificationUtils';

interface NotificationSettingsProps {
    onPermissionChange?: (granted: boolean) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
                                                                              onPermissionChange
                                                                          }) => {
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [isSupported, setIsSupported] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsSupported(notificationManager.isSupported());
        if (notificationManager.isSupported()) {
            setPermission(notificationManager.getPermissionStatus());
        }
    }, []);

    const handleEnableNotifications = async () => {
        setIsLoading(true);
        try {
            const success = await notificationManager.initialize();

            if (success) {
                setPermission('granted');
                onPermissionChange?.(true);
                alert('Уведомления успешно включены!');
            } else {
                alert('Не удалось включить уведомления');
            }
        } catch (error) {
            console.error('Error enabling notifications:', error);
            alert('Ошибка при включении уведомлений');
        } finally {
            setIsLoading(false);
        }
    };

    const handleTestNotification = async () => {
        try {
            await notificationManager.showTestNotification();
        } catch (error) {
            console.error('Error showing test notification:', error);
            alert('Ошибка при показе тестового уведомления');
        }
    };

    if (!isSupported) {
        return (
            <div className = "bg-yellow-50 border border-yellow-200 rounded-lg p-4" >
            <p className = "text-yellow-800" >
                Ваш
        браузер
        не
        поддерживает
        push - уведомления
        < /p>
        < /div>
    )
        ;
    }

    return (
        <div className = "bg-white rounded-lg shadow p-6" >
        <h3 className = "text-lg font-semibold mb-4" > Настройки
    уведомлений < /h3>

    < div
    className = "space-y-4" >
    <div className = "flex items-center justify-between" >
    <div>
        <p className = "font-medium" > Статус
    уведомлений < /p>
    < p
    className = "text-sm text-gray-600" >
        {permission === 'granted' && 'Уведомления включены'
}
    {
        permission === 'denied' && 'Уведомления заблокированы'
    }
    {
        permission === 'default' && 'Уведомления не настроены'
    }
    </p>
    < /div>

    < div
    className = {`w-3 h-3 rounded-full ${
        permission === 'granted' ? 'bg-green-500' :
            permission === 'denied' ? 'bg-red-500' :
                'bg-gray-400'
    }`
}
    />
    < /div>

    {
        permission !== 'granted' && (
            <button
                onClick = {handleEnableNotifications}
        disabled = {isLoading || permission === 'denied'
    }
        className = "w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
            {isLoading ? 'Загрузка...' : 'Включить уведомления'}
            < /button>
    )
    }

    {
        permission === 'granted' && (
            <button
                onClick = {handleTestNotification}
        className = "w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
            Показать
        тестовое
        уведомление
        < /button>
    )
    }

    {
        permission === 'denied' && (
            <div className = "bg-red-50 border border-red-200 rounded-lg p-4" >
            <p className = "text-sm text-red-800" >
                Уведомления
        заблокированы.Разрешите
        их
        в
        настройках
        браузера.
        < /p>
        < /div>
    )
    }
    </div>
    < /div>
)
    ;
};
```

3.5. Компонент для создания расписания

frontend/src/components/Notifications/ScheduleForm.tsx

```typescript
import React, {useState} from 'react';
import {NotificationsApi, NotificationFrequency, CreateScheduleRequest} from '@/api/notificationsApi';

interface ScheduleFormProps {
    cardId: string;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({
                                                              cardId,
                                                              onSuccess,
                                                              onCancel
                                                          }) => {
    const [frequency, setFrequency] = useState<NotificationFrequency>('once');
    const [scheduledAt, setScheduledAt] = useState('');
    const [repeatCount, setRepeatCount] = useState<number | ''>('');
    const [endDate, setEndDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const frequencyOptions: { value: NotificationFrequency; label: string }[] = [
        {value: 'once', label: 'Один раз'},
        {value: 'minutely', label: 'Каждую минуту'},
        {value: 'hourly', label: 'Каждый час'},
        {value: 'daily', label: 'Каждый день'},
        {value: 'weekly', label: 'Каждую неделю'},
        {value: 'monthly', label: 'Каждый месяц'},
        {value: 'yearly', label: 'Каждый год'}
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!scheduledAt) {
            alert('Укажите дату и время');
            return;
        }

        setIsLoading(true);

        try {
            const data: CreateScheduleRequest = {
                card_id: cardId,
                frequency,
                scheduled_at: new Date(scheduledAt).toISOString(),
                repeat_count: repeatCount === '' ? null : Number(repeatCount),
                end_date: endDate ? new Date(endDate).toISOString() : null
            };

            const response = await NotificationsApi.createSchedule(data);

            if (response?.success) {
                alert('Расписание создано!');
                onSuccess?.();
            } else {
                alert('Ошибка при создании расписания');
            }
        } catch (error) {
            console.error('Error creating schedule:', error);
            alert('Ошибка при создании расписания');
        } finally {
            setIsLoading(false);
        }
    };

    // Минимальная дата - текущее время
    const minDateTime = new Date().toISOString().slice(0, 16);

    return (
        <form onSubmit = {handleSubmit}
    className = "space-y-4" >
    <div>
        <label className = "block text-sm font-medium text-gray-700 mb-1" >
        Частота
    уведомлений
    < /label>
    < select
    value = {frequency}
    onChange = {(e)
=>
    setFrequency(e.target.value as NotificationFrequency)
}
    className = "w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
        {
            frequencyOptions.map(option => (
                <option key = {option.value} value = {option.value} >
                {option.label}
                < /option>
))
}
    </select>
    < /div>

    < div >
    <label className = "block text-sm font-medium text-gray-700 mb-1" >
        Дата
    и
    время
    первого
    уведомления *
    </label>
    < input
    type = "datetime-local"
    value = {scheduledAt}
    onChange = {(e)
=>
    setScheduledAt(e.target.value)
}
    min = {minDateTime}
    required
    className = "w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        / >
        </div>

    {
        frequency !== 'once' && (
            <>
                <div>
                    <label className = "block text-sm font-medium text-gray-700 mb-1" >
                Количество
        повторений(оставьте
        пустым
        для
        бесконечного
    )
        </label>
        < input
        type = "number"
        value = {repeatCount}
        onChange = {(e)
    =>
        setRepeatCount(e.target.value === '' ? '' : Number(e.target.value))
    }
        min = "1"
        placeholder = "Бесконечно"
        className = "w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        / >
        </div>

        < div >
        <label className = "block text-sm font-medium text-gray-700 mb-1" >
            Дата
        окончания(опционально)
        < /label>
        < input
        type = "datetime-local"
        value = {endDate}
        onChange = {(e)
    =>
        setEndDate(e.target.value)
    }
        min = {scheduledAt || minDateTime
    }
        className = "w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            / >
            </div>
            < />
    )
    }

    <div className = "flex gap-3 pt-4" >
    <button
        type = "submit"
    disabled = {isLoading}
    className = "flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
        {isLoading ? 'Создание...' : 'Создать расписание'}
        < /button>

    {
        onCancel && (
            <button
                type = "button"
        onClick = {onCancel}
        className = "flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
            Отмена
            < /button>
    )
    }
    </div>
    < /form>
)
    ;
};
```

3.6. Интеграция в CardItem

Обновленный CardItem.tsx (добавить кнопку для создания уведомления):

```typescript
// Добавить в imports
import {useState} from 'react';
import Modal from 'react-modal';
import {ScheduleForm} from '@/components/Notifications/ScheduleForm';
import {BsBell} from 'react-icons/bs';

// Добавить в компонент CardItem
export default function CardItem({card}: CardItemProps) {
    // ... существующий код ...

    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

    const handleScheduleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsScheduleModalOpen(true);
    };

    return (
        <div>
            {/* ... существующий код карточки ... */}

    {/* Добавить кнопку уведомлений рядом с кнопкой описания */
    }
    <button
        onClick = {handleScheduleClick}
    className = "absolute bottom-3 right-12 z-30 rounded-full hover:bg-black/80 transition-colors shadow-lg"
    style = {
    {
        padding: '3px'
    }
}
    title = "Настроить уведомления"
    >
    <BsBell className = "w-3.5 h-3.5 text-white" / >
        </button>

    {/* Модальное окно для создания расписания */
    }
    <Modal
        isOpen = {isScheduleModalOpen}
    onRequestClose = {()
=>
    setIsScheduleModalOpen(false)
}
    className = "max-w-md mx-auto mt-20 bg-white rounded-lg shadow-xl p-6"
    overlayClassName = "fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center"
    >
    <h2 className = "text-xl font-bold mb-4" > Настроить
    уведомления < /h2>
    < ScheduleForm
    cardId = {card.id}
    onSuccess = {()
=>
    setIsScheduleModalOpen(false)
}
    onCancel = {()
=>
    setIsScheduleModalOpen(false)
}
    />
    < /Modal>
    < /div>
)
    ;
}
```

3.7. Страница управления расписаниями

frontend/src/pages/NotificationsPage.tsx

```typescript
import React, {useState, useEffect} from 'react';
import {NotificationsApi, NotificationSchedule} from '@/api/notificationsApi';
import {NotificationSettings} from '@/components/Notifications/NotificationSettings';
import moment from 'moment';

export const NotificationsPage: React.FC = () => {
    const [schedules, setSchedules] = useState<NotificationSchedule[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadSchedules();
    }, []);

    const loadSchedules = async () => {
        setIsLoading(true);
        try {
            const response = await NotificationsApi.getSchedules();
            if (response?.success) {
                setSchedules(response.data);
            }
        } catch (error) {
            console.error('Error loading schedules:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleActive = async (schedule: NotificationSchedule) => {
        try {
            await NotificationsApi.updateSchedule(schedule.id, {
                is_active: !schedule.is_active
            });
            await loadSchedules();
        } catch (error) {
            console.error('Error toggling schedule:', error);
            alert('Ошибка при изменении статуса');
        }
    };

    const handleDelete = async (scheduleId: string) => {
        if (!confirm('Удалить это расписание?')) {
            return;
        }

        try {
            const success = await NotificationsApi.deleteSchedule(scheduleId);
            if (success) {
                await loadSchedules();
            } else {
                alert('Ошибка при удалении');
            }
        } catch (error) {
            console.error('Error deleting schedule:', error);
            alert('Ошибка при удалении');
        }
    };

    const getFrequencyLabel = (frequency: string): string => {
        const labels: Record<string, string> = {
            once: 'Один раз',
            minutely: 'Каждую минуту',
            hourly: 'Каждый час',
            daily: 'Каждый день',
            weekly: 'Каждую неделю',
            monthly: 'Каждый месяц',
            yearly: 'Каждый год'
        };
        return labels[frequency] || frequency;
    };

    return (
        <div className = "container mx-auto px-4 py-8 max-w-4xl" >
        <h1 className = "text-3xl font-bold mb-8" > Уведомления < /h1>

            < div
    className = "mb-8" >
    <NotificationSettings onPermissionChange = {loadSchedules}
    />
    < /div>

    < div
    className = "bg-white rounded-lg shadow" >
    <div className = "p-6 border-b" >
    <h2 className = "text-xl font-semibold" > Расписание
    уведомлений < /h2>
    < /div>

    {
        isLoading ? (
            <div className = "p-6 text-center text-gray-500" >
                Загрузка
    ...
        </div>
    ) :
        schedules.length === 0 ? (
            <div className = "p-6 text-center text-gray-500" >
                У вас
        пока
        нет
        запланированных
        уведомлений
        < /div>
    ) :
        (
            <div className = "divide-y" >
                {
                    schedules.map(schedule => (
                        <div key = {schedule.id} className = "p-6 hover:bg-gray-50" >
                    <div className = "flex items-start justify-between" >
                    <div className = "flex-1" >
                    <div className = "flex items-center gap-3 mb-2" >
                    <h3 className = "font-medium" >
                        Карточка
    :
        {
            schedule.card_id
        }
        </h3>
        < span
        className = {`text-xs px-2 py-1 rounded-full ${
            schedule.is_active
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
        }`
    }>
        {
            schedule.is_active ? 'Активно' : 'Неактивно'
        }
        </span>
        < /div>

        < div
        className = "text-sm text-gray-600 space-y-1" >
        <p>
            <span className = "font-medium" > Частота
    :
        </span>{' '}
        {
            getFrequencyLabel(schedule.frequency)
        }
        </p>
        < p >
        <span className = "font-medium" > Следующая
        отправка:</span>{' '}
        {
            moment(schedule.next_send_at).format('DD.MM.YYYY HH:mm')
        }
        </p>
        {
            schedule.last_sent_at && (
                <p>
                    <span className = "font-medium" > Последняя
            отправка:</span>{' '}
            {
                moment(schedule.last_sent_at).format('DD.MM.YYYY HH:mm')
            }
            </p>
        )
        }
        <p>
            <span className = "font-medium" > Отправлено
    :
        </span>{' '}
        {
            schedule.sent_count
        }
        раз
        {
            schedule.repeat_count && ` из ${schedule.repeat_count}`
        }
        </p>
        < /div>
        < /div>

        < div
        className = "flex gap-2 ml-4" >
        <button
            onClick = {()
    =>
        handleToggleActive(schedule)
    }
        className = {`px-3 py-1 rounded text-sm ${
            schedule.is_active
                ? 'bg-gray-200 hover:bg-gray-300'
                : 'bg-green-600 hover:bg-green-700 text-white'
        }`
    }
    >
        {
            schedule.is_active ? 'Отключить' : 'Включить'
        }
        </button>
        < button
        onClick = {()
    =>
        handleDelete(schedule.id)
    }
        className = "px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
            >
            Удалить
            < /button>
            < /div>
            < /div>
            < /div>
    ))
    }
        </div>
    )
    }
    </div>
    < /div>
)
    ;
};
```

4. Финальная настройка

4.1. Генерация VAPID ключей

```bash
cd vendor/minishlink/web-push
php -r "require 'src/VAPID.php'; \$keys = Minishlink\WebPush\VAPID::createVapidKeys(); echo 'Public Key: ' . \$keys['publicKey'] . PHP_EOL; echo 'Private Key: ' . \$keys['privateKey'] . PHP_EOL;"
```

Добавьте ключи в

```env
VAPID_PUBLIC_KEY=your_public_key_here
VAPID_PRIVATE_KEY=your_private_key_here
VAPID_SUBJECT=mailto:your-email@example.com
```

4.2. Обновление vite.config.ts

```typescript
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                sw: './public/sw.js'
            },
            output: {
                entryFileNames: (chunkInfo) => {
                    return chunkInfo.name === 'sw' ? 'sw.js' : '[name]-[hash].js';
                }
            }
        }
    }
});
```

4.3. Добавление маршрутов

app/config/routes.php (или где у вас определены маршруты):

```php
// Notification routes
$router->get('/api/notifications/vapid-key', [
    'controller' => 'Notification',
    'action' => 'getVapidKey'
]);

$router->post('/api/notifications/subscribe', [
    'controller' => 'Notification',
    'action' => 'subscribe'
]);

$router->post('/api/notifications/schedules', [
    'controller' => 'Notification',
    'action' => 'createSchedule'
]);

$router->get('/api/notifications/schedules', [
    'controller' => 'Notification',
    'action' => 'getSchedules'
]);

$router->put('/api/notifications/schedules/{id}', [
    'controller' => 'Notification',
    'action' => 'updateSchedule'
]);

$router->delete('/api/notifications/schedules/{id}', [
    'controller' => 'Notification',
    'action' => 'deleteSchedule'
]);
```

5. Тестирование

5.1. Тестирование на localhost

Для тестирования на localhost используйте
ngrok
или подобный сервис для HTTPS
Или настройте локальный SSL сертификат

5.2. Проверочный список

Миграции базы данных выполнены
VAPID ключи сгенерированы и добавлены в .env
Service Worker зарегистрирован
Разрешения на уведомления запрашиваются
Подписка сохраняется на сервере
Cron задача настроена
Уведомления отправляются по расписанию
Клик по уведомлению открывает карточку

6. Оптимизации и улучшения

Батчинг уведомлений: группировать несколько уведомлений в одно
Retry механизм: повторная отправка при ошибках
Аналитика: отслеживание открытий и кликов
Персонализация: настройка времени "тихих часов"
Группировка: объединение уведомлений от одной карточки

Это полный план разработки системы push-уведомлений для вашего приложения!