<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

/**
 *
 *  Миграция для создания таблицы расписаний
 */
final class CreateNotificationLogsTable extends AbstractMigration
{
    public function up(): void
    {
        $sql = /** @lang PostgreSQL */
            "
            CREATE TYPE notification_status AS ENUM ('sent', 'failed', 'clicked', 'dismissed');
            
            CREATE TABLE notification_logs
            (
                id            UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
                schedule_id   UUID                                   NOT NULL
                    CONSTRAINT fk_logs_schedule
                        REFERENCES card_notification_schedules (id)
                        ON DELETE CASCADE,
                user_id       UUID                                   NOT NULL
                    CONSTRAINT fk_logs_user
                        REFERENCES users (id)
                        ON DELETE CASCADE,
                card_id       UUID                                   NOT NULL
                    CONSTRAINT fk_logs_card
                        REFERENCES cards (id)
                        ON DELETE CASCADE,
                status        notification_status                    NOT NULL,
                error_message TEXT,
                sent_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
                clicked_at    TIMESTAMP WITH TIME ZONE,
            
                CONSTRAINT check_clicked_at CHECK (
                    (status = 'clicked' AND clicked_at IS NOT NULL) OR
                    (status != 'clicked' AND clicked_at IS NULL)
                    )
            );
            
            CREATE INDEX idx_logs_schedule ON notification_logs (schedule_id);
            CREATE INDEX idx_logs_user ON notification_logs (user_id);
            CREATE INDEX idx_logs_sent_at ON notification_logs (sent_at);
        ";

        $this->execute($sql);
    }

    public function down(): void
    {
        $this->execute('DROP TABLE IF EXISTS notification_logs CASCADE');
        $this->execute('DROP TYPE IF EXISTS notification_status');
    }
}
