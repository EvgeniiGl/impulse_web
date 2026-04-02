<?php

declare(strict_types=1);

use Phalcon\Mvc\Router;
use Phalcon\Mvc\Router\Group as RouterGroup;

/**
 * Router configuration
 */
return function (): Router {

    $router = new Router(false);

// auth маршруты
    $router->add('/auth/login', [
        'controller' => 'auth',
        'action'     => 'login'
    ]);
    $router->add('/auth/logout', [
        'controller' => 'auth',
        'action'     => 'logout'
    ]);
    $router->add('/auth/register', [
        'controller' => 'auth',
        'action'     => 'register'
    ]);
    $router->add('/auth/user', [
        'controller' => 'auth',
        'action'     => 'getUser'
    ]);
    $router->add('/auth/refresh-token', [
        'controller' => 'auth',
        'action'     => 'refreshToken'
    ], [
        'POST'
    ]);

// users маршруты
    $router->add('/users/block/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', [
        'controller' => 'users',
        'action'     => 'block'
    ]);
    $router->add('/users/unblock/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', [
        'controller' => 'users',
        'action'     => 'unblock'
    ]);

// cards маршруты
    $router->add('/cards', [
        'controller' => 'cards',
        'action'     => 'create'
    ], [
        'POST'
    ]);
    $router->add('/cards', [
        'controller' => 'cards',
        'action'     => 'index'
    ], [
        'GET'
    ]);
    $router->add('/api/card/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', [
        'controller' => 'cards',
        'action'     => 'get'
    ], [
        'GET'
    ]);
    $router->add('/cards/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', [
        'controller' => 'cards',
        'action'     => 'update'
    ], [
        'PUT'
    ]);
    $router->add('/api/cards/my', [
        'controller' => 'cards',
        'action'     => 'my'
    ], [
        'GET'
    ]);
    $router->add('/api/cards/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', [
        'controller' => 'cards',
        'action'     => 'delete'
    ], [
        'DELETE'
    ]);

// home маршруты (публичные — без авторизации)
    $router->addGet('/api/home/cards', [
        'controller' => 'home',
        'action'     => 'cards'
    ]);
    $router->addGet('/api/home/search', [
        'controller' => 'home',
        'action'     => 'search'
    ]);

// collections маршруты
// Создаем группу отдельно
    $collectionGroup = new RouterGroup([
        'controller' => 'collections',
    ]);

// Добавляем маршруты
    $collectionGroup->addGet('/api/collections', ['action' => 'index']);
    $collectionGroup->addGet('/api/collections/my', ['action' => 'my']);
    $collectionGroup->addPost('/api/collections', ['action' => 'create']);
    $collectionGroup->addGet('/api/collections/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', ['action' => 'show']);
    $collectionGroup->addPut('/api/collections/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', ['action' => 'update']);
    $collectionGroup->addDelete('/api/collections/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', ['action' => 'delete']);

// Карточки в коллекции
    $collectionGroup->addPost('/api/collections/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}/cards', ['action' => 'addCard']);
    $collectionGroup->addPatch('/api/collections/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}/cards', ['action' => 'moveCard']);
    $collectionGroup->addDelete('/api/collections/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}/cards/{card_id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', ['action' => 'removeCard']);

// Расшаривание
    $collectionGroup->addPost('/api/collections/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}/share', ['action' => 'share']);
    $collectionGroup->addDelete('/api/collections/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}/share/{user_id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', ['action' => 'unshare']);
    $collectionGroup->addGet('/api/collections/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}/shared-users', ['action' => 'sharedUsers']);

// Монтируем группу к роутеру
    $router->mount($collectionGroup);

// notifications маршруты
    $router->addGet('/api/notifications/vapid-key', [
        'controller' => 'notification',
        'action'     => 'getVapidKey'
    ]);

    $router->addPost('/api/notifications/subscribe', [
        'controller' => 'notification',
        'action'     => 'subscribe'
    ]);

    $router->addPost('/api/notifications/schedules', [
        'controller' => 'notification',
        'action'     => 'createSchedule'
    ]);

    $router->addGet('/api/notifications/schedules', [
        'controller' => 'notification',
        'action'     => 'getSchedules'
    ]);

    $router->addPut('/api/notifications/schedules/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', [
        'controller' => 'notification',
        'action'     => 'updateSchedule'
    ]);

    $router->addDelete('/api/notifications/schedules/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', [
        'controller' => 'notification',
        'action'     => 'deleteSchedule'
    ]);

    $router->addPost('/api/notifications/validate-subscription', [
        'controller' => 'notification',
        'action'     => 'validateSubscription'
    ]);

// Для React Router - все остальные пути на главную страницу
    $router->add('/', [
        'controller' => 'index',
        'action'     => 'index'
    ]);

    $router->add('/my', [
        'controller' => 'index',
        'action'     => 'index'
    ]);

    $router->add('/card/create', [
        'controller' => 'index',
        'action'     => 'index'
    ]);

    $router->add('/collection/create', [
        'controller' => 'index',
        'action'     => 'index'
    ]);

    $router->add('/today', [
        'controller' => 'index',
        'action'     => 'index'
    ]);

    $router->add('/notification', [
        'controller' => 'index',
        'action'     => 'index'
    ]);

    $router->add('/card/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', [
        'controller' => 'index',
        'action'     => 'index'
    ], [
        'GET'
    ]);

    $router->add('/login', [
        'controller' => 'index',
        'action'     => 'index'
    ]);

    $router->addGet('/download/signed', [
        'controller' => 'download',
        'action'     => 'signed'
    ]);

    $router->notFound([
        'controller' => 'error',
        'action'     => 'notFound'
    ]);

// Лайки карточек
    $router->addPost('/api/cards/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}/like', [
        'controller' => 'likes',
        'action'     => 'toggleCardLike'
    ]);

    $router->addGet('/api/cards/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}/like', [
        'controller' => 'likes',
        'action'     => 'getCardLikeStatus'
    ]);

    $router->addGet('/api/cards/liked', [
        'controller' => 'likes',
        'action'     => 'getLikedCards'
    ]);

// Лайки коллекций
    $router->addPost('/api/collections/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}/like', [
        'controller' => 'likes',
        'action'     => 'toggleCollectionLike'
    ]);

    $router->addGet('/api/collections/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}/like', [
        'controller' => 'likes',
        'action'     => 'getCollectionLikeStatus'
    ]);

    $router->addGet('/api/collections/liked', [
        'controller' => 'likes',
        'action'     => 'getLikedCollections'
    ]);

    // === Маршруты жалоб и скрытия карточек ===

// POST /api/cards/{id}/report — жалоба на карточку
    $router->add('/api/cards/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}/report', [
        'controller' => 'report',
        'action'     => 'report'
    ], [
        'POST'
    ]);

// POST /api/cards/{id}/hide — скрыть карточку
    $router->add('/api/cards/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}/hide', [
        'controller' => 'report',
        'action'     => 'hide'
    ], [
        'POST'
    ]);

    return $router;
};