<?php
return [
    'endpoint'             => env('MINIO_ENDPOINT', 'localhost:9000'),
    'access_key'           => env('MINIO_ACCESS_KEY'),
    'secret_key'           => env('MINIO_SECRET_KEY'),
    'use_ssl'              => env('MINIO_USE_SSL', false),
    'region'               => env('MINIO_REGION', 'us-east-1'),
    'buckets'              => [
        'public'  => 'public-images',
        'private' => 'private-images',
        'shared'  => 'shared-images',
    ],
    'presigned_url_expiry' => 3600, // 1 час
];