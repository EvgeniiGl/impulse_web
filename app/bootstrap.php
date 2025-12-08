<?php

declare(strict_types=1);

// Load Composer autoloader
require_once __DIR__ . '/../vendor/autoload.php';

define('APP_PATH', realpath(__DIR__ . '/..'));

use App\DB;
use App\Handlers\ExceptionHandler;
use Dotenv\Dotenv;
use Phalcon\Di\FactoryDefault;
use Phalcon\Mvc\Application;
use Phalcon\Mvc\Model\MetaData\Memory;
use Phalcon\Logger\Logger;
use Phalcon\Logger\Adapter\Stream;
use Phalcon\Mvc\View;
use Phalcon\Support\Debug;
use Phalcon\Mvc\Model\Manager as ModelsManager;

$dotenv = Dotenv::createImmutable(APP_PATH);
$dotenv->load();

// Enable error reporting in development
if (getenv('APP_DEBUG') ?? false) {
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    (new Debug())->listen();
}

// Create DI
$di = new FactoryDefault();

// Register config
$di->setShared('config', require __DIR__ . '/../config/config.php');

// Register database connection
$di->setShared('db', function () use ($di) {
    return DB::create($di);
});

// Register models manager
$di->setShared('modelsManager', ModelsManager::class);

// Register models metadata
$di->setShared('modelsMetadata', Memory::class);

// Register logger
$di->setShared('logger', function () {
    $logPath = getenv('PHALCON_LOG_PATH') ? getenv('PHALCON_LOG_PATH') : __DIR__ . '/../logs';
    if (!is_dir($logPath)) {
        mkdir($logPath, 0755, true);
    }
    return new Logger('messages', [
        'main' => new Stream($logPath . '/app.log'),
    ]);
});

$di->setShared('router', require __DIR__ . '/router.php');

$di->setShared('dispatcher', require __DIR__ . '/dispatcher.php');

$di->setShared('view', function () {
    $view = new View();
    $view->setViewsDir(APP_PATH . '/app/Views/');
    return $view;
});

$application = new Application($di);


try {
    $response = $application->handle($_SERVER['REQUEST_URI']);
    $response->send();
} catch (Throwable $e) {
    $logger = $di->get('logger');
    $debug = getenv('APP_DEBUG') === 'true' || getenv('APP_DEBUG') === '1';
    $exceptionHandler = new ExceptionHandler($logger, $debug);

    $errorResponse = $exceptionHandler->handle($e);
    $errorResponse->send();
}
