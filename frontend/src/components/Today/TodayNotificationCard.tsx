import {Link} from 'react-router-dom';
import {TodayNotificationItem} from '@/api/todayApi';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import css from './TodayNotificationCard.module.css';

interface TodayNotificationCardProps {
    item: TodayNotificationItem;
    index: number;
}

const ImagePlaceholder = () => (
    <div className={css.placeholder}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
        </svg>
    </div>
);

const getFrequencyLabel = (frequency: string, t: (key: string) => string): string => {
    const labels: Record<string, string> = {
        once: t('today.frequency.once'),
        hourly: t('today.frequency.hourly'),
        daily: t('today.frequency.daily'),
        weekly: t('today.frequency.weekly'),
        monthly: t('today.frequency.monthly'),
        yearly: t('today.frequency.yearly'),
    };
    return labels[frequency] || frequency;
};

const formatTime = (dateStr: string): string => {
    try {
        const date = new Date(dateStr);
        return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    } catch {
        return '--:--';
    }
};

export default function TodayNotificationCard({item, index}: TodayNotificationCardProps) {
    const {t} = useTranslation();
    const [imageError, setImageError] = useState(false);

    const cardTitle = item.card?.title || t('today.untitledCard');
    const cardUrl = item.card?.url;
    const time = formatTime(item.notification_time);

    const cardClasses = [
        css.card,
        item.is_sent ? css.sent : css.pending,
    ].join(' ');

    return (
        <div
            className={cardClasses}
            style={{animationDelay: `${index * 60}ms`}}
        >
            {/* Время */}
            <div className={css.timeBlock}>
                <span className={css.time}>{time}</span>
                {item.is_sent ? (
                    <span className={`${css.badge} ${css.badgeSent}`}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {t('today.sent')}
                    </span>
                ) : (
                    <span className={`${css.badge} ${css.badgePending}`}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        {t('today.waiting')}
                    </span>
                )}
            </div>

            {/* Карточка */}
            <div className={css.content}>
                <Link
                    to={`/card/${item.card_id}`}
                    className={css.imageLink}
                    title={cardTitle}
                >
                    <div className={css.imageWrap}>
                        {cardUrl && !imageError ? (
                            <img
                                src={cardUrl}
                                alt={cardTitle}
                                className={css.image}
                                onError={() => setImageError(true)}
                                loading="lazy"
                            />
                        ) : (
                            <ImagePlaceholder/>
                        )}
                        {item.is_sent && <div className={css.imageOverlay}/>}
                    </div>
                </Link>

                <div className={css.info}>
                    <Link
                        to={`/card/${item.card_id}`}
                        className={css.cardTitle}
                        title={cardTitle}
                    >
                        {cardTitle}
                    </Link>

                    <div className={css.meta}>
                        <span className={css.frequency}>
                            {getFrequencyLabel(item.frequency, t)}
                        </span>
                        {item.repeat_count && (
                            <span className={css.counter}>
                                {item.sent_count}/{item.repeat_count}
                            </span>
                        )}
                    </div>

                    {item.card?.description && (
                        <p className={css.description}>
                            {item.card.description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}