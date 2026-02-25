import React, {useState, useEffect} from 'react';
import {NotificationsApi, NotificationSchedule} from '@/api/notificationsApi';
import {NotificationSettings} from '@/components/Notifications/NotificationSettings';
import moment from 'moment';
import Header from "@modules/Header.tsx";
import Main from "@modules/Main.tsx";
import {Link} from 'react-router-dom';

// Заглушка для изображения, если не загрузится
const ImagePlaceholder = () => (
    <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
        </svg>
    </div>
);

export const NotificationsPage: React.FC = () => {
    const [schedules, setSchedules] = useState<NotificationSchedule[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    useEffect(() => {
        loadSchedules();
    }, []);

    const loadSchedules = async () => {
        setIsLoading(true);
        try {
            const response = await NotificationsApi.getSchedules();
            if (response?.success) {
                setSchedules(response.data);
            }
        } catch (error) {
            console.error('Error loading schedules:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleActive = async (schedule: NotificationSchedule) => {
        try {
            await NotificationsApi.updateSchedule(schedule.id, {
                is_active: !schedule.is_active
            });
            await loadSchedules();
        } catch (error) {
            console.error('Error toggling schedule:', error);
            alert('Ошибка при изменении статуса');
        }
    };

    const handleDelete = async (scheduleId: string) => {
        if (!confirm('Удалить это расписание?')) {
            return;
        }

        try {
            const success = await NotificationsApi.deleteSchedule(scheduleId);
            if (success) {
                await loadSchedules();
            } else {
                alert('Ошибка при удалении');
            }
        } catch (error) {
            console.error('Error deleting schedule:', error);
            alert('Ошибка при удалении');
        }
    };

    const getFrequencyLabel = (frequency: string): string => {
        const labels: Record<string, string> = {
            once: 'Один раз',
            minutely: 'Каждую минуту',
            hourly: 'Каждый час',
            daily: 'Каждый день',
            weekly: 'Каждую неделю',
            monthly: 'Каждый месяц',
            yearly: 'Каждый год'
        };
        return labels[frequency] || frequency;
    };

    const handleImageError = (cardId: string) => {
        setImageErrors(prev => ({...prev, [cardId]: true}));
    };

    // Форматирование URL изображения (если нужно добавить базовый URL)
    const getImageUrl = (url: string) => {
        // Если URL уже абсолютный или начинается с http
        if (url.startsWith('http') || url.startsWith('//')) {
            return url;
        }
        // Если нужен базовый URL API
        // return `${API_BASE_URL}${url}`;
        return url;
    };

    return (
        <>
            <Header/>
            <Main>
                <div className="min-h-screen bg-gray-50">
                    <div className="container mx-auto px-4 py-8 max-w-4xl">
                        <h1 className="text-3xl font-bold mb-8">Уведомления</h1>

                        <div className="mb-8">
                            <NotificationSettings onPermissionChange={loadSchedules}/>
                        </div>

                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            {isLoading ? (
                                <div className="p-6 text-center text-gray-500">
                                    Загрузка...
                                </div>
                            ) : schedules.length === 0 ? (
                                <div className="p-6 text-center text-gray-500">
                                    У вас пока нет запланированных уведомлений
                                </div>
                            ) : (
                                <div className="divide-y">
                                    {schedules.map(schedule => (
                                        <div key={schedule.id} className="p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-start gap-3">
                                                {/* Изображение карточки */}
                                                <Link
                                                    to={`/card/${schedule.card_id}`}
                                                    className="flex-shrink-0 hover:opacity-80 transition-opacity"
                                                    title={schedule.title}
                                                >
                                                    {schedule.url && !imageErrors[schedule.card_id] ? (
                                                        <img
                                                            src={getImageUrl(schedule.url)}
                                                            alt={schedule.title}
                                                            className="w-18  rounded-lg object-cover border border-gray-200"
                                                            onError={() => handleImageError(schedule.card_id)}
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <ImagePlaceholder/>
                                                    )}
                                                </Link>

                                                {/* Информация о карточке и расписании */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Link
                                                            to={`/card/${schedule.card_id}`}
                                                            className="font-medium text-sm text-blue-600 hover:text-blue-800 hover:underline truncate max-w-[200px]"
                                                            title={schedule.title}
                                                        >
                                                            {schedule.title || 'Без названия'}
                                                        </Link>
                                                        <span
                                                            className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                                                                schedule.is_active
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {schedule.is_active ? 'Активно' : 'Неактивно'}
                                                        </span>
                                                    </div>

                                                    <div
                                                        className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
                                                        <div className="flex items-center gap-1">
                                                            <span className="font-medium">Частота:</span>
                                                            <span>{getFrequencyLabel(schedule.frequency)}</span>
                                                        </div>

                                                        <div className="flex items-center gap-1">
                                                            <span className="font-medium">Следующая:</span>
                                                            <span>{moment(schedule.next_send_at).format('DD.MM HH:mm')}</span>
                                                        </div>

                                                        {schedule.last_sent_at && (
                                                            <div className="flex items-center gap-1">
                                                                <span className="font-medium">Последняя:</span>
                                                                <span>{moment(schedule.last_sent_at).format('DD.MM HH:mm')}</span>
                                                            </div>
                                                        )}

                                                        <div className="flex items-center gap-1">
                                                            <span className="font-medium">Отправлено:</span>
                                                            <span>
                                                                {schedule.sent_count}
                                                                {schedule.repeat_count ? `/${schedule.repeat_count}` : ''}
                                                                {schedule.sent_count === 1 ? ' раз' : schedule.sent_count > 1 ? ' раз' : ''}
                                                            </span>
                                                        </div>

                                                        {schedule.frequency !== 'once' && schedule.repeat_count && (
                                                            <div
                                                                className="flex items-center gap-1 col-span-2 text-gray-500">
                                                                <span className="font-medium">Осталось:</span>
                                                                <span>
                                                                    {Math.max(0, schedule.repeat_count - schedule.sent_count)} из {schedule.repeat_count} отправок
                                                                </span>
                                                            </div>
                                                        )}

                                                        {schedule.end_date && (
                                                            <div
                                                                className="flex items-center gap-1 col-span-2 text-gray-500">
                                                                <span className="font-medium">Действует до:</span>
                                                                <span>{moment(schedule.end_date).format('DD.MM.YYYY HH:mm')}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Кнопки управления */}
                                                <div className="flex flex-col gap-1.5 ml-2">
                                                    <button
                                                        onClick={() => handleToggleActive(schedule)}
                                                        className={`px-3 py-1.5 rounded text-xs font-medium min-w-[82px] transition-colors ${
                                                            schedule.is_active
                                                                ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                                                : 'bg-green-600 hover:bg-green-700 text-white'
                                                        }`}
                                                    >
                                                        {schedule.is_active ? 'Отключить' : 'Включить'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(schedule.id)}
                                                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-medium min-w-[82px] transition-colors"
                                                    >
                                                        Удалить
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Main>
        </>
    );
};