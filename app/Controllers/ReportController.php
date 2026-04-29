<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Exceptions\ErrorException;
use App\Helpers\TranslationHelper;
use App\Models\CardReport;
use App\Services\ReportService;
use App\Services\TelegramService;
use Phalcon\Http\Response;

class ReportController extends BaseController
{
    /**
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
                    'error'   => TranslationHelper::translate('Reason is required')
                ], 400);
            }

            $reason = $data['reason'];

            if (!CardReport::isValidReason($reason)) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Invalid report reason')
                ], 400);
            }

            $reportService = new ReportService();
            $report        = $reportService->createReport($id, $userId, $reason);

            return $this->jsonResponse([
                'success' => true,
                'data'    => [
                    'id'         => $report->id,
                    'card_id'    => $report->card_id,
                    'reason'     => $report->reason,
                    'created_at' => $report->created_at,
                ],
                'message' => TranslationHelper::translate('Report submitted successfully')
            ], 201);

        } catch (\RuntimeException $e) {
            return $this->jsonResponse([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        } catch (\Exception $e) {
            $this->logger->error($e->getMessage());
            throw new ErrorException();
        }
    }

    /**
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
                'message' => TranslationHelper::translate('Card hidden successfully')
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

    protected function getUserId(): string
    {
        $user = $this->di->get('user');

        if (!$user || empty($user['id'])) {
            throw new \RuntimeException(TranslationHelper::translate('Unauthorized'));
        }

        return $user['id'];
    }
}