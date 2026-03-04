export const ItemTypes = {
    CARD: 'card'
};

export interface DragItem {
    id: string;
    collectionIds: string[];
    sourceElement?: HTMLElement | null;
    sourceCollectionId?: string | null; // Добавляем поле для исходной коллекции
}

export interface DropResult {
    collectionId: string | null;
}