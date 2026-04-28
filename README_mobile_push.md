# Mobile Push Notifications (FCM / APNs)

## Архитектура

```
Backend (PHP/Phalcon)
├── db/migrations/
│   ├── 20260424120000_create_mobile_device_tokens_table.php
│   └── 20260424120100_add_channel_to_notification_logs.php
├── app/Models/MobileDeviceToken.php
├── app/Repositories/MobileDeviceTokenRepository.php
├── app/Requests/Notification/RegisterDeviceTokenRequest.php
├── app/Services/MobilePushService.php
├── app/Controllers/MobileDeviceController.php
├── app/Tasks/NotificationTask.php  (обновлённый — заменяет существующий)
└── app/routes/devices.php

Frontend (React / Web)
├── src/api/types/deviceTypes.ts
├── src/api/devicesApi.ts
├── src/store/devices/devicesSlice.ts
└── src/components/Devices/
    ├── DeviceList.tsx
    ├── DeviceCard.tsx
    ├── DeviceList.module.css
    └── index.ts

Mobile (React Native)
├── api/devices.ts
└── services/pushNotificationService.ts
```

---

## Шаги интеграции

### 1. Backend

#### 1.1. Миграции БД

Скопируйте файлы миграций в `db/migrations/` и выполните:

```bash
vendor/bin/phinx migrate
```

Будут созданы:
- Таблица `mobile_device_tokens` — хранение FCM/APNs токенов устройств
- Колонка `channel` и `device_token_id` в `notification_logs` — для логирования канала доставки

#### 1.2. Файлы приложения

Скопируйте в проект:
- `app/Models/MobileDeviceToken.php`
- `app/Repositories/MobileDeviceTokenRepository.php`
- `app/Requests/Notification/RegisterDeviceTokenRequest.php`
- `app/Services/MobilePushService.php`
- `app/Controllers/MobileDeviceController.php`
- `app/Tasks/NotificationTask.php` — **заменяет** существующий файл

#### 1.3. Роуты

Добавьте содержимое `app/routes/devices.php` в `app/router.php` после секции notifications:

```php
// В app/router.php добавить:
$router->addPost('/api/devices/register', [
    'controller' => 'mobileDevice',
    'action'     => 'register',
]);
$router->addGet('/api/devices', [
    'controller' => 'mobileDevice',
    'action'     => 'list',
]);
$router->addDelete('/api/devices/{id:...}', [
    'controller' => 'mobileDevice',
    'action'     => 'unregister',
]);
$router->addPatch('/api/devices/{id:...}/toggle', [
    'controller' => 'mobileDevice',
    'action'     => 'toggle',
]);
$router->addPost('/api/devices/{id:...}/test', [
    'controller' => 'mobileDevice',
    'action'     => 'testPush',
]);
```

#### 1.4. Firebase настройка

Следуйте инструкциям в `.env.fcm.example`:
1. Создайте проект в Firebase Console
2. Сгенерируйте Service Account JSON
3. Добавьте переменные в `.env`:

```env
FCM_PROJECT_ID=your-project-id
FCM_SERVICE_ACCOUNT_PATH=/path/to/firebase-service-account.json
```

#### 1.5. Обновление NotificationLog модели

Добавьте в `app/Models/NotificationLog.php` новые поля:

```php
public string  $channel         = 'web_push'; // 'web_push' | 'fcm' | 'apns'
public ?string $device_token_id = null;
```

---

### 2. Frontend (Web)

#### 2.1. Файлы

Скопируйте в проект:
- `src/api/types/deviceTypes.ts`
- `src/api/devicesApi.ts`
- `src/store/devices/devicesSlice.ts`
- `src/components/Devices/*`

#### 2.2. Redux Store

Добавьте reducer в `src/store/store.ts`:

```typescript
import devicesReducer from './devices/devicesSlice';

export const store = configureStore({
    reducer: {
        // ...существующие reducers
        devices: devicesReducer,
    },
});
```

#### 2.3. Роутинг

Добавьте маршрут в `App.tsx`:

```tsx
import { DeviceList } from '@components/Devices';

// В Routes:
<Route path="/devices" element={<DevicesPage />} />
```

Или встройте компонент `<DeviceList />` в существующую страницу `NotificationsPage`.

---

### 3. Mobile (React Native)

#### 3.1. Зависимости

```bash
npm install @react-native-firebase/app @react-native-firebase/messaging
# Опционально:
npm install react-native-device-info

cd ios && pod install
```

#### 3.2. Firebase конфигурация

- **Android**: `google-services.json` → `android/app/`
- **iOS**: `GoogleService-Info.plist` → `ios/<ProjectName>/`
- **iOS APNs**: загрузите .p8 ключ в Firebase Console → Cloud Messaging → APNs

#### 3.3. Файлы

Скопируйте:
- `api/devices.ts` → в папку API мобильного приложения
- `services/pushNotificationService.ts` → в папку services

#### 3.4. Инициализация

В authStore после успешного login:

```typescript
import { pushNotificationService } from '@/services/pushNotificationService';

// После login.fulfilled:
await pushNotificationService.initialize();

// При logout:
await pushNotificationService.unregister();
```

---

## API Endpoints

| Метод  | URL                           | Описание                         |
|--------|-------------------------------|----------------------------------|
| POST   | `/api/devices/register`       | Регистрация токена устройства    |
| GET    | `/api/devices`                | Список устройств пользователя   |
| DELETE | `/api/devices/{id}`           | Удаление устройства             |
| PATCH  | `/api/devices/{id}/toggle`    | Вкл/выкл уведомлений            |
| POST   | `/api/devices/{id}/test`      | Тестовое уведомление             |

---

## Как работает отправка

Обновлённый `NotificationTask` при обработке расписания:

1. Отправляет **Web Push** через существующий `WebPushService` (VAPID)
2. Отправляет **Mobile Push** через новый `MobilePushService` (FCM HTTP v1 API)
3. Логирует результат в `notification_logs` с указанием канала (`web_push` / `fcm` / `apns`)
4. Автоматически деактивирует невалидные токены

Firebase Cloud Messaging сам маршрутизирует уведомления:
- Для Android → через FCM напрямую
- Для iOS → через APNs (настроенный в Firebase Console)
