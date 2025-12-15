<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class AddOriginalNameToCards extends AbstractMigration
{
    public function up(): void
    {
        $table = $this->table('cards');
        $table
            ->addColumn('original_name', 'string', [
                'limit' => 255,
                'default' => '',
                'after' => 'file_name'
            ])
            ->update();

        // Update existing records
        $this->execute("UPDATE cards SET original_name = 'unknown_file' WHERE original_name = ''");
    }

    public function down(): void
    {
        $table = $this->table('cards');
        $table
            ->removeColumn('original_name')
            ->update();
    }
}