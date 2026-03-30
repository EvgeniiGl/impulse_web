import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {CardsApi, GetCardResponse, GetCardsResponse} from "@api/cardsApi.ts";
import {CollectionsApi} from "@api/collectionsApi.ts";
import {CardState, AccessType} from "@store/store.ts";
import {initCardLikesFromCards, initCardLike} from "@store/like/likeSlice.ts";

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
    draggedCard: null,
};

export const fetchCards = createAsyncThunk(
    'cards/fetch',
    async ({page, perPage}: { page: number; perPage: number }, {rejectWithValue, dispatch}) => {
        try {
            const response = await CardsApi.getCards(page, perPage);
            if (!response) {
                return rejectWithValue('Failed to fetch cards');
            }

            // Инициализируем лайки из загруженных карточек
            if (response.data.cards && response.data.cards.length > 0) {
                dispatch(initCardLikesFromCards(response.data.cards));
            }

            return response;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

export const createCollection = createAsyncThunk(
    'collections',
    async (data: { name: string, access_type: AccessType }, {rejectWithValue}) => {
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

export const fetchCard = createAsyncThunk(
    'card/fetchCard',
    async (id: string, {rejectWithValue, dispatch}) => {
        try {
            const response = await CardsApi.getCard(id);
            if (!response) {
                return rejectWithValue('Failed to fetch card');
            }

            // Инициализируем лайк для загруженной карточки
            if (response.data) {
                dispatch(initCardLike({
                    cardId: response.data.id,
                    liked: response.data.is_liked ?? false,
                    likesCount: response.data.likes_count ?? 0
                }));
            }

            return response;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

export const updateCard = createAsyncThunk(
    'card/updateCard',
    async ({id, data}: {
        id: string;
        data: { show_title_on_image?: boolean; [key: string]: any }
    }, {rejectWithValue, dispatch}) => {
        try {
            const response = await CardsApi.updateCard(id, data);
            if (!response) {
                return rejectWithValue('Failed to update card');
            }

            // Обновляем данные лайка если они есть в ответе
            if (response.data) {
                dispatch(initCardLike({
                    cardId: response.data.id,
                    liked: response.data.is_liked ?? false,
                    likesCount: response.data.likes_count ?? 0
                }));
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

        builder
            .addCase(fetchCard.pending, (state: CardState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCard.fulfilled, (state: CardState, action: PayloadAction<GetCardResponse>) => {
                state.isLoading = false;
                state.currentCard = action.payload.data;
            })
            .addCase(fetchCard.rejected, (state: CardState, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(updateCard.pending, (state: CardState) => {
                state.isUpdating = true;
                state.error = null;
            })
            .addCase(updateCard.fulfilled, (state: CardState, action: PayloadAction<GetCardResponse>) => {
                state.isUpdating = false;
                if (action.payload?.data) {
                    state.currentCard = action.payload.data;
                }
            })
            .addCase(updateCard.rejected, (state: CardState, action) => {
                state.isUpdating = false;
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