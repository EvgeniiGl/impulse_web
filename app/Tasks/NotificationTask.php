<?php

declare(strict_types=1);

namespace App\Tasks;

use App\Models\CardNotificationSchedule;
use App\Services\WebPushService;
use App\Services\MobilePushService;
use Phalcon\Cli\Task;

class NotificationTask extends Task
{
    /**
     * Отправка запланированных уведомлений (Web Push + Mobile FCM/APNs)
     * php cli.php notification send
     */
    public function sendAction(): void
    {
        $webPushService    = new WebPushService();
        $mobilePushService = new MobilePushService();

        // Находим все активные расписания, которые нужно отправить
        $schedules = CardNotificationSchedule::find([
            'conditions' => 'is_active = true AND next_send_at <= :now:',
            'bind'       => ['now' => date('Y-m-d H:i:s')],
            'order'      => 'next_send_at ASC',
        ]);

        $sent       = 0;
        $failed     = 0;
        $webSent    = 0;
        $mobileSent = 0;

        foreach ($schedules as $schedule) {
            echo "Processing schedule {$schedule->id}...\n";

            $webSuccess    = false;
            $mobileSuccess = false;

            // 1. Отправка через Web Push
            try {
                $webSuccess = $webPushService->sendScheduledNotification($schedule);
                if ($webSuccess) {
                    $webSent++;
                    echo "  ✓ Web Push sent\n";
                } else {
                    echo "  ○ Web Push: no active subscriptions or failed\n";
                }
            } catch (\Exception $e) {
                echo "  ✗ Web Push error: {$e->getMessage()}\n";
            }

            // 2. Отправка через Mobile Push (FCM/APNs)
            try {
                $mobileSuccess = $mobilePushService->sendScheduledNotification($schedule);
                if ($mobileSuccess) {
                    $mobileSent++;
                    echo "  ✓ Mobile Push sent\n";
                } else {
                    echo "  ○ Mobile Push: no active devices or failed\n";
                }
            } catch (\Exception $e) {
                echo "  ✗ Mobile Push error: {$e->getMessage()}\n";
            }

            // Считаем общий результат
            if ($webSuccess || $mobileSuccess) {
                $sent++;
                echo "✓ Schedule completed\n";
            } else {
                $failed++;
                echo "✗ Schedule: no notifications delivered\n";
            }
        }

        echo "\n--- Summary ---\n";
        echo "Total schedules: {$schedules->count()}\n";
        echo "Successful: {$sent} (Web: {$webSent}, Mobile: {$mobileSent})\n";
        echo "Failed: {$failed}\n";
    }
}
