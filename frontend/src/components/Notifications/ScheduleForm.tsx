import React, {useState, useEffect} from 'react';
import {
    NotificationFrequency,
    CreateScheduleRequest,
    NotificationSchedule,
    UpdateScheduleRequest
} from '@/api/notificationsApi';
import {useAppDispatch} from '@store/store.ts';
import {updateSchedule, createSchedule} from '@store/notification/notificationSlice.ts';
import moment from 'moment';

interface ScheduleFormProps {
    cardId: string;
    schedule?: NotificationSchedule; // Добавляем опциональный пропс для редактирования
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({
                                                              cardId,
                                                              schedule, // Добавляем schedule
                                                              onSuccess,
                                                              onCancel
                                                          }) => {
    const dispatch = useAppDispatch();
    const [frequency, setFrequency] = useState<NotificationFrequency>('once');
    const [scheduledAt, setScheduledAt] = useState('');
    const [repeatCount, setRepeatCount] = useState<number | ''>('');
    const [endDate, setEndDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isEditMode = !!schedule; // Режим редактирования, если передан schedule

    // Заполняем форму данными при редактировании
    useEffect(() => {
        if (schedule) {
            setFrequency(schedule.frequency);

            // Форматируем scheduled_at для input type="datetime-local"
            if (schedule.scheduled_at) {
                setScheduledAt(moment(schedule.scheduled_at).format('YYYY-MM-DDTHH:mm'));
            }

            setRepeatCount(schedule.repeat_count || '');

            // Форматируем end_date для input type="datetime-local"
            if (schedule.end_date) {
                setEndDate(moment(schedule.end_date).format('YYYY-MM-DDTHH:mm'));
            }
        }
    }, [schedule]);

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
            if (isEditMode && schedule) {
                // Режим редактирования - обновляем существующее расписание
                const data: UpdateScheduleRequest = {
                    id: schedule.id,
                    card_id: cardId,
                    frequency: schedule.frequency,
                    scheduled_at: new Date(scheduledAt).toISOString(),
                    repeat_count: repeatCount === '' ? null : Number(repeatCount),
                    end_date: endDate ? new Date(endDate).toISOString() : null,
                    is_active: true,
                };

                const result = await dispatch(updateSchedule(data)).unwrap();

                if (result) {
                    onSuccess?.();
                }
            } else {
                // Режим создания - создаем новое расписание
                const data: CreateScheduleRequest = {
                    card_id: cardId,
                    frequency,
                    scheduled_at: new Date(scheduledAt).toISOString(),
                    repeat_count: repeatCount === '' ? null : Number(repeatCount),
                    end_date: endDate ? new Date(endDate).toISOString() : null
                };

                const result = await dispatch(createSchedule(data)).unwrap();

                if (result) {
                    onSuccess?.();
                }
            }
        } catch (error) {
            console.error(`Error ${isEditMode ? 'updating' : 'creating'} schedule:`, error);
            alert(`Ошибка при ${isEditMode ? 'обновлении' : 'создании'} расписания`);
        } finally {
            setIsLoading(false);
        }
    };

    // Минимальная дата - текущее время
    const minDateTime = new Date().toISOString().slice(0, 16);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1"
                       style={{color: 'var(--text-white)'}}>
                    Частота уведомлений
                </label>
                <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as NotificationFrequency)}
                    className="w-full rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                    style={{
                        backgroundColor: 'var(--bg-primary)',
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-primary)'
                    }}
                >
                    {frequencyOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1"
                       style={{color: 'var(--text-white)'}}>
                    Дата и время первого уведомления *
                </label>
                <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    min={minDateTime}
                    required
                    className="w-full rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                    style={{
                        backgroundColor: 'var(--bg-primary)',
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-primary)'
                    }}
                />
            </div>

            {frequency !== 'once' && (
                <>
                    <div>
                        <label className="block text-sm font-medium mb-1"
                               style={{color: 'var(--text-white)'}}>
                            Количество повторений
                        </label>
                        <input
                            type="number"
                            value={repeatCount}
                            onChange={(e) => setRepeatCount(e.target.value === '' ? '' : Number(e.target.value))}
                            min="1"
                            placeholder="Бесконечно"
                            className="w-full rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                            style={{
                                backgroundColor: 'var(--bg-primary)',
                                borderColor: 'var(--border-primary)',
                                color: 'var(--text-primary)'
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1"
                               style={{color: 'var(--text-white)'}}>
                            Дата окончания
                        </label>
                        <input
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={scheduledAt || minDateTime}
                            className="w-full rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                            style={{
                                backgroundColor: 'var(--bg-primary)',
                                borderColor: 'var(--border-primary)',
                                color: 'var(--text-primary)'
                            }}
                        />
                    </div>
                </>
            )}

            <div className="flex gap-3 pt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-2 px-4 rounded-lg transition-colors"
                    style={{
                        backgroundColor: isLoading ? 'var(--color-gray-400)' : 'var(--bg-tertiary)',
                        color: 'var(--text-primary)'
                    }}
                >
                    {isLoading
                        ? (isEditMode ? 'Сохранение...' : 'Создание...')
                        : (isEditMode ? 'Сохранить изменения' : 'Создать расписание')}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-2 px-4 rounded-lg transition-colors"
                        style={{
                            backgroundColor: 'var(--bg-tertiary)',
                            color: 'var(--text-primary)'
                        }}
                    >
                        Отмена
                    </button>
                )}
            </div>
        </form>
    );
};