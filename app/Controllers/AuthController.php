<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Exceptions\UnauthorizedException;
use App\Helpers\TranslationHelper;
use App\Requests\Auth\LoginRequest;
use App\Requests\Auth\RegisterRequest;
use App\Models\User;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use InvalidArgumentException;
use Phalcon\Http\Response;
use Phalcon\Cache\Cache;

class AuthController extends BaseController
{
    private Cache $cache;

    /**
     * @throws UnauthorizedException
     */
    public function onConstruct(): void
    {
        // Получаем кэш для хранения недействительных токенов
        if ($this->di->has('cache')) {
            $this->cache = $this->di->get('cache');
        }
        parent::onConstruct();
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
                'error'   => TranslationHelper::translate('Invalid JSON data')
            ], 400);
        }

        $req = new LoginRequest();

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
                'error'   => TranslationHelper::translate('Invalid email or password')
            ], 401);
        }

        if (!$user->is_active) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => TranslationHelper::translate('Account is deactivated')
            ], 403);
        }

        // Generate JWT token
        $token        = $this->generateToken($user);
        $refreshToken = $this->generateRefreshToken($user);

        return $this->jsonResponse([
            'success' => true,
            'data'    => [
                'token'         => $token,
                'refresh_token' => $refreshToken,
                'user'          => [
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
                'error'   => TranslationHelper::translate('Invalid JSON data')
            ], 400);
        }

        $req        = new RegisterRequest($data);
        $validation = $req->validate();

        if ($validation->count() > 0) {
            $errors = [];
            foreach ($validation as $message) {
                $errors[$message->getField()] = $message->getMessage();
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
                'error'   => TranslationHelper::translate('User with this email already exists'),
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
        $token        = $this->generateToken($user);
        $refreshToken = $this->generateRefreshToken($user);

        return $this->jsonResponse([
            'success' => true,
            'data'    => [
                'token'         => $token,
                'refresh_token' => $refreshToken,
                'user'          => [
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
                'error'   => TranslationHelper::translate('Authorization header is missing or invalid')
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
                'message' => TranslationHelper::translate('Successfully logged out')
            ]);

        } catch (\Exception $e) {
            // Если токен невалиден, все равно возвращаем успех
            // чтобы не давать информации о валидности токена
            return $this->jsonResponse([
                'success' => true,
                'message' => TranslationHelper::translate('Successfully logged out')
            ]);
        }
    }

    public function refreshTokenAction(): Response
    {
        // Получаем refresh token из тела запроса или заголовка
        $refreshToken = $this->request->getPost('refresh_token')
            ?: $this->request->getHeader('X-Refresh-Token');

        if (!$refreshToken) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => TranslationHelper::translate('Refresh token is required')
            ], 400);
        }

        $authHeader = $this->request->getHeader('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => TranslationHelper::translate('Authorization header is missing or invalid')
            ], 401);
        }
        $token = substr($authHeader, 7);
        try {
            // Проверяем, не в черном ли списке токен
            if ($this->isTokenBlacklisted($token)) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Refresh token is invalid or revoked')
                ], 401);
            }
            // Декодируем refresh token (у него должен быть свой секрет и больший срок)
            $decoded = JWT::decode(
                $refreshToken,
                new Key($this->config->jwt->refreshSecret, 'HS256')
            );
            // Находим пользователя
            $user = User::findFirst([
                'conditions' => 'id = :id: AND is_active = true',
                'bind'       => ['id' => $decoded->sub]
            ]);
            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('User not found or inactive')
                ], 404);
            }

            // Проверяем, что refresh token еще действителен
            if ($decoded->exp < time()) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Refresh token expired')
                ], 401);
            }

            // Добавляем использованный refresh token в черный список
            $this->addToBlacklist($refreshToken, $decoded->exp, 'refresh');

            // Генерируем новую пару токенов
            $newAccessToken  = $this->generateToken($user);
            $newRefreshToken = $this->generateRefreshToken($user);

            return $this->jsonResponse([
                'success' => true,
                'data'    => [
                    'token'         => $newAccessToken,
                    'refresh_token' => $newRefreshToken,
                    'expires_in'    => $this->config->jwt->accessExpire, // например, 900 секунд
                    'user'          => [
                        'id'    => $user->id,
                        'name'  => $user->name,
                        'email' => $user->email
                    ]
                ]
            ]);

        } catch (\Firebase\JWT\ExpiredException $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => TranslationHelper::translate('Refresh token expired'),
                'code'    => 'REFRESH_TOKEN_EXPIRED'
            ], 401);
        } catch (\Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => TranslationHelper::translate('Invalid refresh token'),
                'debug'   => $this->config->environment === 'development' ? $e->getMessage() : null
            ], 401);
        }
    }

    public
    function meAction(): Response
    {
        try {
            $user = $this->getAuthenticatedUser();

            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Authentication required')
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

    private
    function generateToken(User $user): string
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

    private
    function generateRefreshToken(User $user): string
    {
        $payload = [
            'iss'  => $this->config->jwt->issuer ?? $this->config->application->domain,
            'aud'  => $this->config->jwt->audience ?? $this->config->application->domain,
            'iat'  => time(),
            'exp'  => time() + $this->config->jwt->refreshExpire, // 30 дней
            'sub'  => $user->id,
            'jti'  => bin2hex(random_bytes(16)), // Unique token ID
            'type' => 'refresh'
        ];

        return JWT::encode($payload, $this->config->jwt->refreshSecret, 'HS256');
    }

    /**
     * Добавляет токен в черный список
     */
    private
    function addToBlacklist(string $token, int $expiresAt): void
    {
        if (isset($this->cache)) {
            $tokenId = hash('sha256', $token);
            $ttl     = $expiresAt - time();

            if ($ttl > 0) {
                // Используем set() вместо save()
                $this->cache->set($tokenId, 'blacklisted', $ttl);
            }
        }
    }

    /**
     * Проверяет, находится ли токен в черном списке
     */
    private
    function isTokenBlacklisted(string $token): bool
    {
        if (!isset($this->cache)) {
            return false;
        }

        $tokenId = hash('sha256', $token);
        // Используем has() вместо exists()
        return $this->cache->has($tokenId);
    }

    /**
     * Инвалидирует все токены пользователя
     */
    private
    function invalidateUserTokens(string $userId): void
    {
        if (isset($this->cache)) {
            $key = 'invalidated_user_' . $userId;
            // Используем set() вместо save()
            $this->cache->set($key, time(), 3600 * 24); // 24 часа
        }
    }

    /**
     * Проверяет, инвалидированы ли токены пользователя
     */
    public
    function isUserTokensInvalidated(string $userId): bool
    {
        if (!isset($this->cache)) {
            return false;
        }

        $key = 'invalidated_user_' . $userId;
        // Используем has() вместо exists()
        return $this->cache->has($key);
    }

    /**
     * Получает значение из черного списка
     * @throws \Phalcon\Cache\Exception\InvalidArgumentException
     */
    private
    function getBlacklistValue(string $token): ?string
    {
        if (!isset($this->cache)) {
            return null;
        }

        $tokenId = hash('sha256', $token);
        $value   = $this->cache->get($tokenId);

        return $value !== null ? (string)$value : null;
    }

    /**
     * Удаляет токен из черного списка
     * @throws \Phalcon\Cache\Exception\InvalidArgumentException
     */
    private
    function removeFromBlacklist(string $token): bool
    {
        if (!isset($this->cache)) {
            return false;
        }

        $tokenId = hash('sha256', $token);
        return $this->cache->delete($tokenId);
    }
}