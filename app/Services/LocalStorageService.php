<?php
declare(strict_types=1);

namespace App\Services;

use Exception;
use Random\RandomException;
use RuntimeException;

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
                throw new RuntimeException('Failed to copy file to local storage');
            }

            // Устанавливаем права доступа
            chmod($targetPath, $isPublic ? 0644 : 0640);

            $url = $isPublic
                ? rtrim($this->publicUrl, '/') . '/img/' . $fileName
                : $this->getSignedUrl($relativePath); // Генерируем URL для приватного файла

            return [
                'file_name'     => $fileName,
                'original_name' => $originalName,
                'object_path'   => $relativePath,
                'url'           => $url,
                'size'          => filesize($targetPath),
                'mime_type'     => mime_content_type($targetPath) ?: 'application/octet-stream',
                'is_public'     => $isPublic
            ];
        } catch (Exception $e) {
            throw new RuntimeException('Failed to upload file to local storage: ' . $e->getMessage());
        }
    }

    /**
     * Генерирует URL для доступа к приватному файлу
     */
//    private function generatePrivateFileUrl(string $objectPath): string
//    {
//        // Генерируем токен для доступа к приватному файлу
//        $token   = bin2hex(random_bytes(16));
//        $expires = time() + (24 * 3600); // 24 часа
//
//        // Генерируем подпись
//        $signature = hash_hmac('sha256', $objectPath
////            . $expires
//            , $token);
//
//        return rtrim($this->publicUrl, '/') . '/download/signed'
//            . '?path=' . urlencode($objectPath)
//            . '&token=' . $token
////            . '&expires=' . $expires
//            . '&signature=' . $signature;
//    }

    /**
     * Получает приватный файл с проверкой доступа
     */
//    public function getPrivateFile(string $objectPath, string $userId, string $token, int $expires, string $signature): ?array
//    {
//        try {
//            // Проверяем подпись
//            $expectedSignature = hash_hmac('sha256', $objectPath . $expires, $token);
//            if (!hash_equals($expectedSignature, $signature)) {
//                throw new RuntimeException('Invalid signature');
//            }
//
//            // Проверяем срок действия
//            if (time() > $expires) {
//                throw new RuntimeException('Link expired');
//            }
//
//            $fullPath = $this->basePath . '/' . ltrim($objectPath, '/');
//
//            // Проверяем существование файла
//            if (!file_exists($fullPath) || !is_file($fullPath)) {
//                throw new RuntimeException('File not found');
//            }
//
//            // Получаем информацию о карточке и проверяем доступ
//            $card = $this->getCardByObjectPath($objectPath);
//            if (!$card) {
//                throw new RuntimeException('Card not found');
//            }
//
//            // Проверяем доступ пользователя к карточке
//            if (!$this->hasAccessToCard($card, $userId)) {
//                throw new RuntimeException('Access denied');
//            }
//
//            return [
//                'path'      => $fullPath,
//                'mime_type' => mime_content_type($fullPath) ?: 'application/octet-stream',
//                'size'      => filesize($fullPath),
//                'name'      => basename($fullPath)
//            ];
//
//        } catch (Exception $e) {
//            error_log('Failed to get private file: ' . $e->getMessage());
//            return null;
//        }
//    }

    /**
     * Проверяет доступ пользователя к карточке
     */
//    private function hasAccessToCard(array $card, string $userId): bool
//    {
//        // Если карточка публичная, доступ разрешен
//        if ($card['access_type'] === 'public') {
//            return true;
//        }
//
//        // Если пользователь - создатель карточки
//        if ($card['creator_id'] === $userId) {
//            return true;
//        }
//
//        // Проверяем права доступа в таблице access_rules
//        $result = $this->db->query(
//            'SELECT permission FROM access_rules
//             WHERE card_id = :card_id AND user_id = :user_id',
//            [
//                'card_id' => $card['id'],
//                'user_id' => $userId
//            ]
//        );
//
//        return $result->numRows() > 0;
//    }

    /**
     * Получает информацию о карточке по пути к объекту
     */
//    private function getCardByObjectPath(string $objectPath): ?array
//    {
//        try {
//            $result = $this->db->query(
//                "SELECT id, creator_id, access_type FROM cards WHERE object_path = :object_path",
//                ['object_path' => $objectPath]
//            );
//
//            if ($result->numRows() === 0) {
//                return null;
//            }
//
//            $row = $result->fetch();
//            return [
//                'id'          => $row['id'],
//                'creator_id'  => $row['creator_id'],
//                'access_type' => $row['access_type']
//            ];
//
//        } catch (Exception $e) {
//            error_log('Failed to get card by object path: ' . $e->getMessage());
//            return null;
//        }
//    }

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
        } catch (Exception $e) {
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
        $expires = time() + (24 * 3600); // 24 часа

        // Генерируем подпись
        $signature = hash_hmac('sha256', $objectPath
//            . $expires
            , $token);

        return rtrim($this->publicUrl, '/') . '/download/signed'
            . '?path=' . urlencode($objectPath)
            . '&token=' . $token
//            . '&expires=' . $expires
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
        } catch (Exception $e) {
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
                throw new RuntimeException(sprintf('Directory "%s" was not created', $path));
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
