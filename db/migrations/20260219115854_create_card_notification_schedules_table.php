<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

/**
 *
 *  Миграция для создания таблицы расписаний
 */
final class CreateCardNotificationSchedulesTable extends AbstractMigration
{
    public function up(): void
    {
        $sql = /** @lang PostgreSQL */
            "
            CREATE TYPE notification_frequency AS ENUM (
                'once', -- однократное
                'minutely', -- каждую минуту
                'hourly', -- каждый час
                'daily', -- каждый день
                'weekly', -- каждую неделю
                'monthly', -- каждый месяц
                'yearly' -- каждый год
                );
            
            CREATE TABLE card_notification_schedules
            (
                id           UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
                card_id      UUID                                   NOT NULL
                    CONSTRAINT fk_schedules_card
                        REFERENCES cards (id)
                        ON DELETE CASCADE,
                user_id      UUID                                   NOT NULL
                    CONSTRAINT fk_schedules_user
                        REFERENCES users (id)
                        ON DELETE CASCADE,
                frequency    notification_frequency                 NOT NULL,
                scheduled_at TIMESTAMP WITH TIME ZONE               NOT NULL, -- дата/время первого показа
                last_sent_at TIMESTAMP WITH TIME ZONE,                        -- когда последний раз отправлено
                next_send_at TIMESTAMP WITH TIME ZONE               NOT NULL, -- следующая отправка
                is_active    BOOLEAN                  DEFAULT true  NOT NULL,
                created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
                updated_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
            
                -- Дополнительные параметры для повторяющихся уведомлений
                repeat_count INTEGER,                                         -- сколько раз повторить (NULL = бесконечно)
                sent_count   INTEGER                  DEFAULT 0     NOT NULL, -- сколько раз уже отправлено
                end_date     TIMESTAMP WITH TIME ZONE,                        -- дата окончания повторений
            
                CONSTRAINT unique_user_card_schedule UNIQUE (user_id, card_id, scheduled_at)
            );
            
            CREATE INDEX idx_schedules_next_send ON card_notification_schedules (next_send_at) WHERE is_active = true;
            CREATE INDEX idx_schedules_user ON card_notification_schedules (user_id);
            CREATE INDEX idx_schedules_card ON card_notification_schedules (card_id);
        ";

        $this->execute($sql);
    }

    public function down(): void
    {
        $this->table('card_notification_schedules')->drop()->save();
        $this->execute('DROP TYPE IF EXISTS notification_frequency');
    }
}
