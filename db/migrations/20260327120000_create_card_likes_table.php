<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

/**
 * Миграция для создания таблицы лайков карточек
 */
final class CreateCardLikesTable extends AbstractMigration
{
    public function up(): void
    {
        $sql = /** @lang PostgreSQL */
            "
            CREATE TABLE card_likes
            (
                id         UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
                card_id    UUID                                   NOT NULL
                    CONSTRAINT fk_card_likes_card
                        REFERENCES cards (id)
                        ON DELETE CASCADE,
                user_id    UUID                                   NOT NULL
                    CONSTRAINT fk_card_likes_user
                        REFERENCES users (id)
                        ON DELETE CASCADE,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
                
                CONSTRAINT unique_card_user_like
                    UNIQUE (card_id, user_id)
            );
            
            CREATE INDEX idx_card_likes_card_id ON card_likes (card_id);
            CREATE INDEX idx_card_likes_user_id ON card_likes (user_id);
            CREATE INDEX idx_card_likes_created_at ON card_likes (created_at);
        ";

        $this->execute($sql);
    }

    public function down(): void
    {
        $this->execute('DROP TABLE IF EXISTS card_likes CASCADE');
    }
}
