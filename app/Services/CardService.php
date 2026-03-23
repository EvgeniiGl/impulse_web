<?php
declare(strict_types=1);

namespace App\Services;

use App\Models\Card;
use App\Models\User;
use App\Models\Collection;
use App\Models\CollectionCard;
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
     * Создает карточку с загрузкой файла и связями с коллекциями
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

        // Получаем ID коллекций
        $collectionIds = $request->getCollectionIds();

        // Проверяем существование коллекций и права доступа к ним
        if (!empty($collectionIds)) {
            $this->validateCollectionsAccess($collectionIds, $creator);
        }

        $this->db->begin();

        try {
            $card                      = new Card();
            $card->title               = $request->getTitle();
            $card->description         = $request->getDescription() ?? '';
            $card->access_type         = $request->getAccessType();
            $card->show_title_on_image = $request->getShowTitleOnImage();
            $card->creator_id          = $creator->id;

            if ($request->hasFile()) {
                $file         = $request->getFile();
                $isPublic     = $card->access_type === 'public';
                $uploadResult = $this->storageService->uploadFile(
                    $file->getTempName(),
                    $file->getName(),
                    $creator->id,
                    $isPublic
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

            // Сохраняем связи с коллекциями
            if (!empty($collectionIds)) {
                if (!$this->saveCardCollections($card->id, $collectionIds)) {
                    throw new Exception('Failed to save card collections');
                }
            }

            $this->db->commit();

            return $card;
        } catch (Exception $e) {
            $this->db->rollback();
            // Если был загружен файл, удаляем его
            if (isset($uploadResult['object_path'])) {
                $this->storageService->deleteFile($uploadResult['object_path']);
            }

            throw new Exception('Failed to create card: ' . $e->getMessage());
        }
    }

    /**
     * Обновляет карточку
     * @throws Exception
     */
    public function updateCard(Card $card, UpdateCardRequest $request, User $user): Card
    {
        // Проверяем права доступа
        if ($card->creator_id !== $user->id && !$user->hasAccess($card, 'write')) {
            throw new Exception('You do not have permission to update this card');
        }

//        // Получаем ID коллекций из запроса (если есть)
//        $collectionIds = $request->getCollectionIds();
//
//        // Проверяем существование коллекций и права доступа
//        if (!empty($collectionIds)) {
//            $this->validateCollectionsAccess($collectionIds, $user);
//        }

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
            if ($request->getTitle() !== null) {
                $card->title = $request->getTitle();
            }

            if ($request->getDescription() !== null) {
                $card->description = $request->getDescription();
            }

            if ($request->getAccessType() !== null) {
                $card->access_type = $request->getAccessType();
            }

            if ($request->getIsActive() !== null) {
                $card->is_active = $request->getIsActive();
            }

            if ($request->getShowTitleOnImage() !== null) {
                $card->show_title_on_image = $request->getShowTitleOnImage();
            }

            if (!$card->update()) {
                $messages = [];
                foreach ($card->getMessages() as $message) {
                    $messages[] = $message->getMessage();
                }
                throw new Exception(implode(', ', $messages));
            }

            // Обновляем связи с коллекциями
//            if ($collectionIds !== null) {
//                // Удаляем старые связи
//                $this->deleteCardCollections($card->id);
//
//                // Сохраняем новые связи
//                if (!empty($collectionIds)) {
//                    if (!$this->saveCardCollections($card->id, $collectionIds)) {
//                        throw new Exception('Failed to update card collections');
//                    }
//                }
//            }

            // Удаляем старый файл после успешного обновления
            if ($oldFilePath && !empty($oldFilePath)) {
                $this->storageService->deleteFile($oldFilePath);
            }

            $this->db->commit();
            return $card;

        } catch (Exception $e) {
            $this->db->rollback();

            // Если был загружен новый файл, удаляем его
            if (isset($uploadResult['object_path'])) {
                $this->storageService->deleteFile($uploadResult['object_path']);
            }

            throw new Exception('Failed to update card: ' . $e->getMessage());
        }
    }

    /**
     * Сохраняет связи карточки с коллекциями
     *
     * @param string $cardId
     * @param array $collectionIds
     * @return bool
     * @throws Exception
     */
    private function saveCardCollections(string $cardId, array $collectionIds): bool
    {
        foreach ($collectionIds as $collectionId) {
            if (empty($collectionId)) {
                continue;
            }

            $collectionCard                = new CollectionCard();
            $collectionCard->card_id       = $cardId;
            $collectionCard->collection_id = $collectionId;

            if (!$collectionCard->save()) {
                $messages = [];
                foreach ($collectionCard->getMessages() as $message) {
                    $messages[] = $message->getMessage();
                }
                throw new Exception('Failed to save collection relation: ' . implode(', ', $messages));
            }
        }

        return true;
    }

    /**
     * Удаляет все связи карточки с коллекциями
     *
     * @param string $cardId
     * @return void
     */
    private function deleteCardCollections(string $cardId): void
    {
        $collectionCards = CollectionCard::find([
            'conditions' => 'card_id = :card_id:',
            'bind'       => ['card_id' => $cardId]
        ]);

        foreach ($collectionCards as $collectionCard) {
            if (!$collectionCard->delete()) {
                $messages = [];
                foreach ($collectionCard->getMessages() as $message) {
                    $messages[] = $message->getMessage();
                }
                throw new Exception('Failed to delete collection relation: ' . implode(', ', $messages));
            }
        }

    }

    /**
     * Проверяет существование коллекций и права доступа к ним
     *
     * @param array $collectionIds
     * @param User $user
     * @throws Exception
     */
    private function validateCollectionsAccess(array $collectionIds, User $user): void
    {
        foreach ($collectionIds as $collectionId) {
            $collection = Collection::findFirst([
                'conditions' => 'id = :id:',
                'bind'       => ['id' => $collectionId]
            ]);

            if (!$collection) {
                throw new Exception("Collection with ID {$collectionId} not found");
            }

            // Проверяем, имеет ли пользователь доступ к коллекции
            if (!$collection->hasAccess($user->id, 'write')) {
                throw new Exception("You don't have permission to add cards to collection: {$collection->name}");
            }
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
            // Удаляем связи с коллекциями
            $this->deleteCardCollections($card->id);

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
     * Получает карточку по ID с проверкой доступа
     */
    public function getCardWithAccess(string $cardId, ?User $user): ?Card
    {
        $card = Card::findFirst([
            'conditions' => 'id = :id:',
            'bind'       => ['id' => $cardId]
        ]);

        if (!$card) {
            return null;
        }

        // Проверяем доступ
        if (!$card->hasAccess($user)) {
            throw new Exception('Access denied');
        }

        return $card;
    }

    /**
     * Получает все доступные карточки пользователя
     */
    public function getUserAccessibleCards(User $user): array
    {
        return $user->getAllAccessibleCards();
    }

    /**
     * Получает карточки по коллекции
     *
     * @param string $collectionId
     * @param User|null $user
     * @return array
     * @throws Exception
     */
    public function getCardsByCollection(string $collectionId, ?User $user): array
    {
        $collection = Collection::findFirst([
            'conditions' => 'id = :id:',
            'bind'       => ['id' => $collectionId]
        ]);

        if (!$collection) {
            throw new Exception('Collection not found');
        }

        // Проверяем доступ к коллекции
        if (!$collection->hasAccess($user, 'read')) {
            throw new Exception('Access denied to collection');
        }

        $cards           = [];
        $collectionCards = CollectionCard::find([
            'conditions' => 'collection_id = :collection_id:',
            'bind'       => ['collection_id' => $collectionId],
            'order'      => 'created_at DESC'
        ]);

        foreach ($collectionCards as $collectionCard) {
            $card = $collectionCard->getCard();
            if ($card && $card->hasAccess($user, 'read')) {
                $cards[] = [
                    'card'     => $card,
                    'added_at' => $collectionCard->created_at
                ];
            }
        }

        return $cards;
    }
}