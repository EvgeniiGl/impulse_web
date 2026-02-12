import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {CardsApi, CreateCardRequest, CreateCardResponse} from "@api/cardsApi.ts";
import {CollectionsApi, MyCollectionsResponse} from "@api/collectionsApi.ts";

export type AccessType = 'private' | 'public' | 'shared';

export interface Card {
    id: string;
    title: string;
    description?: string;
    url: string;
    creator_id: string;
    access_type: AccessType;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    object_path: string;
    file_name: string;
    original_name: string;
}

export interface Collection {
    id: string;
    name: string;
    creator_id: string;
    access_type: AccessType;
    is_active: boolean;
    card_count: number;
    creator_name: string;
}

export type CreateCollectionInput = Omit<Collection, 'id'>;

interface CardState {
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
}

const initialState: CardState = {
    cards: [],
    currentCard: null,
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    error: null,
    success: null,
    collectionsLoading: false,
    collections: [],
    selectedCollections: [],
};

// Создание карточки
export const createCard = createAsyncThunk(
    'cards/create',
    async (data: { card: CreateCardRequest, file: File }, {rejectWithValue}) => {
        try {
            const response = await CardsApi.create(data);
            if (!response) {
                return rejectWithValue('Failed to create card');
            }

            return response;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

export const myCollections = createAsyncThunk(
    'collections/my',
    async (_, {rejectWithValue}) => {  // Используйте _ для неиспользуемого параметра
        try {
            const response = await CollectionsApi.my();
            if (!response) {
                return rejectWithValue('Failed to fetch collections');
            }

            return response;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

export const createCollection = createAsyncThunk(
    'collections',
    async (data: { name: string, access_type: AccessType }, {rejectWithValue}) => {  // Используйте _ для неиспользуемого параметра
        try {
            const response = await CollectionsApi.create(data);
            if (!response) {
                return rejectWithValue('Failed to create collection');
            }

            return response;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = null;
        },
        resetCurrentCard: (state) => {
            state.currentCard = null;
        },
        setSelectedCollections: (state: CardState, action: PayloadAction<Collection[]>) => {
            state.selectedCollections = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Create Card
        builder
            .addCase(createCard.pending, (state: CardState) => {
                state.isCreating = true;
                state.error = null;
                state.success = null;
            })
            .addCase(createCard.fulfilled, (state: CardState, action: PayloadAction<CreateCardResponse>) => {
                state.isCreating = false;
                if (!action.payload.success) {
                    state.success = null
                    return
                }
                state.cards.push(action.payload.data);
                state.success = 'Карточка успешно создана';
            })
            .addCase(createCard.rejected, (state: CardState, action) => {
                state.isCreating = false;
                state.error = action.payload as string;
                state.success = null;
            });

        builder
            .addCase(myCollections.pending, (state: CardState) => {
                state.isLoading = true;
            })
            .addCase(myCollections.fulfilled, (state: CardState, action: PayloadAction<MyCollectionsResponse>) => {
                state.isLoading = false;
                state.collections = action.payload.data;
            })
            .addCase(myCollections.rejected, (state: CardState, action) => {
                state.isLoading = false;
            });

        // // Fetch Cards
        // builder
        //     .addCase(fetchCards.pending, (state: CardState) => {
        //         state.isLoading = true;
        //         state.error = null;
        //     })
        //     .addCase(fetchCards.fulfilled, (state: CardState, action) => {
        //         state.isLoading = false;
        //         state.cards = action.payload;
        //     })
        //     .addCase(fetchCards.rejected, (state: CardState, action) => {
        //         state.isLoading = false;
        //         state.error = action.payload as string;
        //     });
        //
        // // Fetch Card By ID
        // builder
        //     .addCase(fetchCardById.pending, (state: CardState) => {
        //         state.isLoading = true;
        //         state.error = null;
        //     })
        //     .addCase(fetchCardById.fulfilled, (state: CardState, action) => {
        //         state.isLoading = false;
        //         state.currentCard = action.payload;
        //     })
        //     .addCase(fetchCardById.rejected, (state: CardState, action) => {
        //         state.isLoading = false;
        //         state.error = action.payload as string;
        //     });
        //
        // // Update Card
        // builder
        //     .addCase(updateCard.pending, (state: CardState) => {
        //         state.isUpdating = true;
        //         state.error = null;
        //         state.success = null;
        //     })
        //     .addCase(updateCard.fulfilled, (state: CardState, action) => {
        //         state.isUpdating = false;
        //         const index = state.cards.findIndex((c) => c.id === action.payload.id);
        //         if (index !== -1) {
        //             state.cards[index] = action.payload;
        //         }
        //         if (state.currentCard?.id === action.payload.id) {
        //             state.currentCard = action.payload;
        //         }
        //         state.success = 'Карточка успешно обновлена';
        //     })
        //     .addCase(updateCard.rejected, (state: CardState, action) => {
        //         state.isUpdating = false;
        //         state.error = action.payload as string;
        //     });
        //
        // // Delete Card
        // builder
        //     .addCase(deleteCard.pending, (state: CardState) => {
        //         state.isDeleting = true;
        //         state.error = null;
        //         state.success = null;
        //     })
        //     .addCase(deleteCard.fulfilled, (state: CardState, action) => {
        //         state.isDeleting = false;
        //         state.cards = state.cards.filter((c) => c.id !== action.payload);
        //         if (state.currentCard?.id === action.payload) {
        //             state.currentCard = null;
        //         }
        //         state.success = 'Карточка успешно удалена';
        //     })
        //     .addCase(deleteCard.rejected, (state: CardState, action) => {
        //         state.isDeleting = false;
        //         state.error = action.payload as string;
        //     });
    },
});

export const {clearError, clearSuccess, resetCurrentCard, setSelectedCollections} = cardSlice.actions;
export default cardSlice.reducer;
