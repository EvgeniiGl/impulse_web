import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
    CardsApi,
    CreateCardRequest,
    CreateCardResponse,
    GetCardResponse,
    GetCardsResponse
} from "@api/cardsApi.ts";
import {CollectionsApi, MyCollectionsResponse} from "@api/collectionsApi.ts";
import {Card, Collection, PaginationState} from "@store/store.ts";
import {initCardLikesFromCards, initCardLike} from "@store/like/likeSlice.ts";

export interface MyCardState {
    myCards: Card[];
    error: string | null;
    pagination: PaginationState;
    collectionsLoading: boolean;
    collections: Collection[];
    selectedCollections: Collection[];
    selectedCollectionId: string;
    isLoading: boolean,
    isCreating: boolean,
    isUpdating: boolean,
    isDeleting: boolean,
    success: string | null;
    openScheduleCardId: string | null;
}

const initialState: MyCardState = {
    myCards: [],
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    success: null,
    error: null,
    collectionsLoading: false,
    collections: [],
    selectedCollections: [],
    selectedCollectionId: 'common',
    openScheduleCardId: null,
    pagination: {
        page: 1,
        perPage: 12,
        total: 0,
        hasMore: true,
    },
};

// Экшен для загрузки "моих карточек" (созданные + с правом записи)
export const fetchMyCards = createAsyncThunk(
    'myCards/fetch',
    async ({page, perPage}: { page: number; perPage: number }, {rejectWithValue, dispatch}) => {
        try {
            const response = await CardsApi.getMyCards(page, perPage);
            if (!response?.success) {
                return rejectWithValue('Failed to fetch my cards');
            }

            // Инициализируем лайки из загруженных карточек
            if (response.data.cards && response.data.cards.length > 0) {
                dispatch(initCardLikesFromCards(response.data.cards));
            }

            return response as GetCardsResponse;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

export const myCollections = createAsyncThunk(
    'collections/my',
    async (_, {rejectWithValue}) => {
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

export const fetchCardsByCollection = createAsyncThunk(
    'cards/fetchByCollection',
    async ({collectionId, page, perPage}: {
        collectionId: string;
        page: number;
        perPage: number
    }, {rejectWithValue, dispatch}) => {
        try {
            const response = await CardsApi.getCardsByCollection(collectionId, page, perPage);
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

export const fetchLikedCards = createAsyncThunk(
    'cards/fetchLikedCards',
    async ({page, perPage}: {
        page: number;
        perPage: number
    }, {rejectWithValue, dispatch}) => {
        try {
            const response = await CardsApi.getLikedCards(page, perPage);
            if (!response) {
                return rejectWithValue('Failed to fetch liked cards');
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

export const createCard = createAsyncThunk(
    'cards/create',
    async (data: { card: CreateCardRequest, file: File }, {rejectWithValue, dispatch}) => {
        try {
            const response = await CardsApi.create(data);
            if (!response) {
                return rejectWithValue('Failed to create card');
            }

            // Инициализируем лайк для новой карточки
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

export const updateCardCollections = createAsyncThunk(
    'cards/updateCollections',
    async ({cardId, collectionIds}: { cardId: string; collectionIds: string[] }, {rejectWithValue, dispatch}) => {
        try {
            const response = await CardsApi.updateCardCollections(cardId, collectionIds);
            if (!response?.success) {
                return rejectWithValue('Failed to update card collections');
            }
            await dispatch(myCollections());

            return response;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

export const deleteCollection = createAsyncThunk(
    'collections/delete',
    async (id: string, {rejectWithValue, dispatch}) => {
        try {
            const response = await CollectionsApi.remove(id);
            if (!response?.success) {
                return rejectWithValue('Failed to delete collection');
            }
            await dispatch(myCollections());

            return {id, success: true};
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

export const deleteCard = createAsyncThunk(
    'cards/delete',
    async ({card, collectionId}: { card: Card; collectionId: string | null }, {rejectWithValue, dispatch}) => {
        try {
            if (collectionId && card.collectionIds && card.collectionIds.length > 1) {
                const updatedCollectionIds = card.collectionIds.filter(id => id !== collectionId);
                const response = await CardsApi.updateCardCollections(card.id, updatedCollectionIds);
                if (!response?.success) {
                    return rejectWithValue('Failed to remove card from collection');
                }
            } else {
                const response = await CardsApi.deleteCard(card.id);
                if (!response?.success) {
                    return rejectWithValue('Failed to delete card');
                }
            }
            await dispatch(myCollections());

            return card.id;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

const myCardSlice = createSlice({
    name: 'myCards',
    initialState,
    reducers: {
        clearMyCardsError: (state) => {
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = null;
        },
        setSelectedCollections: (state: MyCardState, action: PayloadAction<Collection[]>) => {
            state.selectedCollections = action.payload;
        },
        resetMyCardsPagination: (state) => {
            state.pagination = {...initialState.pagination};
            state.myCards = [];
        },
        resetMyCardsState: () => initialState,
        setSelectedCollectionId: (state: MyCardState, action: PayloadAction<string>) => {
            state.selectedCollectionId = action.payload;
            state.myCards = [];
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
            state.myCards = [];
        },
        openScheduleForm: (state, action: PayloadAction<string>) => {
            state.openScheduleCardId = action.payload;
        },
        closeScheduleForm: (state) => {
            state.openScheduleCardId = null;
        },
        toggleScheduleForm: (state, action: PayloadAction<string>) => {
            state.openScheduleCardId = state.openScheduleCardId === action.payload ? null : action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCard.pending, (state: MyCardState) => {
                state.isCreating = true;
                state.error = null;
                state.success = null;
            })
            .addCase(createCard.fulfilled, (state: MyCardState, action: PayloadAction<CreateCardResponse>) => {
                state.isCreating = false;
                if (!action.payload.success) {
                    state.success = null
                    return
                }
                state.success = 'Карточка успешно создана';
                state.selectedCollections = [];
            })
            .addCase(createCard.rejected, (state: MyCardState, action) => {
                state.isCreating = false;
                state.error = action.payload as string;
                state.success = null;
            });

        builder
            .addCase(fetchMyCards.pending, (state: MyCardState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMyCards.fulfilled, (state: MyCardState, action: PayloadAction<GetCardsResponse>) => {
                state.isLoading = false;
                const newCards = action.payload.data.cards || [];
                state.pagination.total = action.payload.data.total || 0;
                state.pagination.page = action.payload.data.page || 1;
                state.pagination.hasMore = newCards.length === state.pagination.perPage;
                state.myCards = state.pagination.page === 1
                    ? newCards
                    : [...state.myCards, ...newCards];
            })
            .addCase(fetchMyCards.rejected, (state: MyCardState, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(myCollections.pending, (state: MyCardState) => {
                state.isLoading = true;
            })
            .addCase(myCollections.fulfilled, (state: MyCardState, action: PayloadAction<MyCollectionsResponse>) => {
                state.isLoading = false;
                state.collections = action.payload.data;
            })
            .addCase(myCollections.rejected, (state: MyCardState, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(fetchCardsByCollection.pending, (state: MyCardState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCardsByCollection.fulfilled, (state: MyCardState, action: PayloadAction<GetCardsResponse>) => {
                state.isLoading = false;
                const newCards = action.payload.data.cards;
                state.pagination.total = action.payload.data.total;
                state.pagination.page = action.payload.data.page;
                state.pagination.hasMore = newCards.length === state.pagination.perPage;
                if (state.pagination.page === 1) {
                    state.myCards = newCards;
                } else {
                    state.myCards = [...state.myCards, ...newCards];
                }
            })
            .addCase(fetchCardsByCollection.rejected, (state: MyCardState, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(fetchLikedCards.pending, (state: MyCardState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchLikedCards.fulfilled, (state: MyCardState, action: PayloadAction<GetCardsResponse>) => {
                state.isLoading = false;
                const newCards = action.payload.data.cards;
                state.pagination.total = action.payload.data.total;
                state.pagination.page = action.payload.data.page;
                state.pagination.hasMore = newCards.length === state.pagination.perPage;
                if (state.pagination.page === 1) {
                    state.myCards = newCards;
                } else {
                    state.myCards = [...state.myCards, ...newCards];
                }
            })
            .addCase(fetchLikedCards.rejected, (state: MyCardState, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(updateCardCollections.pending, (state: MyCardState) => {
                state.isUpdating = true;
                state.error = null;
            })
            .addCase(updateCardCollections.fulfilled, (state: MyCardState, action: PayloadAction<GetCardResponse>) => {
                state.isUpdating = false;
                state.myCards = state.myCards.filter(card => card.id !== action.payload.data.id);
                state.success = 'Коллекции карточки обновлены';
            })
            .addCase(updateCardCollections.rejected, (state: MyCardState, action) => {
                state.isUpdating = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(deleteCollection.pending, (state: MyCardState) => {
                state.isDeleting = true;
                state.error = null;
            })
            .addCase(deleteCollection.fulfilled, (state: MyCardState) => {
                state.isDeleting = false;
                state.success = 'Коллекция успешно удалена';
            })
            .addCase(deleteCollection.rejected, (state: MyCardState, action) => {
                state.isDeleting = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(deleteCard.pending, (state: MyCardState) => {
                state.isDeleting = true;
                state.error = null;
            })
            .addCase(deleteCard.fulfilled, (state: MyCardState, action: PayloadAction<string>) => {
                state.isDeleting = false;
                state.success = 'Карточка успешно удалена';
                state.myCards = state.myCards.filter(card => card.id !== action.payload);
            })
            .addCase(deleteCard.rejected, (state: MyCardState, action) => {
                state.isDeleting = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    clearMyCardsError,
    resetMyCardsPagination,
    resetMyCardsState,
    setSelectedCollections,
    setSelectedCollectionId,
    resetPagination,
    clearSuccess,
    clearError,
    openScheduleForm,
    closeScheduleForm,
    toggleScheduleForm,
} = myCardSlice.actions;

export default myCardSlice.reducer;