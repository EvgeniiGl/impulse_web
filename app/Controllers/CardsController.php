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
    /**
     * Максимальное количество приватных карточек на пользователя
     */
    private const int PRIVATE_CARDS_LIMIT = 10;

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
     * Подсчёт приватных карточек пользователя
     */
    private function countUserPrivateCards(string $userId): int
    {
        return (int)Card::count([
            'conditions' => 'creator_id = :creator_id: AND access_type = :access_type:',
            'bind'       => [
                'creator_id'  => $userId,
                'access_type' => Card::ACCESS_PRIVATE,
            ],
        ]);
    }

    /**
     * Создание карточки
     */
    public function createAction(): \Phalcon\Http\Response
    {
        try {
            $user = $this->getAuthenticatedUser();
            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Authentication required')
                ], 401);
            }

            $data = $this->request->getPost();
            $file = $this->request->getUploadedFiles();
            $file = !empty($file) ? $file[0] : null;

            if (!$file) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('File required')
                ], 422);
            }

            // Проверка лимита приватных карточек
            $accessType = $data['access_type'] ?? Card::ACCESS_PRIVATE;
            if ($accessType === Card::ACCESS_PRIVATE) {
                $privateCount = $this->countUserPrivateCards($user->id);
                if ($privateCount >= self::PRIVATE_CARDS_LIMIT) {
                    return $this->jsonResponse([
                        'success' => false,
                        'error'   => TranslationHelper::translate(
                            'Private cards limit reached',
                            ['%limit%' => self::PRIVATE_CARDS_LIMIT]
                        ),
                        'limit'   => self::PRIVATE_CARDS_LIMIT,
                        'current' => $privateCount,
                    ], 403);
                }
            }

            $request = new CreateCardRequest($data, $file);

            $card = $this->cardService->createCard($request, $user);

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
                    'title_color'         => $card->title_color ?? '#FFFFFF',
                    'collectionIds'       => $collectionIds,
                    'collections'         => $collections,
                    'created_at'          => $card->created_at,
                    'updated_at'          => $card->updated_at,
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

            $data          = $this->request->getPost();
            $newAccessType = $data['access_type'] ?? $card->access_type;

            // Проверка лимита приватных карточек:
            // срабатывает только если карточка переводится в private из другого типа
            if (
                $newAccessType === Card::ACCESS_PRIVATE
                && $card->access_type !== Card::ACCESS_PRIVATE
            ) {
                $privateCount = $this->countUserPrivateCards($user->id);
                if ($privateCount >= self::PRIVATE_CARDS_LIMIT) {
                    return $this->jsonResponse([
                        'success' => false,
                        'error'   => TranslationHelper::translate(
                            'Private cards limit reached',
                            ['%limit%' => self::PRIVATE_CARDS_LIMIT]
                        ),
                        'limit'   => self::PRIVATE_CARDS_LIMIT,
                        'current' => $privateCount,
                    ], 403);
                }
            }

            $file    = $this->request->getUploadedFiles();
            $file    = !empty($file) ? $file[0] : null;
            $request = new UpdateCardRequest($data, $file ?: null);

            $updatedCard = $this->cardService->updateCard($card, $request, $user);

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

            $creator    = $card->getCreator();
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
                    'title_color'         => $card->title_color ?? '#FFFFFF',
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
     * Получение карточек пользователя
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

            $page    = (int)$this->request->getQuery('page', 'int', 1);
            $perPage = (int)$this->request->getQuery('per_page', 'int', 12);
            $offset  = ($page - 1) * $perPage;

            $accessibleCards = $user->getMyCardsWithWriteAccess($offset, $perPage);
            $cards           = [];

            foreach ($accessibleCards as $cardData) {
                /** @var Card $card */
                $card          = $cardData['card'];
                $collectionIds = [];
                if (method_exists($card, 'getCollections')) {
                    foreach ($card->getCollections() as $collection) {
                        $collectionIds[] = $collection->id;
                    }
                }

                $creator    = $card->getCreator();
                $likesCount = CardLike::getCardLikesCount($card->id);
                $isLiked    = CardLike::isLiked($card->id, $user->id);

                $cards[] = [
                    'id'                  => $card->id,
                    'title'               => $card->title,
                    'description'         => $card->description,
                    'url'                 => $card->url,
                    'access_type'         => $card->access_type,
                    'creator_id'          => $card->creator_id,
                    'collectionIds'       => $collectionIds,
                    'show_title_on_image' => $card->show_title_on_image,
                    'title_color'         => $card->title_color ?? '#FFFFFF',
                    'creator'             => $creator ? [
                        'id'   => $creator->id,
                        'name' => $creator->name,
                    ] : null,
                    'likes_count'         => $likesCount,
                    'is_liked'            => $isLiked,
                    'created_at'          => $card->created_at,
                    'updated_at'          => $card->updated_at,
                ];
            }

            $total = count($accessibleCards);

            return $this->jsonResponse([
                'success' => true,
                'data'    => [
                    'cards'    => $cards,
                    'total'    => (int)$total,
                    'page'     => $page,
                    'per_page' => $perPage
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
     * Получение одной карточки
     */
    public function showAction(string $id): \Phalcon\Http\Response
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

            if (!$card->hasAccess($user)) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Access denied')
                ], 403);
            }

            $creator       = $card->getCreator();
            $collectionIds = [];
            $collections   = [];
            if (method_exists($card, 'getCollections')) {
                foreach ($card->getCollections() as $collection) {
                    $collectionIds[] = $collection->id;
                    $collections[]   = [
                        'id'   => $collection->id,
                        'name' => $collection->name,
                    ];
                }
            }

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
                    'title_color'         => $card->title_color ?? '#FFFFFF',
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
}