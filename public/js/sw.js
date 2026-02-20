// Service Worker для обработки push-уведомлений
self.addEventListener('push', function (event) {
    console.log('Push received:', event);

    let data = {};

    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data = {
                title: 'Новое уведомление',
                body: event.data.text()
            };
        }
    }

    const title = data.title || 'Уведомление';
    const options = {
        body: data.body || '',
        icon: data.icon || '/icon-192x192.png',
        badge: data.badge || '/icon-badge.png',
        data: data.data || {},
        actions: data.actions || [],
        tag: data.data?.card_id || 'notification',
        requireInteraction: false,
        vibrate: [200, 100, 200]
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Обработка клика по уведомлению
self.addEventListener('notificationclick', function (event) {
    console.log('Notification clicked:', event);

    event.notification.close();

    if (event.action === 'close') {
        return;
    }

    const urlToOpen = event.notification.data?.url || '/';

    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then(function (clientList) {
            // Проверяем, есть ли уже открытое окно
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }

            // Открываем новое окно
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );

    // Отправляем статистику о клике
    if (event.notification.data?.schedule_id) {
        fetch('/api/notifications/clicked', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                schedule_id: event.notification.data.schedule_id
            })
        }).catch(err => console.error('Failed to log click:', err));
    }
});

// Обработка закрытия уведомления
self.addEventListener('notificationclose', function (event) {
    console.log('Notification closed:', event);
});

self.addEventListener('install', function (event) {
    console.log('Service Worker installing.');
    self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    console.log('Service Worker activating.');
    event.waitUntil(clients.claim());
});