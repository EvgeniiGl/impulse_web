import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {api} from '@api/api.ts';

export interface CreateCardData {
    title: string;
    description?: string;
    access_type: 'public' | 'private';
    file: File;
}

export interface Card {
    id: string;
    title: string;
    description?: string;
    url: string;
    creator_id: string;
    access_type: 'public' | 'private';
    is_active: boolean;
    created_at: string;
    updated_at: string;
    object_path: string;
    file_name: string;
    original_name: string;
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
};

// Создание карточки
export const createCard = createAsyncThunk(
    'card/createCard',
    async (data: CreateCardData, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            if (data.description) {
                formData.append('description', data.description);
            }
            formData.append('access_type', data.access_type);
            formData.append('file', data.file);

            const response = await api.post<Card>('/cards', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Ошибка при создании карточки'
            );
        }
    }
);

// Получение всех карточек
export const fetchCards = createAsyncThunk(
    'card/fetchCards',
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.get<Card[]>('/cards');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Ошибка при загрузке карточек'
            );
        }
    }
);

// Получение одной карточки
export const fetchCardById = createAsyncThunk(
    'card/fetchCardById',
    async (id: string, {rejectWithValue}) => {
        try {
            const response = await api.get<Card>(`/cards/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Ошибка при загрузке карточки'
            );
        }
    }
);

// Обновление карточки
export const updateCard = createAsyncThunk(
    'card/updateCard',
    async (
        {id, data}: { id: string; data: Partial<CreateCardData> },
        {rejectWithValue}
    ) => {
        try {
            const formData = new FormData();

            if (data.title) {
                formData.append('title', data.title);
            }
            if (data.description !== undefined) {
                formData.append('description', data.description);
            }
            if (data.access_type) {
                formData.append('access_type', data.access_type);
            }
            if (data.file) {
                formData.append('file', data.file);
            }

            const response = await api.put<Card>(`/cards/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Ошибка при обновлении карточки'
            );
        }
    }
);

// Удаление карточки
// export const deleteCard = createAsyncThunk(
//     'card/deleteCard',
//     async (id: string, { rejectWithValue }) => {
//         try {
//             await api.delete(`/cards/${id}`);
//             return id;
//         } catch (error: any) {
//             return rejectWithValue(
//                 error.response?.data?.message || 'Ошибка при удалении карточки'
//             );
//         }
//     }
// );

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
    },
    extraReducers: (builder) => {
        // Create Card
        builder
            .addCase(createCard.pending, (state: CardState) => {
                state.isCreating = true;
                state.error = null;
                state.success = null;
            })
            .addCase(createCard.fulfilled, (state: CardState, action) => {
                state.isCreating = false;
                state.cards.push(action.payload);
                state.success = 'Карточка успешно создана';
            })
            .addCase(createCard.rejected, (state: CardState, action) => {
                state.isCreating = false;
                state.error = action.payload as string;
            });

        // Fetch Cards
        builder
            .addCase(fetchCards.pending, (state: CardState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCards.fulfilled, (state: CardState, action) => {
                state.isLoading = false;
                state.cards = action.payload;
            })
            .addCase(fetchCards.rejected, (state: CardState, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // Fetch Card By ID
        builder
            .addCase(fetchCardById.pending, (state: CardState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCardById.fulfilled, (state: CardState, action) => {
                state.isLoading = false;
                state.currentCard = action.payload;
            })
            .addCase(fetchCardById.rejected, (state: CardState, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // Update Card
        builder
            .addCase(updateCard.pending, (state: CardState) => {
                state.isUpdating = true;
                state.error = null;
                state.success = null;
            })
            .addCase(updateCard.fulfilled, (state: CardState, action) => {
                state.isUpdating = false;
                const index = state.cards.findIndex((c) => c.id === action.payload.id);
                if (index !== -1) {
                    state.cards[index] = action.payload;
                }
                if (state.currentCard?.id === action.payload.id) {
                    state.currentCard = action.payload;
                }
                state.success = 'Карточка успешно обновлена';
            })
            .addCase(updateCard.rejected, (state: CardState, action) => {
                state.isUpdating = false;
                state.error = action.payload as string;
            });

        // Delete Card
        builder
            .addCase(deleteCard.pending, (state: CardState) => {
                state.isDeleting = true;
                state.error = null;
                state.success = null;
            })
            .addCase(deleteCard.fulfilled, (state: CardState, action) => {
                state.isDeleting = false;
                state.cards = state.cards.filter((c) => c.id !== action.payload);
                if (state.currentCard?.id === action.payload) {
                    state.currentCard = null;
                }
                state.success = 'Карточка успешно удалена';
            })
            .addCase(deleteCard.rejected, (state: CardState, action) => {
                state.isDeleting = false;
                state.error = action.payload as string;
            });
    },
});

export const {clearError, clearSuccess, resetCurrentCard} = cardSlice.actions;
export default cardSlice.reducer;
