<?php

require_once __DIR__ . '/vendor/autoload.php';

use Minishlink\WebPush\VAPID;

try {
    $keys = VAPID::createVapidKeys();

    echo "\n╔════════════════════════════════════════════════════════════╗\n";
    echo "║         VAPID Keys Generated Successfully                 ║\n";
    echo "╚════════════════════════════════════════════════════════════╝\n\n";

    echo "📋 Copy these values to your .env file:\n\n";

    echo "VAPID_PUBLIC_KEY=" . $keys['publicKey'] . "\n";
    echo "VAPID_PRIVATE_KEY=" . $keys['privateKey'] . "\n";
    echo "VAPID_SUBJECT=mailto:geka_nkz@mail.ru\n\n";

    echo "✓ Done!\n\n";

} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    exit(1);
}