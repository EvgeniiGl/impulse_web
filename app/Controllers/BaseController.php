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
    ];

    public function onConstruct(): void
    {
        // Исключаем публичные маршруты
        $currentRoute = $this->request->getURI();
        if (!in_array($currentRoute, $this->publicRoutes)) {
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
        // Здесь реализуйте получение пользователя из JWT токена
        // Примерная реализация:
        $authHeader = $this->request->getHeader('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return null;
        }

        $token = substr($authHeader, 7);

        // Декодируем JWT и получаем ID пользователя
        try {
            $payload = \Firebase\JWT\JWT::decode(
                $token,
                new \Firebase\JWT\Key($this->config->jwt->secret, 'HS256')
            );

            return User::findFirst([
                'conditions' => 'id = :id: AND is_active = true',
                'bind'       => ['id' => $payload->sub]
            ]);
        } catch (\Exception $e) {
            return null;
        }
    }
}