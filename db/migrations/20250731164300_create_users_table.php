<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateUsersTable extends AbstractMigration
{
    public function up(): void
    {
        $table = $this->table('users', [
            'id' => false,
            'primary_key' => ['id']
        ]);

        $table
            ->addColumn('id', 'uuid')
            ->addColumn('name', 'string', ['limit' => 100, 'null' => true])
            ->addColumn('email', 'string', ['limit' => 255])
            ->addColumn('age', 'integer', ['null' => true])
            ->addColumn('password_hash', 'string', ['limit' => 255])
            ->addColumn('is_active', 'boolean', ['default' => true])
            ->addColumn('created_at', 'timestamp', [
                'default' => 'CURRENT_TIMESTAMP'
            ])
            ->addColumn('updated_at', 'timestamp', [
                'default' => 'CURRENT_TIMESTAMP',
                'update' => 'CURRENT_TIMESTAMP'
            ])
            ->addIndex(['email'], ['unique' => true])
            ->addIndex(['email'], ['name' => 'idx_users_email'])
            ->create();
    }

    public function down(): void
    {
        $this->table('users')->drop()->save();
    }
}