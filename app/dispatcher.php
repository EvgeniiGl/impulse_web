<?php

declare(strict_types=1);

use App\Middleware\CorsMiddleware;
use Phalcon\Events\Manager as EventsManager;
use Phalcon\Mvc\Dispatcher;

/**
 * Dispatcher configuration
 */
return function (): Dispatcher {
    $dispatcher = new Dispatcher();
    $dispatcher->setDefaultController('Index');
    $dispatcher->setDefaultAction('index');
    $dispatcher->setControllerSuffix('Controller');
    $dispatcher->setActionSuffix('Action');
    $dispatcher->setDefaultNamespace('App\\Controllers');

    return $dispatcher;
};