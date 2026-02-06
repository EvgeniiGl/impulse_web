<?php
declare(strict_types=1);

namespace App\Services;

use Random\RandomException;

abstract class StorageService
{
    protected string $publicUrl;

    public function __construct(string $publicUrl)
    {
        $this->publicUrl = $publicUrl;
    }

    /**
     * Загружает файл в хранилище
     */
    abstract public function uploadFile(string $tempFilePath, string $originalName, string $userId, bool $isPublic = false): array;

    /**
     * Удаляет файл из хранилища
     */
    abstract public function deleteFile(string $objectPath): bool;

    /**
     * Генерирует подписанный URL для временного доступа
     * @throws RandomException
     */
    abstract public function getSignedUrl(string $objectPath, int $expiresIn = 3600): string;

    /**
     * Проверяет существование файла
     */
    abstract public function fileExists(string $objectPath): bool;

    /**
     * Получает информацию о файле
     */
    abstract public function getFileInfo(string $objectPath): ?array;

    /**
     * Генерирует уникальное имя файла
     */
    protected function generateFileName(string $originalName, string $userId): string
    {
        $extension = pathinfo($originalName, PATHINFO_EXTENSION);
        return sprintf(
            '%s_%s_%s.%s',
            $userId,
            $this->generateUuid(),
            time(),
            $extension ?: 'bin'
        );
    }

    /**
     * Генерирует UUID
     */
    protected function generateUuid(): string
    {
        return sprintf(
            '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff)
        );
    }
}

