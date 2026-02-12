<?php

use App\Factories\StorageServiceFactory;
use App\Services\CardService;

return function () {
    $config = [
        'driver'     => 'local',
        'base_path'  => '/var/www',
        'public_url' => $_SERVER['HTTP_HOST'],
    ];

    $storageService = StorageServiceFactory::create($config);

    return new CardService($storageService);
};