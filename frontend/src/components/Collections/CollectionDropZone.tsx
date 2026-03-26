import {useDrop} from 'react-dnd';
import {ItemTypes, DragItem, DropResult} from '@/types/dnd';
import css from './CollectionDropZone.module.css'

interface CollectionDropZoneProps {
    collectionId: string | null;
    children: React.ReactNode;
    onCardDrop?: (cardId: string, targetCollectionId: string | null, sourceCollectionId: string | null) => void;
    className?: string;
    isActive?: boolean;
}

export default function CollectionDropZone({
                                               collectionId,
                                               children,
                                               onCardDrop,
                                               className = '',
                                               isActive = true
                                           }: CollectionDropZoneProps) {
    // Получаем информацию о перетаскиваемой карточке из store
    // const draggedCard = useAppSelector((state: MyCardState) => state.myCards.draggedCard);

    const [{isOver, canDrop}, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        drop: (item: DragItem, monitor): DropResult | undefined => {
            // Проверяем, можно ли сбросить
            if (monitor.canDrop()) {
                // Получаем sourceCollectionId из store или из item
                const sourceCollectionId = item.collectionIds[0];

                // Вызываем onCardDrop с sourceCollectionId
                if (onCardDrop) {
                    onCardDrop(item.id, collectionId, sourceCollectionId);
                }
                return {collectionId};
            }
            return undefined;
        },
        canDrop: (item: DragItem) => {
            if (!isActive) return false;

            // Нельзя сбросить в ту же коллекцию, если это не общая коллекция
            if (collectionId !== null) {
                const sourceCollectionId = item.collectionIds[0];

                // Запрещаем сброс в ту же коллекцию
                if (sourceCollectionId === collectionId) {
                    return false;
                }
            }

            return true;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [collectionId, isActive, onCardDrop]);

    return (
        <div
            ref={(node) => {
                if (node) drop(node);
            }}
            className={`
            relative transition-all duration-200
            ${className}
            ${isOver && canDrop
                ? css.zone
                : ''}
            ${isOver && !canDrop
                ? 'ring-2 ring-red-400 opacity-50 cursor-not-allowed'
                : ''}
            ${canDrop && !isOver
                ? css.zone
                : ''}
        `}
        >
            {/* Иконка-подсказка при наведении */}
            {isOver && canDrop && (
                <span
                    className="pointer-events-none absolute inset-0 flex items-center justify-center z-10"
                >
                <span className={`
                    flex items-center gap-1 px-2 py-1 rounded-full
                    text-white text-xs font-semibold
                    shadow-lg animate-bounce ${css.addAnimate}
                `}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/>
                    </svg>
                    Добавить
                </span>
            </span>
            )}
            {children}
        </div>
    );
}