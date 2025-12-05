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
    'worker_num' => 4,
    'enable_static_handler' => true,
    'document_root' => __DIR__ . '/public',
]);

// Handle HTTP requests
$server->on('request', function (Request $request, Response $response) {
    $uri = $request->server['request_uri'];

    // Route handling
    if ($uri === '/' || $uri === '/index.php') {
        $content = file_get_contents(__DIR__ . '/public/index.php');
        $response->header('Content-Type', 'text/html');

        // Simple template rendering
        ob_start();
        eval('?>' . $content);
        $output = ob_get_clean();

        $response->end($output);
    } elseif ($uri === '/chat') {
        $content = file_get_contents(__DIR__ . '/public/chat.html');
        $response->header('Content-Type', 'text/html');
        $response->end($content);
    } else {
        $response->status(404);
        $response->end('Not Found');
    }
});

// Handle WebSocket connections
$server->on('open', function (Swoole\WebSocket\Server $server, $request) {
    echo "New WebSocket connection: {$request->fd}\n";
    $server->push($request->fd, json_encode([
        'type' => 'system',
        'message' => 'Welcome to the chat!',
        'userId' => $request->fd
    ]));
});

$server->on('message', function (Swoole\WebSocket\Server $server, $frame) {
    echo "Received message: {$frame->data}\n";

    $data = json_decode($frame->data, true);

    // Broadcast message to all connections
    foreach ($server->connections as $fd) {
        if ($server->isEstablished($fd)) {
            $server->push($fd, json_encode([
                'type' => 'message',
                'userId' => $frame->fd,
                'username' => $data['username'] ?? 'Anonymous',
                'message' => $data['message'] ?? '',
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
                'type' => 'system',
                'message' => "User {$fd} left the chat",
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

echo "Starting server...\n";
$server->start();
