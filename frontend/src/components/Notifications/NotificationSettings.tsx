import React, {useState, useEffect} from 'react';
import {notificationManager} from '@/utils/notificationUtils';

interface NotificationSettingsProps {
    onPermissionChange?: (granted: boolean) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
                                                                              onPermissionChange
                                                                          }) => {
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [isSupported, setIsSupported] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsSupported(notificationManager.isSupported());
        if (notificationManager.isSupported()) {
            setPermission(notificationManager.getPermissionStatus());
        }
    }, []);

    const handleEnableNotifications = async () => {
        setIsLoading(true);
        try {
            const success = await notificationManager.initialize();

            if (success) {
                setPermission('granted');
                onPermissionChange?.(true);
                alert('Уведомления успешно включены!');
            } else {
                alert('Не удалось включить уведомления');
            }
        } catch (error) {
            console.error('Error enabling notifications:', error);
            alert('Ошибка при включении уведомлений');
        } finally {
            setIsLoading(false);
        }
    };

    const handleTestNotification = async () => {
        try {
            // 1. Сначала проверяем поддержку
            if (!notificationManager.isSupported()) {
                alert('Ваш браузер не поддерживает уведомления');
                return;
            }

            // 2. Проверяем разрешение
            const permission = notificationManager.getPermissionStatus();

            if (permission !== 'granted') {
                // Если разрешение не дано, пробуем его получить
                const newPermission = await notificationManager.requestPermission();

                if (newPermission !== 'granted') {
                    alert('Необходимо разрешить уведомления');
                    return;
                }
            }

            // 3. Регистрируем Service Worker (если еще не зарегистрирован)
            console.log("log--",
                "\nnotificationManager--", notificationManager,
            );
            if (!notificationManager['registration']) {
                await notificationManager.registerServiceWorker();
            }

            // 4. Показываем тестовое уведомление
            await notificationManager.showTestNotification();

            console.log('Тестовое уведомление отправлено');
        } catch (error) {
            console.error('Error showing test notification:', error);
            alert('Ошибка при показе тестового уведомления: ' + error.message);
        }
    };

    if (!isSupported) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                    Ваш
                    браузер
                    не
                    поддерживает
                    push - уведомления
                </p>
            </div>
        )
            ;
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4"> Настройки
                уведомлений </h3>

            <div
                className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium"> Статус
                            уведомлений </p>
                        <p
                            className="text-sm text-gray-600">
                            {permission === 'granted' && 'Уведомления включены'
                            }
                            {
                                permission === 'denied' && 'Уведомления заблокированы'
                            }
                            {
                                permission === 'default' && 'Уведомления не настроены'
                            }
                        </p>
                    </div>

                    <div
                        className={`w-3 h-3 rounded-full ${
                            permission === 'granted' ? 'bg-green-500' :
                                permission === 'denied' ? 'bg-red-500' :
                                    'bg-gray-400'
                        }`
                        }
                    />
                </div>

                {
                    permission !== 'granted' && (
                        <button
                            onClick={handleEnableNotifications}
                            disabled={isLoading || permission === 'denied'
                            }
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? 'Загрузка...' : 'Включить уведомления'}
                        </button>
                    )
                }

                {
                    permission === 'granted' && (
                        <button
                            onClick={handleTestNotification}
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Показать
                            тестовое
                            уведомление
                        </button>
                    )
                }

                {
                    permission === 'denied' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-sm text-red-800">
                                Уведомления
                                заблокированы.Разрешите
                                их
                                в
                                настройках
                                браузера.
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};