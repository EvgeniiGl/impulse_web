import React, {useState, useEffect} from 'react';
import {
    NotificationsApi,
    NotificationSchedule,
    UpdateScheduleRequest
} from '@/api/notificationsApi';
import {NotificationSettings} from '@/components/Notifications/NotificationSettings';
import {ScheduleForm} from '@/components/Notifications/ScheduleForm';
import moment from 'moment';
import Header from "@modules/Header.tsx";
import Main from "@modules/Main.tsx";
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "@store/store.ts";
import {fetchSchedules, selectFilteredSchedules, updateSchedule} from "@store/notification/notificationSlice.ts";
import Button from "@ui/buttons/Button.tsx";

// Заглушка для изображения, если не загрузится
const ImagePlaceholder = () => (
    <div
        className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
        </svg>
    </div>
);

export const NotificationsPage: React.FC = () => {
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
    const [editingScheduleId, setEditingScheduleId] = useState<string | null>(null);
    const schedules = useAppSelector(selectFilteredSchedules);
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(state => state.notifications.isLoading);

    useEffect(() => {
        loadSchedules();
    }, []);

    const loadSchedules = async () => {
        dispatch(fetchSchedules(null));
    };

    const handleToggleActive = async (schedule: NotificationSchedule) => {
        // Проверяем, можно ли включить расписание
        if (!schedule.is_active) {
            // Проверка на истекший срок
            if (schedule.end_date && moment(schedule.end_date).isBefore(moment())) {
                alert('Нельзя включить расписание: срок действия истек');
                return;
            }

            // Проверка на превышение лимита отправок
            if (schedule.repeat_count && schedule.sent_count >= schedule.repeat_count) {
                alert('Нельзя включить расписание: достигнут лимит отправок');
                return;
            }
        }

        try {
            // Создаем полный объект для обновления, используя существующие данные
            const updateData: UpdateScheduleRequest = {
                id: schedule.id,
                card_id: schedule.card_id,
                frequency: schedule.frequency,
                scheduled_at: schedule.scheduled_at,
                repeat_count: schedule.repeat_count,
                end_date: schedule.end_date,
                is_active: !schedule.is_active
            };

            // Используем dispatch с thunk вместо прямого вызова API
            const result = await dispatch(updateSchedule(updateData)).unwrap();

            if (result) {
                // Не нужно вызывать loadSchedules, так как состояние обновится через Redux
                // Но если хотите принудительно обновить, можно использовать:
                // dispatch(fetchSchedules(null));
            }
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

    const handleEdit = (scheduleId: string) => {
        setEditingScheduleId(scheduleId);
    };

    const handleEditCancel = () => {
        setEditingScheduleId(null);
    };

    const handleEditSuccess = async () => {
        setEditingScheduleId(null);
        await loadSchedules();
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
        if (url.startsWith('http') || url.startsWith('//')) {
            return url;
        }
        return url;
    };

    // Функция для проверки статуса расписания
    const getScheduleStatus = (schedule: NotificationSchedule) => {
        const now = moment();

        // Проверка на истекший срок
        if (schedule.end_date && moment(schedule.end_date).isBefore(now)) {
            return {
                isExpired: true,
                message: 'Срок действия истек',
                canBeActive: false
            };
        }

        // Проверка на превышение лимита отправок
        if (schedule.repeat_count && schedule.sent_count >= schedule.repeat_count) {
            return {
                isLimitReached: true,
                message: 'Достигнут лимит отправок',
                canBeActive: false
            };
        }

        return {
            canBeActive: true,
            message: null
        };
    };

    // Находим редактируемое расписание
    const editingSchedule = editingScheduleId
        ? schedules.find(s => s.id === editingScheduleId)
        : null;

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
                                    {schedules.map(schedule => {
                                        const status = getScheduleStatus(schedule);
                                        const isExpiredOrLimitReached = !status.canBeActive;
                                        const isEditing = editingScheduleId === schedule.id;

                                        // Если расписание редактируется, показываем форму
                                        if (isEditing && editingSchedule) {
                                            return (
                                                <div key={schedule.id} className="p-4">
                                                    <ScheduleForm
                                                        cardId={schedule.card_id}
                                                        schedule={editingSchedule}
                                                        onSuccess={handleEditSuccess}
                                                        onCancel={handleEditCancel}
                                                    />
                                                </div>
                                            );
                                        }

                                        // Иначе показываем информацию о расписании
                                        return (
                                            <div key={schedule.id} className="p-4 hover:bg-gray-50 transition-colors">
                                                <div className="flex items-start gap-3">
                                                    {/* Изображение карточки */}
                                                    <Link
                                                        to={`/card/${schedule.card_id}`}
                                                        className="flex-shrink-0 hover:opacity-80 transition-opacity"
                                                        title={schedule.title || ''}
                                                    >
                                                        <div
                                                            className="w-18 h-26 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                                                            {schedule.url && !imageErrors[schedule.card_id] ? (
                                                                <img
                                                                    src={getImageUrl(schedule.url || '')}
                                                                    alt={schedule.title || ''}
                                                                    className="w-full h-full object-cover"
                                                                    style={{aspectRatio: '9/16'}}
                                                                    onError={() => handleImageError(schedule.card_id)}
                                                                    loading="lazy"
                                                                />
                                                            ) : (
                                                                <ImagePlaceholder/>
                                                            )}
                                                        </div>
                                                    </Link>

                                                    {/* Информация о карточке и расписании */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Link
                                                                to={`/card/${schedule.card_id}`}
                                                                className="font-medium text-sm text-blue-600 hover:text-blue-800 hover:underline truncate max-w-[200px]"
                                                                title={schedule.title || ''}
                                                            >
                                                                {schedule.title || 'Без названия'}
                                                            </Link>
                                                            <span
                                                                className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                                                                    isExpiredOrLimitReached
                                                                        ? 'bg-gray-100 text-gray-600'
                                                                        : schedule.is_active
                                                                            ? 'bg-green-100 text-green-800'
                                                                            : 'bg-gray-100 text-gray-800'
                                                                }`}
                                                            >
                                                                {isExpiredOrLimitReached
                                                                    ? status.message
                                                                    : schedule.is_active
                                                                        ? 'Активно'
                                                                        : 'Неактивно'}
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
                                                                <span>
                                                                    {schedule.next_send_at && !isExpiredOrLimitReached && schedule.is_active
                                                                        ? moment(schedule.next_send_at).format('DD.MM HH:mm')
                                                                        : '—'}
                                                                </span>
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
                                                                </span>
                                                            </div>

                                                            {schedule.frequency !== 'once' && schedule.repeat_count && (
                                                                <div
                                                                    className={`flex items-center gap-1 col-span-2 ${
                                                                        schedule.sent_count >= schedule.repeat_count
                                                                            ? 'text-orange-600'
                                                                            : 'text-gray-500'
                                                                    }`}
                                                                >
                                                                    <span className="font-medium">Осталось:</span>
                                                                    <span>
                                                                        {Math.max(0, schedule.repeat_count - schedule.sent_count)} из {schedule.repeat_count} отправок
                                                                    </span>
                                                                </div>
                                                            )}

                                                            {schedule.end_date && (
                                                                <div
                                                                    className={`flex items-center gap-1 col-span-2 ${
                                                                        moment(schedule.end_date).isBefore(moment())
                                                                            ? 'text-orange-600'
                                                                            : 'text-gray-500'
                                                                    }`}
                                                                >
                                                                    <span className="font-medium">Действует до:</span>
                                                                    <span>{moment(schedule.end_date).format('DD.MM.YYYY HH:mm')}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Кнопки управления */}
                                                    <div className="flex flex-col gap-1.5 ml-2">
                                                        <Button
                                                            onClick={() => handleToggleActive(schedule)}
                                                            disabled={!schedule.is_active && isExpiredOrLimitReached}
                                                            size="xs"
                                                        >
                                                            {schedule.is_active ? 'Отключить' : 'Включить'}
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleEdit(schedule.id)}
                                                            size="xs"
                                                        >
                                                            Редактировать
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleDelete(schedule.id)}
                                                            size="xs"
                                                        >
                                                            Удалить
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Main>
        </>
    );
};