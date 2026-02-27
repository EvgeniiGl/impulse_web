import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'active';
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
                                           variant,
                                           children,
                                           className = '',
                                           disabled,
                                           ...props
                                       }) => {
    const buttonClasses = [
        styles.button,
        variant === 'active' ? styles.active : {},
        disabled ? styles.disabled : '',
        className
    ].join(' ').trim();

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