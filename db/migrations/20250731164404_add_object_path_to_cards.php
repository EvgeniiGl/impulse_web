<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class AddObjectPathToCards extends AbstractMigration
{
    public function up(): void
    {
        $table = $this->table('cards');
        $table
            ->addColumn('object_path', 'string', [
                'limit' => 500,
                'default' => '',
                'after' => 'url'
            ])
            ->update();
    }

    public function down(): void
    {
        $table = $this->table('cards');
        $table
            ->removeColumn('object_path')
            ->update();
    }
}