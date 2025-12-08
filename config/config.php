<?php

declare(strict_types=1);

use Phalcon\Config\Config;

/**
 * Application configuration
 */
return function (): Config {
    return new Config([
        'database' => [
            'host'     => getenv('DB_HOST') ?? 'postgres',
            'port'     => getenv('DB_PORT') ?? '5432',
            'username' => getenv('DB_USER') ?? 'app_user',
            'password' => getenv('DB_PASSWORD') ?? 'app_password',
            'dbname'   => getenv('DB_NAME') ?? 'app_db',
        ],
        'application' => [
//            'controllersDir' => __DIR__ . '/../app/Controllers/',
//            'modelsDir'      => __DIR__ . '/../app/Models/',
//            'servicesDir'    => __DIR__ . '/../app/Services/',
            'baseUri'        => '/',
        ],
        'app' => [
            'env'   => getenv('APP_ENV') ?? 'development',
            'debug' => getenv('APP_DEBUG') ?? true,
            'url'   => getenv('APP_URL') ?? 'http://localhost',
        ],
    ]);
};
