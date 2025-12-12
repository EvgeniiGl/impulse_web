<?php

declare(strict_types=1);

use Phalcon\Mvc\Dispatcher;

/**
 * Dispatcher configuration
 */
return function (): Dispatcher {
    $dispatcher = new Dispatcher();
    $dispatcher->setDefaultController('card');
    $dispatcher->setDefaultAction('index');
    $dispatcher->setControllerSuffix('Controller');
    $dispatcher->setActionSuffix('Action');
    $dispatcher->setDefaultNamespace('App\\Controllers');
    return $dispatcher;
};
