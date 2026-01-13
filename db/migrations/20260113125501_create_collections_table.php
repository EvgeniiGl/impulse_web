<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateCollectionsTable extends AbstractMigration
{
    public function up(): void
    {
        $sql = "
            CREATE TABLE collections (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(100) NOT NULL,
                creator_id UUID NOT NULL,
                access_type access_type NOT NULL DEFAULT 'private',
                is_active BOOLEAN NOT NULL DEFAULT true,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                
                CONSTRAINT fk_collections_creator
                    FOREIGN KEY (creator_id)
                    REFERENCES users(id)
                    ON DELETE CASCADE
            );
            
            CREATE INDEX idx_collections_creator_id ON collections(creator_id);
            CREATE INDEX idx_collections_access_type ON collections(access_type);
            CREATE INDEX idx_collections_active ON collections(is_active) WHERE is_active = true;
        ";

        $this->execute($sql);
    }

    public function down(): void
    {
        $this->table('collections')->drop()->save();
    }
}