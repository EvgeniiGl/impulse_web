import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {CardsApi, GetCardResponse, GetCardsResponse} from "@api/cardsApi.ts";
import {CollectionsApi} from "@api/collectionsApi.ts";
import {CardState, AccessType} from "@store/store.ts";

// export type CreateCollectionInput = Omit<Collection, 'id'>;

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

export const fetchCard = createAsyncThunk(
    'card/fetchCard',
    async (id: string, {rejectWithValue}) => {
        try {
            const response = await CardsApi.getCard(id);
            if (!response) {
                return rejectWithValue('Failed to fetch card');
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
        resetCurrentCard: (state) => {
            state.currentCard = null;
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
        builder
            .addCase(fetchCard.pending, (state: CardState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCard.fulfilled, (state: CardState, action: PayloadAction<GetCardResponse>) => {
                state.isLoading = false;
                state.currentCard = action.payload.data.card;
            })
            .addCase(fetchCard.rejected, (state: CardState, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    clearError,
    resetCurrentCard,
    resetPagination
} = cardSlice.actions;
export default cardSlice.reducer;
