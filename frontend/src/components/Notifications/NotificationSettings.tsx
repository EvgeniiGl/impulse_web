import React, {useState, useEffect} from 'react';
import {notificationManager} from '@utils/notificationManager.ts';
import {IoMdRefresh} from "react-icons/io";
import {useAppDispatch, useAppSelector} from "@store/store.ts";
import {
    setPermission,
    setSupported,
    setValidSubscription,
    checkSubscriptionValidity,
    fetchSchedules,
    setFilterActive
} from "@store/notification/notificationSlice";
import css from './NotificationSettings.module.css'

interface NotificationSettingsProps {
    onPermissionChange?: (granted: boolean) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
                                                                              onPermissionChange
                                                                          }) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    // Получаем состояние из Redux
    const permission = useAppSelector(state => state.notifications.permission);
    const isSupported = useAppSelector(state => state.notifications.isSupported);
    const isValidSubscription = useAppSelector(state => state.notifications.isValidSubscription);
    const showActive = useAppSelector(state => state.notifications.filter.showActive);

    useEffect(() => {
        const supported = notificationManager.isSupported();
        dispatch(setSupported(supported));

        if (supported) {
            dispatch(setPermission(notificationManager.getPermissionStatus()));
            dispatch(checkSubscriptionValidity());
        }
    }, [dispatch]);

    const handleResubscribe = async () => {
        setIsLoading(true);
        try {
            const success = await notificationManager.resubscribeIfNeeded();
            if (success) {
                dispatch(setValidSubscription(true));
                alert('Подписка успешно восстановлена!');
            } else {
                alert('Не удалось восстановить подписку');
            }
        } catch (error) {
            console.error('Error resubscribing:', error);
            alert('Ошибка при восстановлении подписки');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEnableNotifications = async () => {
        setIsLoading(true);
        try {
            const success = await notificationManager.initialize();

            if (success) {
                dispatch(setPermission('granted'));
                onPermissionChange?.(true);
                await dispatch(checkSubscriptionValidity());
                // await dispatch(fetchSchedules(null));
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
            if (!notificationManager.isSupported()) {
                alert('Ваш браузер не поддерживает уведомления');
                return;
            }

            const permission = notificationManager.getPermissionStatus();

            if (permission !== 'granted') {
                const newPermission = await notificationManager.requestPermission();

                if (newPermission !== 'granted') {
                    alert('Необходимо разрешить уведомления');
                    return;
                }
            }

            if (!notificationManager['registration']) {
                await notificationManager.registerServiceWorker();
            }

            await notificationManager.showTestNotification();
            console.log('Тестовое уведомление отправлено');
        } catch (error: any) {
            console.error('Error showing test notification:', error);
            alert('Ошибка при показе тестового уведомления: ' + (error.message || ''));
        }
    };

    const handleFilterChange = (value: boolean | null) => {
        dispatch(setFilterActive(value));
        // Загружаем расписания с фильтром
        dispatch(fetchSchedules(value));
    };

    if (!isSupported) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                    Ваш браузер не поддерживает push-уведомления
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Настройки уведомлений</h3>

            {/* Статус уведомлений */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">
                            {permission === 'granted' && 'Уведомления включены'}
                            {permission === 'denied' && 'Уведомления заблокированы'}
                            {permission === 'default' && 'Уведомления не настроены'}
                        </p>
                    </div>

                    <div
                        className={`w-3 h-3 rounded-full ${
                            permission === 'granted' ? 'bg-green-500' :
                                permission === 'denied' ? 'bg-red-500' :
                                    'bg-gray-400'
                        }`}
                    />
                </div>

                {/* Предупреждение о невалидной подписке */}
                {permission === 'granted' && isValidSubscription === false && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center">
                            <svg className="h-5 w-5 text-yellow-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                      clipRule="evenodd"/>
                            </svg>
                            <div className="flex-1">
                                <p className="text-sm text-yellow-800">
                                    <strong>Подписка устарела</strong> - уведомления могут не приходить
                                </p>
                            </div>
                            <button
                                onClick={handleResubscribe}
                                disabled={isLoading}
                                className="ml-4 inline-flex items-center px-3 py-1 border border-transparent text-sm rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                            >
                                <IoMdRefresh className="mr-1 h-4 w-4"/>
                                {isLoading ? '...' : 'Восстановить'}
                            </button>
                        </div>
                    </div>
                )}

                {permission !== 'granted' && (
                    <button
                        onClick={handleEnableNotifications}
                        disabled={isLoading || permission === 'denied'}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? 'Загрузка...' : 'Включить уведомления'}
                    </button>
                )}

                {permission === 'granted' && (
                    <button
                        onClick={handleTestNotification}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Отправить тестовое уведомление
                    </button>
                )}

                {permission === 'denied' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-800">
                            Уведомления заблокированы. Разрешите их в настройках браузера.
                        </p>
                    </div>
                )}
            </div>

            {/* Список расписаний (показываем только если уведомления включены) */}
            {permission === 'granted' && (
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                        {/* Фильтр по активности */}
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleFilterChange(null)}
                                className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                                    showActive === null
                                        ? `${css.tabBtnActive}`
                                        : `${css.tabBtn}`
                                }`}
                            >
                                Все
                            </button>
                            <button
                                onClick={() => handleFilterChange(true)}
                                className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                                    showActive === true
                                        ? `${css.tabBtnActive}`
                                        : `${css.tabBtn}`
                                }`}
                            >
                                Активные
                            </button>
                            <button
                                onClick={() => handleFilterChange(false)}
                                className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                                    showActive === false
                                        ? `${css.tabBtnActive}`
                                        : `${css.tabBtn}`
                                }`}
                            >
                                Неактивные
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};