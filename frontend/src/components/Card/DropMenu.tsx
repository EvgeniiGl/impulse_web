// components/Card/DropMenu.tsx
import React from 'react';
import {createPortal} from 'react-dom';

interface DropMenuProps {
    position: { x: number; y: number };
    onCopy: () => void;
    onMove: () => void;
    onClose: () => void;
    sourceCollectionId?: string | null; // ID коллекции, из которой перетаскивается карточка
    targetCollectionId?: string | null; // ID коллекции, куда перетаскивается карточка
}

export const DropMenu: React.FC<DropMenuProps> = ({
                                                      position,
                                                      onCopy,
                                                      onMove,
                                                      onClose,
                                                      sourceCollectionId,
                                                      targetCollectionId
                                                  }) => {
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!(e.target as Element).closest('.drop-menu')) {
                onClose();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [onClose]);

    // Определяем, нужно ли показывать опцию "Переместить"
    const showMoveOption = sourceCollectionId !== undefined &&
        targetCollectionId !== undefined &&
        sourceCollectionId !== targetCollectionId;


    return createPortal(
        <div
            className="drop-menu fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[9999] min-w-[220px]"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translate(-50%, -50%)'
            }}
        >
            <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                Перетаскивание карточки
            </div>

            <button
                onClick={onCopy}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition group"
            >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                <span className="text-gray-700 font-medium group-hover:text-blue-600">Копировать</span>
                {targetCollectionId && (
                    <span className="text-xs text-gray-400 ml-auto">
                        в {targetCollectionId === null ? 'общую' : 'коллекцию'}
                    </span>
                )}
            </button>

            {showMoveOption && (
                <button
                    onClick={onMove}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition group"
                >
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-green-600" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                    </svg>
                    <span className="text-gray-700 font-medium group-hover:text-green-600">Переместить</span>
                    <span className="text-xs text-gray-400 ml-auto">
                        из {sourceCollectionId === null ? 'общей' : 'коллекции'}
                    </span>
                </button>
            )}

            <div className="border-t border-gray-100 mt-2 pt-2 px-2">
                <button
                    onClick={onClose}
                    className="w-full px-3 py-2 text-xs text-gray-500 hover:bg-gray-100 rounded text-center"
                >
                    Отмена (ESC)
                </button>
            </div>
        </div>,
        document.body
    );
};