<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

/**
 *
 *  Миграция для создания таблицы расписаний
 */
final class CreatePushSubscriptionsTable extends AbstractMigration
{
    public function up(): void
    {
        $sql = /** @lang PostgreSQL */
            "
            CREATE TABLE push_subscriptions
            (
                id         UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
                user_id    UUID                                   NOT NULL
                    CONSTRAINT fk_subscriptions_user
                        REFERENCES users (id)
                        ON DELETE CASCADE,
                endpoint   TEXT                                   NOT NULL,
                p256dh_key TEXT                                   NOT NULL, -- публичный ключ для шифрования
                auth_key   TEXT                                   NOT NULL, -- ключ аутентификации
                user_agent TEXT,
                is_active  BOOLEAN                  DEFAULT true  NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
            
                CONSTRAINT unique_user_endpoint UNIQUE (user_id, endpoint)
            );
            
            CREATE INDEX idx_subscriptions_user ON push_subscriptions (user_id) WHERE is_active = true;
        ";

        $this->execute($sql);
    }

    public function down(): void
    {
        $this->table('push_subscriptions')->drop()->save();
    }
}
