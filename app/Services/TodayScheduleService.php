<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Card;
use App\Models\CardNotificationSchedule;
use App\Repositories\NotificationScheduleRepository;
use App\Requests\Notification\GetTodaySchedulesRequest;

class TodayScheduleService
{
    private NotificationScheduleRepository $repository;

    public function __construct()
    {
        $this->repository = new NotificationScheduleRepository();
    }

    /**
     * Получение списка уведомлений на сегодня
     * Каждое уведомление — отдельная запись в результате (если у карточки
     * было несколько отправок за день, она будет в списке несколько раз)
     *
     * @param GetTodaySchedulesRequest $request
     * @return array
     */
    public function getTodayNotifications(GetTodaySchedulesRequest $request): array
    {
        $todayStart = $request->getTodayStartUtc();
        $todayEnd   = $request->getTodayEndUtc();

        $schedules = $this->repository->getTodaySchedules(
            $request->getUserId(),
            $todayStart,
            $todayEnd
        );

        $items = [];

        // Обрабатываем уже отправленные
        $sentSchedules = $schedules['sent'];
        $sentIds       = [];
        foreach ($sentSchedules as $schedule) {
            $sentIds[] = $schedule->id;
        }

        $sentLogs = $this->repository->getSentLogsToday($sentIds, $todayStart, $todayEnd);

        foreach ($sentSchedules as $schedule) {
            $card = $this->getCard($schedule->card_id);
            $logs = $sentLogs[$schedule->id] ?? [];

            foreach ($logs as $log) {
                $items[] = $this->formatItem($schedule, $card, true, $log->sent_at);
            }
        }

        // Обрабатываем ожидающие отправки
        $pendingSchedules = $schedules['pending'];
        foreach ($pendingSchedules as $schedule) {
            // Пропускаем если уже обработали как sent (и уведомление ещё числится в pending)
            $card    = $this->getCard($schedule->card_id);
            $items[] = $this->formatItem($schedule, $card, false, $schedule->next_send_at);
        }

        // Сортируем по времени
        usort($items, function ($a, $b) {
            return strtotime($a['notification_time']) <=> strtotime($b['notification_time']);
        });

        return $items;
    }

    /**
     * Получение статистики на сегодня
     *
     * @param GetTodaySchedulesRequest $request
     * @return array
     */
    public function getTodayStats(GetTodaySchedulesRequest $request): array
    {
        $todayStart = $request->getTodayStartUtc();
        $todayEnd   = $request->getTodayEndUtc();

        $schedules = $this->repository->getTodaySchedules(
            $request->getUserId(),
            $todayStart,
            $todayEnd
        );
        $sentCount = 0;
        $sentIds   = [];
        foreach ($schedules['sent'] as $schedule) {
            $sentIds[] = $schedule->id;
        }

        $sentLogs = $this->repository->getSentLogsToday($sentIds, $todayStart, $todayEnd);
        foreach ($sentLogs as $logs) {
            $sentCount += count($logs);
        }

        $pendingCount = count($schedules['pending']);

        return [
            'total'   => $sentCount + $pendingCount,
            'sent'    => $sentCount,
            'pending' => $pendingCount,
        ];
    }

    /**
     * Получение данных карточки
     */
    private function getCard(string $cardId): ?Card
    {
        return Card::findFirst([
            'conditions' => 'id = :id:',
            'bind'       => ['id' => $cardId],
        ]);
    }

    /**
     * Форматирование элемента для ответа
     */
    private function formatItem(
        CardNotificationSchedule $schedule,
        ?Card                    $card,
        bool                     $isSent,
        string                   $notificationTime
    ): array
    {
        return [
            'schedule_id'       => $schedule->id,
            'card_id'           => $schedule->card_id,
            'frequency'         => $schedule->frequency,
            'is_sent'           => $isSent,
            'notification_time' => $notificationTime,
            'is_active'         => (bool)$schedule->is_active,
            'sent_count'        => $schedule->sent_count,
            'repeat_count'      => $schedule->repeat_count,
            'end_date'          => $schedule->end_date,
            'card'              => $card ? [
                'id'          => $card->id,
                'title'       => $card->title,
                'description' => $card->description,
                'url'         => $card->url,
            ] : null,
        ];
    }
}
