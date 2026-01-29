// src/store/slices/authSlice.ts
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import i18n from '@/i18n/i18n.ts';
import {decodeToken, isTokenExpired} from "@/utils/tokenUtils.ts";

// Интерфейсы
export interface User {
    id: string;
    name: string;
    email: string;
}

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
    user: User;
}

interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    errors: Record<string, string>
}

// Начальное состояние
const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
    errors: {},
};

// API базовый URL
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:9501';

// Async thunks
export const registerUser = createAsyncThunk<
    AuthResponse,
    RegisterCredentials,
    {
        rejectValue: {
            errors: Record<string, string>
        }
    }
>(
    'auth/register',
    async (credentials: RegisterCredentials, {rejectWithValue}) => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Accept-Language': i18n.language,
                },
                body: JSON.stringify({
                    name: credentials.name || '',
                    email: credentials.email,
                    password: credentials.password,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                return rejectWithValue(data);
            }

            localStorage.setItem('token', data.data.token);
            localStorage.setItem('refreshToken', data.data.refresh_token);

            return data.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Unknown error'
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
    async (credentials: LoginCredentials, {rejectWithValue}) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Accept-Language': i18n.language,
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                return rejectWithValue(data.message || 'Login error');
            }

            localStorage.setItem('token', data.data.token);
            localStorage.setItem('refreshToken', data.data.refresh_token);

            return data.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Unknown error'
            );
        }
    }
);

export const refreshAccessToken = createAsyncThunk<
    AuthResponse,
    void,
    { state: { auth: AuthState }; rejectValue: string }
>(
    'auth/refreshToken',
    async (_, {getState, rejectWithValue}) => {
        try {
            const state = getState();
            const token = state.auth.token;
            const refreshToken = state.auth.refreshToken;

            if (!token || !refreshToken) {
                return rejectWithValue('No tokens available');
            }

            const response = await fetch(`${API_URL}/auth/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Accept-Language': i18n.language,
                    'Authorization': `Bearer ${token}`,
                    'X-Refresh-Token': refreshToken,
                },
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                return rejectWithValue(data.message || 'Token refresh error');
            }

            localStorage.setItem('token', data.data.token);
            localStorage.setItem('refreshToken', data.data.refresh_token);

            return data.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Unknown error'
            );
        }
    }
);

export const logoutUser = createAsyncThunk<
    void,
    void,
    { state: { auth: AuthState }; rejectValue: string }
>(
    'auth/logout',
    async (_, {getState, rejectWithValue}) => {
        try {
            const state = getState();
            const token = state.auth.token;

            if (token) {
                await fetch(`${API_URL}/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Accept-Language': i18n.language,
                        'Authorization': `Bearer ${token}`,
                    },
                });
            }
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Unknown error'
            );
        }
    }
);

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setErrors: (state: AuthState, action: PayloadAction<Record<string, string>>) => {
            console.log("log--",
                "\ndata--action.payload", action.payload,
            );
            state.errors = action.payload;
        },
        setTokens: (state, action: PayloadAction<{ token: string; refreshToken: string }>) => {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
        },
        initializeAuth: (state: AuthState) => {
            const token = state.token;
            if (!token) {
                return;
            }
            const decodedToken = decodeToken(token);
            if (!decodedToken) {
                return;
            }
            state.user = {
                id: decodedToken.id,
                name: decodedToken.name,
                email: decodedToken.email,
            }
        },
    },
    extraReducers: (builder) => {
        // Register
        builder
            .addCase(registerUser.pending, (state: AuthState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state: AuthState, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refresh_token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state: AuthState, action) => {
                state.loading = false;
                state.error = 'Registration error';
                state.isAuthenticated = false;
                state.errors = action.payload?.errors || {}
            });

        // Login
        builder
            .addCase(loginUser.pending, (state: AuthState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state: AuthState, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refresh_token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state: AuthState, action) => {
                state.loading = false;
                state.error = action.payload || 'Login error';
                state.isAuthenticated = false;
            });

        // Refresh token
        builder
            .addCase(refreshAccessToken.pending, (state: AuthState) => {
                state.loading = true;
            })
            .addCase(refreshAccessToken.fulfilled, (state: AuthState, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refresh_token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(refreshAccessToken.rejected, (state: AuthState, action) => {
                state.loading = false;
                state.error = action.payload || 'Token refresh error';
                state.user = null;
                state.token = null;
                state.refreshToken = null;
                state.isAuthenticated = false;
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
            });

        // Logout
        builder
            .addCase(logoutUser.pending, (state: AuthState) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state: AuthState) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.refreshToken = null;
                state.isAuthenticated = false;
                state.error = null;
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
            })
            .addCase(logoutUser.rejected, (state: AuthState) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.refreshToken = null;
                state.isAuthenticated = false;
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
            });
    },
});

// Экспорт действий
export const {clearError, setTokens, initializeAuth, setErrors} = authSlice.actions;

// Селекторы
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;

// Экспорт редьюсера
export default authSlice.reducer;
