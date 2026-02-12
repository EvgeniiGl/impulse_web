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
    $router->add('/cards/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', [
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
    $router->add('/cards/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', [
        'controller' => 'cards',
        'action'     => 'delete'
    ], [
        'DELETE'
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

    $router->add('/login', [
        'controller' => 'index',
        'action'     => 'index'
    ]);

    $router->addGet('/download/signed', [
        'controller' => 'download',
        'action'     => 'signed'
    ]);

// collections маршруты
// Создаем группу отдельно
    $collectionGroup = new RouterGroup([
        'controller' => 'collections',
    ]);

// Добавляем маршруты
    $collectionGroup->addGet('/collections', ['action' => 'index']);
    $collectionGroup->addGet('/collections/my', ['action' => 'my']);
    $collectionGroup->addPost('/collections', ['action' => 'create']);
    $collectionGroup->addGet('/collections/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', ['action' => 'show']);
    $collectionGroup->addPut('/collections/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', ['action' => 'update']);
    $collectionGroup->addDelete('/collections/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', ['action' => 'delete']);

// Карточки в коллекции
    $collectionGroup->addPost('/collections/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}/cards', ['action' => 'addCard']);
    $collectionGroup->addDelete('/collections/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}/cards/{card_id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', ['action' => 'removeCard']);

// Расшаривание
    $collectionGroup->addPost('/collections/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}/share', ['action' => 'share']);
    $collectionGroup->addDelete('/collections/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}/share/{user_id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}', ['action' => 'unshare']);
    $collectionGroup->addGet('/collections/{id:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}}/shared-users', ['action' => 'sharedUsers']);

// Монтируем группу к роутеру
    $router->mount($collectionGroup);

    $router->notFound([
        'controller' => 'error',
        'action'     => 'notFound'
    ]);

    return $router;
};
