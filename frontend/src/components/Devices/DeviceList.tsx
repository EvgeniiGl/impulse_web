import React, {useEffect, useState, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '@store/store';
import {
    fetchDevices,
    removeDevice,
    toggleDevice,
    sendTestPush,
    clearError,
    clearSuccess,
    selectDevices,
    selectDevicesLoading,
    selectDevicesError,
    selectDevicesSuccess,
} from '@store/devices/devicesSlice';
import type {MobileDeviceToken, DevicePlatform} from '@api/types/deviceTypes';
import {DeviceCard} from './DeviceCard';
import css from './DeviceList.module.css';

type PlatformFilter = 'all' | DevicePlatform;

export const DeviceList: React.FC = () => {
    const dispatch = useAppDispatch();
    const devices = useAppSelector(selectDevices);
    const isLoading = useAppSelector(selectDevicesLoading);
    const error = useAppSelector(selectDevicesError);
    const success = useAppSelector(selectDevicesSuccess);

    const [platformFilter, setPlatformFilter] = useState<PlatformFilter>('all');

    useEffect(() => {
        dispatch(fetchDevices());
    }, [dispatch]);

    // Автоочистка success/error
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => dispatch(clearSuccess()), 4000);
            return () => clearTimeout(timer);
        }
    }, [success, dispatch]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => dispatch(clearError()), 6000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const handleRefresh = useCallback(() => {
        dispatch(fetchDevices());
    }, [dispatch]);

    const handleToggle = useCallback(
        (id: string) => {
            dispatch(toggleDevice(id));
        },
        [dispatch]
    );

    const handleDelete = useCallback(
        (id: string) => {
            dispatch(removeDevice(id));
        },
        [dispatch]
    );

    const handleTestPush = useCallback(
        (id: string) => {
            dispatch(sendTestPush(id));
        },
        [dispatch]
    );

    // Фильтрация
    const filteredDevices: MobileDeviceToken[] =
        platformFilter === 'all'
            ? devices
            : devices.filter((d) => d.platform === platformFilter);

    // Статистика
    const totalDevices = devices.length;
    const activeDevices = devices.filter((d) => d.is_active).length;
    const iosCount = devices.filter((d) => d.platform === 'ios').length;
    const androidCount = devices.filter((d) => d.platform === 'android').length;

    return (
        <div className={css.container}>
            {/* Alerts */}
            {success && (
                <div className={`${css.alert} ${css.alertSuccess}`}>
                    <span>{success}</span>
                    <button
                        className={css.alertDismiss}
                        onClick={() => dispatch(clearSuccess())}
                    >
                        ×
                    </button>
                </div>
            )}
            {error && (
                <div className={`${css.alert} ${css.alertError}`}>
                    <span>{error}</span>
                    <button
                        className={css.alertDismiss}
                        onClick={() => dispatch(clearError())}
                    >
                        ×
                    </button>
                </div>
            )}

            {/* Header */}
            <div className={css.header}>
                <div>
                    <h2 className={css.title}>Мобильные устройства</h2>
                </div>
                <button
                    className={css.refreshBtn}
                    onClick={handleRefresh}
                    disabled={isLoading}
                >
                    <span className={isLoading ? css.spinning : ''}>↻</span>
                    Обновить
                </button>
            </div>

            {/* Статистика */}
            {totalDevices > 0 && (
                <div className={css.statsRow}>
                    <div className={css.statCard}>
                        <div className={css.statValue}>{totalDevices}</div>
                        <div className={css.statLabel}>Всего</div>
                    </div>
                    <div className={css.statCard}>
                        <div className={css.statValue}>{activeDevices}</div>
                        <div className={css.statLabel}>Активных</div>
                    </div>
                    <div className={css.statCard}>
                        <div className={css.statValue}>{iosCount}</div>
                        <div className={css.statLabel}>iOS</div>
                    </div>
                    <div className={css.statCard}>
                        <div className={css.statValue}>{androidCount}</div>
                        <div className={css.statLabel}>Android</div>
                    </div>
                </div>
            )}

            {/* Фильтры */}
            {totalDevices > 0 && (
                <div className={css.filterRow}>
                    <button
                        className={`${css.filterBtn} ${
                            platformFilter === 'all' ? css.filterBtnActive : ''
                        }`}
                        onClick={() => setPlatformFilter('all')}
                    >
                        Все ({totalDevices})
                    </button>
                    <button
                        className={`${css.filterBtn} ${
                            platformFilter === 'ios' ? css.filterBtnActive : ''
                        }`}
                        onClick={() => setPlatformFilter('ios')}
                    >
                        🍎 iOS ({iosCount})
                    </button>
                    <button
                        className={`${css.filterBtn} ${
                            platformFilter === 'android' ? css.filterBtnActive : ''
                        }`}
                        onClick={() => setPlatformFilter('android')}
                    >
                        🤖 Android ({androidCount})
                    </button>
                </div>
            )}

            {/* Loader */}
            {isLoading && devices.length === 0 && (
                <div className={css.loader}>
                    <div className={css.loaderDot}/>
                    <div className={css.loaderDot}/>
                    <div className={css.loaderDot}/>
                </div>
            )}

            {/* Список устройств */}
            {!isLoading && filteredDevices.length > 0 && (
                <div className={css.list}>
                    {filteredDevices.map((device) => (
                        <DeviceCard
                            key={device.id}
                            device={device}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                            onTestPush={handleTestPush}
                        />
                    ))}
                </div>
            )}

            {/* Пустое состояние */}
            {!isLoading && devices.length === 0 && (
                <div className={css.emptyState}>
                    <div className={css.emptyIcon}>📱</div>
                    <h3 className={css.emptyTitle}>Нет зарегистрированных устройств</h3>
                    <p className={css.emptyText}>
                        Устройства автоматически появятся здесь после входа
                        <br/>в мобильное приложение на iOS или Android.
                    </p>
                </div>
            )}

            {/* Пустой результат фильтрации */}
            {!isLoading && devices.length > 0 && filteredDevices.length === 0 && (
                <div className={css.emptyState}>
                    <div className={css.emptyIcon}>🔍</div>
                    <h3 className={css.emptyTitle}>Нет устройств</h3>
                    <p className={css.emptyText}>
                        Нет устройств для выбранной платформы.
                    </p>
                </div>
            )}
        </div>
    );
};

export default DeviceList;
