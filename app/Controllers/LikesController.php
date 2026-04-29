<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Helpers\TranslationHelper;
use App\Models\Card;
use App\Models\CardLike;
use App\Models\Collection;
use App\Models\CollectionLike;

class LikesController extends BaseController
{
    /**
     * POST /api/cards/{id}/like
     * Поставить/снять лайк карточке
     */
    public function toggleCardLikeAction(string $id)
    {
        $user = $this->getAuthenticatedUser();

        if (!$user) {
            return $this->response
                ->setStatusCode(401)
                ->setJsonContent([
                    'success' => false,
                    'message' => TranslationHelper::translate('Unauthorized')
                ]);
        }

        $card = Card::findFirst([
            'conditions' => 'id = :id:',
            'bind'       => ['id' => $id]
        ]);

        if (!$card) {
            return $this->response
                ->setStatusCode(404)
                ->setJsonContent([
                    'success' => false,
                    'message' => TranslationHelper::translate('Card not found')
                ]);
        }

        $existingLike = CardLike::findFirst([
            'conditions' => 'card_id = :card_id: AND user_id = :user_id:',
            'bind'       => [
                'card_id' => $id,
                'user_id' => $user->id
            ]
        ]);

        if ($existingLike) {
            if (!$existingLike->delete()) {
                return $this->response
                    ->setStatusCode(500)
                    ->setJsonContent([
                        'success' => false,
                        'message' => TranslationHelper::translate('Failed to remove like')
                    ]);
            }

            $likesCount = CardLike::getCardLikesCount($id);

            return $this->response->setJsonContent([
                'success'     => true,
                'liked'       => false,
                'likes_count' => $likesCount,
                'message'     => TranslationHelper::translate('Like removed')
            ]);
        }

        $like          = new CardLike();
        $like->card_id = $id;
        $like->user_id = $user->id;

        if (!$like->save()) {
            return $this->response
                ->setStatusCode(500)
                ->setJsonContent([
                    'success' => false,
                    'message' => TranslationHelper::translate('Failed to add like')
                ]);
        }

        $likesCount = CardLike::getCardLikesCount($id);

        return $this->response->setJsonContent([
            'success'     => true,
            'liked'       => true,
            'likes_count' => $likesCount,
            'message'     => TranslationHelper::translate('Like added')
        ]);
    }

    /**
     * GET /api/cards/{id}/like
     * Получить статус лайка карточки
     */
    public function getCardLikeStatusAction(string $id)
    {
        $user = $this->getAuthenticatedUser();

        $card = Card::findFirst([
            'conditions' => 'id = :id:',
            'bind'       => ['id' => $id]
        ]);

        if (!$card) {
            return $this->response
                ->setStatusCode(404)
                ->setJsonContent([
                    'success' => false,
                    'message' => TranslationHelper::translate('Card not found')
                ]);
        }

        $likesCount = CardLike::getCardLikesCount($id);
        $isLiked    = $user ? CardLike::isLiked($id, $user->id) : false;

        return $this->response->setJsonContent([
            'success'     => true,
            'liked'       => $isLiked,
            'likes_count' => $likesCount
        ]);
    }

    /**
     * POST /api/collections/{id}/like
     * Поставить/снять лайк коллекции
     */
    public function toggleCollectionLikeAction(string $id)
    {
        $user = $this->getAuthenticatedUser();

        if (!$user) {
            return $this->response
                ->setStatusCode(401)
                ->setJsonContent([
                    'success' => false,
                    'message' => TranslationHelper::translate('Unauthorized')
                ]);
        }

        $collection = Collection::findFirst([
            'conditions' => 'id = :id:',
            'bind'       => ['id' => $id]
        ]);

        if (!$collection) {
            return $this->response
                ->setStatusCode(404)
                ->setJsonContent([
                    'success' => false,
                    'message' => TranslationHelper::translate('Collection not found')
                ]);
        }

        $existingLike = CollectionLike::findFirst([
            'conditions' => 'collection_id = :collection_id: AND user_id = :user_id:',
            'bind'       => [
                'collection_id' => $id,
                'user_id'       => $user->id
            ]
        ]);

        if ($existingLike) {
            if (!$existingLike->delete()) {
                return $this->response
                    ->setStatusCode(500)
                    ->setJsonContent([
                        'success' => false,
                        'message' => TranslationHelper::translate('Failed to remove like')
                    ]);
            }

            $likesCount = CollectionLike::getCollectionLikesCount($id);

            return $this->response->setJsonContent([
                'success'     => true,
                'liked'       => false,
                'likes_count' => $likesCount,
                'message'     => TranslationHelper::translate('Like removed')
            ]);
        }

        $like                = new CollectionLike();
        $like->collection_id = $id;
        $like->user_id       = $user->id;

        if (!$like->save()) {
            return $this->response
                ->setStatusCode(500)
                ->setJsonContent([
                    'success' => false,
                    'message' => TranslationHelper::translate('Failed to add like')
                ]);
        }

        $likesCount = CollectionLike::getCollectionLikesCount($id);

        return $this->response->setJsonContent([
            'success'     => true,
            'liked'       => true,
            'likes_count' => $likesCount,
            'message'     => TranslationHelper::translate('Like added')
        ]);
    }

