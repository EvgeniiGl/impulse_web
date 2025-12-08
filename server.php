<?php

use Swoole\Http\Request;
use Swoole\Http\Response;
use Swoole\WebSocket\Server;

// Load environment variables
/**
 * @throws Exception
 */
function loadEnv($path): void
{
    if (!file_exists($path)) {
        throw new Exception(".env file not found");
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (str_starts_with(trim($line), '#')) {
            continue;
        }

        list($name, $value) = explode('=', $line, 2);
        $_ENV[trim($name)] = trim($value);
    }
}

loadEnv(__DIR__ . '/.env');

$host = $_ENV['SERVER_HOST'] ?? '0.0.0.0';
$port = (int)($_ENV['SERVER_PORT'] ?? 9501);

echo "Starting Swoole WebSocket Server on {$host}:{$port}\n";

// Create WebSocket Server (it also handles HTTP requests)
$server = new Server($host, $port);

$server->set([
    'worker_num'            => 4,
    'enable_static_handler' => true,
    'document_root'         => __DIR__ . '/public',
]);

$convertSwooleServer = function (Request $swooleRequest): array {
    $server = [];

    // Basic server variables
    $server['REQUEST_METHOD']    = $swooleRequest->server['request_method'] ?? 'GET';
    $server['REQUEST_URI']       = $swooleRequest->server['request_uri'] ?? '/';
    $server['QUERY_STRING']      = $swooleRequest->server['query_string'] ?? '';
    $server['SERVER_PROTOCOL']   = $swooleRequest->server['server_protocol'] ?? 'HTTP/1.1';
    $server['SERVER_NAME']       = 'swoole-server';
    $server['SERVER_PORT']       = $swooleRequest->server['server_port'] ?? 9501;
    $server['REMOTE_ADDR']       = $swooleRequest->server['remote_addr'] ?? '127.0.0.1';
    $server['REMOTE_PORT']       = $swooleRequest->server['remote_port'] ?? 0;
    $server['SERVER_SOFTWARE']   = 'Swoole/' . SWOOLE_VERSION;
    $server['GATEWAY_INTERFACE'] = 'CGI/1.1';

    // Add all headers with HTTP_ prefix
    foreach ($swooleRequest->header as $key => $value) {
        $serverKey          = 'HTTP_' . strtoupper(str_replace('-', '_', $key));
        $server[$serverKey] = $value;

        // Special headers that don't use HTTP_ prefix
        if (strtolower($key) === 'content-type') {
            $server['CONTENT_TYPE'] = $value;
        }
        if (strtolower($key) === 'content-length') {
            $server['CONTENT_LENGTH'] = $value;
        }
    }

    // Set REQUEST_TIME_FLOAT if not set
    $server['REQUEST_TIME_FLOAT'] = microtime(true);
    $server['REQUEST_TIME']       = (int)$server['REQUEST_TIME_FLOAT'];

    return $server;
};

// Handle HTTP requests
$server->on('request', function (Request $swooleRequest, Response $swooleResponse) use ($convertSwooleServer) {
    try {
        // Convert Swoole request to PHP globals
        $_SERVER = $convertSwooleServer($swooleRequest);
        $_GET    = $swooleRequest->get ?? [];
        $_POST   = $swooleRequest->post ?? [];
        $_FILES  = $swooleRequest->files ?? [];
        $_COOKIE = $swooleRequest->cookie ?? [];

        // Handle raw input
        $rawContent = $swooleRequest->rawContent();
        if (!empty($rawContent)) {
            $_POST = array_merge($_POST, json_decode($rawContent, true) ?? []);
        }

        // Capture output
        ob_start();

        // Include your existing Phalcon application
        require __DIR__ . '/public/index.php';

        $output = ob_get_clean();

        // Get headers from Phalcon response if available
        if (isset($response) && method_exists($response, 'getHeaders')) {
            $headers = $response->getHeaders();
            foreach ($headers as $name => $value) {
                $swooleResponse->header($name, $value);
            }
        }

        // Get status code
        if (isset($response) && method_exists($response, 'getStatusCode')) {
            $swooleResponse->status($response->getStatusCode());
        }

        $swooleResponse->end($output);

    } catch (Throwable $e) {
        $swooleResponse->status(500);
        $swooleResponse->header('Content-Type', 'application/json');
        $swooleResponse->end(json_encode([
            'error'   => 'Internal Server Error',
            'message' => $e->getMessage(),
            'trace'   => (getenv('APP_DEBUG') === 'true') ? $e->getTrace() : []
        ]));
    }
});

// Handle WebSocket connections
$server->on('open', function (Swoole\WebSocket\Server $server, $request) {
    echo "New WebSocket connection: {$request->fd}\n";
    $server->push($request->fd, json_encode([
        'type'    => 'system',
        'message' => 'Welcome to the chat!',
        'userId'  => $request->fd
    ]));
});

$server->on('message', function (Swoole\WebSocket\Server $server, $frame) {
    echo "Received message: {$frame->data}\n";

    $data = json_decode($frame->data, true);

    // Broadcast message to all connections
    foreach ($server->connections as $fd) {
        if ($server->isEstablished($fd)) {
            $server->push($fd, json_encode([
                'type'      => 'message',
                'userId'    => $frame->fd,
                'username'  => $data['username'] ?? 'Anonymous',
                'message'   => $data['message'] ?? '',
                'timestamp' => date('H:i:s')
            ]));
        }
    }
});

$server->on('close', function ($server, $fd) {
    echo "Connection closed: {$fd}\n";

    // Notify others that user left
    foreach ($server->connections as $conn_fd) {
        if ($server->isEstablished($conn_fd)) {
            $server->push($conn_fd, json_encode([
                'type'      => 'system',
                'message'   => "User {$fd} left the chat",
                'timestamp' => date('H:i:s')
            ]));
        }
    }
});

$server->on('start', function ($server) use ($host, $port) {
    echo "Server started successfully!\n";
    echo "HTTP Server: http://{$host}:{$port}\n";
    echo "WebSocket Server: ws://{$host}:{$port}\n";
    echo "Access Chat at: http://localhost:{$port}/chat\n";
});

$server->on('task', function (Server $server, int $taskId, int $workerId, mixed $data) {
    echo "Task {$taskId} started in worker {$workerId}\n";

    // Process task here
    // ...

    return ['result' => 'success'];
});

$server->on('finish', function (Server $server, int $taskId, mixed $data) {
    echo "Task {$taskId} finished\n";
});

echo "Starting server...\n";
$server->start();
