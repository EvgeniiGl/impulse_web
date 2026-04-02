<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

/**
 * Миграция для создания таблицы скрытых карточек
 */
final class CreateHiddenCardsTable extends AbstractMigration
{
    public function up(): void
    {
        $sql = /** @lang PostgreSQL */
            "
            CREATE TABLE hidden_cards
            (
                id         UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
                card_id    UUID                                   NOT NULL
                    CONSTRAINT fk_hidden_cards_card
                        REFERENCES cards (id)
                        ON DELETE CASCADE,
                user_id    UUID                                   NOT NULL
                    CONSTRAINT fk_hidden_cards_user
                        REFERENCES users (id)
                        ON DELETE CASCADE,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,

                CONSTRAINT unique_hidden_card_user
                    UNIQUE (card_id, user_id)
            );

            CREATE INDEX idx_hidden_cards_user_id ON hidden_cards (user_id);
            CREATE INDEX idx_hidden_cards_card_id ON hidden_cards (card_id);
        ";

        $this->execute($sql);
    }

    public function down(): void
    {
        $this->execute('DROP TABLE IF EXISTS hidden_cards CASCADE');
    }
}
