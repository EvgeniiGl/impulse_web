<?php
declare(strict_types=1);

namespace App\Services;

use App\Models\Card;
use App\Models\User;
use App\Requests\Card\CreateCardRequest;
use App\Requests\Card\UpdateCardRequest;
use Exception;
use Phalcon\Di\Injectable;

class CardService extends Injectable
{
    private StorageService $storageService;
    private array          $uploadConfig;

    public function __construct(StorageService $storageService)
    {
        $this->storageService = $storageService;
        $this->uploadConfig   = $this->config->get('uploads')->toArray();
    }

    /**
     * Создает карточку с загрузкой файла
     */
    public function createCard(CreateCardRequest $request, User $creator): ?Card
    {
        // Валидация данных
        $validation = $request->validate();
        if ($validation->count() > 0) {
            $errors = [];
            foreach ($validation as $message) {
                $errors[] = $message->getMessage();
            }
            throw new Exception(implode(', ', $errors));
        }

        // Валидация файла
        if (!$request->validateFile($this->uploadConfig['allowedTypes'], $this->uploadConfig['maxFileSize'])) {
            throw new Exception('Invalid file. Check file type and size (max 32MB)');
        }

        $this->db->begin();

        try {
            $card              = new Card();
            $card->title       = $request->getTitle();
            $card->description = $request->getDescription() ?? '';
            $card->access_type = $request->getAccessType();
            $card->creator_id  = $creator->id;

            // Если есть файл - загружаем в MinIO
            if ($request->hasFile()) {
                $file = $request->getFile();

                $uploadResult = $this->storageService->uploadFile(
                    $file->getTempName(),
                    $file->getName(),
                    $creator->id
                );

                $card->url           = $uploadResult['url'];
                $card->object_path   = $uploadResult['object_path'];
                $card->file_name     = $uploadResult['file_name'];
                $card->original_name = $uploadResult['original_name'];
            } else {
                // Если файла нет, используем заглушку
                $card->url           = '';
                $card->object_path   = '';
                $card->file_name     = 'card_' . bin2hex(random_bytes(8)) . '_' . time();
                $card->original_name = 'no_file';
            }

            // Сохраняем карточку
            if (!$card->create()) {
                $messages = [];
                foreach ($card->getMessages() as $message) {
                    $messages[] = $message->getMessage();
                }
                throw new Exception(implode(', ', $messages));
            }

            $this->db->commit();
            return $card;

        } catch (Exception $e) {
            $this->db->rollback();

            // Если был загружен файл, удаляем его из MinIO
            if (isset($uploadResult['object_path'])) {
                $this->storageService->deleteFile($uploadResult['object_path']);
            }

            throw new Exception('Failed to create card: ' . $e->getMessage());
        }
    }

    /**
     * Удаляет карточку
     */
    public function deleteCard(Card $card, User $user): bool
    {
        // Проверяем права доступа
        if ($card->creator_id !== $user->id && !$user->isAdmin()) {
            throw new Exception('You do not have permission to delete this card');
        }

        $this->db->begin();

        try {
            // Удаляем файл из MinIO, если он существует
            if (!empty($card->object_path)) {
                $this->storageService->deleteFile($card->object_path);
            }

            // Удаляем карточку из базы
            if (!$card->delete()) {
                $messages = [];
                foreach ($card->getMessages() as $message) {
                    $messages[] = $message->getMessage();
                }
                throw new Exception(implode(', ', $messages));
            }

            $this->db->commit();
            return true;

        } catch (Exception $e) {
            $this->db->rollback();
            throw new Exception('Failed to delete card: ' . $e->getMessage());
        }
    }

    /**
     * Обновляет карточку
     */
    public function updateCard(Card $card, UpdateCardRequest $request, User $user): Card
    {
        // Проверяем права доступа
        if ($card->creator_id !== $user->id && !$user->hasAccess($card, 'write')) {
            throw new Exception('You do not have permission to update this card');
        }

        $this->db->begin();
        $oldFilePath = null;

        try {
            // Если есть новый файл
            if ($request->hasFile()) {
                // Валидация файла
                if (!$request->validateFile($this->uploadConfig['allowedTypes'], $this->uploadConfig['maxFileSize'])) {
                    throw new Exception('Invalid file. Check file type and size (max 32MB)');
                }

                // Сохраняем путь к старому файлу для удаления
                $oldFilePath = $card->object_path;

                // Загружаем новый файл
                $file         = $request->getFile();
                $uploadResult = $this->storageService->uploadFile(
                    $file['tmp_name'],
                    $file['name'],
                    $user->id
                );

                $card->url           = $uploadResult['url'];
                $card->object_path   = $uploadResult['object_path'];
                $card->file_name     = $uploadResult['file_name'];
                $card->original_name = $uploadResult['original_name'];
            }

            // Обновляем остальные поля
            $card->title       = $request->getTitle() ?? $card->title;
            $card->description = $request->getDescription() ?? $card->description;
            $card->access_type = $request->getAccessType() ?? $card->access_type;
            if (!$card->update()) {
                $messages = [];
                foreach ($card->getMessages() as $message) {
                    $messages[] = $message->getMessage();
                }
                throw new Exception(implode(', ', $messages));
            }

            // Удаляем старый файл после успешного обновления
            if ($oldFilePath && !empty($oldFilePath)) {
                $this->storageService->deleteFile($oldFilePath);
            }

            $this->db->commit();
            return $card;

        } catch (Exception $e) {
            $this->db->rollback();

            // Если был загружен новый файл, удаляем его
            if (isset($uploadResult) && isset($uploadResult['object_path'])) {
                $this->storageService->deleteFile($uploadResult['object_path']);
            }

            throw new Exception('Failed to update card: ' . $e->getMessage());
        }
    }
}