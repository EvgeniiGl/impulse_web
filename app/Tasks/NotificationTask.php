<?php

declare(strict_types=1);

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
            'bind'       => ['now' => date('Y-m-d H:i:s')],
            'order'      => 'next_send_at ASC'
        ]);

        $sent   = 0;
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