<?php

declare(strict_types=1);

namespace App;

use Phalcon\Db\Adapter\Pdo\Postgresql;

return function (): Postgresql {
    $db = new Postgresql([
        'host'     => getenv('DB_HOST') ?? 'postgres',
        'port'     => '5432',
        'username' => getenv('DB_USER') ?? 'app_user',
        'password' => getenv('DB_PASSWORD') ?? 'app_password',
        'dbname'   => getenv('DB_NAME') ?? 'app_db',
    ]);

    return $db;
};
