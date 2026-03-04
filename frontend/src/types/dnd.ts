export const ItemTypes = {
    CARD: 'card'
};

export interface DragItem {
    id: string;
    collectionIds: string[];
}

export interface DropResult {
    collectionId: string | null;
}