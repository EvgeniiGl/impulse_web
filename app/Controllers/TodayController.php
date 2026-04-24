<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Requests\Notification\GetTodaySchedulesRequest;
use App\Services\TodayScheduleService;

class TodayController extends BaseController
{
    private TodayScheduleService $todayService;

    public function initialize(): void
    {
        $this->todayService = new TodayScheduleService();
    }

    /**
     * Получение уведомлений на сегодня
     * GET /api/today/notifications
     *
     * Query parameters:
     * - timezone: string (optional) - таймзона пользователя, например 'Europe/Helsinki'
     */
    public function getNotificationsAction(): \Phalcon\Http\ResponseInterface
    {
        try {
            $userId   = $this->getUserId();
            $timezone = $this->request->getQuery('timezone', 'string', 'UTC');

            $request = new GetTodaySchedulesRequest($userId, $timezone);
            $items   = $this->todayService->getTodayNotifications($request);
            $stats   = $this->todayService->getTodayStats($request);

            return $this->response->setJsonContent([
                'success' => true,
                'data'    => [
                    'notifications' => $items,
                    'stats'         => $stats,
                ],
            ]);
        } catch (\Exception $e) {
            error_log("TodayController::getNotificationsAction error: " . $e->getMessage());

            return $this->response->setJsonContent([
                'success' => false,
                'message' => $e->getMessage(),
            ])->setStatusCode(500);
        }
    }
}
