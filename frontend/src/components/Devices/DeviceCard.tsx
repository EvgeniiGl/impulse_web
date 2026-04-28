import React, { useState } from 'react';
import type { MobileDeviceToken } from '@api/types/deviceTypes';
import css from './DeviceList.module.css';

interface DeviceCardProps {
    device: MobileDeviceToken;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onTestPush: (id: string) => void;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({
    device,
    onToggle,
    onDelete,
    onTestPush,
}) => {
    const [showToken, setShowToken] = useState(false);

    const isIos = device.platform === 'ios';
    const platformLabel = isIos ? 'iOS' : 'Android';

    const formatDate = (dateStr: string | null): string => {
        if (!dateStr) return '—';
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch {
            return dateStr;
        }
    };

    const handleCopyToken = async () => {
        try {
            await navigator.clipboard.writeText(device.device_token);
            setShowToken(true);
            setTimeout(() => setShowToken(false), 2000);
        } catch {
            // fallback
        }
    };

    const handleDelete = () => {
        if (window.confirm('Удалить это устройство? Оно перестанет получать push-уведомления.')) {
            onDelete(device.id);
        }
    };

    const cardClasses = [
        css.deviceCard,
        !device.is_active ? css.deviceCardInactive : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={cardClasses}>
            {/* Иконка платформы */}
            <div
                className={`${css.platformIcon} ${
                    isIos ? css.platformIos : css.platformAndroid
                }`}
            >
                {isIos ? '🍎' : '🤖'}
            </div>

            {/* Информация */}
            <div className={css.deviceInfo}>
                <div className={css.deviceNameRow}>
                    <span className={css.deviceName}>
                        {device.device_name || `${platformLabel} устройство`}
                    </span>
                    <span
                        className={`${css.badge} ${
                            device.is_active ? css.badgeActive : css.badgeInactive
                        }`}
                    >
                        {device.is_active ? 'Активно' : 'Откл.'}
                    </span>
                </div>

                <div className={css.deviceMeta}>
                    <span className={css.metaItem}>
                        <span className={css.metaLabel}>Платформа:</span> {platformLabel}
                    </span>
                    {device.app_version && (
                        <span className={css.metaItem}>
                            <span className={css.metaLabel}>Версия:</span> {device.app_version}
                        </span>
                    )}
                    {device.os_version && (
                        <span className={css.metaItem}>
                            <span className={css.metaLabel}>ОС:</span> {device.os_version}
                        </span>
                    )}
                    <span className={css.metaItem}>
                        <span className={css.metaLabel}>Последнее:</span>{' '}
                        {formatDate(device.last_used_at)}
                    </span>
                    <span className={css.metaItem}>
                        <span className={css.metaLabel}>Создан:</span>{' '}
                        {formatDate(device.created_at)}
                    </span>
                </div>

                {/* Токен (скрыт по умолчанию) */}
                <div
                    className={css.deviceToken}
                    onClick={handleCopyToken}
                    title="Нажмите, чтобы скопировать токен"
                >
                    {showToken
                        ? '✓ Скопировано!'
                        : `${device.device_token.slice(0, 20)}...${device.device_token.slice(-8)}`}
                </div>
            </div>

            {/* Кнопки действий */}
            <div className={css.actions}>
                <button
                    className={css.actionBtn}
                    onClick={() => onToggle(device.id)}
                    title={device.is_active ? 'Деактивировать' : 'Активировать'}
                >
                    {device.is_active ? '⏸' : '▶'}
                </button>

                {device.is_active && (
                    <button
                        className={css.actionBtn}
                        onClick={() => onTestPush(device.id)}
                        title="Отправить тестовое уведомление"
                    >
                        🔔
                    </button>
                )}

                <button
                    className={`${css.actionBtn} ${css.actionBtnDanger}`}
                    onClick={handleDelete}
                    title="Удалить устройство"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default DeviceCard;
