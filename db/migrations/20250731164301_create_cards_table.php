<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateCardsTable extends AbstractMigration
{
    public function up(): void
    {
        $sql = /** @lang PostgreSQL */
            "
            CREATE TYPE access_type AS ENUM ('private', 'shared', 'public');
            
            CREATE TABLE cards (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                title VARCHAR(100) NOT NULL,
                description TEXT,
                url TEXT NOT NULL,
                creator_id UUID NOT NULL,
                access_type access_type NOT NULL DEFAULT 'private',
                is_active BOOLEAN NOT NULL DEFAULT true,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                
                CONSTRAINT fk_cards_creator
                    FOREIGN KEY (creator_id)
                    REFERENCES users(id)
                    ON DELETE CASCADE
            );
            
            COMMENT ON COLUMN cards.url IS 'URL объекта в MinIO хранилище';
            
            CREATE INDEX idx_cards_creator_id ON cards(creator_id);
            CREATE INDEX idx_cards_access_type ON cards(access_type);
            CREATE INDEX idx_cards_active ON cards(is_active) WHERE is_active = true;
        ";

        $this->execute($sql);
    }

    public function down(): void
    {
        $this->execute('DROP TABLE IF EXISTS cards CASCADE');
        $this->execute('DROP TYPE IF EXISTS access_type');
    }
}