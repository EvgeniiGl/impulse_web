import {useEffect, useState, useMemo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import Header from "@modules/Header.tsx";
import Footer from "@modules/Footer.tsx";
import Main from "@modules/Main.tsx";
import {TodayApi, TodayNotificationItem} from '@/api/todayApi';
import TodayNotificationCard from '@/components/Today/TodayNotificationCard';
import TodayEmptyState from '@/components/Today/TodayEmptyState';
import TodayFilterBar, {TodayFilter} from '@/components/Today/TodayFilterBar';
import {useAppSelector} from "@store/store.ts";
import css from './TodayPage.module.css';

export default function TodayPage() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const token = useAppSelector((state) => state.auth.token);

    const [notifications, setNotifications] = useState<TodayNotificationItem[]>([]);
    console.log("log--",
        "\ndnotificationsata--", notifications,
    );
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<TodayFilter>('all');
    const [autoRefresh, setAutoRefresh] = useState(true);

    const loadData = useCallback(async () => {
        try {
            setError(null);
            const response = await TodayApi.getTodayNotifications();
            if (response.success) {
                setNotifications(response.data.notifications);
            } else {
                setError(t('today.error.loadFailed'));
            }
        } catch (err: any) {
            if (err?.response?.status === 401) {
                navigate('/login');
                return;
            }
            setError(t('today.error.loadFailed'));
            console.error('Failed to load today notifications:', err);
        } finally {
            setIsLoading(false);
        }
    }, [t, navigate]);

    // Initial load
    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        loadData();
    }, [token, navigate, loadData]);

    // Auto-refresh every 60 seconds
    useEffect(() => {
        if (!autoRefresh || !token) return;

        const interval = setInterval(() => {
            loadData();
        }, 60000);

        return () => clearInterval(interval);
    }, [autoRefresh, token, loadData]);

    // Filtered notifications
    const filteredNotifications = useMemo(() => {
        switch (filter) {
            case 'sent':
                return notifications.filter(n => n.is_sent);
            case 'pending':
                return notifications.filter(n => !n.is_sent);
            default:
                return notifications;
        }
    }, [notifications, filter]);

    // Filter counts
    const filterCounts = useMemo(() => ({
        all: notifications.length,
        sent: notifications.filter(n => n.is_sent).length,
        pending: notifications.filter(n => !n.is_sent).length,
    }), [notifications]);

    // Current date formatted
    const todayFormatted = useMemo(() => {
        const now = new Date();
        return now.toLocaleDateString(undefined, {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }, []);
    console.log("log--",
        "\ndata--", todayFormatted,
    );
    const handleRefresh = () => {
        setIsLoading(true);
        loadData();
    };

    return (
        <>
            <Header/>
            <Main>
                <div className={css.page}>
                    <div className={css.container}>

                        {/* Header */}
                        <div className={css.header}>
                            <div>
                                <h1 className={css.title}>{t('today.pageTitle')}</h1>
                                <p className={css.date}>{todayFormatted}</p>
                            </div>
                            <div className={css.actions}>
                                <label className={css.autoRefresh}>
                                    <input
                                        type="checkbox"
                                        checked={autoRefresh}
                                        onChange={(e) => setAutoRefresh(e.target.checked)}
                                    />
                                    <span>{t('today.autoRefresh')}</span>
                                </label>
                                <button
                                    className={css.refreshBtn}
                                    onClick={handleRefresh}
                                    disabled={isLoading}
                                    title={t('today.refresh')}
                                >
                                    <svg
                                        width="18" height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={isLoading ? css.refreshSpin : ''}
                                    >
                                        <polyline points="23 4 23 10 17 10"/>
                                        <polyline points="1 20 1 14 7 14"/>
                                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Filter bar */}
                        {!isLoading && notifications.length > 0 && (
                            <TodayFilterBar
                                activeFilter={filter}
                                onFilterChange={setFilter}
                                counts={filterCounts}
                            />
                        )}

                        {/* Error */}
                        {error && (
                            <div className={css.error}>
                                <p>{error}</p>
                                <button className={css.errorBtn} onClick={handleRefresh}>
                                    {t('common.tryAgain')}
                                </button>
                            </div>
                        )}

                        {/* Loading */}
                        {isLoading && (
                            <div className={css.loading}>
                                <div className={css.spinner}/>
                                <p>{t('common.loading')}</p>
                            </div>
                        )}

                        {/* Content */}
                        {!isLoading && !error && (
                            <>
                                {notifications.length === 0 ? (
                                    <TodayEmptyState/>
                                ) : filteredNotifications.length === 0 ? (
                                    <div className={css.noFilterResults}>
                                        <p>{t('today.noFilterResults')}</p>
                                    </div>
                                ) : (
                                    <div className={css.list}>
                                        {filteredNotifications.map((item, index) => (
                                            <TodayNotificationCard
                                                key={`${item.schedule_id}-${item.notification_time}-${index}`}
                                                item={item}
                                                index={index}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </Main>
            <Footer/>
        </>
    );
}