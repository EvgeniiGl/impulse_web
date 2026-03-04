// components/Collections/CollectionDropZone.tsx
import {useDrop} from 'react-dnd';
import {ItemTypes, DragItem, DropResult} from '@/types/dnd';
import {useAppSelector} from '@store/store';
import {MyCardState} from "@store/card/myCardSlice.ts";

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
                if (node) {
                    drop(node);
                }
            }}
            className={`
                ${className}
                transition-all duration-200
                ${isOver && canDrop ? 'ring-2 ring-blue-400 bg-blue-50/50 scale-[1.02]' : ''}
                ${isOver && !canDrop ? 'ring-2 ring-red-400 bg-red-50/50 cursor-not-allowed opacity-50' : ''}
                ${canDrop ? 'cursor-copy' : ''}
            `}
        >
            {children}
        </div>
    );
}