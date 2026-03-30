<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Exceptions\UnauthorizedException;
use App\Repositories\CardRepository;
use App\Services\HomeService;
use Exception;

class HomeController extends BaseController
{
    private HomeService $homeService;

    /**
     * @throws UnauthorizedException
     */
    public function onConstruct(): void
    {
        $this->homeService = new HomeService(new CardRepository());
        parent::onConstruct();
    }

    /**
     * GET /api/home/cards
     * Получить последние публичные карточки
     */
    public function cardsAction(): \Phalcon\Http\Response
    {
        try {
            $page    = (int)($this->request->getQuery('page', 'int', 1));
            $perPage = (int)($this->request->getQuery('per_page', 'int', 12));

            $page    = max(1, $page);
            $perPage = min(50, max(1, $perPage));

            // Получаем текущего пользователя (может быть null для неавторизованных)
            $currentUser = $this->getAuthenticatedUserOrNull();

            $result = $this->homeService->getPublicCards($page, $perPage, $currentUser);

            return $this->jsonResponse($result);
        } catch (Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * GET /api/home/search?q=query&page=1&per_page=12
     * Поиск публичных карточек по title, description, creator name
     */
    public function searchAction(): \Phalcon\Http\Response
    {
        try {
            $query   = $this->request->getQuery('q', 'string', '');
            $page    = (int)($this->request->getQuery('page', 'int', 1));
            $perPage = (int)($this->request->getQuery('per_page', 'int', 12));

            $page    = max(1, $page);
            $perPage = min(50, max(1, $perPage));

            // Получаем текущего пользователя (может быть null для неавторизованных)
            $currentUser = $this->getAuthenticatedUserOrNull();

            $result = $this->homeService->searchCards($query, $page, $perPage, $currentUser);

            return $this->jsonResponse($result);
        } catch (Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Получить авторизованного пользователя или null (без исключения)
     */
    private function getAuthenticatedUserOrNull(): ?\App\Models\User
    {
        try {
            return $this->getAuthenticatedUser();
        } catch (Exception $e) {
            return null;
        }
    }
}