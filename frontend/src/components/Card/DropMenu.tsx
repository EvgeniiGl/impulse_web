// components/Card/DropMenu.tsx
import React from 'react';
import {createPortal} from 'react-dom';

interface DropMenuProps {
    position: { x: number; y: number };
    onCopy: () => void;
    onMove: () => void;
    onClose: () => void;
}

export const DropMenu: React.FC<DropMenuProps> = ({position, onCopy, onMove, onClose}) => {
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!(e.target as Element).closest('.drop-menu')) {
                onClose();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [onClose]);

    return createPortal(
        <div
            className="drop-menu fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 min-w-[200px]"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translate(-50%, -50%)'
            }}
        >
            <button
                onClick={onCopy}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition"
            >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                <span className="text-gray-700 font-medium">Копировать</span>
            </button>
            <button
                onClick={onMove}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition"
            >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                </svg>
                <span className="text-gray-700 font-medium">Переместить</span>
            </button>
        </div>,
        document.body
    );
};