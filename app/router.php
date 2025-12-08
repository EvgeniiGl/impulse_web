<?php

declare(strict_types=1);

use App\Auth\Controllers\AuthController;
use Phalcon\Mvc\Router;

/**
 * Router configuration
 */
return function (): Router {
    $router = new Router();
//    $router->setDefaultController(IndexController::class);
//    $router->setDefaultAction('index');

    // API routes
    $router->add('/login', [
        'controller' => 'Auth',
        'action'     => 'login',
    ])->via(['POST']);

    return $router;
};
