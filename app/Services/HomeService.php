<?php
declare(strict_types=1);

namespace App\Services;

use App\Models\Card;
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
     */
    public function getPublicCards(int $page = 1, int $perPage = 12): array
    {
        $result = $this->cardRepository->getPublicCards($page, $perPage);
        return $this->formatCards($result);
    }

    /**
     * Поиск публичных карточек по title, description, creator name
     */
    public function searchCards(string $query, int $page = 1, int $perPage = 12): array
    {
        if (empty(trim($query))) {
            return $this->getPublicCards($page, $perPage);
        }

        $result = $this->cardRepository->searchPublicCards($query, $page, $perPage);
        return $this->formatCards($result);
    }

    /**
     * Форматирует результат в стандартный ответ
     */
    private function formatCards(array $result): array
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

            $formatted[] = [
                'id'                  => $card->id,
                'title'               => $card->title,
                'description'         => $card->description,
                'url'                 => $card->url,
                'access_type'         => $card->access_type,
                'is_active'           => $card->is_active,
                'show_title_on_image' => $card->show_title_on_image,
                'creator_id'          => $card->creator_id,
                'creator'             => $creator,
                'collectionIds'       => $collectionIds,
                'created_at'          => $card->created_at,
                'updated_at'          => $card->updated_at,
                'object_path'         => $card->object_path,
                'file_name'           => $card->file_name,
                'original_name'       => $card->original_name,
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