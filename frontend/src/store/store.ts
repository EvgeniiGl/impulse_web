import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import authReducer from './auth/authSlice.ts';
import cardReducer from './card/cardSlice.ts';
import myCardReducer from './card/myCardSlice.ts';
import notificationReducer from './notification/notificationSlice';
import homeReducer from './home/homeSlice.ts';
import likeReducer from './like/likeSlice.ts';

export type AccessType = 'private' | 'public' | 'shared';

export interface Card {
    id: string;
    title: string;
    description?: string;
    url: string;
    creator_id: string;
    creator?: {
        id: string;
        name: string;
        email: string;
    };
    access_type: AccessType;
    is_active: boolean;
    show_title_on_image: boolean;
    created_at: string;
    updated_at: string;
    object_path: string;
    file_name: string;
    original_name: string;
    collectionIds: string[];
    likes_count?: number;
    is_liked?: boolean;
}

export interface Collection {
    id: string;
    name: string;
    creator_id: string;
    access_type: AccessType;
    is_active: boolean;
    card_count: number;
    creator_name: string;
    likes_count?: number;
    is_liked?: boolean;
}


export interface PaginationState {
    page: number;
    perPage: number;
    total: number;
    hasMore: boolean;
}

export interface DraggedCard {
    id: string;
    sourceCollectionId: string | null;
}

export interface CardState {
    cards: Card[];
    currentCard: Card | null;
    isLoading: boolean;
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
    error: string | null;
    success: string | null;
    collectionsLoading: boolean;
    collections: Collection[];
    selectedCollections: Collection[];
    selectedCollectionId: string | null;
    pagination: PaginationState;
    draggedCard: DraggedCard | null;
}

export const store = configureStore({
    reducer: {
        auth: authReducer,
        card: cardReducer,
        myCards: myCardReducer,
        notifications: notificationReducer,
        home: homeReducer,
        likes: likeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
