<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateAccessRulesTable extends AbstractMigration
{
    public function up(): void
    {
        $sql = "
            CREATE TYPE permission_type AS ENUM ('read', 'write', 'admin');
            
            CREATE TABLE access_rules (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                card_id UUID NOT NULL,
                user_id UUID NOT NULL,
                permission permission_type NOT NULL DEFAULT 'read',
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                
                CONSTRAINT fk_access_rules_card
                    FOREIGN KEY (card_id)
                    REFERENCES cards(id)
                    ON DELETE CASCADE,
                    
                CONSTRAINT fk_access_rules_user
                    FOREIGN KEY (user_id)
                    REFERENCES users(id)
                    ON DELETE CASCADE,
                    
                CONSTRAINT uc_access_rules_unique
                    UNIQUE (card_id, user_id)
            );
            
            CREATE INDEX idx_access_rules_card_id ON access_rules(card_id);
            CREATE INDEX idx_access_rules_user_id ON access_rules(user_id);
            CREATE INDEX idx_access_rules_permission ON access_rules(permission);
        ";

        $this->execute($sql);
    }

    public function down(): void
    {
        $this->execute('DROP TABLE IF EXISTS access_rules CASCADE');
        $this->execute('DROP TYPE IF EXISTS permission_type');
    }
}