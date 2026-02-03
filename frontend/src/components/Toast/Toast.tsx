// components/Toast/Toast.tsx
import React, {useEffect, useState} from 'react';
import css from './Toast.module.css';

interface ToastMessage {
    id: number;
    message: string;
    type: 'error' | 'success' | 'warning' | 'info';
}

let showToastFunction: ((message: string, type?: 'error' | 'success' | 'warning' | 'info') => void) | null = null;

export const showToast = (message: string, type: 'error' | 'success' | 'warning' | 'info' = 'error') => {
    if (showToastFunction) {
        showToastFunction(message, type);
    }
};

export const Toast: React.FC = () => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    useEffect(() => {
        showToastFunction = (message: string, type: 'error' | 'success' | 'warning' | 'info' = 'error') => {
            const id = Date.now();
            setToasts(prev => [...prev, {id, message, type}]);

            setTimeout(() => {
                setToasts(prev => prev.filter(toast => toast.id !== id));
            }, 2000);
        };

        return () => {
            showToastFunction = null;
        };
    }, []);

    if (toasts.length === 0) return null;


    return (
        <div className={css.toast_container}>
            {toasts.map(toast => {
                const classType = css[`toast__${toast.type}`];
                return (<div key={toast.id} className={`${css.toast} ${classType}`}>
                    <div className={css.toast__content}>
                        <span className={css.toast__icon}>{getIcon(toast.type)}</span>
                        <span className={css.toast__message}>{toast.message}</span>
                    </div>
                </div>)
            })}
        </div>
    );
};

function getIcon(type: string): string {
    switch (type) {
        case 'error':
            return '✕';
        case 'success':
            return '✓';
        case 'warning':
            return '⚠';
        case 'info':
            return 'ℹ';
        default:
            return '✕';
    }
}
