> ChatGPT 5 | DeepSeek | Claude | Veo3:
> ▎Система контроля доступа к изображениям с MinIO и PHP

▎Архитектура решения

Оптимальный подход: Presigned URLs с кешированием и проксированием

---

▎Шаг 1: Структура базы данных

-- Таблица карточек с изображениями
CREATE TABLE cards (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
title VARCHAR(255) NOT NULL,
image_path VARCHAR(500), -- путь в MinIO: bucket/folder/filename.jpg
status VARCHAR(20) DEFAULT 'private', -- public, private, shared
owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица правил доступа
CREATE TABLE access_rules (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
card_id UUID NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
permission VARCHAR(20) DEFAULT 'read', -- read, write, admin
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
UNIQUE(card_id, user_id)
);

-- Индексы для быстрого поиска
CREATE INDEX idx_cards_owner ON cards(owner_id);
CREATE INDEX idx_cards_status ON cards(status);
CREATE INDEX idx_access_rules_card ON access_rules(card_id);
CREATE INDEX idx_access_rules_user ON access_rules(user_id);
CREATE INDEX idx_access_rules_composite ON access_rules(card_id, user_id);


---

▎Шаг 2: Конфигурация MinIO

▎2.1 Создание бакетов

<?php
// config/minio.php

return [
    'endpoint' => env('MINIO_ENDPOINT', 'localhost:9000'),
    'access_key' => env('MINIO_ACCESS_KEY'),
    'secret_key' => env('MINIO_SECRET_KEY'),
    'use_ssl' => env('MINIO_USE_SSL', false),
    'region' => env('MINIO_REGION', 'us-east-1'),
    'buckets' => [
        'public' => 'public-images',
        'private' => 'private-images',
        'shared' => 'shared-images',
    ],
    'presigned_url_expiry' => 3600, // 1 час
];


▎2.2 Инициализация MinIO клиента

<?php
// src/Services/MinioService.php

namespace App\Services;

use Aws\S3\S3Client;
use Aws\Exception\AwsException;

class MinioService
{
    private S3Client $client;
    private array $config;

    public function __construct()
    {
        $this->config = config('minio');
        
        $this->client = new S3Client([
            'version' => 'latest',
            'region' => $this->config['region'],
            'endpoint' => ($this->config['use_ssl'] ? 'https://' : 'http://') . $this->config['endpoint'],
            'use_path_style_endpoint' => true,
            'credentials' => [
                'key' => $this->config['access_key'],
                'secret' => $this->config['secret_key'],
            ],
        ]);

        $this->initializeBuckets();
    }

    /**
     * Создание бакетов при первом запуске
     */
    private function initializeBuckets(): void
    {
        foreach ($this->config['buckets'] as $bucket) {
            try {
                if (!$this->client->doesBucketExist($bucket)) {
                    $this->client->createBucket(['Bucket' => $bucket]);
                    
                    // Для публичного бакета устанавливаем политику
                    if ($bucket === $this->config['buckets']['public']) {
                        $this->setPublicBucketPolicy($bucket);
                    }
                }
            } catch (AwsException $e) {
                error_log("MinIO bucket creation error: " . $e->getMessage());
            }
        }
    }

    /**
     * Установка публичной политики для бакета
     */
    private function setPublicBucketPolicy(string $bucket): void
    {
        $policy = json_encode([
            'Version' => '2012-10-17',
            'Statement' => [
                [
                    'Effect' => 'Allow',
                    'Principal' => ['AWS' => ['*']],
                    'Action' => ['s3:GetObject'],
                    'Resource' => ["arn:aws:s3:::{$bucket}/*"]
                ]
            ]
        ]);

        $this->client->putBucketPolicy([

> ChatGPT 5 | DeepSeek | Claude | Veo3:
            'Bucket' => $bucket,
            'Policy' => $policy,
        ]);
    }

    /**
     * Загрузка файла
     */
    public function uploadFile(string $bucket, string $key, $file, string $contentType = 'image/jpeg'): bool
    {
        try {
            $this->client->putObject([
                'Bucket' => $bucket,
                'Key' => $key,
                'Body' => $file,
                'ContentType' => $contentType,
            ]);
            return true;
        } catch (AwsException $e) {
            error_log("MinIO upload error: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Генерация presigned URL
     */
    public function getPresignedUrl(string $bucket, string $key, int $expiry = null): string
    {
        $expiry = $expiry ?? $this->config['presigned_url_expiry'];
        
        $cmd = $this->client->getCommand('GetObject', [
            'Bucket' => $bucket,
            'Key' => $key,
        ]);

        $request = $this->client->createPresignedRequest($cmd, "+{$expiry} seconds");
        return (string) $request->getUri();
    }

    /**
     * Получение объекта напрямую
     */
    public function getObject(string $bucket, string $key)
    {
        try {
            $result = $this->client->getObject([
                'Bucket' => $bucket,
                'Key' => $key,
            ]);
            return $result['Body'];
        } catch (AwsException $e) {
            error_log("MinIO get object error: " . $e->getMessage());
            return null;
        }
    }

    /**
     * Удаление файла
     */
    public function deleteFile(string $bucket, string $key): bool
    {
        try {
            $this->client->deleteObject([
                'Bucket' => $bucket,
                'Key' => $key,
            ]);
            return true;
        } catch (AwsException $e) {
            error_log("MinIO delete error: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Получение бакета по статусу
     */
    public function getBucketByStatus(string $status): string
    {
        return $this->config['buckets'][$status] ?? $this->config['buckets']['private'];
    }
}


---

▎Шаг 3: Сервис проверки доступа

<?php
// src/Services/ImageAccessService.php

namespace App\Services;

use PDO;

class ImageAccessService
{
    private PDO $db;
    private MinioService $minio;

    public function __construct(PDO $db, MinioService $minio)
    {
        $this->db = $db;
        $this->minio = $minio;
    }

    /**
     * Проверка доступа пользователя к изображению
     */
    public function canAccess(string $cardId, ?string $userId): bool
    {
        $stmt = $this->db->prepare("
            SELECT status, owner_id 
            FROM cards 
            WHERE id = :card_id
        ");
        $stmt->execute(['card_id' => $cardId]);
        $card = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$card) {
            return false;
        }

        // Public - доступно всем
        if ($card['status'] === 'public') {
            return true;
        }

        // Не авторизован - доступ запрещен
        if (!$userId) {
            return false;
        }

        // Private - только владелец
        if ($card['status'] === 'private') {
            return $card['owner_id'] === $userId;
        }

        // Shared - проверяем правила доступа
        if ($card['status'] === 'shared') {
            // Владелец всегда имеет доступ
            if ($card['owner_id'] === $userId) {
                return true;
            }

            // Проверяем правила доступа
            $stmt = $this->db->prepare("
                SELECT COUNT(*) 
                FROM access_rules 
                WHERE card_id = :card_id 
                AND user_id = :user_id
            ");
            $stmt->execute([
                'card_id' => $cardId,
                'user_id' => $userId,
            ]);

            return $stmt->fetchColumn() > 0;
        }

        return false;
    }

    /**
     * Получение информации о карточке с изображением

> ChatGPT 5 | DeepSeek | Claude | Veo3:
     */
    public function getCardInfo(string $cardId): ?array
    {
        $stmt = $this->db->prepare("
            SELECT id, title, image_path, status, owner_id 
            FROM cards 
            WHERE id = :card_id
        ");
        $stmt->execute(['card_id' => $cardId]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }
}


---

▎Шаг 4: Контроллер для отдачи изображений

<?php
// src/Controllers/ImageController.php

namespace App\Controllers;

use App\Services\ImageAccessService;
use App\Services\MinioService;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ImageController
{
    private ImageAccessService $accessService;
    private MinioService $minio;

    public function __construct(ImageAccessService $accessService, MinioService $minio)
    {
        $this->accessService = $accessService;
        $this->minio = $minio;
    }

    /**
     * Вариант 1: Presigned URL (рекомендуется для production)
     */
    public function getImageUrl(Request $request, Response $response, array $args): Response
    {
        $cardId = $args['id'];
        $userId = $request->getAttribute('user_id'); // из middleware авторизации

        // Проверка доступа
        if (!$this->accessService->canAccess($cardId, $userId)) {
            return $response->withStatus(403)->write(json_encode([
                'error' => 'Access denied'
            ]));
        }

        // Получение информации о карточке
        $card = $this->accessService->getCardInfo($cardId);
        if (!$card || !$card['image_path']) {
            return $response->withStatus(404)->write(json_encode([
                'error' => 'Image not found'
            ]));
        }

        // Генерация presigned URL
        $bucket = $this->minio->getBucketByStatus($card['status']);
        $presignedUrl = $this->minio->getPresignedUrl($bucket, $card['image_path']);

        return $response->withHeader('Content-Type', 'application/json')->write(json_encode([
            'url' => $presignedUrl,
            'expires_in' => 3600,
        ]));
    }

    /**
     * Вариант 2: Проксирование через PHP (для максимального контроля)
     */
    public function proxyImage(Request $request, Response $response, array $args): Response
    {
        $cardId = $args['id'];
        $userId = $request->getAttribute('user_id');

        // Проверка доступа
        if (!$this->accessService->canAccess($cardId, $userId)) {
            return $response->withStatus(403);
        }

        // Получение информации о карточке
        $card = $this->accessService->getCardInfo($cardId);
        if (!$card || !$card['image_path']) {
            return $response->withStatus(404);
        }

        // Получение файла из MinIO
        $bucket = $this->minio->getBucketByStatus($card['status']);
        $imageData = $this->minio->getObject($bucket, $card['image_path']);

        if (!$imageData) {
            return $response->withStatus(404);
        }

        // Определение MIME типа
        $mimeType = $this->getMimeType($card['image_path']);

        // Отдача изображения с кешированием
        return $response
            ->withHeader('Content-Type', $mimeType)
            ->withHeader('Cache-Control', 'public, max-age=31536000') // 1 год
            ->withHeader('ETag', md5($card['image_path'] . $card['updated_at']))
            ->write($imageData);
    }

    /**
     * Вариант 3: Редирект на presigned URL (самый быстрый)
     */
    public function redirectToImage(Request $request, Response $response, array $args): Response
    {
        $cardId = $args['id'];
        $userId = $request->getAttribute('user_id');

        if (!$this->accessService->canAccess($cardId, $userId)) {
            return $response->withStatus(403);
        }

        $card = $this->accessService->getCardInfo($cardId);
        if (!$card || !$card['image_path']) {
            return $response->withStatus(404);
        }

        // Для public изображений - прямая ссылка

> ChatGPT 5 | DeepSeek | Claude | Veo3:
        if ($card['status'] === 'public') {
            $bucket = $this->minio->getBucketByStatus('public');
            $publicUrl = $this->getPublicUrl($bucket, $card['image_path']);
            return $response->withHeader('Location', $publicUrl)->withStatus(302);
        }

        // Для private/shared - presigned URL
        $bucket = $this->minio->getBucketByStatus($card['status']);
        $presignedUrl = $this->minio->getPresignedUrl($bucket, $card['image_path']);

        return $response->withHeader('Location', $presignedUrl)->withStatus(302);
    }

    private function getMimeType(string $filename): string
    {
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        $mimeTypes = [
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif',
            'webp' => 'image/webp',
            'svg' => 'image/svg+xml',
        ];

        return $mimeTypes[$extension] ?? 'application/octet-stream';
    }

    private function getPublicUrl(string $bucket, string $key): string
    {
        $endpoint = config('minio.endpoint');
        $useSSL = config('minio.use_ssl');
        $protocol = $useSSL ? 'https' : 'http';
        
        return "{$protocol}://{$endpoint}/{$bucket}/{$key}";
    }
}


---

▎Шаг 5: Middleware для авторизации

<?php
// src/Middleware/AuthMiddleware.php

namespace App\Middleware;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware
{
    private string $jwtSecret;

    public function __construct(string $jwtSecret)
    {
        $this->jwtSecret = $jwtSecret;
    }

    public function __invoke(Request $request, RequestHandler $handler): Response
    {
        $authHeader = $request->getHeaderLine('Authorization');

        if (empty($authHeader)) {
            // Для публичных изображений разрешаем без токена
            return $handler->handle($request->withAttribute('user_id', null));
        }

        try {
            $token = str_replace('Bearer ', '', $authHeader);
            $decoded = JWT::decode($token, new Key($this->jwtSecret, 'HS256'));
            
            // Добавляем user_id в request
            $request = $request->withAttribute('user_id', $decoded->user_id);
            
            return $handler->handle($request);
        } catch (\Exception $e) {
            // Невалидный токен - продолжаем без user_id
            return $handler->handle($request->withAttribute('user_id', null));
        }
    }
}


---

▎Шаг 6: Роутинг

<?php
// routes/api.php

use App\Controllers\ImageController;
use App\Middleware\AuthMiddleware;
use Slim\App;

return function (App $app) {
    $app->group('/api', function ($group) {
        
        // Вариант 1: Получение presigned URL
        $group->get('/images/{id}/url', [ImageController::class, 'getImageUrl']);
        
        // Вариант 2: Проксирование изображения
        $group->get('/images/{id}/proxy', [ImageController::class, 'proxyImage']);
        
        // Вариант 3: Редирект на изображение
        $group->get('/images/{id}', [ImageController::class, 'redirectToImage']);
        
    })->add(AuthMiddleware::class);
};


---

▎Шаг 7: Кеширование с Redis (опционально, для максимальной производительности)

<?php
// src/Services/ImageCacheService.php

namespace App\Services;

use Redis;

class ImageCacheService
{
    private Redis $redis;
    private int $ttl = 3600; // 1 час

    public function __construct(Redis $redis)
    {
        $this->redis = $redis;
    }

    /**
     * Кеширование результата проверки доступа
     */
    public function cacheAccessCheck(string $cardId, ?string $userId, bool $hasAccess): void
    {
        $key = $this->getAccessKey($cardId, $userId);
        $this->redis->setex($key, $this->ttl, $hasAccess ? '1' : '0');
    }

    /**

> ChatGPT 5 | DeepSeek | Claude | Veo3:
     * Получение закешированного результата
     */
    public function getCachedAccessCheck(string $cardId, ?string $userId): ?bool
    {
        $key = $this->getAccessKey($cardId, $userId);
        $result = $this->redis->get($key);
        
        if ($result === false) {
            return null;
        }
        
        return $result === '1';
    }

    /**
     * Кеширование presigned URL
     */
    public function cachePresignedUrl(string $cardId, string $url, int $expiresIn): void
    {
        $key = "presigned_url:{$cardId}";
        $this->redis->setex($key, $expiresIn - 60, $url); // -60 сек для запаса
    }

    /**
     * Получение закешированного presigned URL
     */
    public function getCachedPresignedUrl(string $cardId): ?string
    {
        $key = "presigned_url:{$cardId}";
        $url = $this->redis->get($key);
        
        return $url !== false ? $url : null;
    }

    /**
     * Инвалидация кеша при изменении прав доступа
     */
    public function invalidateCardCache(string $cardId): void
    {
        $pattern = "access:{$cardId}:*";
        $keys = $this->redis->keys($pattern);
        
        if (!empty($keys)) {
            $this->redis->del($keys);
        }
        
        $this->redis->del("presigned_url:{$cardId}");
    }

    private function getAccessKey(string $cardId, ?string $userId): string
    {
        $userPart = $userId ?? 'anonymous';
        return "access:{$cardId}:{$userPart}";
    }
}


▎Обновленный ImageAccessService с кешированием

<?php
// src/Services/ImageAccessService.php (обновленная версия)

namespace App\Services;

use PDO;

class ImageAccessService
{
    private PDO $db;
    private MinioService $minio;
    private ?ImageCacheService $cache;

    public function __construct(PDO $db, MinioService $minio, ?ImageCacheService $cache = null)
    {
        $this->db = $db;
        $this->minio = $minio;
        $this->cache = $cache;
    }

    public function canAccess(string $cardId, ?string $userId): bool
    {
        // Проверяем кеш
        if ($this->cache) {
            $cached = $this->cache->getCachedAccessCheck($cardId, $userId);
            if ($cached !== null) {
                return $cached;
            }
        }

        // Выполняем проверку
        $hasAccess = $this->checkAccess($cardId, $userId);

        // Кешируем результат
        if ($this->cache) {
            $this->cache->cacheAccessCheck($cardId, $userId, $hasAccess);
        }

        return $hasAccess;
    }

    private function checkAccess(string $cardId, ?string $userId): bool
    {
        $stmt = $this->db->prepare("
            SELECT status, owner_id 
            FROM cards 
            WHERE id = :card_id
        ");
        $stmt->execute(['card_id' => $cardId]);
        $card = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$card) {
            return false;
        }

        if ($card['status'] === 'public') {
            return true;
        }

        if (!$userId) {
            return false;
        }

        if ($card['status'] === 'private') {
            return $card['owner_id'] === $userId;
        }

        if ($card['status'] === 'shared') {
            if ($card['owner_id'] === $userId) {
                return true;
            }

            $stmt = $this->db->prepare("
                SELECT COUNT(*) 
                FROM access_rules 
                WHERE card_id = :card_id 
                AND user_id = :user_id
            ");
            $stmt->execute([
                'card_id' => $cardId,
                'user_id' => $userId,
            ]);

            return $stmt->fetchColumn() > 0;
        }

        return false;
    }
}


---

▎Шаг 8: Frontend интеграция

▎React/TypeScript компонент

// components/SecureImage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SecureImageProps {
    cardId: string;
    alt?: string;
    className?: string;
    fallback?: string;
}

export const SecureImage: React.FC<SecureImageProps> = ({ 
    cardId, 
    alt,

> ChatGPT 5 | DeepSeek | Claude | Veo3:
    className,
    fallback = '/placeholder.png'
}) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                // Вариант 1: Получение presigned URL
                const response = await axios.get(/api/images/${cardId}/url, {
                    headers: {
                        Authorization: Bearer ${localStorage.getItem('token')}
                    }
                });
                
                setImageUrl(response.data.url);
                setLoading(false);
            } catch (err) {
                console.error('Failed to load image:', err);
                setError(true);
                setLoading(false);
            }
        };

        fetchImageUrl();
    }, [cardId]);

    if (loading) {
        return <div className={${className} animate-pulse bg-gray-200}>Loading...</div>;
    }

    if (error || !imageUrl) {
        return <img src={fallback} alt={alt} className={className} />;
    }

    return <img src={imageUrl} alt={alt} className={className} />;
};

// Вариант 2: Прямое использование proxy endpoint
export const ProxyImage: React.FC<SecureImageProps> = ({ 
    cardId, 
    alt, 
    className 
}) => {
    const token = localStorage.getItem('token');
    const imageUrl = /api/images/${cardId}/proxy;

    return (
        <img 
            src={imageUrl} 
            alt={alt} 
            className={className}
            onError={(e) => {
                e.currentTarget.src = '/placeholder.png';
            }}
        />
    );
};


---

▎Шаг 9: Оптимизация производительности

▎Nginx конфигурация для кеширования

# /etc/nginx/sites-available/your-app

upstream php-fpm {
    server unix:/var/run/php/php8.2-fpm.sock;
}

# Кеш для изображений
proxy_cache_path /var/cache/nginx/images levels=1:2 keys_zone=images_cache:10m max_size=1g inactive=7d;

server {
    listen 80;
    server_name your-domain.com;

    root /var/www/html/public;
    index index.php;

    # Кеширование статических файлов
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Проксирование изображений с кешированием
    location ~ ^/api/images/([^/]+)/proxy$ {
        proxy_cache images_cache;
        proxy_cache_valid 200 7d;
        proxy_cache_key "$scheme$request_method$host$request_uri$http_authorization";
        proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
        
        add_header X-Cache-Status $upstream_cache_status;
        
        proxy_pass http://php-fpm;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # PHP обработка
    location ~ \.php$ {
        fastcgi_pass php-fpm;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
}


---

▎Шаг 10: Мониторинг и логирование

<?php
// src/Services/ImageAccessLogger.php

namespace App\Services;

use PDO;

class ImageAccessLogger
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    /**
     * Логирование доступа к изображению
     */
    public function logAccess(string $cardId, ?string $userId, bool $granted, string $ip): void
    {
        $stmt = $this->db->prepare("
            INSERT INTO image_access_logs (card_id, user_id, access_granted, ip_address, accessed_at)
            VALUES (:card_id, :user_id, :granted, :ip, NOW())
        ");
        
        $stmt->execute([
            'card_id' => $cardId,
            'user_id' => $userId,
            'granted' => $granted ? 1 : 0,
            'ip' => $ip,
        ]);
    }
}

> ChatGPT 5 | DeepSeek | Claude | Veo3:
// Таблица для логов
/*
CREATE TABLE image_access_logs (
    id BIGSERIAL PRIMARY KEY,
    card_id UUID NOT NULL,
    user_id UUID,
    access_granted BOOLEAN NOT NULL,
    ip_address INET NOT NULL,
    accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_access_logs_card ON image_access_logs(card_id);
CREATE INDEX idx_access_logs_user ON image_access_logs(user_id);
CREATE INDEX idx_access_logs_time ON image_access_logs(accessed_at);
*/


---

▎Сравнение подходов

| Подход | Скорость | Безопасность | Контроль | Нагрузка на сервер |
|--------|----------|--------------|----------|-------------------|
| Presigned URL | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Proxy через PHP | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Редирект | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Proxy + Nginx кеш | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

▎Рекомендуемая архитектура

Для production:

1. Public изображения → Прямые ссылки на MinIO (самое быстрое)
2. Private/Shared изображения → Presigned URLs с кешированием в Redis
3. Критичные данные → Proxy через PHP с Nginx кешем

Пример комбинированного подхода:

public function getOptimalImageUrl(Request $request, Response $response, array $args): Response
{
    $cardId = $args['id'];
    $userId = $request->getAttribute('user_id');
    
    $card = $this->accessService->getCardInfo($cardId);
    
    // Public - прямая ссылка
    if ($card['status'] === 'public') {
        $bucket = $this->minio->getBucketByStatus('public');
        $url = $this->getPublicUrl($bucket, $card['image_path']);
        
        return $response->withJson([
            'url' => $url,
            'type' => 'direct',
            'cache' => 'forever'
        ]);
    }
    
    // Private/Shared - presigned URL
    if ($this->accessService->canAccess($cardId, $userId)) {
        // Проверяем кеш
        if ($this->cache) {
            $cachedUrl = $this->cache->getCachedPresignedUrl($cardId);
            if ($cachedUrl) {
                return $response->withJson([
                    'url' => $cachedUrl,
                    'type' => 'presigned',
                    'cached' => true
                ]);
            }
        }
        
        $bucket = $this->minio->getBucketByStatus($card['status']);
        $url = $this->minio->getPresignedUrl($bucket, $card['image_path'], 3600);
        
        // Кешируем URL
        if ($this->cache) {
            $this->cache->cachePresignedUrl($cardId, $url, 3600);
        }
        
        return $response->withJson([
            'url' => $url,
            'type' => 'presigned',
            'expires_in' => 3600
        ]);
    }
    
    return $response->withStatus(403);
}


Эта архитектура обеспечит:
- ✅ Минимальные задержки
- ✅ Надежный контроль доступа
- ✅ Масштабируемость
- ✅ Безопасность
