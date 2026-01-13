<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateCollectionCardTable extends AbstractMigration
{
    public function up(): void
    {
        $sql = "
            CREATE TABLE collection_card (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                card_id UUID NOT NULL,
                collection_id UUID NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                
                CONSTRAINT fk_collection_user
                    FOREIGN KEY (card_id)
                    REFERENCES cards(id)
                    ON DELETE CASCADE
            );
        ";

        $this->execute($sql);
    }

    public function down(): void
    {
        $this->table('collection_card')->drop()->save();
    }
}