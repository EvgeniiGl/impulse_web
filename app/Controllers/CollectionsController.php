<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Exceptions\UnauthorizedException;
use App\Helpers\TranslationHelper;
use App\Models\Collection;
use App\Services\CollectionService;
use App\Requests\Collection\CreateCollectionRequest;
use App\Requests\Collection\UpdateCollectionRequest;
use App\Requests\Collection\AddCardRequest;
use App\Requests\Collection\ShareCollectionRequest;

class CollectionsController extends BaseController
{
    private CollectionService $collectionService;

    /**
     * @throws UnauthorizedException
     */
    public function onConstruct(): void
    {
        $this->collectionService = $this->di->get('collectionService');
        parent::onConstruct();
    }

    /**
     * GET /api/collections
     * Получить все коллекции пользователя
     */
    public function indexAction()
    {
        $user        = $this->getAuthenticatedUser();
        $collections = (new Collection())->getUserCollections($user);

        return $this->response->setJsonContent([
            'success' => true,
            'data'    => $collections
        ]);
    }

    /**
     * GET /api/collections/{id}
     * Получить коллекцию по ID
     */
    public function showAction(string $id): \Phalcon\Http\ResponseInterface
    {
        $user = $this->getAuthenticatedUser();
        if (!$user) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => TranslationHelper::translate('Authentication required')
            ], 401);
        }
        $collection = Collection::getWithCards($id, $user);

        if (!$collection) {
            return $this->response
                ->setStatusCode(404)
                ->setJsonContent([
                    'success' => false,
                    'message' => 'Collection not found'
                ]);
        }

        return $this->response->setJsonContent([
            'success' => true,
            'data'    => $collection
        ]);
    }

    /**
     * POST /api/collections
     * Создать коллекцию
     */
    public function createAction()
    {
        $req = new CreateCollectionRequest();
        if (!$req->validate()) {
            $errors = [];
            foreach ($req->messages() as $message) {
                $errors[] = $message->getMessage();
            }

            return $this->jsonResponse([
                'success' => false,
                'errors'  => $errors
            ], 422);
        }

        $user = $this->getAuthenticatedUser();
        if (!$user) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => TranslationHelper::translate('Authentication required')
            ], 401);
        }

        $data       = $this->request->getJsonRawBody(true);
        $collection = $this->collectionService->create($data, $user);

        if (!$collection) {
            return $this->response
                ->setStatusCode(500)
                ->setJsonContent([
                    'success' => false,
                    'message' => 'Error creating collection'
                ]);
        }

        return $this->response
            ->setStatusCode(201)
            ->setJsonContent([
                'success' => true,
                'data'    => $collection->toArray()
            ]);
    }

    /**
     * PUT /api/collections/{id}
     * Обновить коллекцию
     */
    public function updateAction(int $id)
    {
        $request = new UpdateCollectionRequest();

        if (!$request->validate($this->request->getJsonRawBody(true))) {
            return $this->response
                ->setStatusCode(400)
                ->setJsonContent([
                    'success' => false,
                    'errors'  => $request->getErrors()
                ]);
        }

        $user = $this->getAuthenticatedUser();
        if (!$user) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => TranslationHelper::translate('Authentication required')
            ], 401);
        }
        $data = $this->request->getJsonRawBody(true);

        $collection = $this->collectionService->update($id, $data, $user);

        if (!$collection) {
            return $this->response
                ->setStatusCode(404)
                ->setJsonContent([
                    'success' => false,
                    'message' => 'Collection not found or access denied'
                ]);
        }

        return $this->response->setJsonContent([
            'success' => true,
            'data'    => $collection->toArray()
        ]);
    }

    /**
     * DELETE /api/collections/{id}
     * Удалить коллекцию
     */
    public function deleteAction(int $id)
    {
        $user = $this->getAuthenticatedUser();
        if (!$user) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => TranslationHelper::translate('Authentication required')
            ], 401);
        }
        $result = $this->collectionService->delete($id, $user);

        if (!$result) {
            return $this->response
                ->setStatusCode(404)
                ->setJsonContent([
                    'success' => false,
                    'message' => 'Collection not found or access denied'
                ]);
        }

        return $this->response->setJsonContent([
            'success' => true,
            'message' => 'Collection deleted successfully'
        ]);
    }

    /**
     * POST /api/collections/{id}/cards
     * Добавить карточку в коллекцию
     */
    public function addCardAction(string $id): \Phalcon\Http\Response|\Phalcon\Http\ResponseInterface
    {
        $req  = new AddCardRequest();
        $user = $this->getAuthenticatedUser();
        if (!$user) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => TranslationHelper::translate('Authentication required')
            ], 401);
        }
        $data = $this->request->getJsonRawBody(true);

        $result = $this->collectionService->addCard($id, $req->get('card_id'), $user);

        $statusCode = $result['success'] ? 201 : 400;

        return $this->response
            ->setStatusCode($statusCode)
            ->setJsonContent($result);
    }

    /**
     * DELETE /api/collections/{id}/cards/{cardId}
     * Удалить карточку из коллекции
     */
    public function removeCardAction(string $id, string $cardId)
    {
        $user   = $this->getAuthenticatedUser();
        $result = $this->collectionService->removeCard($id, $cardId, $user);

        if (!$result) {
            return $this->response
                ->setStatusCode(404)
                ->setJsonContent([
                    'success' => false,
                    'message' => 'Card not found in collection or access denied'
                ]);
        }

        return $this->response->setJsonContent([
            'success' => true,
            'message' => 'Card removed from collection'
        ]);
    }

    /**
     * POST /api/collections/{id}/share
     * Поделиться коллекцией
     */
    public function shareAction(int $id)
    {
        $request = new ShareCollectionRequest();

        if (!$request->validate($this->request->getJsonRawBody(true))) {
            return $this->response
                ->setStatusCode(400)
                ->setJsonContent([
                    'success' => false,
                    'errors'  => $request->getErrors()
                ]);
        }

        $user = $this->getAuthenticatedUser();
        $data = $this->request->getJsonRawBody(true);

        $result = $this->collectionService->share($id, $request->get('user_id'), $user);

        $statusCode = $result['success'] ? 200 : 400;

        return $this->response
            ->setStatusCode($statusCode)
            ->setJsonContent($result);
    }

    /**
     * DELETE /api/collections/{id}/share/{userId}
     * Отозвать доступ к коллекции
     */
    public function unshareAction(int $id, int $userId)
    {
        $currentUserId = $this->auth->getUserId();
        $result        = $this->collectionService->unshare($id, $userId, $currentUserId);

        if (!$result) {
            return $this->response
                ->setStatusCode(404)
                ->setJsonContent([
                    'success' => false,
                    'message' => 'Shared access not found or access denied'
                ]);
        }

        return $this->response->setJsonContent([
            'success' => true,
            'message' => 'Access revoked successfully'
        ]);
    }

    /**
     * GET /api/collections/{id}/shared-users
     * Получить список пользователей с доступом
     */
    public function sharedUsersAction(int $id)
    {
        $userId = $this->auth->getUserId();
        $users  = $this->collectionService->getSharedUsers($id, $userId);

        if ($users === false) {
            return $this->response->setStatusCode(403)
                ->setJsonContent([
                    'success' => false,
                    'message' => 'Access denied'
                ]);
        }

        return $this->response->setJsonContent([
            'success' => true,
            'data'    => $users
        ]);
    }
}
