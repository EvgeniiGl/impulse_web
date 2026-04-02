<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Exceptions\ErrorException;
use App\Models\CardReport;
use App\Services\ReportService;
use App\Services\TelegramService;
use Phalcon\Http\Response;

class ReportController extends BaseController
{
    /**
     * Отправить жалобу на карточку
     * POST /api/cards/{id}/report
     */
    public function reportAction(string $id): Response
    {
        try {
            $userId = $this->getUserId();

            $data = $this->request->getJsonRawBody(true);

            if (empty($data['reason'])) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => 'Reason is required'
                ], 400);
            }

            $reason = $data['reason'];

            if (!CardReport::isValidReason($reason)) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => 'Invalid report reason'
                ], 400);
            }

            $reportService = new ReportService();
            $report        = $reportService->createReport($id, $userId, $reason);

            // Попытка отправить в Telegram сразу (fire-and-forget)
            // Если не получится — worker подхватит позже
//            try {
//                $telegramService = new TelegramService();
//                $sent            = $telegramService->sendReportNotification($report);
//
//                if ($sent) {
//                    $reportService->markAsTelegramSent($report);
//                }
//            } catch (\Exception $e) {
//                // Логируем, но не прерываем ответ пользователю
//                error_log("Telegram send failed (will retry via worker): " . $e->getMessage());
//            }

            return $this->jsonResponse([
                'success' => true,
                'data'    => [
                    'id'         => $report->id,
                    'card_id'    => $report->card_id,
                    'reason'     => $report->reason,
                    'created_at' => $report->created_at,
                ],
                'message' => 'Report submitted successfully'
            ], 201);

        } catch (\RuntimeException $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => $e->getMessage()
            ], 400);
        } catch (\Exception $e) {
            $this->logger->error($e->getMessage());

            throw new ErrorException();
        }
    }

    /**
     * Скрыть карточку для пользователя
     * POST /api/cards/{id}/hide
     */
    public function hideAction(string $id): Response
    {
        try {
            $userId = $this->getUserId();

            $reportService = new ReportService();
            $reportService->hideCard($id, $userId);

            return $this->jsonResponse([
                'success' => true,
                'message' => 'Card hidden successfully'
            ]);

        } catch (\RuntimeException $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => $e->getMessage()
            ], 400);
        } catch (\Exception $e) {
            $this->logger->error($e->getMessage());

            throw new ErrorException();
        }
    }

    /**
     * Получить текущий user_id из DI
     */
    private function getUserId(): string
    {
        $user = $this->di->get('user');

        if (!$user || empty($user['id'])) {
            throw new \RuntimeException('Unauthorized');
        }

        return $user['id'];
    }
}
