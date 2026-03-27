<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

/**
 * Миграция для создания таблицы лайков коллекций
 */
final class CreateCollectionLikesTable extends AbstractMigration
{
    public function up(): void
    {
        $sql = /** @lang PostgreSQL */
            "
            CREATE TABLE collection_likes
            (
                id            UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
                collection_id UUID                                   NOT NULL
                    CONSTRAINT fk_collection_likes_collection
                        REFERENCES collections (id)
                        ON DELETE CASCADE,
                user_id       UUID                                   NOT NULL
                    CONSTRAINT fk_collection_likes_user
                        REFERENCES users (id)
                        ON DELETE CASCADE,
                created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
                
                CONSTRAINT unique_collection_user_like
                    UNIQUE (collection_id, user_id)
            );
            
            CREATE INDEX idx_collection_likes_collection_id ON collection_likes (collection_id);
            CREATE INDEX idx_collection_likes_user_id ON collection_likes (user_id);
            CREATE INDEX idx_collection_likes_created_at ON collection_likes (created_at);
        ";

        $this->execute($sql);
    }

    public function down(): void
    {
        $this->execute('DROP TABLE IF EXISTS collection_likes CASCADE');
    }
}
