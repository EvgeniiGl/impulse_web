// hooks/useDropMenu.ts
import {useState, useCallback} from 'react';

interface DropMenuState {
    isOpen: boolean;
    position: { x: number; y: number };
    cardId: string | null;
    targetCollectionId: string | null;
    sourceCollectionIds: string[];
}

export const useDropMenu = () => {
    const [menuState, setMenuState] = useState<DropMenuState>({
        isOpen: false,
        position: {x: 0, y: 0},
        cardId: null,
        targetCollectionId: null,
        sourceCollectionIds: []
    });

    const openMenu = useCallback((
        cardId: string,
        targetCollectionId: string | null,
        sourceCollectionIds: string[],
        clientOffset: { x: number; y: number }
    ) => {
        setMenuState({
            isOpen: true,
            position: {x: clientOffset.x, y: clientOffset.y},
            cardId,
            targetCollectionId,
            sourceCollectionIds
        });
    }, []);

    const closeMenu = useCallback(() => {
        setMenuState(prev => ({...prev, isOpen: false}));
    }, []);

    return {
        menuState,
        openMenu,
        closeMenu
    };
};