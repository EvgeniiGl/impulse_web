<?php
declare(strict_types=1);

namespace App\Services;

use Random\RandomException;

class LocalStorageService extends StorageService
{
    private string $basePath;
    private string $publicPath;
    private string $privatePath;

    public function __construct(string $basePath, string $publicUrl)
    {
        parent::__construct($publicUrl);
        $this->basePath    = rtrim($basePath, '/');
        $this->publicPath  = $this->basePath . '/public/img';
        $this->privatePath = $this->basePath . '/storage/img';

        // Создаем директории если их нет
        $this->ensureDirectoryExists($this->publicPath);
        $this->ensureDirectoryExists($this->privatePath);
    }

    /**
     * Загружает файл в локальное хранилище
     */
    public function uploadFile(string $tempFilePath, string $originalName, string $userId, bool $isPublic = false): array
    {
        $fileName   = $this->generateFileName($originalName, $userId);
        $targetDir  = $isPublic ? $this->publicPath : $this->privatePath;
        $targetPath = $targetDir . '/' . $fileName;

        // Относительный путь для БД
        $relativePath = ($isPublic ? 'public/img/' : 'storage/img/') . $fileName;

        try {
            if (!copy($tempFilePath, $targetPath)) {
                throw new \RuntimeException('Failed to copy file to local storage');
            }

            // Устанавливаем права доступа
            chmod($targetPath, $isPublic ? 0644 : 0640);

            $url = $isPublic
                ? rtrim($this->publicUrl, '/') . '/img/' . $fileName
                : null; // Для приватных файлов URL не генерируем

            return [
                'file_name'     => $fileName,
                'original_name' => $originalName,
                'object_path'   => $relativePath,
                'url'           => $url,
                'size'          => filesize($targetPath),
                'mime_type'     => mime_content_type($targetPath) ?: 'application/octet-stream',
                'is_public'     => $isPublic
            ];
        } catch (\Exception $e) {
            throw new \RuntimeException('Failed to upload file to local storage: ' . $e->getMessage());
        }
    }

    /**
     * Удаляет файл из локального хранилища
     */
    public function deleteFile(string $objectPath): bool
    {
        try {
            $fullPath = $this->basePath . '/' . ltrim($objectPath, '/');

            if (file_exists($fullPath)) {
                return unlink($fullPath);
            }

            return false;
        } catch (\Exception $e) {
            error_log('Failed to delete file from local storage: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Генерирует подписанный URL для временного доступа к приватным файлам
     * @throws RandomException
     */
    public function getSignedUrl(string $objectPath, int $expiresIn = 3600): string
    {
        // Генерируем токен для доступа к приватному файлу
        $token   = bin2hex(random_bytes(16));
        $expires = time() + $expiresIn;

        // В реальном приложении токен нужно сохранить в кеш/БД для валидации
        // Здесь упрощенная реализация
        $signature = hash_hmac('sha256', $objectPath . $expires, $token);

        return rtrim($this->publicUrl, '/') . '/download/' . urlencode($objectPath)
            . '?token=' . $token
            . '&expires=' . $expires
            . '&signature=' . $signature;
    }

    /**
     * Проверяет существование файла
     */
    public function fileExists(string $objectPath): bool
    {
        $fullPath = $this->basePath . '/' . ltrim($objectPath, '/');
        return file_exists($fullPath) && is_file($fullPath);
    }

    /**
     * Получает информацию о файле
     */
    public function getFileInfo(string $objectPath): ?array
    {
        try {
            $fullPath = $this->basePath . '/' . ltrim($objectPath, '/');

            if (!file_exists($fullPath)) {
                return null;
            }

            $finfo    = finfo_open(FILEINFO_MIME_TYPE);
            $mimeType = finfo_file($finfo, $fullPath);
            finfo_close($finfo);

            return [
                'size'          => filesize($fullPath),
                'mime_type'     => $mimeType ?: 'application/octet-stream',
                'last_modified' => filemtime($fullPath),
            ];
        } catch (\Exception $e) {
            error_log('Failed to get file info from local storage: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Создает директорию если её нет
     */
    private function ensureDirectoryExists(string $path): void
    {
        if (!is_dir($path)) {
            if (!mkdir($path, 0755, true) && !is_dir($path)) {
                throw new \RuntimeException(sprintf('Directory "%s" was not created', $path));
            }
        }
    }

    /**
     * Получает полный путь к файлу
     */
    public function getFullPath(string $objectPath): string
    {
        return $this->basePath . '/' . ltrim($objectPath, '/');
    }

    /**
     * Проверяет, является ли файл публичным
     */
    public function isPublicFile(string $objectPath): bool
    {
        return str_starts_with($objectPath, 'public/');
    }
}
