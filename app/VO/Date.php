<?php

declare(strict_types=1);

namespace App\VO;

use App\Helpers\TranslationHelper;
use DateTimeImmutable;
use DateTimeZone;
use InvalidArgumentException;
use JsonSerializable;
use Stringable;

/**
 * Value Object для работы с датой и временем.
 *
 * Иммутабельный — все методы модификации возвращают новый экземпляр.
 * Поддерживает локализованный вывод через встроенные словари (en/ru/de)
 * и через TranslationHelper (Phalcon DI).
 *
 * Implements:
 *   - Stringable       → (string) $date возвращает формат БД
 *   - JsonSerializable → json_encode(['date' => $date]) отдаёт ISO 8601
 */
final class Date implements JsonSerializable, Stringable
{
    private DateTimeImmutable $dt;

    private function __construct(DateTimeImmutable $dt)
    {
        $this->dt = $dt;
    }

    // =========================================================================
    // Фабричные методы
    // =========================================================================

    /**
     * Текущий момент.
     *
     * @param string $timezone PHP-таймзона, например 'Europe/Moscow'
     */
    public static function now(string $timezone = 'UTC'): self
    {
        return new self(new DateTimeImmutable('now', new DateTimeZone($timezone)));
    }

    /**
     * Из строки — понимает любой формат, который принимает DateTimeImmutable,
     * а также стандартный формат БД "Y-m-d H:i:s".
     *
     * @throws InvalidArgumentException
     */
    public static function fromString(string $value, string $timezone = 'UTC'): self
    {
        // Сначала пробуем точный формат БД
        $dt = DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $value, new DateTimeZone($timezone));

        if ($dt === false) {
            try {
                $dt = new DateTimeImmutable($value, new DateTimeZone($timezone));
            } catch (\Exception) {
                throw new InvalidArgumentException("Cannot parse date string: \"{$value}\"");
            }
        }

