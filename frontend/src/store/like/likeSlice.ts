import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {LikesApi, LikeResponse} from '@/api/likesApi';
import {Card} from '@store/store';

interface LikeData {
    liked: boolean;
    likesCount: number;
}

interface LikeState {
    // Карта лайков карточек: cardId -> { liked, likesCount }
    cardLikes: Record<string, LikeData>;
    // Карта лайков коллекций: collectionId -> { liked, likesCount }
    collectionLikes: Record<string, LikeData>;
    // Статусы загрузки
    loadingCards: Record<string, boolean>;
    loadingCollections: Record<string, boolean>;
    error: string | null;
}

const initialState: LikeState = {
    cardLikes: {},
    collectionLikes: {},
    loadingCards: {},
    loadingCollections: {},
    error: null
};

// Типы для payload
interface CardLikePayload extends LikeResponse {
    cardId: string;
}

interface CollectionLikePayload extends LikeResponse {
    collectionId: string;
}

// Async thunks
export const toggleCardLike = createAsyncThunk<CardLikePayload, string>(
    'likes/toggleCardLike',
    async (cardId: string, {rejectWithValue}) => {
        try {
            const response = await LikesApi.toggleCardLike(cardId);
            if (!response) {
                return rejectWithValue('Failed to toggle like');
            }
            return {cardId, ...response};
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

export const fetchCardLikeStatus = createAsyncThunk<CardLikePayload, string>(
    'likes/fetchCardLikeStatus',
    async (cardId: string, {rejectWithValue}) => {
        try {
            const response = await LikesApi.getCardLikeStatus(cardId);
            if (!response) {
                return rejectWithValue('Failed to get like status');
            }
            return {cardId, ...response};
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

export const toggleCollectionLike = createAsyncThunk<CollectionLikePayload, string>(
    'likes/toggleCollectionLike',
    async (collectionId: string, {rejectWithValue}) => {
        try {
            const response = await LikesApi.toggleCollectionLike(collectionId);
            if (!response) {
                return rejectWithValue('Failed to toggle like');
            }
            return {collectionId, ...response};
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

export const fetchCollectionLikeStatus = createAsyncThunk<CollectionLikePayload, string>(
    'likes/fetchCollectionLikeStatus',
    async (collectionId: string, {rejectWithValue}) => {
        try {
            const response = await LikesApi.getCollectionLikeStatus(collectionId);
            if (!response) {
                return rejectWithValue('Failed to get like status');
            }
            return {collectionId, ...response};
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

const likeSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        clearLikeError: (state) => {
            state.error = null;
        },

        // Инициализация лайков из массива карточек (при загрузке карточек с бэкенда)
        initCardLikesFromCards: (state, action: PayloadAction<Card[]>) => {
            action.payload.forEach(card => {
                if (card.likes_count !== undefined || card.is_liked !== undefined) {
                    state.cardLikes[card.id] = {
                        liked: card.is_liked ?? false,
                        likesCount: card.likes_count ?? 0
                    };
                }
            });
        },

        // Инициализация лайка одной карточки
        initCardLike: (state, action: PayloadAction<{ cardId: string; liked: boolean; likesCount: number }>) => {
            state.cardLikes[action.payload.cardId] = {
                liked: action.payload.liked,
                likesCount: action.payload.likesCount
            };
        },

        setCardLike: (state, action: PayloadAction<{ cardId: string; liked: boolean; likesCount: number }>) => {
            state.cardLikes[action.payload.cardId] = {
                liked: action.payload.liked,
                likesCount: action.payload.likesCount
            };
        },
        setCollectionLike: (state, action: PayloadAction<{
            collectionId: string;
            liked: boolean;
            likesCount: number
        }>) => {
            state.collectionLikes[action.payload.collectionId] = {
                liked: action.payload.liked,
                likesCount: action.payload.likesCount
            };
        },

        // Оптимистичное обновление лайка карточки
        optimisticToggleCardLike: (state, action: PayloadAction<string>) => {
            const cardId = action.payload;
            const current = state.cardLikes[cardId];
            if (current) {
                state.cardLikes[cardId] = {
                    liked: !current.liked,
                    likesCount: current.liked ? current.likesCount - 1 : current.likesCount + 1
                };
            } else {
                state.cardLikes[cardId] = {liked: true, likesCount: 1};
            }
        },

        // Оптимистичное обновление лайка коллекции
        optimisticToggleCollectionLike: (state, action: PayloadAction<string>) => {
            const collectionId = action.payload;
            const current = state.collectionLikes[collectionId];
            if (current) {
                state.collectionLikes[collectionId] = {
                    liked: !current.liked,
                    likesCount: current.liked ? current.likesCount - 1 : current.likesCount + 1
                };
            } else {
                state.collectionLikes[collectionId] = {liked: true, likesCount: 1};
            }
        },

        // Очистка данных лайков
        clearCardLikes: (state) => {
            state.cardLikes = {};
        },

        clearCollectionLikes: (state) => {
            state.collectionLikes = {};
        }
    },
    extraReducers: (builder) => {
        // Toggle card like
        builder
            .addCase(toggleCardLike.pending, (state: LikeState, action) => {
                // @ts-ignore
                state.loadingCards[action.meta.arg] = true;
            })
            .addCase(toggleCardLike.fulfilled, (state: LikeState, action) => {
                const {cardId, liked, likes_count} = action.payload;
                state.cardLikes[cardId] = {
                    liked,
                    likesCount: likes_count
                };
                state.loadingCards[cardId] = false;
            })
            .addCase(toggleCardLike.rejected, (state: LikeState, action) => {
                state.loadingCards[action.meta.arg] = false;
                state.error = action.payload as string;
            });

        // Fetch card like status
        builder
            .addCase(fetchCardLikeStatus.pending, (state: LikeState, action) => {
                // @ts-ignore
                state.loadingCards[action.meta.arg] = true;
            })
            .addCase(fetchCardLikeStatus.fulfilled, (state: LikeState, action) => {
                const {cardId, liked, likes_count} = action.payload;
                state.cardLikes[cardId] = {
                    liked,
                    likesCount: likes_count
                };
                state.loadingCards[cardId] = false;
            })
            .addCase(fetchCardLikeStatus.rejected, (state: LikeState, action) => {
                state.loadingCards[action.meta.arg] = false;
                state.error = action.payload as string;
            });

        // Toggle collection like
        builder
            .addCase(toggleCollectionLike.pending, (state: LikeState, action) => {
                // @ts-ignore
                state.loadingCollections[action.meta.arg] = true;
            })
            .addCase(toggleCollectionLike.fulfilled, (state: LikeState, action) => {
                const {collectionId, liked, likes_count} = action.payload;
                state.collectionLikes[collectionId] = {
                    liked,
                    likesCount: likes_count
                };
                state.loadingCollections[collectionId] = false;
            })
            .addCase(toggleCollectionLike.rejected, (state: LikeState, action) => {
                state.loadingCollections[action.meta.arg] = false;
                state.error = action.payload as string;
            });

        // Fetch collection like status
        builder
            .addCase(fetchCollectionLikeStatus.pending, (state: LikeState, action) => {
                // @ts-ignore
                state.loadingCollections[action.meta.arg] = true;
            })
            .addCase(fetchCollectionLikeStatus.fulfilled, (state: LikeState, action) => {
                const {collectionId, liked, likes_count} = action.payload;
                state.collectionLikes[collectionId] = {
                    liked,
                    likesCount: likes_count
                };
                state.loadingCollections[collectionId] = false;
            })
            .addCase(fetchCollectionLikeStatus.rejected, (state: LikeState, action) => {
                state.loadingCollections[action.meta.arg] = false;
                state.error = action.payload as string;
            });
    }
});

export const {
    clearLikeError,
    initCardLikesFromCards,
    initCardLike,
    setCardLike,
    setCollectionLike,
    optimisticToggleCardLike,
    optimisticToggleCollectionLike,
    clearCardLikes,
    clearCollectionLikes
} = likeSlice.actions;

export default likeSlice.reducer;