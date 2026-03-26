<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Exceptions\UnauthorizedException;
use App\Helpers\TranslationHelper;
use App\Models\User;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Phalcon\Cache\Cache;
use Phalcon\Config\Config;
use Phalcon\Http\Response;
use Phalcon\Mvc\Controller as PhalconController;

class BaseController extends PhalconController
{
    private Config $config;
    private Cache  $cache;
    private        $publicRoutes = [
        '/',
        '/auth/login',
        '/auth/register',
        '/auth/refresh-token',
        '/my',
        '/today',
        '/login',
        '/card/create',
        '/collection/create',
        '/register',
        '/card/*',
        '/notification',
        '/api/home/cards',
        '/api/home/search',
    ];

    public function onConstruct(): void
    {
        $currentRoute = strtok($this->request->getURI(), '?');

        // Проверяем, является ли текущий маршрут публичным
        if (!$this->isPublicRoute($currentRoute)) {
            $this->config = $this->di->get('config');
            $this->cache  = $this->di->get('cache');
            $authHeader   = $this->request->getHeader('Authorization');
            if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
                $this->response->setStatusCode(401);
                $this->response->setJsonContent([
                    'success' => false,
                    'error'   => 'Authorization header is missing or invalid'
                ]);
                $this->response->send();
                return;
            }

            $token = substr($authHeader, 7);
            try {
                // Проверка черного списка
                if ($this->isTokenBlacklisted($token)) {
                    throw new \Exception('Token is blacklisted');
                }
                $decoded = JWT::decode($token, new Key($this->config->jwt->secret, 'HS256'));
                // Добавляем информацию о пользователе в контейнер
                $this->di->setShared('user', function () use ($decoded) {
                    return [
                        'id'    => $decoded->sub,
                        'email' => $decoded->email,
                        'name'  => $decoded->name ?? null,
                    ];
                });
            } catch (\Exception $e) {
                throw new UnauthorizedException();
            }
        }
    }

    /**
     * Проверяет, является ли маршрут публичным
     */
    private function isPublicRoute(string $uri): bool
    {
        // Точное совпадение с публичными маршрутами
        if (in_array($uri, $this->publicRoutes)) {
            return true;
        }

        // Проверка для маршрутов карточек с UUID
        if (preg_match('/^\/card\/[a-f0-9\-]{36}$/', $uri)) {
            return true;
        }

        return false;
    }

    private function isTokenBlacklisted(string $token): bool
    {
        $tokenId = hash('sha256', $token);
        return $this->cache->has($tokenId);
    }

    public function before()
    {
        // Выполняется перед выполнением маршрута
    }

    public function after()
    {
        // Выполняется после выполнения маршрута
    }

    /**
     * @param array<string,mixed> $data
     * @param int $statusCode
     * @return Response
     */
    protected function jsonResponse(array $data, int $statusCode = 200): Response
    {
        $response = new Response();
        $response->setStatusCode($statusCode);
        $response->setContentType('application/json', 'UTF-8');
        $response->setContent(json_encode($data, JSON_UNESCAPED_UNICODE) ?: '');

        return $response;
    }

    /**
     * Получение аутентифицированного пользователя из JWT
     */
    protected function getAuthenticatedUser(): ?User
    {
        $authHeader = $this->request->getHeader('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return null;
        }

        $token = substr($authHeader, 7);

        try {
            $this->config = $this->di->get('config');
            $payload      = JWT::decode(
                $token,
                new Key($this->config->jwt->secret, 'HS256')
            );

            return User::findFirst([
                'conditions' => 'id = :id: AND is_active = true',
                'bind'       => ['id' => $payload->sub]
            ]) ?: null;
        } catch (\Exception $e) {
            return null;
        }
    }
}