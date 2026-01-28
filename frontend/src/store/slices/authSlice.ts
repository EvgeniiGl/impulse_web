// src/store/slices/authSlice.ts
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {setUser, logout as logoutUser} from './userSlice';
import i18n from '@/i18n/i18n.ts';

// Интерфейсы
export interface RegisterCredentials {
    email: string;
    password: string;
    name?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    refresh_token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

interface AuthState {
    token: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
    registrationSuccess: boolean;
}

// Начальное состояние
const initialState: AuthState = {
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    loading: false,
    error: null,
    registrationSuccess: false,
};

// API базовый URL
const API_URL = import.meta.env.API_URL || 'http://localhost:9501';

// Async thunks
// AsyncThunk с правильной типизацией
export const registerUser = createAsyncThunk<
    AuthResponse, // Тип возвращаемого значения
    RegisterCredentials, // Тип аргумента
    { rejectValue: string } // Тип ошибки
>(
    'auth/register',
    async (credentials: RegisterCredentials, {rejectWithValue, dispatch}) => {
        try {

            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Accept-Language': i18n.language,
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message || 'Ошибка регистрации');
            }

            if (!data.success) {
                return rejectWithValue(data.message || 'Ошибка регистрации');
            }

            // Сохраняем токены
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('refreshToken', data.data.refresh_token);

            // Обновляем данные пользователя
            dispatch(setUser({
                id: data.data.user.id,
                name: data.data.user.name || credentials.name || '',
                email: data.data.user.email,
            }));

            return data.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Неизвестная ошибка'
            );
        }
    }
);

export const loginUser = createAsyncThunk<
    AuthResponse,
    LoginCredentials,
    { rejectValue: string }
>(
    'auth/login',
    async (credentials: RegisterCredentials, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Accept-Language': 'ru',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message || 'Ошибка входа');
            }

            if (!data.success) {
                return rejectWithValue(data.message || 'Ошибка входа');
            }

            // Сохраняем токены
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('refreshToken', data.data.refresh_token);

            // Обновляем данные пользователя
            dispatch(setUser({
                id: data.data.user.id,
                name: data.data.user.name,
                email: data.data.user.email,
            }));

            return data.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Неизвестная ошибка'
            );
        }
    }
);

export const refreshAccessToken = createAsyncThunk<
    { token: string },
    void,
    { rejectValue: string }
>(
    'auth/refresh',
    async (_, {rejectWithValue, getState}) => {
        try {
            const state = getState() as { auth: AuthState };
            const refreshToken = state.auth.refreshToken;

            if (!refreshToken) {
                return rejectWithValue('Нет refresh токена');
            }

            const response = await fetch(`${API_URL}/auth/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({refresh_token: refreshToken}),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message || 'Ошибка обновления токена');
            }

            localStorage.setItem('token', data.data.token);

            return {token: data.data.token};
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Неизвестная ошибка'
            );
        }
    }
);

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.refreshToken = null;
            state.error = null;
            state.registrationSuccess = false;
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        },
        clearError: (state) => {
            state.error = null;
        },
        clearRegistrationSuccess: (state) => {
            state.registrationSuccess = false;
        },
        setTokens: (state, action: PayloadAction<{ token: string; refreshToken: string }>) => {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
        },
    },
    extraReducers: (builder) => {
        // Register
        builder
            .addCase(registerUser.pending, (state: AuthState) => {
                state.loading = true;
                state.error = null;
                state.registrationSuccess = false;
            })
            .addCase(registerUser.fulfilled, (state: AuthState, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refresh_token;
                state.error = null;
                state.registrationSuccess = true;
            })
            .addCase(registerUser.rejected, (state: AuthState, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка регистрации';
                state.registrationSuccess = false;
            });

        // Login
        builder
            .addCase(loginUser.pending, (state: AuthState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state: AuthState, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refresh_token;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state: AuthState, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка входа';
            });

        // Refresh token
        builder
            .addCase(refreshAccessToken.pending, (state: AuthState) => {
                state.loading = true;
            })
            .addCase(refreshAccessToken.fulfilled, (state: AuthState, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(refreshAccessToken.rejected, (state: AuthState, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка обновления токена';
                state.token = null;
                state.refreshToken = null;
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
            });
    },
});

// Экспорт действий
export const {logout, clearError, clearRegistrationSuccess, setTokens} = authSlice.actions;

// Селекторы
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectRegistrationSuccess = (state: { auth: AuthState }) => state.auth.registrationSuccess;
export const selectIsAuthenticated = (state: { auth: AuthState }) => !!state.auth.token;

// Экспорт редьюсера
export default authSlice.reducer;
