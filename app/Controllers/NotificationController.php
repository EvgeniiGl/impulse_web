<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Helpers\TranslationHelper;
use App\Models\PushSubscription;
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
     * POST /api/notifications/subscribe
     */
    public function subscribeAction(): \Phalcon\Http\ResponseInterface
    {
        try {
            $userId = $this->getUserId();
            $data   = $this->request->getJsonRawBody(true);

            if (!isset($data['subscription'])) {
                return $this->response->setJsonContent([
                    'success' => false,
                    'message' => TranslationHelper::translate('Subscription data required')
                ])->setStatusCode(400);
            }

            $success = $this->webPushService->saveSubscription(
                $userId,
                $data['subscription']
            );

            return $this->response->setJsonContent([
                'success' => $success,
                'message' => TranslationHelper::translate(
                    $success ? 'Subscription saved' : 'Failed to save subscription'
                )
            ]);
        } catch (\Exception $e) {
            return $this->response->setJsonContent([
                'success' => false,
                'message' => $e->getMessage()
            ])->setStatusCode(500);
        }
    }

    /**
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
                    'data'    => $schedule->toArray(),
                    'message' => TranslationHelper::translate('Schedule saved successfully')
                ]);
            }

            return $this->response->setJsonContent([
                'success' => false,
                'errors'  => $schedule->getMessages()
            ])->setStatusCode(400);

        } catch (\Exception $e) {
            return $this->response->setJsonContent([
                'success' => false,
                'message' => $e->getMessage()
            ])->setStatusCode(500);
        }
    }

    /**
     * DELETE /api/notifications/schedules/{id}
     */
    public function deleteScheduleAction(string $id): \Phalcon\Http\ResponseInterface
    {
        try {
            $userId   = $this->getUserId();
            $schedule = CardNotificationSchedule::findFirst([
                'conditions' => 'id = :id: AND user_id = :user_id:',
                'bind'       => ['id' => $id, 'user_id' => $userId]
            ]);

            if (!$schedule) {
                return $this->response->setJsonContent([
                    'success' => false,
                    'message' => TranslationHelper::translate('Schedule not found')
                ])->setStatusCode(404);
            }

            if ($schedule->delete()) {
                return $this->response->setJsonContent([
                    'success' => true,
                    'message' => TranslationHelper::translate('Schedule deleted')
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
     * POST /api/notifications/validate-subscription
     */
    public function validateSubscriptionAction()
    {
        try {
            $userId = $this->getUserId();

            $activeSubscription = PushSubscription::findFirst([
                'conditions' => 'user_id = :user_id: AND is_active = true',
                'bind'       => ['user_id' => $userId]
            ]);

            return $this->response->setJsonContent([
                'success' => true,
                'data'    => [
                    'isValid'         => $activeSubscription !== null,
                    'hasSubscription' => $activeSubscription !== null
                ]
            ]);

        } catch (\Exception $e) {
            return $this->response->setJsonContent([
                'success' => false,
                'message' => $e->getMessage()
            ])->setStatusCode(500);
        }
    }
}