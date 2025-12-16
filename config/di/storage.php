<?php

use Aws\S3\S3Client;
use League\Flysystem\AwsS3V3\AwsS3V3Adapter;
use League\Flysystem\Filesystem;

return function () {
    $config = $this->getConfig();

    $s3Client = new S3Client([
        'version'                 => 'latest',
        'endpoint'                => $config->minio->endpoint,
        'region'                  => $config->minio->region,
        'use_path_style_endpoint' => true,
        'credentials'             => [
            'key'    => $config->minio->key,
            'secret' => $config->minio->secret,
        ],
    ]);
    
    $adapter = new AwsS3V3Adapter(
        $s3Client,
        $config->minio->bucket,
        'cards' // Префикс для карточек
    );

    return new Filesystem($adapter);
};