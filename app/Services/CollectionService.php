<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Collection;
use App\Models\CollectionCard;
use App\Models\User;
use App\Models\UserCollection;
use App\Models\Card;
use Phalcon\Mvc\Model\Transaction\Manager as TransactionManager;

class CollectionService
{
    private TransactionManager $transactionManager;

    public function __construct(TransactionManager $transactionManager)
    {
        $this->transactionManager = $transactionManager;
    }

    /**
     * Создать коллекцию
     */
    public function create(array $data, User $user): Collection|false
    {
        $collection              = new Collection();
        $collection->name        = $data['name'];
        $collection->creator_id  = $user->id;
        $collection->access_type = $data['access_type'] ?? 'private';

        if ($collection->save()) {
            return $collection;
        }

        return false;
    }

    /**
     * Обновить коллекцию
     */
    public function update(string $collectionId, array $data, User $user): Collection|false
    {
        $collection = Collection::findFirst([
            'conditions' => 'id = :id:',
            'bind'       => [
                'id' => $collectionId,
            ]
        ]);

        if (!$collection || !$collection->isOwner($user->id)) {
            return false;
        }

        if (isset($data['name'])) {
            $collection->name = $data['name'];
        }

        if (isset($data['access_type'])) {
            $collection->access_type = $data['access_type'];
        }

        if (isset($data['is_active'])) {
            $collection->is_active = (bool)$data['is_active'];
        }

        if ($collection->save()) {
            return $collection;
        }

        return false;
    }

    /**
     * Удалить коллекцию
     */
    public function delete(string $collectionId, User $user): bool
    {
        $collection = Collection::findFirst([
            'conditions' => 'id = :id:',
            'bind'       => [
                'id' => $collectionId,
            ]
        ]);

        if (!$collection || !$collection->isOwner($user->id)) {
            return false;
        }

        $transaction = $this->transactionManager->get();

        try {
            $collection->setTransaction($transaction);

            // Удаляем связи с карточками
            CollectionCard::find([
                'conditions' => 'collection_id = :id:',
                'bind'       => ['id' => $collectionId]
            ])->delete();

            // Удаляем связи с пользователями
            UserCollection::find([
                'conditions' => 'collection_id = :id:',
                'bind'       => ['id' => $collectionId]
            ])->delete();

            // Удаляем коллекцию
            if (!$collection->delete()) {
                $transaction->rollback('Cannot delete collection');
                return false;
            }

            $transaction->commit();
            return true;

        } catch (\Exception $e) {
            $transaction->rollback($e->getMessage());
            return false;
        }
    }

    /**
     * Добавить карточку в коллекцию
     */
    public function addCard(string $collectionId, string $cardId, User $user): array
    {
        $collection = Collection::findFirst([
            'conditions' => 'id = :id:',
            'bind'       => [
                'id' => $collectionId,
            ]
        ]);

        if (!$collection || !$collection->isOwner($user->id)) {
            return [
                'success' => false,
                'message' => 'Collection not found or access denied'
            ];
        }

        // Проверка существования карточки
        $card = Card::findFirst([
            'conditions' => 'id = :id:',
            'bind'       => [
                'id' => $cardId,
            ]
        ]);
        if (!$card || ($card->creator_id !== $user->id && !$card->is_public)) {
            return [
                'success' => false,
                'message' => 'Card not found or access denied'
            ];
        }

        // Проверка дубликата
        $exists = CollectionCard::findFirst([
            'conditions' => 'collection_id = :collectionId: AND card_id = :cardId:',
            'bind'       => [
                'collectionId' => $collectionId,
                'cardId'       => $cardId,
            ]
        ]);

        if ($exists) {
            return [
                'success' => false,
                'message' => 'Card already in collection'
            ];
        }

        // Добавление карточки
        $collectionCard                = new CollectionCard();
        $collectionCard->collection_id = $collectionId;
        $collectionCard->card_id       = $cardId;

        if ($collectionCard->save()) {
            return [
                'success' => true,
                'message' => 'Card added to collection'
            ];
        }

        return [
            'success' => false,
            'message' => 'Error adding card to collection'
        ];
    }

