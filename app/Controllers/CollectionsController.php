<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Exceptions\UnauthorizedException;
use App\Helpers\TranslationHelper;
use App\Models\Collection;
use App\Requests\Collection\MoveCardRequest;
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
     * GET /api/collections/my
     */
    public function myAction()
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
     *
     * Query params:
     *   page     (int, default 1)   – page number
     *   per_page (int, default 12)  – items per page (max 100)
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

        $page    = (int)$this->request->getQuery('page', 'int', 1);
        $perPage = (int)$this->request->getQuery('per_page', 'int', 12);

        // Clamp to safe bounds (mirrors getLikedCardsAction pattern)
        $page    = max(1, $page);
        $perPage = max(1, min(100, $perPage));

        try {
            $collection = (new \App\Models\Collection())->getWithCards($id, $user, $page, $perPage);
        } catch (\Throwable $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => TranslationHelper::translate('Internal server error')
            ], 500);
        }

        if (!$collection) {
            return $this->response
                ->setStatusCode(404)
                ->setJsonContent([
                    'success' => false,
                    'message' => TranslationHelper::translate('Collection not found')
                ]);
        }

        // Pull pagination metadata out of the data array so the response
        // envelope matches the shape used by getLikedCardsAction / getLikedCollectionsAction.
        $cards   = $collection['cards'] ?? [];
        $total   = $collection['total'] ?? 0;
        $retPage = $collection['page'] ?? $page;
        $perP    = $collection['per_page'] ?? $perPage;

        // Remove inline pagination keys – they live in the envelope now.
        unset($collection['total'], $collection['page'], $collection['per_page']);

        return $this->response->setJsonContent([
            'success' => true,
            'data'    => [
                'collection' => $collection,
                'cards'      => $cards,
                'total'      => (int)$total,
                'page'       => (int)$retPage,
                'per_page'   => (int)$perP,
            ]
        ]);
    }

    /**
     * POST /api/collections
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

        $data = $this->request->getJsonRawBody(true);

        $exists = $this->collectionService->exists($data['name'], $user->id);
        if ($exists) {
            return $this->response
                ->setStatusCode(409)
                ->setJsonContent([
                    'success' => false,
                    'message' => TranslationHelper::translate('Collection already exists')
                ]);
        }

        $collection = $this->collectionService->create($data, $user);

        if (!$collection) {
            return $this->response
                ->setStatusCode(500)
                ->setJsonContent([
                    'success' => false,
                    'message' => TranslationHelper::translate('Error creating collection')
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
     */
    public function updateAction(string $id)
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

        $data       = $this->request->getJsonRawBody(true);
        $collection = $this->collectionService->update($id, $data, $user);

        if (!$collection) {
            return $this->response
                ->setStatusCode(404)
                ->setJsonContent([
                    'success' => false,
                    'message' => TranslationHelper::translate('Collection not found or access denied')
                ]);
        }

        return $this->response->setJsonContent([
            'success' => true,
            'data'    => $collection->toArray()
        ]);
    }

    /**
     * DELETE /api/collections/{id}
     */
    public function deleteAction(string $id)
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
                    'message' => TranslationHelper::translate('Collection not found or access denied')
                ]);
        }

        return $this->response->setJsonContent([
            'success' => true,
            'message' => TranslationHelper::translate('Collection deleted successfully')
        ]);
    }

    /**
     * POST /api/collections/{id}/cards
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

        $result     = $this->collectionService->addCard($id, $req->get('card_id'), $user);
        $statusCode = $result['success'] ? 201 : 400;

        return $this->response
            ->setStatusCode($statusCode)
            ->setJsonContent($result);
    }

    /**
     * DELETE /api/collections/{id}/cards/{cardId}
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
                    'message' => TranslationHelper::translate('Card not found in collection or access denied')
                ]);
        }

        return $this->response->setJsonContent([
            'success' => true,
            'message' => TranslationHelper::translate('Card removed from collection')
        ]);
    }

    /**
     * POST /api/collections/{id}/share
     */
    public function shareAction(string $id)
    {
        $request = new ShareCollectionRequest();
        $user    = $this->getAuthenticatedUser();
        $data    = $this->request->getJsonRawBody(true);

        $result = $this->collectionService->share(
            $id,
            $request->get('user_id'),
            $user,
            $request->get('permission', 'read'),
        );

        $statusCode = $result['success'] ? 200 : 400;

        return $this->response
            ->setStatusCode($statusCode)
            ->setJsonContent($result);
    }

    public function moveCardAction(string $id): \Phalcon\Http\Response|\Phalcon\Http\ResponseInterface
    {
        $user = $this->getAuthenticatedUser();

        if (!$user) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => TranslationHelper::translate('Authentication required')
            ], 401);
        }

        $req           = new MoveCardRequest();
        $collectionIds = $req->getCollectionIds();

        $result     = $this->collectionService->moveCard($id, $collectionIds, $user);
        $statusCode = $result['success'] ? 200 : 400;

        return $this->response
            ->setStatusCode($statusCode)
            ->setJsonContent($result);
    }
}