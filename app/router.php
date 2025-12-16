<?php

declare(strict_types=1);

use Phalcon\Mvc\Router;

/**
 * Router configuration
 */
return function (): Router {
    $router = new Router();
//    $router->setDefaultController(IndexController::class);
//    $router->setDefaultAction('index');

    $router->addPost('/cards', [
        'controller' => 'cards',
        'action'     => 'create'
    ]);

    $router->addPost('/auth/login', [
        'controller' => 'auth',
        'action'     => 'login'
    ]);

    return $router;
};
