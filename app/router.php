<?php

declare(strict_types=1);

use Phalcon\Mvc\Router;

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

// Для React Router - все остальные пути на главную страницу
    $router->add('/', [
        'controller' => 'index',
        'action'     => 'index'
    ]);

    $router->add('/my', [
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

    return $router;
};