        return new self($dt);
    }

    /**
     * Из Unix-timestamp.
     */
    public static function fromTimestamp(int $timestamp, string $timezone = 'UTC'): self
    {
        $dt = (new DateTimeImmutable('@' . $timestamp))->setTimezone(new DateTimeZone($timezone));
        return new self($dt);
    }

    /**
     * Из произвольного формата (strptime-стиль PHP).
     *
     * @throws InvalidArgumentException
     * @example Date::fromFormat('d.m.Y', '15.03.2024')
     */
    public static function fromFormat(string $format, string $value, string $timezone = 'UTC'): self
    {
        $dt = DateTimeImmutable::createFromFormat($format, $value, new DateTimeZone($timezone));

        if ($dt === false) {
            throw new InvalidArgumentException(
                "Cannot parse \"{$value}\" with format \"{$format}\""
            );
        }

        return new self($dt);
    }

    /**
     * Из нативного DateTimeImmutable (для совместимости с легаси-кодом).
     */
    public static function fromDateTime(DateTimeImmutable $dt): self
    {
        return new self($dt);
    }

    // =========================================================================
    // Форматирование
    // =========================================================================

    /**
     * Формат БД: "2024-03-15 10:30:00"
     */
    public function toDb(): string
    {
        return $this->dt->format('Y-m-d H:i:s');
    }

    /**
     * ISO 8601: "2024-03-15T10:30:00+00:00"
     */
    public function toIso(): string
    {
        return $this->dt->format(\DateTimeInterface::ATOM);
    }

    /**
     * Только дата: "2024-03-15"
     */
    public function toDateString(): string
    {
        return $this->dt->format('Y-m-d');
    }

    /**
     * Только время: "10:30:00"
     */
    public function toTimeString(): string
    {
        return $this->dt->format('H:i:s');
    }

    /**
     * Unix-timestamp.
     */
    public function toTimestamp(): int
    {
        return $this->dt->getTimestamp();
    }

    /**
     * Произвольный PHP-формат.
     *
     * @example $date->format('d/m/Y H:i')
     */
    public function format(string $format): string
    {
        return $this->dt->format($format);
    }

    /**
     * Локализованное представление с произвольным шаблоном.
     *
     * Доступные токены:
     *   %day%     — день без ведущего нуля          (5)
     *   %Day%     — день с ведущим нулём             (05)
     *   %month%   — полное название месяца           (March / марта / März)
     *   %mon%     — сокращённое название месяца      (Mar / мар / Mär)
     *   %mnum%    — номер месяца без нуля            (3)
     *   %Mnum%    — номер месяца с нулём             (03)
     *   %year%    — 4-значный год                    (2024)
     *   %yr%      — 2-значный год                    (24)
     *   %hour%    — часы 24h                         (10)
     *   %min%     — минуты                           (30)
     *   %sec%     — секунды                          (00)
     *   %weekday% — полное название дня недели       (Friday / пятница / Freitag)
     *   %wd%      — короткое название дня недели     (Fri / пт / Fr)
     *
     * @param string $template Шаблон, например '%day% %month% %year%'
     * @param string|null $locale 'en'|'ru'|'de' или null → берётся из TranslationHelper
     */
    public function toLocale(string $template = '%day% %month% %year%', ?string $locale = null): string
    {
        $month   = (int)$this->dt->format('n');
        $weekday = (int)$this->dt->format('w'); // 0 = воскресенье

        $tokens = [
            '%day%'     => $this->dt->format('j'),
            '%Day%'     => $this->dt->format('d'),
            '%month%'   => $this->localMonth($month, false, $locale),
            '%mon%'     => $this->localMonth($month, true, $locale),
            '%mnum%'    => $this->dt->format('n'),
            '%Mnum%'    => $this->dt->format('m'),
            '%year%'    => $this->dt->format('Y'),
            '%yr%'      => $this->dt->format('y'),
            '%hour%'    => $this->dt->format('H'),
            '%min%'     => $this->dt->format('i'),
            '%sec%'     => $this->dt->format('s'),
            '%weekday%' => $this->localWeekday($weekday, false, $locale),
            '%wd%'      => $this->localWeekday($weekday, true, $locale),
        ];

        return str_replace(array_keys($tokens), array_values($tokens), $template);
    }

    /**
     * Относительная дата: "сегодня", "вчера", "3 дня назад" и т.д.
     *
     * Если TranslationHelper настроен и содержит ключи вида date.relative.*,
     * они будут использованы. Иначе — встроенный словарь.
     *
     * @param string|null $locale 'en'|'ru'|'de' или null → из TranslationHelper
     */
    public function toRelative(?string $locale = null): string
    {
        $nowTs    = (new DateTimeImmutable('now', $this->dt->getTimezone()))->getTimestamp();
        $diffSecs = $nowTs - $this->dt->getTimestamp();
        $diffDays = (int)round($diffSecs / 86400);

        return match (true) {
            $diffDays === 0 => $this->t('date.relative.today', [], $locale),
            $diffDays === 1 => $this->t('date.relative.yesterday', [], $locale),
            $diffDays === -1 => $this->t('date.relative.tomorrow', [], $locale),
            $diffDays > 1 && $diffDays < 7
            => $this->t('date.relative.days_ago', [':count' => $diffDays], $locale),
            $diffDays < -1 && $diffDays > -7
            => $this->t('date.relative.in_days', [':count' => abs($diffDays)], $locale),
            abs($diffDays) < 30 => $this->t(
                $diffDays > 0 ? 'date.relative.weeks_ago' : 'date.relative.in_weeks',
                [':count' => (int)round(abs($diffDays) / 7)],
                $locale
            ),
            abs($diffDays) < 365 => $this->t(
                $diffDays > 0 ? 'date.relative.months_ago' : 'date.relative.in_months',
                [':count' => (int)round(abs($diffDays) / 30)],
                $locale
            ),
            default => $this->t(
                $diffDays > 0 ? 'date.relative.years_ago' : 'date.relative.in_years',
                [':count' => (int)round(abs($diffDays) / 365)],
                $locale
            ),
        };
    }

    // =========================================================================
    // Арифметика (всё иммутабельно)
    // =========================================================================

    public function addDays(int $n): self
    {
        return new self($this->dt->modify("+{$n} days"));
    }

    public function subDays(int $n): self
    {
        return new self($this->dt->modify("-{$n} days"));
    }

    public function addMonths(int $n): self
    {
        return new self($this->dt->modify("+{$n} months"));
    }

    public function subMonths(int $n): self
    {
        return new self($this->dt->modify("-{$n} months"));
    }

    public function addYears(int $n): self
    {
        return new self($this->dt->modify("+{$n} years"));
    }

    public function subYears(int $n): self
    {
        return new self($this->dt->modify("-{$n} years"));
    }

    public function addHours(int $n): self
    {
        return new self($this->dt->modify("+{$n} hours"));
    }

    public function addMinutes(int $n): self
    {
        return new self($this->dt->modify("+{$n} minutes"));
    }

    /**
     * Установить конкретное время на той же дате.
     */
    public function withTime(int $hour, int $minute = 0, int $second = 0): self
    {
        return new self($this->dt->setTime($hour, $minute, $second));
    }

    public function startOfDay(): self
    {
        return new self($this->dt->setTime(0, 0, 0));
    }

    public function endOfDay(): self
    {
        return new self($this->dt->setTime(23, 59, 59));
    }

    public function startOfMonth(): self
    {
        return new self($this->dt->modify('first day of this month')->setTime(0, 0, 0));
    }

    public function endOfMonth(): self
    {
        return new self($this->dt->modify('last day of this month')->setTime(23, 59, 59));
    }

    /**
     * Сменить таймзону (время пересчитывается).
     */
    public function withTimezone(string $timezone): self
    {
        return new self($this->dt->setTimezone(new DateTimeZone($timezone)));
    }

    // =========================================================================
    // Сравнение
    // =========================================================================

    public function isBefore(self $other): bool
    {
        return $this->dt < $other->dt;
    }

    public function isAfter(self $other): bool
    {
        return $this->dt > $other->dt;
    }

    public function isEqual(self $other): bool
    {
        return $this->dt->getTimestamp() === $other->dt->getTimestamp();
    }

    public function isSameDay(self $other): bool
    {
        return $this->toDateString() === $other->toDateString();
    }

    public function isPast(): bool
    {
        return $this->dt < new DateTimeImmutable('now', $this->dt->getTimezone());
    }

    public function isFuture(): bool
    {
        return $this->dt > new DateTimeImmutable('now', $this->dt->getTimezone());
    }

    public function isToday(): bool
    {
        return $this->isSameDay(self::now($this->dt->getTimezone()->getName()));
    }

    public function isBetween(self $from, self $to): bool
    {
        return $this->dt >= $from->dt && $this->dt <= $to->dt;
    }

    /**
     * Разница в полных днях (абсолютное значение).
     */
    public function diffInDays(self $other): int
    {
        return (int)$this->dt->diff($other->dt)->format('%a');
    }

    /**
     * Разница в месяцах.
     */
    public function diffInMonths(self $other): int
    {
        $i = $this->dt->diff($other->dt);
        return $i->y * 12 + $i->m;
    }

    /**
     * Разница в секундах ($other − $this).
     */
    public function diffInSeconds(self $other): int
    {
        return $other->dt->getTimestamp() - $this->dt->getTimestamp();
    }

    // =========================================================================
    // Геттеры
    // =========================================================================

    public function year(): int
    {
        return (int)$this->dt->format('Y');
    }

    public function month(): int
    {
        return (int)$this->dt->format('n');
    }

    public function day(): int
    {
        return (int)$this->dt->format('j');
    }

    public function hour(): int
    {
        return (int)$this->dt->format('G');
    }

    public function minute(): int
    {
        return (int)$this->dt->format('i');
    }

    public function second(): int
    {
        return (int)$this->dt->format('s');
    }

    /** 0 = воскресенье, 6 = суббота */
    public function weekday(): int
    {
        return (int)$this->dt->format('w');
    }

    /** День года, 1–366 */
    public function dayOfYear(): int
    {
        return (int)$this->dt->format('z') + 1;
    }

    /** Номер недели по ISO */
    public function weekOfYear(): int
    {
        return (int)$this->dt->format('W');
    }

    /** Количество дней в месяце */
    public function daysInMonth(): int
    {
        return (int)$this->dt->format('t');
    }

    public function isWeekend(): bool
    {
        return in_array($this->weekday(), [0, 6], true);
    }

    public function isWeekday(): bool
    {
        return !$this->isWeekend();
    }

    public function isLeapYear(): bool
    {
        return (bool)$this->dt->format('L');
    }

    public function getTimezone(): string
    {
        return $this->dt->getTimezone()->getName();
    }

    /**
     * Вернуть нативный DateTimeImmutable для совместимости.
     */
    public function toDateTime(): DateTimeImmutable
    {
        return $this->dt;
    }

    // =========================================================================
    // Магические методы
    // =========================================================================

    /** (string) $date → формат БД */
    public function __toString(): string
    {
        return $this->toDb();
    }

    /** json_encode(['date' => $date]) → ISO 8601 */
    public function jsonSerialize(): string
    {
        return $this->toIso();
    }

    // =========================================================================
    // Приватные вспомогательные методы
    // =========================================================================

    private function localMonth(int $month, bool $short, ?string $locale): string
    {
        $key = $short ? "date.months_short.{$month}" : "date.months.{$month}";
        return $this->t($key, [], $locale) ?: $this->dt->format($short ? 'M' : 'F');
    }

    private function localWeekday(int $weekday, bool $short, ?string $locale): string
    {
        $key = $short ? "date.weekdays_short.{$weekday}" : "date.weekdays.{$weekday}";
        return $this->t($key, [], $locale) ?: $this->dt->format($short ? 'D' : 'l');
    }

    /**
     * Перевод: сначала пробуем встроенный словарь по locale,
     * затем TranslationHelper (Phalcon DI), иначе возвращаем ключ.
     */
    private function t(string $key, array $placeholders = [], ?string $locale = null): string
    {
        // 1. Явный locale → встроенный словарь
        if ($locale !== null) {
            $dict  = self::builtinTranslations();
            $value = $dict[$locale][$key] ?? $dict['en'][$key] ?? null;

            if ($value !== null) {
                foreach ($placeholders as $ph => $val) {
                    $value = str_replace($ph, (string)$val, $value);
                }
                return $value;
            }
        }

        // 2. TranslationHelper (текущий язык из Phalcon DI)
        try {
            if (TranslationHelper::has($key)) {
                return TranslationHelper::t($key, $placeholders);
            }
        } catch (\Throwable) {
            // DI не инициализирован — падаем на встроенный словарь
        }

        // 3. Fallback: встроенный 'en'
        $dict  = self::builtinTranslations();
        $value = $dict['en'][$key] ?? $key;
        foreach ($placeholders as $ph => $val) {
            $value = str_replace($ph, (string)$val, $value);
        }
        return $value;
    }

    /**
     * Встроенные переводы для en / ru / de.
     * Добавляйте новые локали по аналогии.
     */
    private static function builtinTranslations(): array
    {
        return [
            // -----------------------------------------------------------------
            'en' => [
                'date.months.1'  => 'January', 'date.months.2' => 'February',
                'date.months.3'  => 'March', 'date.months.4' => 'April',
                'date.months.5'  => 'May', 'date.months.6' => 'June',
                'date.months.7'  => 'July', 'date.months.8' => 'August',
                'date.months.9'  => 'September', 'date.months.10' => 'October',
                'date.months.11' => 'November', 'date.months.12' => 'December',

                'date.months_short.1'  => 'Jan', 'date.months_short.2' => 'Feb',
                'date.months_short.3'  => 'Mar', 'date.months_short.4' => 'Apr',
                'date.months_short.5'  => 'May', 'date.months_short.6' => 'Jun',
                'date.months_short.7'  => 'Jul', 'date.months_short.8' => 'Aug',
                'date.months_short.9'  => 'Sep', 'date.months_short.10' => 'Oct',
                'date.months_short.11' => 'Nov', 'date.months_short.12' => 'Dec',

                'date.weekdays.0' => 'Sunday', 'date.weekdays.1' => 'Monday',
                'date.weekdays.2' => 'Tuesday', 'date.weekdays.3' => 'Wednesday',
                'date.weekdays.4' => 'Thursday', 'date.weekdays.5' => 'Friday',
                'date.weekdays.6' => 'Saturday',

                'date.weekdays_short.0' => 'Sun', 'date.weekdays_short.1' => 'Mon',
                'date.weekdays_short.2' => 'Tue', 'date.weekdays_short.3' => 'Wed',
                'date.weekdays_short.4' => 'Thu', 'date.weekdays_short.5' => 'Fri',
                'date.weekdays_short.6' => 'Sat',

                'date.relative.today'      => 'today',
                'date.relative.yesterday'  => 'yesterday',
                'date.relative.tomorrow'   => 'tomorrow',
                'date.relative.days_ago'   => ':count days ago',
                'date.relative.in_days'    => 'in :count days',
                'date.relative.weeks_ago'  => ':count weeks ago',
                'date.relative.in_weeks'   => 'in :count weeks',
                'date.relative.months_ago' => ':count months ago',
                'date.relative.in_months'  => 'in :count months',
                'date.relative.years_ago'  => ':count years ago',
                'date.relative.in_years'   => 'in :count years',
            ],
            // -----------------------------------------------------------------
            'ru' => [
                'date.months.1'  => 'января', 'date.months.2' => 'февраля',
                'date.months.3'  => 'марта', 'date.months.4' => 'апреля',
                'date.months.5'  => 'мая', 'date.months.6' => 'июня',
                'date.months.7'  => 'июля', 'date.months.8' => 'августа',
                'date.months.9'  => 'сентября', 'date.months.10' => 'октября',
                'date.months.11' => 'ноября', 'date.months.12' => 'декабря',

                'date.months_short.1'  => 'янв', 'date.months_short.2' => 'фев',
                'date.months_short.3'  => 'мар', 'date.months_short.4' => 'апр',
                'date.months_short.5'  => 'май', 'date.months_short.6' => 'июн',
                'date.months_short.7'  => 'июл', 'date.months_short.8' => 'авг',
                'date.months_short.9'  => 'сен', 'date.months_short.10' => 'окт',
                'date.months_short.11' => 'ноя', 'date.months_short.12' => 'дек',

                'date.weekdays.0' => 'воскресенье', 'date.weekdays.1' => 'понедельник',
                'date.weekdays.2' => 'вторник', 'date.weekdays.3' => 'среда',
                'date.weekdays.4' => 'четверг', 'date.weekdays.5' => 'пятница',
                'date.weekdays.6' => 'суббота',

                'date.weekdays_short.0' => 'вс', 'date.weekdays_short.1' => 'пн',
                'date.weekdays_short.2' => 'вт', 'date.weekdays_short.3' => 'ср',
                'date.weekdays_short.4' => 'чт', 'date.weekdays_short.5' => 'пт',
                'date.weekdays_short.6' => 'сб',

                'date.relative.today'      => 'сегодня',
                'date.relative.yesterday'  => 'вчера',
                'date.relative.tomorrow'   => 'завтра',
                'date.relative.days_ago'   => ':count дн. назад',
                'date.relative.in_days'    => 'через :count дн.',
                'date.relative.weeks_ago'  => ':count нед. назад',
                'date.relative.in_weeks'   => 'через :count нед.',
                'date.relative.months_ago' => ':count мес. назад',
                'date.relative.in_months'  => 'через :count мес.',
                'date.relative.years_ago'  => ':count г. назад',
                'date.relative.in_years'   => 'через :count г.',
            ],
            // -----------------------------------------------------------------
            'de' => [
                'date.months.1'  => 'Januar', 'date.months.2' => 'Februar',
                'date.months.3'  => 'März', 'date.months.4' => 'April',
                'date.months.5'  => 'Mai', 'date.months.6' => 'Juni',
                'date.months.7'  => 'Juli', 'date.months.8' => 'August',
                'date.months.9'  => 'September', 'date.months.10' => 'Oktober',
                'date.months.11' => 'November', 'date.months.12' => 'Dezember',

                'date.months_short.1'  => 'Jan', 'date.months_short.2' => 'Feb',
                'date.months_short.3'  => 'Mär', 'date.months_short.4' => 'Apr',
                'date.months_short.5'  => 'Mai', 'date.months_short.6' => 'Jun',
                'date.months_short.7'  => 'Jul', 'date.months_short.8' => 'Aug',
                'date.months_short.9'  => 'Sep', 'date.months_short.10' => 'Okt',
                'date.months_short.11' => 'Nov', 'date.months_short.12' => 'Dez',

                'date.weekdays.0' => 'Sonntag', 'date.weekdays.1' => 'Montag',
                'date.weekdays.2' => 'Dienstag', 'date.weekdays.3' => 'Mittwoch',
                'date.weekdays.4' => 'Donnerstag', 'date.weekdays.5' => 'Freitag',
                'date.weekdays.6' => 'Samstag',

                'date.weekdays_short.0' => 'So', 'date.weekdays_short.1' => 'Mo',
                'date.weekdays_short.2' => 'Di', 'date.weekdays_short.3' => 'Mi',
                'date.weekdays_short.4' => 'Do', 'date.weekdays_short.5' => 'Fr',
                'date.weekdays_short.6' => 'Sa',

                'date.relative.today'      => 'heute',
                'date.relative.yesterday'  => 'gestern',
                'date.relative.tomorrow'   => 'morgen',
                'date.relative.days_ago'   => 'vor :count Tagen',
                'date.relative.in_days'    => 'in :count Tagen',
                'date.relative.weeks_ago'  => 'vor :count Wochen',
                'date.relative.in_weeks'   => 'in :count Wochen',
                'date.relative.months_ago' => 'vor :count Monaten',
                'date.relative.in_months'  => 'in :count Monaten',
                'date.relative.years_ago'  => 'vor :count Jahren',
                'date.relative.in_years'   => 'in :count Jahren',
            ],
        ];
    }
}