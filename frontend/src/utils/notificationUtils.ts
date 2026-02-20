export interface NotificationSubscription {
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    };
}

export class NotificationManager {
    private static instance: NotificationManager;
    private vapidPublicKey: string | null = null;
    private registration: ServiceWorkerRegistration | null = null;

    private constructor() {
    }

    static getInstance(): NotificationManager {
        if (!NotificationManager.instance) {
            NotificationManager.instance = new NotificationManager();
        }
        return NotificationManager.instance;
    }

    /**
     * Проверка поддержки уведомлений
     */
    isSupported(): boolean {
        return 'Notification' in window &&
            'serviceWorker' in navigator &&
            'PushManager' in window;
    }

    /**
     * Получение текущего статуса разрешений
     */
    getPermissionStatus(): NotificationPermission {
        if (!this.isSupported()) {
            return 'denied';
        }
        return Notification.permission;
    }

    /**
     * Запрос разрешения на уведомления
     */
    async requestPermission(): Promise<NotificationPermission> {
        if (!this.isSupported()) {
            throw new Error('Notifications not supported');
        }

        const permission = await Notification.requestPermission();
        return permission;
    }

    /**
     * Регистрация Service Worker
     */
    async registerServiceWorker(): Promise<ServiceWorkerRegistration> {
        if (!this.isSupported()) {
            throw new Error('Service Worker not supported');
        }

        try {
            this.registration = await navigator.serviceWorker.register('/js/sw.js');
            console.log('Service Worker registered:', this.registration);

            // Ждем, пока SW станет активным
            await navigator.serviceWorker.ready;

            return this.registration;
        } catch (error) {
            console.error('Service Worker registration failed:', error);
            throw error;
        }
    }

    /**
     * Получение VAPID ключа с сервера
     */
    async fetchVapidKey(): Promise<string> {
        try {
            const response = await fetch('/api/notifications/vapid-key');
            const data = await response.json();

            if (data.success && data.data.publicKey) {
                this.vapidPublicKey = data.data.publicKey;
                return data.data.publicKey;
            }

            throw new Error('Failed to fetch VAPID key');
        } catch (error) {
            console.error('Error fetching VAPID key:', error);
            throw error;
        }
    }

    /**
     * Конвертация VAPID ключа
     */
    private urlBase64ToUint8Array(base64String: string): Uint8Array {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    /**
     * Подписка на push-уведомления
     */
    async subscribe(): Promise<NotificationSubscription> {
        if (!this.registration) {
            await this.registerServiceWorker();
        }

        if (!this.vapidPublicKey) {
            await this.fetchVapidKey();
        }

        try {
            const subscription = await this.registration!.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey!)
            });

            const subscriptionData = subscription.toJSON();

            if (!subscriptionData.keys) {
                throw new Error('Invalid subscription data');
            }

            return {
                endpoint: subscriptionData.endpoint!,
                keys: {
                    p256dh: subscriptionData.keys.p256dh!,
                    auth: subscriptionData.keys.auth!
                }
            };
        } catch (error) {
            console.error('Failed to subscribe:', error);
            throw error;
        }
    }

    /**
     * Отправка подписки на сервер
     */
    async sendSubscriptionToServer(subscription: NotificationSubscription): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('/api/notifications/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({subscription})
            });

            const data = await response.json();
            return data.success;
        } catch (error) {
            console.error('Failed to send subscription to server:', error);
            return false;
        }
    }

    /**
     * Полная инициализация уведомлений
     */
    async initialize(): Promise<boolean> {
        try {
            // 1. Проверка поддержки
            if (!this.isSupported()) {
                console.warn('Notifications not supported');
                return false;
            }

            // 2. Проверка разрешений
            let permission = this.getPermissionStatus();

            if (permission === 'default') {
                permission = await this.requestPermission();
            }

            if (permission !== 'granted') {
                console.warn('Notification permission denied');
                return false;
            }

            // 3. Регистрация Service Worker
            await this.registerServiceWorker();

            // 4. Подписка на уведомления
            const subscription = await this.subscribe();

            // 5. Отправка подписки на сервер
            const success = await this.sendSubscriptionToServer(subscription);

            return success;
        } catch (error) {
            console.error('Failed to initialize notifications:', error);
            return false;
        }
    }

    /**
     * Отписка от уведомлений
     */
    async unsubscribe(): Promise<boolean> {
        try {
            if (!this.registration) {
                return true;
            }

            const subscription = await this.registration.pushManager.getSubscription();

            if (subscription) {
                await subscription.unsubscribe();
            }

            return true;
        } catch (error) {
            console.error('Failed to unsubscribe:', error);
            return false;
        }
    }

    /**
     * Показ тестового уведомления
     */
    async showTestNotification(): Promise<void> {
        if (!this.registration) {
            throw new Error('Service Worker not registered');
        }

        await this.registration.showNotification('Тестовое уведомление', {
            body: 'Уведомления работают!',
            icon: '/icon-192x192.png',
            badge: '/icon-badge.png',
            // vibrate: [200, 100, 200]
        });
    }
}

export const notificationManager = NotificationManager.getInstance();