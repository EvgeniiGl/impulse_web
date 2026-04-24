import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import css from './TodayEmptyState.module.css';

export default function TodayEmptyState() {
    const {t} = useTranslation();

    return (
        <div className={css.empty}>
            <div className={css.icon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                    <line x1="12" y1="2" x2="12" y2="2" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            </div>
            <h3 className={css.title}>{t('today.empty.title')}</h3>
            <p className={css.text}>{t('today.empty.description')}</p>
            <Link to="/notification" className={css.link}>
                {t('today.empty.goToNotifications')}
            </Link>
        </div>
    );
}