    /**
     * Удалить карточку из коллекции
     */
    public function removeCard(string $collectionId, string $cardId, User $user): bool
    {
        $collection = Collection::findFirst([
            'conditions' => 'id = :id:',
            'bind'       => [
                'id' => $collectionId,
            ]
        ]);

        if (!$collection || !$collection->isOwner($user->id)) {
            return false;
        }

        $collectionCard = CollectionCard::findFirst([
            'conditions' => 'collection_id = :collectionId: AND card_id = :cardId:',
            'bind'       => [
                'collectionId' => $collectionId,
                'cardId'       => $cardId,
            ]
        ]);

        return $collectionCard && $collectionCard->delete();
    }

    /**
     * Поделиться коллекцией
     */
    public function share(string $collectionId, string $targetUserId, User $user, string $permission = 'read'): array
    {
        // Валидация permission
        $allowedPermissions = ['read', 'write', 'admin'];
        if (!in_array($permission, $allowedPermissions)) {
            return [
                'success' => false,
                'message' => 'Invalid permission type. Allowed values: read, write, admin'
            ];
        }

        $collection = Collection::findFirst([
            'conditions' => 'id = :id:',
            'bind'       => [
                'id' => $collectionId,
            ]
        ]);

        if (!$collection || !$collection->isOwner($user->id)) {
            return [
                'success' => false,
                'message' => 'Collection not found or access denied'
            ];
        }

        // Проверка дубликата
        $exists = UserCollection::findFirst([
            'conditions' => 'collection_id = :collectionId: AND user_id = :userId:',
            'bind'       => [
                'collectionId' => $collectionId,
                'userId'       => $targetUserId,
            ]
        ]);

        if ($exists) {
            return [
                'success' => false,
                'message' => 'Collection already shared with this user'
            ];
        }

        $userCollection                = new UserCollection();
        $userCollection->collection_id = $collectionId;
        $userCollection->user_id       = $targetUserId;
        $userCollection->permission    = $permission; // добавлено поле permission

        if ($userCollection->save()) {
            return [
                'success' => true,
                'message' => 'Collection shared successfully',
                'data'    => [
                    'collection_id' => $collectionId,
                    'user_id'       => $targetUserId,
                    'permission'    => $permission
                ]
            ];
        }

        return [
            'success' => false,
            'message' => 'Error sharing collection',
            'errors'  => $userCollection->getMessages(),
        ];
    }

    /**
     * Отозвать доступ
     */
    public function unshare(string $collectionId, string $targetUserId, User $user): bool
    {
        $collection = Collection::findFirst([
            'conditions' => 'id = :id:',
            'bind'       => [
                'id' => $collectionId,
            ]
        ]);

        if (!$collection || !$collection->isOwner($user->id)) {
            return false;
        }

        $userCollection = UserCollection::findFirst([
            'conditions' => 'collection_id = :collectionId: AND user_id = :userId:',
            'bind'       => [
                'collectionId' => $collectionId,
                'userId'       => $targetUserId,
            ]
        ]);

        return $userCollection && $userCollection->delete();
    }

    /**
     * Получить список пользователей с доступом
     */
    public function getSharedUsers(int $collectionId, int $userId): array|false
    {
        $collection = Collection::findFirst([
            'conditions' => 'id = :id:',
            'bind'       => [
                'id' => $collectionId,
            ]
        ]);

        if (!$collection || !$collection->isOwner($userId)) {
            return false;
        }

        $phql = "
            SELECT 
                u.id,
                u.username,
                u.email,
                uc.created_at as shared_at
            FROM App\Models\UserCollection uc
            JOIN App\Models\User u ON uc.user_id = u.id
            WHERE uc.collection_id = :collectionId:
            ORDER BY uc.created_at DESC
        ";

        $query = Collection::getModelsManager()->createQuery($phql);
        return $query->execute(['collectionId' => $collectionId])->toArray();
    }
}
