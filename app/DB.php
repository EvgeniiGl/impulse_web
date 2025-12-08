<?php

declare(strict_types=1);

namespace App;

use Phalcon\Db\Adapter\Pdo\Postgresql;
use Phalcon\Di\FactoryDefault;

class DB
{
    public static function create(FactoryDefault $container): Postgresql
    {
        $config = $container->get('config');
        return new Postgresql([
            'host' => $config->database->host,
            'port' => $config->database->port,
            'username' => $config->database->username,
            'password' => $config->database->password,
            'dbname' => $config->database->dbname,
        ]);
    }
}
