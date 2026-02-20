import React, {useState} from 'react';
import {NotificationsApi, NotificationFrequency, CreateScheduleRequest} from '@/api/notificationsApi';

interface ScheduleFormProps {
    cardId: string;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({
                                                              cardId,
                                                              onSuccess,
                                                              onCancel
                                                          }) => {
    const [frequency, setFrequency] = useState<NotificationFrequency>('once');
    const [scheduledAt, setScheduledAt] = useState('');
    const [repeatCount, setRepeatCount] = useState<number | ''>('');
    const [endDate, setEndDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const frequencyOptions: { value: NotificationFrequency; label: string }[] = [
        {value: 'once', label: 'Один раз'},
        {value: 'minutely', label: 'Каждую минуту'},
        {value: 'hourly', label: 'Каждый час'},
        {value: 'daily', label: 'Каждый день'},
        {value: 'weekly', label: 'Каждую неделю'},
        {value: 'monthly', label: 'Каждый месяц'},
        {value: 'yearly', label: 'Каждый год'}
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!scheduledAt) {
            alert('Укажите дату и время');
            return;
        }

        setIsLoading(true);

        try {
            const data: CreateScheduleRequest = {
                card_id: cardId,
                frequency,
                scheduled_at: new Date(scheduledAt).toISOString(),
                repeat_count: repeatCount === '' ? null : Number(repeatCount),
                end_date: endDate ? new Date(endDate).toISOString() : null
            };

            const response = await NotificationsApi.createSchedule(data);

            if (response?.success) {
                alert('Расписание создано!');
                onSuccess?.();
            } else {
                alert('Ошибка при создании расписания');
            }
        } catch (error) {
            console.error('Error creating schedule:', error);
            alert('Ошибка при создании расписания');
        } finally {
            setIsLoading(false);
        }
    };

    // Минимальная дата - текущее время
    const minDateTime = new Date().toISOString().slice(0, 16);

    return (
        <form onSubmit={handleSubmit}
              className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Частота
                    уведомлений
                </label>
                <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as NotificationFrequency)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    {
                        frequencyOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Дата
                    и
                    время
                    первого
                    уведомления *
                </label>
                < input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    min={minDateTime}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {frequency !== 'once' && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Количество повторений(оставьте пустым для бесконечного)
                        </label>
                        <input
                            type="number"
                            value={repeatCount}
                            onChange={(e) => setRepeatCount(e.target.value === '' ? '' : Number(e.target.value))}
                            min="1"
                            placeholder="Бесконечно"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Дата окончания(опционально)
                        </label>
                        < input
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={scheduledAt || minDateTime
                            }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </>
            )
            }

            <div className="flex gap-3 pt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? 'Создание...' : 'Создать расписание'}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Отмена
                    </button>
                )
                }
            </div>
        </form>
    );
}