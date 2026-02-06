<?php
declare(strict_types=1);

namespace App\Services;

use League\Flysystem\Filesystem;
use League\Flysystem\FilesystemException;
use League\Flysystem\UnableToWriteFile;
use Random\RandomException;

class MinioStorageService extends StorageService
{
    private Filesystem $filesystem;
    private string     $bucket;

    public function __construct(Filesystem $filesystem, string $bucket, string $publicUrl)
    {
        parent::__construct($publicUrl);
        $this->filesystem = $filesystem;
        $this->bucket     = $bucket;
    }

    /**
     * Загружает файл в MinIO
     */
    public function uploadFile(string $tempFilePath, string $originalName, string $userId, bool $isPublic = false): array
    {
        $fileName   = $this->generateFileName($originalName, $userId);
        $objectPath = 'cards/' . $fileName;

        try {
            $fileContent = file_get_contents($tempFilePath);
            if ($fileContent === false) {
                throw new \RuntimeException('Failed to read file content');
            }

            $this->filesystem->write($objectPath, $fileContent, [
                'ContentType' => mime_content_type($tempFilePath) ?: 'application/octet-stream',
                'Metadata'    => [
                    'original_name' => $originalName,
                    'user_id'       => $userId,
                    'uploaded_at'   => date('Y-m-d H:i:s'),
                    'is_public'     => $isPublic ? 'true' : 'false'
                ]
            ]);

            $publicUrl = rtrim($this->publicUrl, '/') . '/' . $this->bucket . '/' . $objectPath;

            return [
                'file_name'     => $fileName,
                'original_name' => $originalName,
                'object_path'   => $objectPath,
                'url'           => $publicUrl,
                'size'          => filesize($tempFilePath),
                'mime_type'     => mime_content_type($tempFilePath) ?: 'application/octet-stream'
            ];
        } catch (UnableToWriteFile $e) {
            throw new \RuntimeException('Failed to upload file to MinIO: ' . $e->getMessage());
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
            error_log('Failed to delete file from MinIO: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Генерирует подписанный URL для временного доступа
     * @throws RandomException
     */
    public function getSignedUrl(string $objectPath, int $expiresIn = 3600): string
    {
        // Упрощенная реализация с токеном
        // В production используйте настоящие пре-подписанные URL MinIO
        $token = bin2hex(random_bytes(16));
        return rtrim($this->publicUrl, '/') . '/' . $this->bucket . '/' . $objectPath . '?token=' . $token . '&expires=' . (time() + $expiresIn);
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
            error_log('Failed to get file info from MinIO: ' . $e->getMessage());
            return null;
        }
    }
}