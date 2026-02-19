<?php

declare(strict_types=1);

use Dotenv\Dotenv;
use Phalcon\Autoload\Loader;
use Phalcon\Cli\Console;
use Phalcon\Cli\Dispatcher;
use Phalcon\Cli\Console\Exception as PhalconException;
use Phalcon\Di\FactoryDefault\Cli as CliDI;
use Phalcon\Db\Adapter\Pdo\Postgresql;

require_once __DIR__ . '/../vendor/autoload.php';

$loader = new Loader();
$loader->setNamespaces(
    [
        'App' => 'app/',
    ]
);
$loader->register();

if (!defined('APP_PATH')) {
    define('APP_PATH', realpath(__DIR__ . '/..'));
}

$dotenv = Dotenv::createImmutable(APP_PATH);
$dotenv->load();

$container  = new CliDI();
$dispatcher = new Dispatcher();

$dispatcher->setDefaultNamespace('App\Tasks');
$container->setShared('dispatcher', $dispatcher);

// Register config service
$container->setShared('config', function () {
    return include APP_PATH . '/config/config.php';
});

$container->setShared('db', require __DIR__ . '/../config/db.php');

// Optional: Register models manager
$container->setShared('modelsManager', function () {
    return new \Phalcon\Mvc\Model\Manager();
});

// Optional: Register models metadata
$container->setShared('modelsMetadata', function () {
    return new \Phalcon\Mvc\Model\Metadata\Memory();
});

$console = new Console($container);

$arguments = [];
foreach ($argv as $k => $arg) {
    if ($k === 1) {
        $arguments['task'] = $arg;
    } elseif ($k === 2) {
        $arguments['action'] = $arg;
    } elseif ($k >= 3) {
        $arguments['params'][] = $arg;
    }
}

try {
    $console->handle($arguments);
} catch (Exception $throwable) {
    fwrite(STDERR, $throwable->getMessage() . PHP_EOL);
    exit(1);
}