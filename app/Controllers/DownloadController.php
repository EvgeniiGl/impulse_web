<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Exceptions\UnauthorizedException;
use App\Factories\StorageServiceFactory;
use App\Helpers\TranslationHelper;
use App\Services\StorageService;
use Exception;
use Phalcon\Http\Response;

class DownloadController extends BaseController
{
    private StorageService $storageService;

    /**
     * @throws UnauthorizedException
     */
    public function onConstruct(): void
    {
        $config = [
            'driver'     => 'local',
            'base_path'  => '/var/www',
            'public_url' => $_SERVER['HTTP_HOST'],
        ];

        $this->storageService = StorageServiceFactory::create($config);
        parent::onConstruct();
    }

    /**
     * Скачивание файла карточки
     * GET /download/{cardId}
     */
//    public function fileAction(string $cardId): Response
//    {
//        try {
//            $user = $this->getAuthenticatedUser();
//
//            // Находим карточку
//            $card = Card::findFirst([
//                'conditions' => 'id = :id:',
//                'bind'       => ['id' => $cardId]
//            ]);
//
//            if (!$card) {
//                return $this->jsonResponse([
//                    'success' => false,
//                    'error'   => TranslationHelper::translate('Card not found')
//                ], 404);
//            }
//
//            // Проверяем доступ к карточке
//            if (!$card->hasAccess($user)) {
//                return $this->jsonResponse([
//                    'success' => false,
//                    'error'   => TranslationHelper::translate('Access denied')
//                ], 403);
//            }
//
//            // Проверяем наличие файла
//            if (empty($card->object_path)) {
//                return $this->jsonResponse([
//                    'success' => false,
//                    'error'   => TranslationHelper::translate('File not found')
//                ], 404);
//            }
//
//            // Проверяем существование файла
//            if (!$this->storageService->fileExists($card->object_path)) {
//                return $this->jsonResponse([
//                    'success' => false,
//                    'error'   => TranslationHelper::translate('File not found on server')
//                ], 404);
//            }
//
//            // Получаем информацию о файле
//            $fileInfo = $this->storageService->getFileInfo($card->object_path);
//            if (!$fileInfo) {
//                return $this->jsonResponse([
//                    'success' => false,
//                    'error'   => TranslationHelper::translate('Failed to read file')
//                ], 500);
//            }
//
//            // Получаем полный путь к файлу
//            $filePath = $this->storageService->getFullPath($card->object_path);
//
//            // Отправляем файл
//            return $this->sendFile(
//                $filePath,
//                $card->original_name,
//                $fileInfo['mime_type']
//            );
//
//        } catch (Exception $e) {
//            return $this->jsonResponse([
//                'success' => false,
//                'error'   => $e->getMessage()
//            ], 400);
//        }
//    }

    /**
     * Скачивание файла с подписанным URL (для приватных файлов)
     * GET /download/signed/{objectPath}?token={token}&expires={expires}&signature={signature}
     */
    public function signedAction(): Response
    {
        try {
            $objectPath = $this->request->getQuery('path');
            $token      = $this->request->getQuery('token');
//            $expires    = $this->request->getQuery('expires');
            $signature = $this->request->getQuery('signature');

            // Проверяем наличие всех параметров
            if (!$token
//                || !$expires
                || !$signature) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Invalid signed URL')
                ], 400);
            }

            // Проверяем срок действия подписи
//            if ((int)$expires < time()) {
//                return $this->jsonResponse([
//                    'success' => false,
//                    'error'   => TranslationHelper::translate('Signed URL expired')
//                ], 401);
//            }

            // Проверяем подпись
            $expectedSignature = hash_hmac('sha256', $objectPath
//                . $expires
                , $token);
            if (!hash_equals($expectedSignature, $signature)) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Invalid signature')
                ], 401);
            }

            // Проверяем существование файла
            if (!$this->storageService->fileExists($objectPath)) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('File not found')
                ], 404);
            }

            // Получаем информацию о файле
            $fileInfo = $this->storageService->getFileInfo($objectPath);
            if (!$fileInfo) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Failed to read file')
                ], 500);
            }

            // Получаем полный путь к файлу
            $filePath = $this->storageService->getFullPath($objectPath);

            // Отправляем файл
            return $this->sendFile(
                $filePath,
                basename($objectPath),
                $fileInfo['mime_type']
            );

        } catch (Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Получение информации о файле
     * GET /download/info/{cardId}
     */
//    public function infoAction(string $cardId): Response
//    {
//        try {
//            $user = $this->getAuthenticatedUser();
//
//            // Находим карточку
//            $card = Card::findFirst([
//                'conditions' => 'id = :id:',
//                'bind'       => ['id' => $cardId]
//            ]);
//
//            if (!$card) {
//                return $this->jsonResponse([
//                    'success' => false,
//                    'error'   => TranslationHelper::translate('Card not found')
//                ], 404);
//            }
//
//            // Проверяем доступ к карточке
//            if (!$card->hasAccess($user)) {
//                return $this->jsonResponse([
//                    'success' => false,
//                    'error'   => TranslationHelper::translate('Access denied')
//                ], 403);
//            }
//
//            // Проверяем наличие файла
//            if (empty($card->object_path)) {
//                return $this->jsonResponse([
//                    'success' => false,
//                    'error'   => TranslationHelper::translate('File not found')
//                ], 404);
//            }
//
//            // Получаем информацию о файле
//            $fileInfo = $this->storageService->getFileInfo($card->object_path);
//            if (!$fileInfo) {
//                return $this->jsonResponse([
//                    'success' => false,
//                    'error'   => TranslationHelper::translate('Failed to read file')
//                ], 500);
//            }
//
//            // Генерируем подписанный URL если файл приватный
//            $signedUrl = null;
//            if (!$this->storageService->isPublicFile($card->object_path)) {
//                $signedUrl = $this->storageService->getSignedUrl($card->object_path);
//            }
//
//            return $this->jsonResponse([
//                'success' => true,
//                'data'    => [
//                    'file_info' => [
//                        'name'          => $card->original_name,
//                        'size'          => $fileInfo['size'],
//                        'mime_type'     => $fileInfo['mime_type'],
//                        'last_modified' => $fileInfo['last_modified'],
//                        'is_public'     => $this->storageService->isPublicFile($card->object_path),
//                        'download_url'  => '/download/file/' . $card->id,
//                        'signed_url'    => $signedUrl,
//                    ]
//                ]
//            ]);
//
//        } catch (Exception $e) {
//            return $this->jsonResponse([
//                'success' => false,
//                'error'   => $e->getMessage()
//            ], 400);
//        }
//    }

    /**
     * Отправляет файл клиенту
     */
    private function sendFile(string $filePath, string $fileName, string $mimeType): Response
    {
        $response = new Response();

        // Устанавливаем заголовки
        $response->setHeader('Content-Type', $mimeType);
        $response->setHeader('Content-Disposition', 'attachment; filename="' . $fileName . '"');
        $response->setHeader('Content-Length', filesize($filePath));
        $response->setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        $response->setHeader('Pragma', 'no-cache');
        $response->setHeader('Expires', '0');

        // Отправляем файл
        $response->setFileToSend($filePath);

        return $response;
    }
}
