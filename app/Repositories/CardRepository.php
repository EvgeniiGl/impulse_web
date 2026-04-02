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
    public function getPublicCards(int $page = 1, int $perPage = 12, array $excludeCardIds = []): array
    {
        $offset = ($page - 1) * $perPage;

        $conditions = "access_type = 'public' AND is_active = true";
        $bind       = [];

        if (!empty($excludeCardIds)) {
            $placeholders = implode(',', array_map(fn($id) => "'$id'", $excludeCardIds));
            $conditions   .= " AND id NOT IN ($placeholders)";
        }

        $cards = Card::find([
            'conditions' => $conditions,
            'bind'       => $bind,
            'order'      => 'created_at DESC',
            'limit'      => $perPage,
            'offset'     => $offset,
        ]);

        $total = Card::count(['conditions' => $conditions, 'bind' => $bind]);

        return [
            'cards' => $cards,
            'total' => (int)$total,
            'page'  => $page,
        ];
    }

    public function searchPublicCards(string $query, int $page = 1, int $perPage = 12, array $excludeCardIds = []): array
    {
        $offset     = ($page - 1) * $perPage;
        $searchTerm = '%' . trim($query) . '%';

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

        $excludeCondition = '';
        if (!empty($excludeCardIds)) {
            $placeholders     = implode(',', array_map(fn($id) => "'$id'", $excludeCardIds));
            $excludeCondition = " AND id NOT IN ($placeholders)";
        }

        $conditions = "access_type = 'public' AND is_active = true AND (title LIKE :search: OR description LIKE :search2:" . $userCondition . ")" . $excludeCondition;
        $bind       = ['search' => $searchTerm, 'search2' => $searchTerm];

        $cards = Card::find([
            'conditions' => $conditions,
            'bind'       => $bind,
            'order'      => 'created_at DESC',
            'limit'      => $perPage,
            'offset'     => $offset,
        ]);

        $total = Card::count(['conditions' => $conditions, 'bind' => $bind]);

        return [
            'cards' => $cards,
            'total' => (int)$total,
            'page'  => $page,
        ];
    }
}
