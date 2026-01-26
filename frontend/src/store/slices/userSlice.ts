// src/store/slices/userSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Определяем интерфейс для пользователя
export interface User {
    id: string | number;
    name: string;
    email: string;
    avatar?: string;
    role?: string;
}

// Определяем интерфейс для состояния
interface UserState {
    currentUser: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

// Начальное состояние
const initialState: UserState = {
    currentUser: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Установка пользователя
        setUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },

        // Обновление данных пользователя
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.currentUser) {
                state.currentUser = {...state.currentUser, ...action.payload};
            }
        },

        // Выход пользователя
        logout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.error = null;
        },

        // Установка загрузки
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        // Установка ошибки
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.loading = false;
        },

        // Очистка ошибки
        clearError: (state) => {
            state.error = null;
        },
    },
});

// Экспорт действий
export const {
    setUser,
    updateUser,
    logout,
    setLoading,
    setError,
    clearError,
} = userSlice.actions;

// Селекторы
export const selectCurrentUser = (state: { user: UserState }) => state.user.currentUser;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
export const selectUserLoading = (state: { user: UserState }) => state.user.loading;
export const selectUserError = (state: { user: UserState }) => state.user.error;

// Экспорт редьюсера
export default userSlice.reducer;
