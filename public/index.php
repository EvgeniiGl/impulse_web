<?php

declare(strict_types=1);

// Set timezone
date_default_timezone_set('Europe/Moscow');

// ── CORS ──────────────────────────────────────────────────────────────
$allowedOrigins = [
    'http://localhost:8081',
    'http://localhost:19006',
    'http://localhost:3000',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    header('Access-Control-Allow-Origin: *');
}

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept, Accept-Language, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}
// ── /CORS ─────────────────────────────────────────────────────────────

// Include bootstrap
require_once __DIR__ . '/../app/bootstrap.php';