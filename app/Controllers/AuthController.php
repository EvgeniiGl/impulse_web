<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Middlewares\AuthMiddleware;
use App\Requests\Auth\LoginRequest;
use App\Requests\Auth\RegisterRequest;
use App\Models\User;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Phalcon\Http\Response;
use Phalcon\Mvc\Controller;
use Phalcon\Messages\Messages;
use Phalcon\Cache\Cache;

class AuthController extends BaseController
{
    private Cache $cache;

    public function onConstruct(): void
    {
        // Получаем кэш для хранения недействительных токенов
        if ($this->di->has('cache')) {
            $this->cache = $this->di->get('cache');
        }
    }

    /**
     * @throws Exception
     */
    public function loginAction(): Response
    {
        $data = $this->request->getJsonRawBody(true);

        if (!$data) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => 'Invalid JSON data'
            ], 400);
        }

        $req = new LoginRequest($data);

        if (!$req->validate()) {
            $errors = [];
            foreach ($req->messages() as $message) {
                $errors[] = $message->getMessage();
            }

            return $this->jsonResponse([
                'success' => false,
                'errors'  => $errors
            ], 422);
        }

        // Find user by email
        $user = User::findFirst([
            'conditions' => 'email = :email:',
            'bind'       => ['email' => $req->get('email')]
        ]);
        if (!$user || !$user->verifyPassword($req->get('password'))) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => 'Invalid email or password'
            ], 401);
        }

        if (!$user->is_active) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => 'Account is deactivated'
            ], 403);
        }

        // Generate JWT token
        $token = $this->generateToken($user);

        return $this->jsonResponse([
            'success' => true,
            'data'    => [
                'token' => $token,
                'user'  => [
                    'id'    => $user->id,
                    'name'  => $user->name,
                    'email' => $user->email
                ]
            ]
        ]);
    }

    public function registerAction(): Response
    {
        $data = $this->request->getJsonRawBody(true);

        if (!$data) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => 'Invalid JSON data'
            ], 400);
        }

        $req        = new RegisterRequest($data);
        $validation = $req->validate();

        if ($validation->count() > 0) {
            $errors = [];
            foreach ($validation as $message) {
                $errors[] = $message->getMessage();
            }

            return $this->jsonResponse([
                'success' => false,
                'errors'  => $errors
            ], 422);
        }

        // Check if user exists
        $existingUser = User::findFirst([
            'conditions' => 'email = :email:',
            'bind'       => ['email' => $req->getEmail()]
        ]);

        if ($existingUser) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => 'User with this email already exists'
            ], 409);
        }

        // Create new user
        $user        = new User();
        $user->email = $req->getEmail();
        $user->setPassword($req->getPassword());
        $user->name = $data['name'] ?? '';
        $user->age  = $data['age'] ?? null;

        if (!$user->save()) {
            $messages = [];
            foreach ($user->getMessages() as $message) {
                $messages[] = $message->getMessage();
            }

            return $this->jsonResponse([
                'success' => false,
                'errors'  => $messages
            ], 500);
        }

        // Generate JWT token
        $token = $this->generateToken($user);

        return $this->jsonResponse([
            'success' => true,
            'data'    => [
                'token' => $token,
                'user'  => [
                    'id'    => $user->id,
                    'name'  => $user->name,
                    'email' => $user->email
                ]
            ]
        ], 201);
    }

    public function logoutAction(): Response
    {
        $authHeader = $this->request->getHeader('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => 'Authorization header is missing or invalid'
            ], 401);
        }

        $token = substr($authHeader, 7);

        try {
            // Декодируем токен для получения информации
            $decoded = JWT::decode($token, new Key($this->config->jwt->secret, 'HS256'));

            // Добавляем токен в черный список (до его истечения)
            $expirationTime = $decoded->exp - time();
            if ($expirationTime > 0) {
                $this->addToBlacklist($token, $decoded->exp);
            }

            // Также можно добавить пользователя в список вышедших
            $userId = $decoded->sub;
            $this->invalidateUserTokens($userId);

            return $this->jsonResponse([
                'success' => true,
                'message' => 'Successfully logged out'
            ]);

        } catch (\Exception $e) {
            // Если токен невалиден, все равно возвращаем успех
            // чтобы не давать информации о валидности токена
            return $this->jsonResponse([
                'success' => true,
                'message' => 'Successfully logged out'
            ]);
        }
    }

    public function refreshTokenAction(): Response
    {
        $authHeader = $this->request->getHeader('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => 'Authorization header is missing or invalid'
            ], 401);
        }

        $token = substr($authHeader, 7);

        try {
            // Проверяем, не в черном ли списке токен
            if ($this->isTokenBlacklisted($token)) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => 'Token is invalid'
                ], 401);
            }

            // Декодируем токен
            $decoded = JWT::decode($token, new Key($this->config->jwt->secret, 'HS256'));

            // Находим пользователя
            $user = User::findFirst([
                'conditions' => 'id = :id: AND is_active = true',
                'bind'       => ['id' => $decoded->sub]
            ]);

            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => 'User not found or inactive'
                ], 404);
            }

            // Добавляем старый токен в черный список
            $this->addToBlacklist($token, $decoded->exp);

            // Генерируем новый токен
            $newToken = $this->generateToken($user);

            return $this->jsonResponse([
                'success' => true,
                'data'    => [
                    'token' => $newToken,
                    'user'  => [
                        'id'    => $user->id,
                        'name'  => $user->name,
                        'email' => $user->email
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => 'Invalid token'
            ], 401);
        }
    }

    public function meAction(): Response
    {
        try {
            $user = $this->getAuthenticatedUser();

            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => 'Authentication required'
                ], 401);
            }

            return $this->jsonResponse([
                'success' => true,
                'data'    => [
                    'user' => [
                        'id'         => $user->id,
                        'name'       => $user->name,
                        'email'      => $user->email,
                        'age'        => $user->age,
                        'created_at' => $user->created_at,
                        'updated_at' => $user->updated_at,
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => $e->getMessage()
            ], 401);
        }
    }

    private function generateToken(User $user): string
    {
        $payload = [
            'iss'   => $this->config->jwt->issuer ?? $this->config->application->domain,
            'aud'   => $this->config->jwt->audience ?? $this->config->application->domain,
            'iat'   => time(),
            'exp'   => time() + ($this->config->jwt->expiration ?? 3600),
            'sub'   => $user->id,
            'email' => $user->email,
            'name'  => $user->name,
            'jti'   => bin2hex(random_bytes(16)) // Уникальный идентификатор токена
        ];

        return JWT::encode(
            $payload,
            $this->config->jwt->secret,
            'HS256'
        );
    }

    /**
     * Добавляет токен в черный список
     */
    private function addToBlacklist(string $token, int $expiresAt): void
    {
        if (isset($this->cache)) {
            $tokenId = hash('sha256', $token);
            $ttl     = $expiresAt - time();

            if ($ttl > 0) {
                $this->cache->save($tokenId, 'blacklisted', $ttl);
            }
        }
    }

    /**
     * Проверяет, находится ли токен в черном списке
     */
    private function isTokenBlacklisted(string $token): bool
    {
        if (!isset($this->cache)) {
            return false;
        }

        $tokenId = hash('sha256', $token);
        return $this->cache->exists($tokenId);
    }

    /**
     * Инвалидирует все токены пользователя
     */
    private function invalidateUserTokens(string $userId): void
    {
        if (isset($this->cache)) {
            $key = 'invalidated_user_' . $userId;
            $this->cache->save($key, time(), 3600 * 24); // 24 часа
        }
    }

    /**
     * Проверяет, инвалидированы ли токены пользователя
     */
    public function isUserTokensInvalidated(string $userId): bool
    {
        if (!isset($this->cache)) {
            return false;
        }

        $key = 'invalidated_user_' . $userId;
        return $this->cache->exists($key);
    }

    /**
     * Получает аутентифицированного пользователя из JWT
     */
    private function getAuthenticatedUser(): ?User
    {
        $authHeader = $this->request->getHeader('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return null;
        }

        $token = substr($authHeader, 7);

        try {
            // Проверяем черный список
            if ($this->isTokenBlacklisted($token)) {
                return null;
            }

            // Декодируем JWT
            $decoded = JWT::decode($token, new Key($this->config->jwt->secret, 'HS256'));

            // Проверяем, не инвалидированы ли токены пользователя
            if ($this->isUserTokensInvalidated($decoded->sub)) {
                return null;
            }

            return User::findFirst([
                'conditions' => 'id = :id: AND is_active = true',
                'bind'       => ['id' => $decoded->sub]
            ]);
        } catch (\Exception $e) {
            return null;
        }
    }
}