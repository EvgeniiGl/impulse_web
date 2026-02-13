import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {CardsApi, CreateCardRequest, CreateCardResponse, GetCardsResponse} from "@api/cardsApi.ts";
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

interface PaginationState {
    page: number;
    perPage: number;
    total: number;
    hasMore: boolean;
}

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
    selectedCollectionId: string | null;
    pagination: PaginationState;
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
    selectedCollectionId: null,
    pagination: {
        page: 1,
        perPage: 12,
        total: 0,
        hasMore: true,
    },
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

export const fetchCards = createAsyncThunk(
    'cards/fetch',
    async ({page, perPage}: { page: number; perPage: number }, {rejectWithValue}) => {
        try {
            const response = await CardsApi.getCards(page, perPage);
            if (!response) {
                return rejectWithValue('Failed to fetch cards');
            }
            return response;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

export const fetchCardsByCollection = createAsyncThunk(
    'cards/fetchByCollection',
    async ({collectionId, page, perPage}: {
        collectionId: string;
        page: number;
        perPage: number
    }, {rejectWithValue}) => {
        try {
            const response = await CardsApi.getCardsByCollection(collectionId, page, perPage);
            if (!response) {
                return rejectWithValue('Failed to fetch cards');
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
        setSelectedCollectionId: (state: CardState, action: PayloadAction<string | null>) => {
            state.selectedCollectionId = action.payload;
            state.cards = [];
            state.pagination = {
                page: 1,
                perPage: 12,
                total: 0,
                hasMore: true,
            };
        },
        resetPagination: (state) => {
            state.pagination = {
                page: 1,
                perPage: 12,
                total: 0,
                hasMore: true,
            };
            state.cards = [];
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
                state.error = action.payload as string;
            });
// Fetch Cards
        builder
            .addCase(fetchCards.pending, (state: CardState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCards.fulfilled, (state: CardState, action: PayloadAction<GetCardsResponse>) => {
                state.isLoading = false;
                const newCards = action.payload.data.cards;

                if (state.pagination.page === 1) {
                    state.cards = newCards;
                } else {
                    state.cards = [...state.cards, ...newCards];
                }

                state.pagination.total = action.payload.data.total;
                state.pagination.page = action.payload.data.page;
                state.pagination.hasMore = newCards.length === state.pagination.perPage;
            })
            .addCase(fetchCards.rejected, (state: CardState, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
        // Fetch Cards By Collection
        builder
            .addCase(fetchCardsByCollection.pending, (state: CardState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCardsByCollection.fulfilled, (state: CardState, action: PayloadAction<GetCardsResponse>) => {
                state.isLoading = false;
                const newCards = action.payload.data.cards;

                if (state.pagination.page === 1) {
                    state.cards = newCards;
                } else {
                    state.cards = [...state.cards, ...newCards];
                }

                state.pagination.total = action.payload.data.total;
                state.pagination.page = action.payload.data.page;
                state.pagination.hasMore = newCards.length === state.pagination.perPage;
            })
            .addCase(fetchCardsByCollection.rejected, (state: CardState, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    clearError,
    clearSuccess,
    resetCurrentCard,
    setSelectedCollections,
    setSelectedCollectionId,
    resetPagination
} = cardSlice.actions;
export default cardSlice.reducer;
