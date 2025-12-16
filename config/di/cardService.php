<?php

return function () {
    $config = $this->getConfig();

    $storageService = new \App\Services\StorageService(
        $this->get('storage'),
        $config->minio->bucket,
        $config->minio->publicUrl
    );

    return new \App\Services\CardService($storageService);
};