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
                collection_id UUID NOT NULL,
                user_id UUID NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                
                CONSTRAINT fk_user_collection_collection
                    FOREIGN KEY (collection_id)
                    REFERENCES collections(id)
                    ON DELETE CASCADE,
                    
                CONSTRAINT fk_user_collection_user
                    FOREIGN KEY (user_id)
                    REFERENCES users(id)
                    ON DELETE CASCADE,
                    
                CONSTRAINT unique_user_collection
                    UNIQUE (collection_id, user_id)
            );
            
            CREATE INDEX idx_user_collection_collection_id ON user_collection(collection_id);
            CREATE INDEX idx_user_collection_user_id ON user_collection(user_id);
        ";

        $this->execute($sql);
    }

    public function down(): void
    {
        $this->table('user_collection')->drop()->save();
    }
}
