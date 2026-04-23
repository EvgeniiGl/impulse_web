import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {SearchApi, SearchCardsResponse} from "@api/searchApi.ts";
import {PaginationState, Card} from "@store/store.ts";
import {initCardLikesFromCards} from "@store/like/likeSlice.ts";

export interface HomeState {
    cards: Card[];
    isLoading: boolean;
    error: string | null;
    searchQuery: string;
    isSearching: boolean;
    pagination: PaginationState;
}

const initialState: HomeState = {
    cards: [],
    isLoading: false,
    error: null,
    searchQuery: '',
    isSearching: false,
    pagination: {
        page: 1,
        perPage: 12,
        total: 0,
        hasMore: true,
    },
};

export const fetchPublicCards = createAsyncThunk(
    'home/fetchPublicCards',
    async ({page, perPage}: { page: number; perPage: number }, {rejectWithValue, dispatch}) => {
        try {
            const response = await SearchApi.getPublicCards(page, perPage);
            if (!response?.success) {
                return rejectWithValue('Failed to fetch public cards');
            }

            // Инициализируем лайки из загруженных карточек
            if (response.data.cards.length > 0) {
                dispatch(initCardLikesFromCards(response.data.cards));
            }

            return response as SearchCardsResponse;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

export const searchPublicCards = createAsyncThunk(
    'home/searchPublicCards',
    async ({query, page, perPage}: { query: string; page: number; perPage: number }, {rejectWithValue, dispatch}) => {
        try {
            const response = await SearchApi.searchCards(query, page, perPage);
            if (!response?.success) {
                return rejectWithValue('Failed to search cards');
            }

            // Инициализируем лайки из загруженных карточек
            if (response.data.cards.length > 0) {
                dispatch(initCardLikesFromCards(response.data.cards));
            }

            return response as SearchCardsResponse;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        resetHomePagination: (state) => {
            state.pagination = {
                page: 1,
                perPage: 12,
                total: 0,
                hasMore: true,
            };
            state.cards = [];
        },
        clearHomeError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // fetchPublicCards
        builder
            .addCase(fetchPublicCards.pending, (state: HomeState) => {
                state.isLoading = true;
                state.isSearching = false;
                state.error = null;
            })
            .addCase(fetchPublicCards.fulfilled, (state: HomeState, action: PayloadAction<SearchCardsResponse>) => {
                state.isLoading = false;
                const newCards = action.payload.data.cards;
                state.pagination.total = action.payload.data.total;
                state.pagination.page = action.payload.data.page;
                state.pagination.hasMore = newCards.length === state.pagination.perPage;
                if (action.payload.data.page === 1) {
                    state.cards = newCards;
                } else {
                    state.cards = [...state.cards, ...newCards];
                }
            })
            .addCase(fetchPublicCards.rejected, (state: HomeState, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // searchPublicCards
        builder
            .addCase(searchPublicCards.pending, (state: HomeState) => {
                state.isLoading = true;
                state.isSearching = true;
                state.error = null;
            })
            .addCase(searchPublicCards.fulfilled, (state: HomeState, action: PayloadAction<SearchCardsResponse>) => {
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
            .addCase(searchPublicCards.rejected, (state: HomeState, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const {setSearchQuery, resetHomePagination, clearHomeError} = homeSlice.actions;
export default homeSlice.reducer;