<?php
declare(strict_types=1);

namespace App\Services;

use App\Models\CardLike;
use App\Models\User;
use App\Repositories\CardRepository;

class HomeService
{
    private CardRepository $cardRepository;

    public function __construct(CardRepository $cardRepository)
    {
        $this->cardRepository = $cardRepository;
    }

    /**
     * Получить последние публичные карточки для главной страницы
     *
     * @param int $page
     * @param int $perPage
     * @param User|null $currentUser Текущий пользователь для определения is_liked
     * @return array
     */
    public function getPublicCards(int $page = 1, int $perPage = 12, ?User $currentUser = null): array
    {
        $excludeIds = $currentUser ? \App\Models\HiddenCard::getHiddenCardIds($currentUser->id) : [];
        $result     = $this->cardRepository->getPublicCards($page, $perPage, $excludeIds);
        return $this->formatCards($result, $currentUser);
    }

    /**
     * Поиск публичных карточек по title, description, creator name
     *
     * @param string $query
     * @param int $page
     * @param int $perPage
     * @param User|null $currentUser Текущий пользователь для определения is_liked
     * @return array
     */
    public function searchCards(string $query, int $page = 1, int $perPage = 12, ?User $currentUser = null): array
    {
        if (empty(trim($query))) {
            return $this->getPublicCards($page, $perPage, $currentUser);
        }

        $excludeIds = $currentUser ? \App\Models\HiddenCard::getHiddenCardIds($currentUser->id) : [];
        $result     = $this->cardRepository->searchPublicCards($query, $page, $perPage, $excludeIds);
        return $this->formatCards($result, $currentUser);
    }

    /**
     * Форматирует результат в стандартный ответ
     *
     * @param array $result
     * @param User|null $currentUser
     */
    private function formatCards(array $result, ?User $currentUser = null): array
    {
        $cards     = $result['cards'];
        $formatted = [];

        foreach ($cards as $card) {
            $creator      = null;
            $creatorModel = User::findFirst([
                'conditions' => 'id = :id:',
                'bind'       => ['id' => $card->creator_id],
            ]);

            if ($creatorModel) {
                $creator = [
                    'id'   => $creatorModel->id,
                    'name' => $creatorModel->name,
                ];
            }

            $collectionIds = [];
            if (method_exists($card, 'getCollections')) {
                foreach ($card->getCollections() as $collection) {
                    $collectionIds[] = $collection->id;
                }
            }

            // Получаем информацию о лайках
            $likesCount = CardLike::getCardLikesCount($card->id);
            $isLiked    = $currentUser ? CardLike::isLiked($card->id, $currentUser->id) : false;

            $formatted[] = [
                'id'                  => $card->id,
                'title'               => $card->title,
                'description'         => $card->description,
                'url'                 => $card->url,
                'access_type'         => $card->access_type,
                'creator_id'          => $card->creator_id,
                'creator'             => $creator,
                'collectionIds'       => $collectionIds,
                'show_title_on_image' => $card->show_title_on_image,
                'is_active'           => $card->is_active,
                'likes_count'         => $likesCount,
                'is_liked'            => $isLiked,
                'created_at'          => $card->created_at,
                'updated_at'          => $card->updated_at,
            ];
        }

        return [
            'success' => true,
            'data'    => [
                'cards'    => $formatted,
                'total'    => $result['total'],
                'page'     => $result['page'],
                'per_page' => count($formatted),
            ],
        ];
    }
}