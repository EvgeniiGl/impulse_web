import {TodayStats as TodayStatsType} from '@/api/todayApi';
import {useTranslation} from 'react-i18next';
import css from './TodayStats.module.css';

interface TodayStatsProps {
    stats: TodayStatsType;
}

export default function TodayStats({stats}: TodayStatsProps) {
    const {t} = useTranslation();

    return (
        <div className={css.stats}>
            <div className={css.item}>
                <span className={css.number}>{stats.total}</span>
                <span className={css.label}>{t('today.stats.total')}</span>
            </div>
            <div className={css.divider}/>
            <div className={`${css.item} ${css.itemSent}`}>
                <span className={css.number}>{stats.sent}</span>
                <span className={css.label}>{t('today.stats.sent')}</span>
            </div>
            <div className={css.divider}/>
            <div className={`${css.item} ${css.itemPending}`}>
                <span className={css.number}>{stats.pending}</span>
                <span className={css.label}>{t('today.stats.pending')}</span>
            </div>
        </div>
    );
}