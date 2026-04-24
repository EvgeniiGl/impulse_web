<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\CardNotificationSchedule;
use App\Models\NotificationLog;

class NotificationScheduleRepository
{
    /**
     * Получение расписаний на сегодня для пользователя
     * Включает расписания, которые должны быть отправлены сегодня
     *
     * @param string $userId
     * @param string $todayStart - начало дня в UTC
     * @param string $todayEnd - конец дня в UTC
     * @return array
     */
    public function getTodaySchedules(string $userId, string $todayStart, string $todayEnd): array
    {
        // 1. Получаем расписания с next_send_at на сегодня (ещё не отправлены)
        $pendingSchedules = CardNotificationSchedule::find([
            'conditions' => 'user_id = :user_id: AND is_active = true AND next_send_at >= :today_start: AND next_send_at <= :today_end:',
            'bind'       => [
                'user_id'     => $userId,
                'today_start' => $todayStart,
                'today_end'   => $todayEnd,
            ],
            'order'      => 'next_send_at ASC',
        ]);
        // 2. Получаем расписания, уведомления по которым уже отправлены сегодня
        $sentScheduleIds = $this->getSentScheduleIdsToday($userId, $todayStart, $todayEnd);
        // 3. Если есть отправленные, загружаем их расписания тоже
        $sentSchedules = [];
        if (!empty($sentScheduleIds)) {
            $sentSchedules = CardNotificationSchedule::find([
                'conditions' => 'user_id = :user_id: AND id IN ({ids:array})',
                'bind'       => [
                    'user_id' => $userId,
                    'ids'     => $sentScheduleIds,
                ],
            ]);
        }

        return [
            'pending' => $pendingSchedules,
            'sent'    => $sentSchedules,
        ];
    }

    /**
     * Получение ID расписаний, по которым сегодня уже были отправлены уведомления
     *
     * @param string $userId
     * @param string $todayStart
     * @param string $todayEnd
     * @return array
     */
    public function getSentScheduleIdsToday(string $userId, string $todayStart, string $todayEnd): array
    {
        $logs = NotificationLog::find([
            'conditions' => 'user_id = :user_id: AND status = :status: AND sent_at >= :today_start: AND sent_at <= :today_end:',
            'bind'       => [
                'user_id'     => $userId,
                'status'      => 'sent',
                'today_start' => $todayStart,
                'today_end'   => $todayEnd,
            ],
            'columns'    => 'DISTINCT schedule_id',
        ]);

        $ids = [];
        foreach ($logs as $log) {
            $ids[] = $log->schedule_id;
        }

        return $ids;
    }

    /**
     * Получение логов отправки за сегодня для конкретных расписаний
     *
     * @param array $scheduleIds
     * @param string $todayStart
     * @param string $todayEnd
     * @return array - [schedule_id => [log1, log2, ...]]
     */
    public function getSentLogsToday(array $scheduleIds, string $todayStart, string $todayEnd): array
    {
        if (empty($scheduleIds)) {
            return [];
        }

        $logs = NotificationLog::find([
            'conditions' => "status = 'sent' AND sent_at >= :today_start: AND sent_at <= :today_end: AND schedule_id IN ({schedule_ids:array})",
            'bind'       => [
                'today_start'  => $todayStart,
                'today_end'    => $todayEnd,
                'schedule_ids' => $scheduleIds,
            ],
            'order'      => 'sent_at ASC',
        ]);

        $grouped = [];
        foreach ($logs as $log) {
            $grouped[$log->schedule_id][] = $log;
        }

        return $grouped;
    }
}