    /**
     * GET /api/collections/{id}/like
     * Получить статус лайка коллекции
     */
    public function getCollectionLikeStatusAction(string $id)
    {
        $user = $this->getAuthenticatedUser();

        $collection = Collection::findFirst([
            'conditions' => 'id = :id:',
            'bind'       => ['id' => $id]
        ]);

        if (!$collection) {
            return $this->response
                ->setStatusCode(404)
                ->setJsonContent([
                    'success' => false,
                    'message' => TranslationHelper::translate('Collection not found')
                ]);
        }

        $likesCount = CollectionLike::getCollectionLikesCount($id);
        $isLiked    = $user ? CollectionLike::isLiked($id, $user->id) : false;

        return $this->response->setJsonContent([
            'success'     => true,
            'liked'       => $isLiked,
            'likes_count' => $likesCount
        ]);
    }

    /**
     * GET /api/cards/liked
     */
    public function getLikedCardsAction()
    {
        $user = $this->getAuthenticatedUser();

        if (!$user) {
            return $this->response
                ->setStatusCode(401)
                ->setJsonContent([
                    'success' => false,
                    'message' => TranslationHelper::translate('Unauthorized')
                ]);
        }

        $page       = (int)$this->request->getQuery('page', 'int', 1);
        $perPage    = (int)$this->request->getQuery('per_page', 'int', 12);
        $offset     = ($page - 1) * $perPage;
        $conditions = 'user_id = :user_id:';

        $excludeIds = array_unique(array_merge(
            \App\Models\HiddenCard::getHiddenCardIds($user->id),
            \App\Models\CardReport::getReportedCardIds($user->id)
        ));
        if (!empty($excludeIds)) {
            $placeholders = implode(',', array_map(fn($id) => "'$id'", $excludeIds));
            $conditions   .= " AND card_id NOT IN ($placeholders)";
        }

        $likes = CardLike::find([
            'conditions' => $conditions,
            'bind'       => ['user_id' => $user->id],
            'order'      => 'created_at DESC',
            'limit'      => $perPage,
            'offset'     => $offset
        ]);

        $total = CardLike::count([
            'conditions' => $conditions,
            'bind'       => ['user_id' => $user->id]
        ]);

        $cards = [];
        foreach ($likes as $like) {
            $card          = $like->getCard();
            $creator       = $card->getCreator();
            $collectionIds = [];
            if (method_exists($card, 'getCollections')) {
                foreach ($card->getCollections() as $collection) {
                    $collectionIds[] = $collection->id;
                }
            }
            if ($card) {
                $cards[] = [
                    'id'                  => $card->id,
                    'title'               => $card->title,
                    'description'         => $card->description,
                    'url'                 => $card->url,
                    'access_type'         => $card->access_type,
                    'creator_id'          => $card->creator_id,
                    'liked_at'            => $like->created_at,
                    'likes_count'         => CardLike::getCardLikesCount($card->id),
                    'collectionIds'       => $collectionIds,
                    'show_title_on_image' => $card->show_title_on_image,
                    'title_color'         => $card->title_color ?? '#FFFFFF',
                    'creator'             => $creator ? [
                        'id'   => $creator->id,
                        'name' => $creator->name,
                    ] : null,
                    'is_liked'            => true,
                    'created_at'          => $card->created_at,
                    'updated_at'          => $card->updated_at,
                ];
            }
        }

        return $this->response->setJsonContent([
            'success' => true,
            'data'    => [
                'cards' => $cards,
                'total' => $total,
                'page'  => $page
            ]
        ]);
    }

    /**
     * GET /api/collections/liked
     */
    public function getLikedCollectionsAction()
    {
        $user = $this->getAuthenticatedUser();

        if (!$user) {
            return $this->response
                ->setStatusCode(401)
                ->setJsonContent([
                    'success' => false,
                    'message' => TranslationHelper::translate('Unauthorized')
                ]);
        }

        $page    = (int)$this->request->getQuery('page', 'int', 1);
        $perPage = (int)$this->request->getQuery('per_page', 'int', 12);
        $offset  = ($page - 1) * $perPage;

        $likes = CollectionLike::find([
            'conditions' => 'user_id = :user_id:',
            'bind'       => ['user_id' => $user->id],
            'order'      => 'created_at DESC',
            'limit'      => $perPage,
            'offset'     => $offset
        ]);

        $total = CollectionLike::count([
            'conditions' => 'user_id = :user_id:',
            'bind'       => ['user_id' => $user->id]
        ]);

        $collections = [];
        foreach ($likes as $like) {
            $collection = $like->getCollection();
            if ($collection) {
                $collections[] = [
                    'id'          => $collection->id,
                    'name'        => $collection->name,
                    'access_type' => $collection->access_type,
                    'creator_id'  => $collection->creator_id,
                    'liked_at'    => $like->created_at,
                    'likes_count' => CollectionLike::getCollectionLikesCount($collection->id)
                ];
            }
        }

        return $this->response->setJsonContent([
            'success' => true,
            'data'    => [
                'collections' => $collections,
                'total'       => $total,
                'page'        => $page
            ]
        ]);
    }
}