<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

/**
 * Миграция для создания таблицы жалоб на карточки
 */
final class CreateCardReportsTable extends AbstractMigration
{
    public function up(): void
    {
        $sql = /** @lang PostgreSQL */
            "
            CREATE TYPE report_reason AS ENUM (
                'sexual_content',
                'violent_content',
                'hateful_content',
                'harassment',
                'harmful_actions',
                'self_harm',
                'misinformation',
                'child_abuse',
                'terrorism',
                'spam'
            );

            CREATE TYPE report_status AS ENUM (
                'pending',
                'reviewed',
                'resolved',
                'dismissed'
            );

            CREATE TABLE card_reports
            (
                id                UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
                card_id           UUID                                   NOT NULL
                    CONSTRAINT fk_card_reports_card
                        REFERENCES cards (id)
                        ON DELETE CASCADE,
                user_id           UUID                                   NOT NULL
                    CONSTRAINT fk_card_reports_user
                        REFERENCES users (id)
                        ON DELETE CASCADE,
                reason            report_reason                          NOT NULL,
                status            report_status            DEFAULT 'pending' NOT NULL,
                telegram_sent     BOOLEAN                  DEFAULT false NOT NULL,
                telegram_sent_at  TIMESTAMP WITH TIME ZONE,
                reviewed_at       TIMESTAMP WITH TIME ZONE,
                created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
                updated_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
            );

            CREATE INDEX idx_card_reports_card_id ON card_reports (card_id);
            CREATE INDEX idx_card_reports_user_id ON card_reports (user_id);
            CREATE INDEX idx_card_reports_status ON card_reports (status);
            CREATE INDEX idx_card_reports_created_at ON card_reports (created_at);
            CREATE INDEX idx_card_reports_pending_telegram ON card_reports (telegram_sent) WHERE telegram_sent = false;
        ";

        $this->execute($sql);
    }

    public function down(): void
    {
        $this->execute('DROP TABLE IF EXISTS card_reports CASCADE');
        $this->execute('DROP TYPE IF EXISTS report_status');
        $this->execute('DROP TYPE IF EXISTS report_reason');
    }
}
