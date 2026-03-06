import React, {useState, useEffect} from 'react';
import {notificationManager} from '@utils/notificationManager.ts';
import {IoMdClose, IoMdRefresh} from 'react-icons/io';
import {useAuth} from "@hooks/useAuth.ts";

interface SubscriptionWarningProps {
    onResubscribe?: () => void;
}

export const SubscriptionWarning: React.FC<SubscriptionWarningProps> = ({onResubscribe}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isResubscribing, setIsResubscribing] = useState(false);
    const {isAuthenticated} = useAuth();
    useEffect(() => {
        if (isAuthenticated) {
            checkSubscription();
        }
        // Проверяем каждый час
        const interval = setInterval(checkSubscription, 60 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const checkSubscription = async () => {
        try {
            const isValid = await notificationManager.validateSubscription();
            setIsVisible(!isValid);
        } catch (error) {
            console.error('Error checking subscription:', error);
        }
    };

    const handleResubscribe = async () => {
        setIsResubscribing(true);
        try {
            const success = await notificationManager.resubscribeIfNeeded();

            if (success) {
                setIsVisible(false);
                onResubscribe?.();
                // Показываем успешное уведомление
                if (notificationManager.registration) {
                    await notificationManager.registration.showNotification('Успешно', {
                        body: 'Подписка на уведомления восстановлена',
                        icon: '/icon-192x192.png',
                        requireInteraction: false
                    });
                }
            } else {
                alert('Не удалось восстановить подписку. Пожалуйста, включите уведомления вручную.');
            }
        } catch (error) {
            console.error('Error resubscribing:', error);
            alert('Ошибка при восстановлении подписки');
        } finally {
            setIsResubscribing(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div
            className="fixed bottom-4 right-4 z-50 max-w-md bg-yellow-50 border-l-4 border-yellow-400 shadow-lg rounded-lg p-4 animate-slideIn">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"/>
                    </svg>
                </div>
                <div className="ml-3 flex-1">
                    <p className="text-sm text-yellow-700">
                        <strong>Проблема с уведомлениями</strong>
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                        Ваша подписка на уведомления устарела. Нажмите кнопку ниже, чтобы восстановить её.
                    </p>
                    <div className="mt-4">
                        <button
                            onClick={handleResubscribe}
                            disabled={isResubscribing}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-yellow-300"
                        >
                            {isResubscribing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none"
                                         viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                    Восстановление...
                                </>
                            ) : (
                                <>
                                    <IoMdRefresh className="mr-2 h-4 w-4"/>
                                    Восстановить подписку
                                </>
                            )}
                        </button>
                    </div>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="ml-4 flex-shrink-0 text-yellow-400 hover:text-yellow-500"
                >
                    <IoMdClose className="h-5 w-5"/>
                </button>
            </div>
        </div>
    );
};