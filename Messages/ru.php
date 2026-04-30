<?php
// Messages/ru.php
return [
    // -------------------------------------------------------------------------
    // General
    // -------------------------------------------------------------------------
    'Impulse'                                                                                   => 'Импульс',
    'Field is required'                                                                         => 'Поле обязательно для заполнения',
    'Incorrect data'                                                                            => 'Неверные данные',
    'Hello %name%'                                                                              => 'Привет %name%',
    'Invalid JSON data'                                                                         => 'Неверные данные JSON',
    'Internal server error'                                                                     => 'Внутренняя ошибка сервера',
    'Invalid or expired token'                                                                  => 'Недействительный или просроченный токен',

    // -------------------------------------------------------------------------
    // Auth
    // -------------------------------------------------------------------------
    'Invalid email or password'                                                                 => 'Неверный email или пароль',
    'Account is deactivated'                                                                    => 'Аккаунт деактивирован',
    'User with this email already exists'                                                       => 'Пользователь с таким email уже существует',
    'Authorization header is missing or invalid'                                                => 'Отсутствует или неверный заголовок авторизации',
    'Successfully logged out'                                                                   => 'Успешно вышли из системы',
    'Token is invalid'                                                                          => 'Неверный токен',
    'User not found or inactive'                                                                => 'Пользователь не найден или неактивен',
    'Authentication required'                                                                   => 'Требуется аутентификация',
    'Unauthorized'                                                                              => 'Не авторизован',

    // -------------------------------------------------------------------------
    // Validation — cards
    // -------------------------------------------------------------------------
    'Title is required'                                                                         => 'Название обязательно',
    'Title must be at least 3 characters'                                                       => 'Название должно содержать минимум 3 символа',
    'Title must not exceed 100 characters'                                                      => 'Название не должно превышать 100 символов',
    'Description must not exceed 1500 characters'                                               => 'Описание не должно превышать 1500 символов',
    'Description must not exceed 5000 characters'                                               => 'Описание не должно превышать 5000 символов',
    'Access type must be one of: private, shared, public'                                       => 'Тип доступа должен быть одним из: private, shared, public',
    'File required'                                                                             => 'Файл обязателен',
    'Collection ID must be a non-empty string'                                                  => 'ID коллекции должен быть непустой строкой',
    'Collection ID must be a valid UUID'                                                        => 'ID коллекции должен быть корректным UUID',

    // -------------------------------------------------------------------------
    // Cards CRUD
    // -------------------------------------------------------------------------
    'Card deleted successfully'                                                                 => 'Карточка успешно удалена',
    'Card not found'                                                                            => 'Карточка не найдена',
    'Card not found or access denied'                                                           => 'Карточка не найдена или доступ запрещён',
    'Access denied'                                                                             => 'Доступ запрещён',
    'Card hidden successfully'                                                                  => 'Карточка скрыта',
    'Private cards limit reached'                                                               => 'Достигнут лимит приватных карточек. Нельзя иметь более %limit% приватных карточек.',

    // -------------------------------------------------------------------------
    // Validation — users / auth
    // -------------------------------------------------------------------------
    'Email is required'                                                                         => 'Требуется email',
    'Invalid email format'                                                                      => 'Неверный формат email',
    'Email must not exceed 255 characters'                                                      => 'Email не должен превышать 255 символов',
    'Password is required'                                                                      => 'Требуется пароль',
    'Password must be at least 8 characters'                                                    => 'Пароль должен содержать не менее 8 символов',
    'Password must not exceed 72 characters'                                                    => 'Пароль не должен превышать 72 символа',
    'Password must contain at least one uppercase letter, one lowercase letter, and one number' => 'Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру',
    'Name is required'                                                                          => 'Имя обязательно',
    'Name must not exceed 100 characters'                                                       => 'Имя не должно превышать 100 символов',

    // -------------------------------------------------------------------------
    // Collections
    // -------------------------------------------------------------------------
    'Collection not found'                                                                      => 'Коллекция не найдена',
    'Collection not found or access denied'                                                     => 'Коллекция не найдена или доступ запрещён',
    'Collection already exists'                                                                 => 'Коллекция уже существует',
    'Error creating collection'                                                                 => 'Ошибка при создании коллекции',
    'Collection deleted successfully'                                                           => 'Коллекция успешно удалена',
    'Collection name is required'                                                               => 'Название коллекции обязательно',
    'Collection name must not exceed 100 characters'                                            => 'Название коллекции не должно превышать 100 символов',
    'Card removed from collection'                                                              => 'Карточка удалена из коллекции',
    'Card not found in collection or access denied'                                             => 'Карточка не найдена в коллекции или доступ запрещён',
    'Card already in collection'                                                                => 'Карточка уже есть в коллекции',
    'Card added to collection successfully'                                                     => 'Карточка успешно добавлена в коллекцию',
    'Card collections updated successfully'                                                     => 'Коллекции карточки успешно обновлены',
    'Collection shared successfully'                                                            => 'Коллекция успешно открыта для доступа',
    'Collection already shared with this user'                                                  => 'Коллекция уже открыта для этого пользователя',
    'Permission must be one of: read, write, admin. Allowed values: read, write, admin'         => 'Разрешение должно быть одним из: read, write, admin',
    'Error updating card collections'                                                           => 'Ошибка при обновлении коллекций карточки',
    'Collection cards fetched successfully'                                                     => 'Карточки коллекции успешно получены',
    'Invalid page number'                                                                       => 'Неверный номер страницы',
    'Invalid per_page value'                                                                    => 'Неверное значение per_page',

    // -------------------------------------------------------------------------
    // Likes
    // -------------------------------------------------------------------------
    'Like added'                                                                                => 'Лайк добавлен',
    'Like removed'                                                                              => 'Лайк удалён',
    'Failed to add like'                                                                        => 'Не удалось добавить лайк',
    'Failed to remove like'                                                                     => 'Не удалось удалить лайк',

    // -------------------------------------------------------------------------
    // Reports
    // -------------------------------------------------------------------------
    'Reason is required'                                                                        => 'Причина обязательна',
    'Invalid report reason'                                                                     => 'Недопустимая причина жалобы',
    'Report submitted successfully'                                                             => 'Жалоба успешно отправлена',

    // -------------------------------------------------------------------------
    // Notifications / schedules
    // -------------------------------------------------------------------------
    'Subscription data required'                                                                => 'Необходимы данные подписки',
    'Subscription saved'                                                                        => 'Подписка сохранена',
    'Failed to save subscription'                                                               => 'Не удалось сохранить подписку',
    'Schedule not found'                                                                        => 'Расписание не найдено',
    'Schedule deleted'                                                                          => 'Расписание удалено',
    'Schedule saved successfully'                                                               => 'Расписание успешно сохранено',

    // -------------------------------------------------------------------------
    // Mobile devices
    // -------------------------------------------------------------------------
    'Device token is required'                                                                  => 'Токен устройства обязателен',
    'Device token is too short'                                                                 => 'Токен устройства слишком короткий',
    'Device token is too long'                                                                  => 'Токен устройства слишком длинный',
    'Platform is required'                                                                      => 'Платформа обязательна',
    'Platform must be ios or android'                                                           => 'Платформа должна быть ios или android',
    'Device name is too long'                                                                   => 'Название устройства слишком длинное',
    'App version is too long'                                                                   => 'Версия приложения слишком длинная',
    'OS version is too long'                                                                    => 'Версия ОС слишком длинная',
    'Device registered successfully'                                                            => 'Устройство успешно зарегистрировано',
    'Failed to register device'                                                                 => 'Не удалось зарегистрировать устройство',
    'Device unregistered successfully'                                                          => 'Устройство успешно отвязано',
    'Failed to unregister device'                                                               => 'Не удалось отвязать устройство',
    'Device not found'                                                                          => 'Устройство не найдено',
    'Active device not found'                                                                   => 'Активное устройство не найдено',
    'Invalid device ID format'                                                                  => 'Неверный формат ID устройства',
    'Failed to list devices'                                                                    => 'Не удалось получить список устройств',
    'Failed to toggle device'                                                                   => 'Не удалось изменить статус устройства',
    'Failed to update device'                                                                   => 'Не удалось обновить устройство',
    'Device activated'                                                                          => 'Устройство активировано',
    'Device deactivated'                                                                        => 'Устройство деактивировано',
    'Test notification sent'                                                                    => 'Тестовое уведомление отправлено',
    'Failed to send test notification'                                                          => 'Не удалось отправить тестовое уведомление',

    // -------------------------------------------------------------------------
    // Users
    // -------------------------------------------------------------------------
    'User not found'                                                                            => 'Пользователь не найден',
    'User blocked'                                                                              => 'Пользователь заблокирован',
    'User unblocked'                                                                            => 'Пользователь разблокирован',
    'Failed to block user'                                                                      => 'Ошибка блокировки пользователя',
    'Failed to unblock user'                                                                    => 'Ошибка разблокировки пользователя',

    // -------------------------------------------------------------------------
    // Error / 404 pages
    // -------------------------------------------------------------------------
    'Page not found'                                                                            => 'Страница не найдена',
    'The page you are looking for does not exist or has been removed'                           => 'Запрашиваемая страница не существует или была удалена',
    'Please check the URL and try again'                                                        => 'Пожалуйста, проверьте правильность адреса',
    'Back to home'                                                                              => 'Вернуться на главную',
];