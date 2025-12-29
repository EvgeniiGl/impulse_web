<?php

declare(strict_types=1);

use Phalcon\Mvc\Router;

/**
 * Router configuration
 */
return function (): Router {

    $router = new Router(false);

// API маршруты
    $router->add('/api/login', [
        'controller' => 'api',
        'action'     => 'login'
    ]);

    $router->add('/api/logout', [
        'controller' => 'api',
        'action'     => 'logout'
    ]);

    $router->add('/api/user', [
        'controller' => 'api',
        'action'     => 'getUser'
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

// Wildcard для всех остальных React Router маршрутов
    $router->add('/(.*)', [
        'controller' => 'index',
        'action'     => 'index'
    ]);

    return $router;
};
