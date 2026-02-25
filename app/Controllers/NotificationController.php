<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Services\WebPushService;
use App\Models\CardNotificationSchedule;

class NotificationController extends BaseController
{
    private WebPushService $webPushService;

    public function initialize(): void
    {
        $this->webPushService = new WebPushService();
    }

    /**
     * Получение публичного VAPID ключа
     * GET /api/notifications/vapid-key
     */
    public function getVapidKeyAction(): \Phalcon\Http\ResponseInterface
    {
        return $this->response->setJsonContent([
            'success' => true,
            'data'    => [
                'publicKey' => $this->webPushService->getPublicKey()
            ]
        ]);
    }

    /**
     * Сохранение подписки
     * POST /api/notifications/subscribe
     */
    public function subscribeAction(): \Phalcon\Http\ResponseInterface
    {
        try {
            $userId = $this->getUserId(); // Получаем из JWT токена
            $data   = $this->request->getJsonRawBody(true);

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
    public function createScheduleAction(): \Phalcon\Http\ResponseInterface
    {
        try {
            $userId = $this->getUserId();
            $data   = $this->request->getJsonRawBody(true);

            $schedule               = new CardNotificationSchedule();
            $schedule->card_id      = $data['card_id'];
            $schedule->user_id      = $userId;
            $schedule->frequency    = $data['frequency'];
            $schedule->scheduled_at = $data['scheduled_at'];
            $schedule->next_send_at = $data['scheduled_at'];
            $schedule->repeat_count = $data['repeat_count'] ?? null;
            $schedule->end_date     = $data['end_date'] ?? null;

            if ($schedule->save()) {
                return $this->response->setJsonContent([
                    'success' => true,
                    'data'    => $schedule
                ]);
            } else {
                return $this->response->setJsonContent([
                    'success' => false,
                    'errors'  => $schedule->getMessages()
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
    public function getSchedulesAction(): \Phalcon\Http\ResponseInterface
    {
        try {
            $userId = $this->getUserId();

            $schedules = CardNotificationSchedule::find([
                'conditions' => 'user_id = :user_id:',
                'bind'       => ['user_id' => $userId],
                'order'      => 'next_send_at ASC'
            ]);

            return $this->response->setJsonContent([
                'success' => true,
                'data'    => $schedules
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
    public function updateScheduleAction(string $id): \Phalcon\Http\ResponseInterface
    {
        try {
            $userId = $this->getUserId();
            $data   = $this->request->getJsonRawBody(true);

            $schedule = CardNotificationSchedule::findFirst([
                'conditions' => 'id = :id: AND user_id = :user_id:',
                'bind'       => [
                    'id'      => $id,
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
                    'data'    => $schedule
                ]);
            } else {
                return $this->response->setJsonContent([
                    'success' => false,
                    'errors'  => $schedule->getMessages()
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
    public function deleteScheduleAction(string $id): \Phalcon\Http\ResponseInterface
    {
        try {
            $userId = $this->getUserId();

            $schedule = CardNotificationSchedule::findFirst([
                'conditions' => 'id = :id: AND user_id = :user_id:',
                'bind'       => [
                    'id'      => $id,
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
                    'errors'  => $schedule->getMessages()
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
        $user = $this->getAuthenticatedUser();
        
        return $user->id;
    }
}