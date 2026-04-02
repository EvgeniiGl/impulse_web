<?php

declare(strict_types=1);

namespace App\Tasks;

use App\Services\ReportService;
use App\Services\TelegramService;
use Phalcon\Cli\Task;

class ReportTelegramTask extends Task
{
    /**
     * Отправка неотправленных жалоб в Telegram
     * php cli/cli.php reportTelegram send
     */
    public function sendAction(): void
    {
        echo "[" . date('Y-m-d H:i:s') . "] Starting report Telegram sender...\n";

        try {
            $reportService   = new ReportService();
            $telegramService = new TelegramService();
        } catch (\Exception $e) {
            echo "ERROR: Failed to initialize services: " . $e->getMessage() . "\n";
            return;
        }

        $pendingReports = $reportService->getPendingTelegramReports();

        $total  = count($pendingReports);
        $sent   = 0;
        $failed = 0;

        if ($total === 0) {
            echo "No pending reports to send.\n";
            return;
        }

        echo "Found {$total} pending report(s).\n";

        foreach ($pendingReports as $report) {
            echo "Processing report {$report->id} (card: {$report->card_id}, reason: {$report->reason})...\n";

            try {
                $success = $telegramService->sendReportNotification($report);

                if ($success) {
                    $reportService->markAsTelegramSent($report);
                    $sent++;
                    echo "  ✓ Sent to Telegram\n";
                } else {
                    $failed++;
                    echo "  ✗ Telegram API returned error\n";
                }
            } catch (\Exception $e) {
                $failed++;
                echo "  ✗ Error: " . $e->getMessage() . "\n";
            }

            // Пауза между отправками, чтобы не получить rate limit от Telegram
            usleep(100000); // 100ms
        }

        echo "\nResults: Total={$total}, Sent={$sent}, Failed={$failed}\n";
    }
}
