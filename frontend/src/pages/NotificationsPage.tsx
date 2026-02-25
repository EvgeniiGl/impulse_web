import React, {useState, useEffect} from 'react';
import {NotificationsApi, NotificationSchedule} from '@/api/notificationsApi';
import {NotificationSettings} from '@/components/Notifications/NotificationSettings';
import moment from 'moment';
import Header from "@modules/Header.tsx";
import Main from "@modules/Main.tsx";

export const NotificationsPage: React.FC = () => {
    const [schedules, setSchedules] = useState<NotificationSchedule[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <>
            <Header/>
            <Main>
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <h1 className="text-3xl font-bold mb-8"> Уведомления </h1>

                    <div
                        className="mb-8">
                        <NotificationSettings onPermissionChange={loadSchedules}
                        />
                    </div>

                    <div
                        className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold"> Расписание
                                уведомлений </h2>
                        </div>

                        {
                            isLoading ? (
                                    <div className="p-6 text-center text-gray-500">
                                        Загрузка
                                        ...
                                    </div>
                                ) :
                                schedules.length === 0 ? (
                                        <div className="p-6 text-center text-gray-500">
                                            У вас
                                            пока
                                            нет
                                            запланированных
                                            уведомлений
                                        </div>
                                    ) :
                                    (
                                        <div className="divide-y">
                                            {
                                                schedules.map(schedule => (
                                                    <div key={schedule.id} className="p-6 hover:bg-gray-50">
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <h3 className="font-medium">
                                                                        Карточка
                                                                        :
                                                                        {
                                                                            schedule.card_id
                                                                        }
                                                                    </h3>
                                                                    < span
                                                                        className={`text-xs px-2 py-1 rounded-full ${
                                                                            schedule.is_active
                                                                                ? 'bg-green-100 text-green-800'
                                                                                : 'bg-gray-100 text-gray-800'
                                                                        }`
                                                                        }>
                                                            {
                                                                schedule.is_active ? 'Активно' : 'Неактивно'
                                                            }
                                                            </span>
                                                                </div>

                                                                <div
                                                                    className="text-sm text-gray-600 space-y-1">
                                                                    <p>
            <span className="font-medium"> Частота
    :
        </span>{' '}
                                                                        {
                                                                            getFrequencyLabel(schedule.frequency)
                                                                        }
                                                                    </p>
                                                                    < p>
        <span className="font-medium"> Следующая
        отправка:</span>{' '}
                                                                        {
                                                                            moment(schedule.next_send_at).format('DD.MM.YYYY HH:mm')
                                                                        }
                                                                    </p>
                                                                    {
                                                                        schedule.last_sent_at && (
                                                                            <p>
                    <span className="font-medium"> Последняя
            отправка:</span>{' '}
                                                                                {
                                                                                    moment(schedule.last_sent_at).format('DD.MM.YYYY HH:mm')
                                                                                }
                                                                            </p>
                                                                        )
                                                                    }
                                                                    <p>
            <span className="font-medium"> Отправлено
    :
        </span>{' '}
                                                                        {
                                                                            schedule.sent_count
                                                                        }
                                                                        раз
                                                                        {
                                                                            schedule.repeat_count && ` из ${schedule.repeat_count}`
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div
                                                                className="flex gap-2 ml-4">
                                                                <button
                                                                    onClick={() => handleToggleActive(schedule)}
                                                                    className={`px-3 py-1 rounded text-sm ${
                                                                        schedule.is_active
                                                                            ? 'bg-gray-200 hover:bg-gray-300'
                                                                            : 'bg-green-600 hover:bg-green-700 text-white'
                                                                    }`
                                                                    }
                                                                >
                                                                    {
                                                                        schedule.is_active ? 'Отключить' : 'Включить'
                                                                    }
                                                                </button>
                                                                < button
                                                                    onClick={() => handleDelete(schedule.id)}
                                                                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                                                                >
                                                                    Удалить
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                        }
                    </div>
                </div>
            </Main>
        </>
    );
};