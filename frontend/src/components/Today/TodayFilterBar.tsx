import {useTranslation} from 'react-i18next';
import css from './TodayFilterBar.module.css';

export type TodayFilter = 'all' | 'pending' | 'sent';

interface TodayFilterBarProps {
    activeFilter: TodayFilter;
    onFilterChange: (filter: TodayFilter) => void;
    counts: {
        all: number;
        pending: number;
        sent: number;
    };
}

export default function TodayFilterBar({activeFilter, onFilterChange, counts}: TodayFilterBarProps) {
    const {t} = useTranslation();

    const filters: { key: TodayFilter; label: string }[] = [
        {key: 'all', label: t('today.filter.all')},
        {key: 'pending', label: t('today.filter.pending')},
        {key: 'sent', label: t('today.filter.sent')},
    ];

    return (
        <div className={css.filter}>
            {filters.map(({key, label}) => (
                <button
                    key={key}
                    className={`${css.btn} ${activeFilter === key ? css.btnActive : ''}`}
                    onClick={() => onFilterChange(key)}
                >
                    {label}
                    <span className={css.count}>{counts[key]}</span>
                </button>
            ))}
        </div>
    );
}