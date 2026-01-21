<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreatePermissionType extends AbstractMigration
{
    public function up(): void
    {
        $sql = "
            CREATE TYPE permission_type AS ENUM ('read', 'write', 'admin');
        ";

        $this->execute($sql);
    }

    public function down(): void
    {
        $this->execute('DROP TYPE IF EXISTS permission_type');
    }
}