<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Exceptions\UnauthorizedException;
use App\Helpers\TranslationHelper;
use App\Requests\Card\CreateCardRequest;
use App\Requests\Card\UpdateCardRequest;
use App\Services\CardService;
use App\Models\Card;
use App\Models\CardLike;
use App\Models\User;
use App\Models\Collection;
use App\VO\Date;
use Exception;

class CardsController extends BaseController
{
    private CardService $cardService;

    /**
     * @throws UnauthorizedException
     */
    public function onConstruct(): void
    {
        $this->cardService = $this->di->get('cardService');
        parent::onConstruct();
    }

    /**
     * Создание карточки
     */
    public function createAction(): \Phalcon\Http\Response
    {
        try {
            // Получаем текущего пользователя из JWT
            $user = $this->getAuthenticatedUser();
            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Authentication required')
                ], 401);
            }

            // Получаем данные из запроса
            $data = $this->request->getPost();
            $file = $this->request->getUploadedFiles();
            $file = !empty($file) ? $file[0] : null;

            if (!$file) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('File required')
                ], 422);
            }

            $request = new CreateCardRequest($data, $file);

            // Создаем карточку
            $card = $this->cardService->createCard($request, $user);

            // Получаем информацию о коллекциях карточки
            $collections   = [];
            $collectionIds = [];
            if (method_exists($card, 'getCollections')) {
                $cardCollections = $card->getCollections();
                foreach ($cardCollections as $collection) {
                    $collectionIds[] = $collection->id;
                    $collections[]   = [
                        'id'          => $collection->id,
                        'name'        => $collection->name,
                        'description' => $collection->description,
                        'access_type' => $collection->access_type,
                        'created_at'  => $collection->created_at,
                        'updated_at'  => $collection->updated_at,
                    ];
                }
            }

            return $this->jsonResponse([
                'success' => true,
                'data'    => [
                    'id'                  => $card->id,
                    'title'               => $card->title,
                    'description'         => $card->description,
                    'url'                 => $card->url,
                    'object_path'         => $card->object_path,
                    'file_name'           => $card->file_name,
                    'original_name'       => $card->original_name,
                    'access_type'         => $card->access_type,
                    'is_active'           => $card->is_active,
                    'show_title_on_image' => $card->show_title_on_image,
                    'creator_id'          => $card->creator_id,
                    'creator'             => [
                        'id'    => $user->id,
                        'name'  => $user->name,
                        'email' => $user->email
                    ],
                    'collectionIds'       => $collectionIds,
                    'collections'         => $collections,
                    'collections_count'   => count($collections),
                    'likes_count'         => 0,
                    'is_liked'            => false,
                    'created_at'          => $card->created_at,
                    'updated_at'          => $card->updated_at,
                ]
            ], 201);

        } catch (Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Получение карточки по ID
     */
    public function getAction(string $id): \Phalcon\Http\Response
    {
        try {
            $user = $this->getAuthenticatedUser();
            $card = Card::findFirst([
                'conditions' => 'id = :id:',
                'bind'       => ['id' => $id]
            ]);

            if (!$card) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Card not found')
                ], 404);
            }

            // Проверяем доступ
            if (!$card->hasAccess($user)) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Access denied')
                ], 403);
            }

            // Получаем создателя
            $creator = $card->getCreator();

            // Получаем коллекции карточки
            $collections   = [];
            $collectionIds = [];
            if (method_exists($card, 'getCollections')) {
                $cardCollections = $card->getCollections();
                foreach ($cardCollections as $collection) {
                    $collectionIds[] = $collection->id;
                    $collections[]   = [
                        'id'          => $collection->id,
                        'name'        => $collection->name,
                        'description' => $collection->description,
                        'access_type' => $collection->access_type,
                    ];
                }
            }

            // Получаем информацию о лайках
            $likesCount = CardLike::getCardLikesCount($card->id);
            $isLiked    = $user ? CardLike::isLiked($card->id, $user->id) : false;

            $locale    = TranslationHelper::getLocale();
            $createdAt = Date::fromString($card->created_at);
            $updatedAt = Date::fromString($card->updated_at);
            return $this->jsonResponse([
                'success' => true,
                'data'    => [
                    'id'                  => $card->id,
                    'title'               => $card->title,
                    'description'         => $card->description,
                    'url'                 => $card->url,
                    'object_path'         => $card->object_path,
                    'file_name'           => $card->file_name,
                    'original_name'       => $card->original_name,
                    'access_type'         => $card->access_type,
                    'access_type_label'   => $card->getAccessTypeLabel(),
                    'is_active'           => $card->is_active,
                    'show_title_on_image' => $card->show_title_on_image,
                    'creator'             => $creator ? [
                        'id'    => $creator->id,
                        'name'  => $creator->name,
                        'email' => $creator->email
                    ] : null,
                    'collectionIds'       => $collectionIds,
                    'collections'         => $collections,
                    'collections_count'   => count($collections),
                    'likes_count'         => $likesCount,
                    'is_liked'            => $isLiked,
                    'created_at'          => $createdAt->toLocale('%day% %month% %year%', $locale),
                    'updated_at'          => $updatedAt->toLocale('%day% %month% %year%', $locale),
                ]
            ]);

        } catch (Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Получение всех карточек пользователя
     */
    public function indexAction(): \Phalcon\Http\Response
    {
        try {
            $user = $this->getAuthenticatedUser();
            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Authentication required')
                ], 401);
            }

            $page    = (int)($this->request->getQuery('page', 'int', 1));
            $perPage = (int)($this->request->getQuery('per_page', 'int', 12));

            // Получаем карточки с пагинацией
            $offset = ($page - 1) * $perPage;

            $cards = Card::find([
                'conditions' => 'creator_id = :user_id:',
                'bind'       => ['user_id' => $user->id],
                'order'      => 'created_at DESC',
                'limit'      => $perPage,
                'offset'     => $offset
            ]);

            $total = Card::count([
                'conditions' => 'creator_id = :user_id:',
                'bind'       => ['user_id' => $user->id]
            ]);

            $result = [];
            foreach ($cards as $card) {
                $collectionIds = [];
                if (method_exists($card, 'getCollections')) {
                    foreach ($card->getCollections() as $collection) {
                        $collectionIds[] = $collection->id;
                    }
                }

                // Получаем информацию о лайках
                $likesCount = CardLike::getCardLikesCount($card->id);
                $isLiked    = CardLike::isLiked($card->id, $user->id);

                $result[] = [
                    'id'                  => $card->id,
                    'title'               => $card->title,
                    'description'         => $card->description,
                    'url'                 => $card->url,
                    'access_type'         => $card->access_type,
                    'creator_id'          => $card->creator_id,
                    'collectionIds'       => $collectionIds,
                    'show_title_on_image' => $card->show_title_on_image,
                    'is_active'           => $card->is_active,
                    'likes_count'         => $likesCount,
                    'is_liked'            => $isLiked,
                    'created_at'          => $card->created_at,
                    'updated_at'          => $card->updated_at,
                ];
            }

            return $this->jsonResponse([
                'success' => true,
                'data'    => [
                    'cards' => $result,
                    'total' => $total,
                    'page'  => $page
                ]
            ]);

        } catch (Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Обновление карточки
     */
    public function updateAction(string $id): \Phalcon\Http\Response
    {
        try {
            $user = $this->getAuthenticatedUser();
            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Authentication required')
                ], 401);
            }

            $card = Card::findFirst([
                'conditions' => 'id = :id:',
                'bind'       => ['id' => $id]
            ]);

            if (!$card) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Card not found')
                ], 404);
            }

            $data    = $this->request->getPut();
            $file    = $this->request->getUploadedFiles();
            $file    = !empty($file) ? $file[0] : null;
            $request = new UpdateCardRequest($data, $file ? $file->toArray() : null);

            // Обновляем карточку
            $updatedCard = $this->cardService->updateCard($card, $request, $user);

            // Получаем обновленные коллекции
            $collections   = [];
            $collectionIds = [];
            if (method_exists($updatedCard, 'getCollections')) {
                $cardCollections = $updatedCard->getCollections();
                foreach ($cardCollections as $collection) {
                    $collectionIds[] = $collection->id;
                    $collections[]   = [
                        'id'   => $collection->id,
                        'name' => $collection->name,
                    ];
                }
            }

            $creator = $card->getCreator();

            // Получаем информацию о лайках
            $likesCount = CardLike::getCardLikesCount($card->id);
            $isLiked    = CardLike::isLiked($card->id, $user->id);

            $locale    = TranslationHelper::getLocale();
            $createdAt = Date::fromString($card->created_at);
            $updatedAt = Date::fromString($card->updated_at);

            return $this->jsonResponse([
                'success' => true,
                'data'    => [
                    'id'                  => $card->id,
                    'title'               => $card->title,
                    'description'         => $card->description,
                    'url'                 => $card->url,
                    'object_path'         => $card->object_path,
                    'file_name'           => $card->file_name,
                    'original_name'       => $card->original_name,
                    'access_type'         => $card->access_type,
                    'access_type_label'   => $card->getAccessTypeLabel(),
                    'is_active'           => $card->is_active,
                    'show_title_on_image' => $card->show_title_on_image,
                    'creator'             => $creator ? [
                        'id'    => $creator->id,
                        'name'  => $creator->name,
                        'email' => $creator->email
                    ] : null,
                    'collectionIds'       => $collectionIds,
                    'collections'         => $collections,
                    'collections_count'   => count($collections),
                    'likes_count'         => $likesCount,
                    'is_liked'            => $isLiked,
                    'created_at'          => $createdAt->toLocale('%day% %month% %year%', $locale),
                    'updated_at'          => $updatedAt->toLocale('%day% %month% %year%', $locale),
                ]
            ]);

        } catch (Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Удаление карточки
     */
    public function deleteAction(string $id): \Phalcon\Http\Response
    {
        try {
            $user = $this->getAuthenticatedUser();
            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Authentication required')],
                    401);
            }

            $card = Card::findFirst([
                'conditions' => 'id = :id:',
                'bind'       => ['id' => $id]
            ]);

            if (!$card) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Card not found')
                ], 404);
            }

            $this->cardService->deleteCard($card, $user);

            return $this->jsonResponse([
                'success' => true,
                'message' => TranslationHelper::translate('Card deleted successfully')
            ]);

        } catch (Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Получение карточек пользователя: созданные им + с правом записи (write/admin)
     */
    public function myAction(): \Phalcon\Http\Response
    {
        try {
            $user = $this->getAuthenticatedUser();
            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Authentication required')
                ], 401);
            }

            $accessibleCards = $user->getMyCardsWithWriteAccess();
            $cards           = [];

            foreach ($accessibleCards as $cardData) {
                /** @var Card $card */
                $card = $cardData['card'];

                // Получаем только ID коллекций карточки
                $collectionIds = [];
                if (method_exists($card, 'getCollections')) {
                    $cardCollections = $card->getCollections();
                    foreach ($cardCollections as $collection) {
                        $collectionIds[] = $collection->id;
                    }
                }

                // Получаем информацию о лайках
                $likesCount = CardLike::getCardLikesCount($card->id);
                $isLiked    = CardLike::isLiked($card->id, $user->id);

                $cards[] = [
                    'id'                  => $card->id,
                    'title'               => $card->title,
                    'description'         => $card->description,
                    'url'                 => $card->url,
                    'access_type'         => $card->access_type,
                    'access_type_label'   => $card->getAccessTypeLabel(),
                    'access_level'        => $cardData['permission'],
                    'is_owner'            => $cardData['access_type'] === 'owner',
                    'creator_id'          => $card->creator_id,
                    'collectionIds'       => $collectionIds,
                    'collections_count'   => count($collectionIds),
                    'likes_count'         => $likesCount,
                    'is_liked'            => $isLiked,
                    'created_at'          => $card->created_at,
                    'updated_at'          => $card->updated_at,
                    'show_title_on_image' => $card->show_title_on_image,
                    'is_active'           => $card->is_active,
                ];
            }

            // Сортировка: сначала свои, затем по дате создания (новые выше)
            usort($cards, function ($a, $b) {
                if ($a['is_owner'] !== $b['is_owner']) {
                    return $b['is_owner'] <=> $a['is_owner']; // Свои в начало
                }
                return strtotime($b['created_at']) <=> strtotime($a['created_at']);
            });

            return $this->jsonResponse([
                'success' => true,
                'data'    => [
                    'cards' => $cards,
                    'total' => count($cards)
                ]
            ]);

        } catch (Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}