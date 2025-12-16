<?php
declare(strict_types=1);

namespace App\Services;

use League\Flysystem\Filesystem;
use League\Flysystem\FilesystemException;
use League\Flysystem\UnableToWriteFile;
use Ramsey\Uuid\Uuid;
use Random\RandomException;

class StorageService
{
    private Filesystem $filesystem;
    private string     $bucket;
    private string     $publicUrl;

    public function __construct(Filesystem $filesystem, string $bucket, string $publicUrl)
    {
        $this->filesystem = $filesystem;
        $this->bucket     = $bucket;
        $this->publicUrl  = $publicUrl;
    }

    /**
     * Загружает файл в MinIO
     */
    public function uploadFile(string $tempFilePath, string $originalName, string $userId): array
    {
        // Генерируем уникальное имя файла
        $extension = pathinfo($originalName, PATHINFO_EXTENSION);
        $fileName  = sprintf(
            '%s_%s_%s.%s',
            $userId,
            Uuid::uuid4()->toString(),
            time(),
            $extension ?: 'bin'
        );

        // Путь в хранилище
        $objectPath = 'cards/' . $fileName;

        try {
            // Читаем содержимое файла
            $fileContent = file_get_contents($tempFilePath);
            if ($fileContent === false) {
                throw new \RuntimeException('Failed to read file content');
            }

            // Загружаем в MinIO
            $this->filesystem->write($objectPath, $fileContent, [
                'ContentType' => mime_content_type($tempFilePath),
                'Metadata'    => [
                    'original_name' => $originalName,
                    'user_id'       => $userId,
                    'uploaded_at'   => date('Y-m-d H:i:s')
                ]
            ]);

            // Формируем публичный URL
            $publicUrl = rtrim($this->publicUrl, '/') . '/' . $this->bucket . '/' . $objectPath;

            return [
                'file_name'     => $fileName,
                'original_name' => $originalName,
                'object_path'   => $objectPath,
                'url'           => $publicUrl,
                'size'          => filesize($tempFilePath),
                'mime_type'     => mime_content_type($tempFilePath)
            ];
        } catch (UnableToWriteFile $e) {
            throw new \RuntimeException('Failed to upload file to storage: ' . $e->getMessage());
        }
    }

    /**
     * Удаляет файл из MinIO
     */
    public function deleteFile(string $objectPath): bool
    {
        try {
            $this->filesystem->delete($objectPath);
            return true;
        } catch (\Exception $e) {
            // Логируем ошибку, но не прерываем выполнение
            error_log('Failed to delete file: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Генерирует подписанный URL для временного доступа
     * @throws RandomException
     */
    public function getSignedUrl(string $objectPath, int $expiresIn = 3600): string
    {
        // Для MinIO можно использовать пре-подписанные URL
        // В зависимости от конфигурации MinIO и клиента
        // Здесь упрощенная реализация
        return rtrim($this->publicUrl, '/') . '/' . $this->bucket . '/' . $objectPath . '?token=' . bin2hex(random_bytes(16));
    }

    /**
     * Проверяет существование файла
     * @throws FilesystemException
     */
    public function fileExists(string $objectPath): bool
    {
        return $this->filesystem->fileExists($objectPath);
    }

    /**
     * Получает информацию о файле
     */
    public function getFileInfo(string $objectPath): ?array
    {
        try {
            return [
                'size'          => $this->filesystem->fileSize($objectPath),
                'mime_type'     => $this->filesystem->mimeType($objectPath),
                'last_modified' => $this->filesystem->lastModified($objectPath),
            ];
        } catch (\Exception|FilesystemException $e) {
            return null;
        }
    }
}