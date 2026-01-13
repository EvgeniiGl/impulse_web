<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateUserCollectionTable extends AbstractMigration
{
    public function up(): void
    {
        $sql = "
            CREATE TABLE user_collection (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID NOT NULL,
                collection_id UUID NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                
                CONSTRAINT fk_collection_user
                    FOREIGN KEY (user_id)
                    REFERENCES users(id)
                    ON DELETE CASCADE
            );
        ";

        $this->execute($sql);
    }

    public function down(): void
    {
        $this->table('user_collection')->drop()->save();
    }
}