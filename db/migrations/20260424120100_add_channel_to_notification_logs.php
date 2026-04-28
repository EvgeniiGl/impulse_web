<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

/**
 * Добавляет канал уведомления в таблицу логов (web_push, fcm, apns)
 */
final class AddChannelToNotificationLogs extends AbstractMigration
{
    public function up(): void
    {
        $sql = /** @lang PostgreSQL */
            "
            CREATE TYPE notification_channel AS ENUM ('web_push', 'fcm', 'apns');

            ALTER TABLE notification_logs
                ADD COLUMN channel notification_channel DEFAULT 'web_push' NOT NULL,
                ADD COLUMN device_token_id UUID
                    CONSTRAINT fk_logs_device_token
                        REFERENCES mobile_device_tokens (id)
                        ON DELETE SET NULL;

            CREATE INDEX idx_logs_channel ON notification_logs (channel);
        ";

        $this->execute($sql);
    }

    public function down(): void
    {
        $sql = "
            ALTER TABLE notification_logs
                DROP COLUMN IF EXISTS channel,
                DROP COLUMN IF EXISTS device_token_id;

            DROP TYPE IF EXISTS notification_channel;
        ";

        $this->execute($sql);
    }
}
