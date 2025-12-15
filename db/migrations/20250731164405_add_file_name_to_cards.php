<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class AddFileNameToCards extends AbstractMigration
{
    public function up(): void
    {
        $table = $this->table('cards');
        $table
            ->addColumn('file_name', 'string', [
                'limit' => 255,
                'default' => '',
                'after' => 'object_path'
            ])
            ->addIndex(['file_name'], [
                'unique' => true,
                'name' => 'unique_file_name'
            ])
            ->update();
    }

    public function down(): void
    {
        $table = $this->table('cards');
        $table
            ->removeIndexByName('unique_file_name')
            ->removeColumn('file_name')
            ->update();
    }
}