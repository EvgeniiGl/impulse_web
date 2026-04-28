<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

/**
 * Миграция для таблицы токенов мобильных устройств (FCM / APNs)
 */
final class CreateMobileDeviceTokensTable extends AbstractMigration
{
    public function up(): void
    {
        $sql = /** @lang PostgreSQL */
            "
            CREATE TYPE device_platform AS ENUM ('ios', 'android');

            CREATE TABLE mobile_device_tokens
            (
                id            UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
                user_id       UUID                                   NOT NULL
                    CONSTRAINT fk_device_tokens_user
                        REFERENCES users (id)
                        ON DELETE CASCADE,
                device_token  TEXT                                   NOT NULL,
                platform      device_platform                        NOT NULL,
                device_name   VARCHAR(255),
                app_version   VARCHAR(50),
                os_version    VARCHAR(50),
                is_active     BOOLEAN                  DEFAULT true  NOT NULL,
                last_used_at  TIMESTAMP WITH TIME ZONE,
                created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
                updated_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,

                CONSTRAINT unique_user_device_token UNIQUE (user_id, device_token)
            );

            CREATE INDEX idx_device_tokens_user ON mobile_device_tokens (user_id) WHERE is_active = true;
            CREATE INDEX idx_device_tokens_platform ON mobile_device_tokens (platform);
            CREATE INDEX idx_device_tokens_last_used ON mobile_device_tokens (last_used_at);
        ";

        $this->execute($sql);
    }

    public function down(): void
    {
        $this->execute('DROP TABLE IF EXISTS mobile_device_tokens CASCADE');
        $this->execute('DROP TYPE IF EXISTS device_platform');
    }
}
