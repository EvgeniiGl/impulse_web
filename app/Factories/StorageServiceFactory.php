<?php
declare(strict_types=1);

namespace App\Factories;

use App\Services\StorageService;
use App\Services\MinioStorageService;
use App\Services\LocalStorageService;

/**
 * Фабрика для создания сервисов хранения
 */
class StorageServiceFactory
{
    /**
     * Создает сервис хранения на основе конфигурации
     */
    public static function create(array $config): StorageService
    {
        $driver = $config['driver'] ?? 'local';

        return match ($driver) {
            'minio' => new MinioStorageService(
                $config['filesystem'],
                $config['bucket'],
                $config['public_url']
            ),
            'local' => new LocalStorageService(
                $config['base_path'],
                $config['public_url']
            ),
            default => throw new \InvalidArgumentException("Unsupported storage driver: {$driver}"),
        };
    }
}

