import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'active';
    size?: 'xs' | 'lg';
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
                                           variant,
                                           size,
                                           children,
                                           className = '',
                                           disabled,
                                           ...props
                                       }) => {
    const buttonClasses = [
        styles.button,
        variant === 'active' ? styles.active : '',
        size ? styles[size] : '',
        disabled ? styles.disabled : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            className={buttonClasses}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;