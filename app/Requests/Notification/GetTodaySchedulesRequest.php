<?php

declare(strict_types=1);

namespace App\Requests\Notification;

class GetTodaySchedulesRequest
{
    private string $userId;
    private string $timezone;

    public function __construct(string $userId, ?string $timezone = null)
    {
        $this->userId   = $userId;
        $this->timezone = $this->validateTimezone($timezone);
    }

    public function getUserId(): string
    {
        return $this->userId;
    }

    public function getTimezone(): string
    {
        return $this->timezone;
    }

    /**
     * Получение начала дня в UTC для указанной таймзоны
     */
    public function getTodayStartUtc(): string
    {
        $tz    = new \DateTimeZone($this->timezone);
        $today = new \DateTime('now', $tz);
        $today->setTime(0, 0, 0);
        $today->setTimezone(new \DateTimeZone('UTC'));

        return $today->format('Y-m-d H:i:s');
    }

    /**
     * Получение конца дня в UTC для указанной таймзоны
     */
    public function getTodayEndUtc(): string
    {
        $tz    = new \DateTimeZone($this->timezone);
        $today = new \DateTime('now', $tz);
        $today->setTime(23, 59, 59);
        $today->setTimezone(new \DateTimeZone('UTC'));

        return $today->format('Y-m-d H:i:s');
    }

    private function validateTimezone(?string $timezone): string
    {
        if ($timezone === null || $timezone === '') {
            return 'UTC';
        }

        try {
            new \DateTimeZone($timezone);
            return $timezone;
        } catch (\Exception $e) {
            return 'UTC';
        }
    }
}
