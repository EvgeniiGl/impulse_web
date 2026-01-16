<?php

declare(strict_types=1);

use Phalcon\Config\Config;

/**
 * Application configuration
 */
return function (): Config {
    return new Config([
        'database'    => [
            'host'     => getenv('DB_HOST') ?: 'postgres',
            'port'     => getenv('DB_PORT') ?: '5432',
            'username' => getenv('DB_USER') ?: 'app_user',
            'password' => getenv('DB_PASSWORD') ?: 'app_password',
            'dbname'   => getenv('DB_NAME') ?: 'app_db',
        ],
        'application' => [
            'baseUri' => '/',
        ],
        'jwt'         => [
            'secret'        => getenv('JWT_SECRET') ?: 'secret_something',
            'refreshSecret' => getenv('JWT_REFRESH_SECRET') ?: 'secret_something_rerefresh',
            'refreshExpire' => 60 * 60 * 24 * 30, // 30 дней
            'expiration'    => 3600
        ],
        'app'         => [
            'env'   => getenv('APP_ENV') ?: 'development',
            'debug' => getenv('APP_DEBUG') ?: false,
            'url'   => getenv('APP_URL') ?: 'http://localhost',
        ],
        'minio'       => [
            'endpoint'  => getenv('MINIO_ENDPOINT') ?: 'http://minio:9000',
            'key'       => getenv('MINIO_KEY') ?: 'minikey',
            'secret'    => getenv('MINIO_SECRET') ?: 'minisecter',
            'region'    => getenv('MINIO_REGION') ?: 'us-east-1',
            'bucket'    => getenv('MINIO_BUCKET') ?: 'impulse',
            'publicUrl' => getenv('MINIO_PUBLIC_URL') ?: 'http://localhost:8098',
        ],
        'uploads'     => [
            'maxFileSize'       => 32 * 1024 * 1024, // 32MB
            'allowedTypes'      => [
                'image/jpeg',
                'image/png',
                'image/gif',
                'image/webp',
                'image/svg+xml',
                'application/pdf',
                'text/plain',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ],
            'maxFileNameLength' => 255,
        ],
    ]);
};
