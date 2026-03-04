// components/Collections/CollectionDropZone.tsx
import {useDrop} from 'react-dnd';
import {ItemTypes, DragItem, DropResult} from '@/types/dnd';

interface CollectionDropZoneProps {
    collectionId: string | null;
    children: React.ReactNode;
    onCardDrop?: (cardId: string, targetCollectionId: string | null) => void;
    className?: string;
    isActive?: boolean;
}

export default function CollectionDropZone({
                                               collectionId,
                                               children,
                                               onCardDrop, // Этот пропс пока не используется, но может понадобиться в будущем
                                               className = '',
                                               isActive = true
                                           }: CollectionDropZoneProps) {
    const [{isOver, canDrop}, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        drop: (item: DragItem, monitor): DropResult | undefined => {
            // Проверяем, можно ли сбросить
            if (monitor.canDrop()) {
                // Вызываем onCardDrop если он передан
                if (onCardDrop) {
                    onCardDrop(item.id, collectionId);
                }
                return {collectionId};
            }
            return undefined;
        },
        canDrop: (item: DragItem) => {
            if (!isActive) return false;

            // Нельзя сбросить в ту же коллекцию, где карточка уже есть
            if (collectionId === null) {
                // В общую коллекцию можно сбросить всегда (это удалит из всех коллекций)
                return true;
            }

            // Нельзя сбросить в коллекцию, где карточка уже есть
            return !item.collectionIds.includes(collectionId);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [collectionId, isActive, onCardDrop]);

    return (
        <div
            ref={(node) => {
                // Применяем drop ref к node
                if (node) {
                    drop(node);
                }
            }}
            className={`
                ${className}
                transition-all duration-200
                ${isOver && canDrop ? 'ring-2 ring-blue-400 bg-blue-50 scale-105' : ''}
                ${isOver && !canDrop ? 'ring-2 ring-red-400 bg-red-50 cursor-not-allowed' : ''}
                ${canDrop ? 'cursor-copy' : ''}
            `}
        >
            {children}
        </div>
    );
}