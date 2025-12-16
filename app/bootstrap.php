<?php

declare(strict_types=1);

// Load Composer autoloader
require_once __DIR__ . '/../vendor/autoload.php';

date_default_timezone_set('Europe/Moscow');
if (!defined('APP_PATH')) {
    define('APP_PATH', realpath(__DIR__ . '/..'));
}

use App\Handlers\ExceptionHandler;
use App\Providers\TranslationServiceProvider;
use Dotenv\Dotenv;
use Phalcon\Cache\AdapterFactory;
use Phalcon\Cache\Cache;
use Phalcon\Di\FactoryDefault;
use Phalcon\Mvc\Application;
use Phalcon\Mvc\Model\MetaData\Memory;
use Phalcon\Logger\Logger;
use Phalcon\Logger\Adapter\Stream;
use Phalcon\Mvc\View;
use Phalcon\Storage\SerializerFactory;
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
$di->setShared('db', require __DIR__ . '/../config/db.php');

$di->register(new TranslationServiceProvider());

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

$di->setShared('storage', require __DIR__ . '/../config/di/storage.php');

$di->setShared('cardService', require __DIR__ . '/../config/di/cardService.php');

$di->setShared('view', function () {
    $view = new View();
    $view->setViewsDir(APP_PATH . '/app/Views/');
    return $view;
});

// Регистрация кэша
$di->set(
    'cache', // Name of the service
    function () {
        $serializerFactory = new SerializerFactory();
        $adapterFactory    = new AdapterFactory($serializerFactory);

        $options = [
            'defaultSerializer' => 'Php', // Use PHP serialization by default
            'lifetime'          => 3600,  // Default lifetime in seconds (1 hour)
        ];

        // Create an Apcu adapter instance
        $adapter = $adapterFactory->newInstance('apcu', $options);

        // Return the Cache instance
        return new Cache($adapter);
    }
);
$application = new Application($di);

//$application->before(
//    new AuthMiddleware($di->get('config'), $di->get('cache'))
//);

try {
    $response = $application->handle($_SERVER['REQUEST_URI']);
    $response->send();
} catch (Throwable $e) {
    $logger           = $di->get('logger');
    $debug            = getenv('APP_DEBUG') === 'true' || getenv('APP_DEBUG') === '1';
    $exceptionHandler = new ExceptionHandler($logger, $debug);

    $errorResponse = $exceptionHandler->handle($e);
    $errorResponse->send();
}
