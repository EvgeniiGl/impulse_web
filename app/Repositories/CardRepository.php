<?php
declare(strict_types=1);

namespace App\Repositories;

use App\Models\Card;
use Phalcon\Mvc\Model\Resultset\Simple;

class CardRepository
{
    /**
     * Получить последние публичные карточки с данными автора
     */
    public function getPublicCards(int $page = 1, int $perPage = 12): array
    {
        $offset = ($page - 1) * $perPage;

        $phql = "
            SELECT c.*, u.name as creator_name
            FROM App\Models\Card c
            LEFT JOIN App\Models\User u ON c.creator_id = u.id
            WHERE c.access_type = 'public' AND c.is_active = true
            ORDER BY c.created_at DESC
            LIMIT :limit: OFFSET :offset:
        ";

        $cards = Card::query()
            ->where("access_type = 'public' AND is_active = true")
            ->orderBy('created_at DESC')
            ->limit($perPage, $offset)
            ->execute();

        $total = Card::count([
            'conditions' => "access_type = 'public' AND is_active = true"
        ]);

        return [
            'cards' => $cards,
            'total' => (int)$total,
            'page'  => $page,
        ];
    }

    /**
     * Поиск по публичным карточкам: title, description, creator name
     */
    public function searchPublicCards(string $query, int $page = 1, int $perPage = 12): array
    {
        $offset     = ($page - 1) * $perPage;
        $searchTerm = '%' . trim($query) . '%';

        // Получаем IDs пользователей, чьи имена совпадают
        $userIds = \App\Models\User::find([
            'conditions' => 'name LIKE :name:',
            'bind'       => ['name' => $searchTerm],
            'columns'    => 'id',
        ]);

        $userIdList = [];
        foreach ($userIds as $u) {
            $userIdList[] = "'" . $u->id . "'";
        }

        $userCondition = '';
        if (!empty($userIdList)) {
            $userCondition = " OR creator_id IN (" . implode(',', $userIdList) . ")";
        }

        $conditions = "access_type = 'public' AND is_active = true AND (title LIKE :search: OR description LIKE :search2:" . $userCondition . ")";

        $cards = Card::find([
            'conditions' => $conditions,
            'bind'       => [
                'search'  => $searchTerm,
                'search2' => $searchTerm,
            ],
            'order'      => 'created_at DESC',
            'limit'      => $perPage,
            'offset'     => $offset,
        ]);

        $total = Card::count([
            'conditions' => $conditions,
            'bind'       => [
                'search'  => $searchTerm,
                'search2' => $searchTerm,
            ],
        ]);

        return [
            'cards' => $cards,
            'total' => (int)$total,
            'page'  => $page,
        ];
    }
}
