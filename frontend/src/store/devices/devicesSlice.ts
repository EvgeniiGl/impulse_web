/**
 * Redux slice для управления мобильными устройствами
 */

import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {DevicesApi} from '@api/devicesApi';
import type {MobileDeviceToken, RegisterDeviceRequest} from '@api/types/deviceTypes';

export interface DevicesState {
    devices: MobileDeviceToken[];
    isLoading: boolean;
    isRegistering: boolean;
    error: string | null;
    success: string | null;
}

const initialState: DevicesState = {
    devices: [],
    isLoading: false,
    isRegistering: false,
    error: null,
    success: null,
};

// ==================== ASYNC THUNKS ====================

export const fetchDevices = createAsyncThunk(
    'devices/fetchDevices',
    async (_, {rejectWithValue}) => {
        try {
            const response = await DevicesApi.getDevices();
            if (!response || !response.success) {
                return rejectWithValue('Не удалось загрузить список устройств');
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Ошибка загрузки устройств'
            );
        }
    }
);

export const registerDevice = createAsyncThunk(
    'devices/registerDevice',
    async (data: RegisterDeviceRequest, {rejectWithValue}) => {
        try {
            const response = await DevicesApi.registerDevice(data);
            if (!response || !response.success) {
                return rejectWithValue('Не удалось зарегистрировать устройство');
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Ошибка регистрации устройства'
            );
        }
    }
);

export const removeDevice = createAsyncThunk(
    'devices/removeDevice',
    async (id: string, {rejectWithValue}) => {
        try {
            const success = await DevicesApi.removeDevice(id);
            if (!success) {
                return rejectWithValue('Не удалось удалить устройство');
            }
            return id;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Ошибка удаления устройства'
            );
        }
    }
);

export const toggleDevice = createAsyncThunk(
    'devices/toggleDevice',
    async (id: string, {rejectWithValue}) => {
        try {
            const response = await DevicesApi.toggleDevice(id);
            if (!response || !response.success || !response.data) {
                return rejectWithValue('Не удалось изменить статус устройства');
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Ошибка изменения статуса'
            );
        }
    }
);

export const sendTestPush = createAsyncThunk(
    'devices/sendTestPush',
    async (id: string, {rejectWithValue}) => {
        try {
            const response = await DevicesApi.sendTestPush(id);
            if (!response || !response.success) {
                return rejectWithValue('Не удалось отправить тестовое уведомление');
            }
            return id;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Ошибка отправки'
            );
        }
    }
);

// ==================== SLICE ====================

const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = null;
        },
        resetDevicesState: () => initialState,
    },
    extraReducers: (builder) => {
        // Fetch Devices
        builder
            .addCase(fetchDevices.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDevices.fulfilled, (state, action: PayloadAction<MobileDeviceToken[]>) => {
                state.isLoading = false;
                state.devices = action.payload;
            })
            .addCase(fetchDevices.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // Register Device
        builder
            .addCase(registerDevice.pending, (state) => {
                state.isRegistering = true;
                state.error = null;
                state.success = null;
            })
            .addCase(registerDevice.fulfilled, (state, action: PayloadAction<MobileDeviceToken>) => {
                state.isRegistering = false;
                // Обновляем или добавляем
                const idx = state.devices.findIndex((d) => d.id === action.payload.id);
                if (idx !== -1) {
                    state.devices[idx] = action.payload;
                } else {
                    state.devices.unshift(action.payload);
                }
                state.success = 'Устройство зарегистрировано';
            })
            .addCase(registerDevice.rejected, (state, action) => {
                state.isRegistering = false;
                state.error = action.payload as string;
            });

        // Remove Device
        builder
            .addCase(removeDevice.pending, (state) => {
                state.error = null;
                state.success = null;
            })
            .addCase(removeDevice.fulfilled, (state, action: PayloadAction<string>) => {
                state.devices = state.devices.filter((d) => d.id !== action.payload);
                state.success = 'Устройство удалено';
            })
            .addCase(removeDevice.rejected, (state, action) => {
                state.error = action.payload as string;
            });

        // Toggle Device
        builder
            .addCase(toggleDevice.fulfilled, (state, action: PayloadAction<MobileDeviceToken>) => {
                const idx = state.devices.findIndex((d) => d.id === action.payload.id);
                if (idx !== -1) {
                    state.devices[idx] = action.payload;
                }
                state.success = action.payload.is_active
                    ? 'Устройство активировано'
                    : 'Устройство деактивировано';
            })
            .addCase(toggleDevice.rejected, (state, action) => {
                state.error = action.payload as string;
            });

        // Test Push
        builder
            .addCase(sendTestPush.fulfilled, (state) => {
                state.success = 'Тестовое уведомление отправлено';
            })
            .addCase(sendTestPush.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

// Selectors
export const selectDevices = (state: { devices: DevicesState }) => state.devices.devices;
export const selectActiveDevices = (state: { devices: DevicesState }) =>
    state.devices.devices.filter((d) => d.is_active);
export const selectDevicesLoading = (state: { devices: DevicesState }) => state.devices.isLoading;
export const selectDevicesError = (state: { devices: DevicesState }) => state.devices.error;
export const selectDevicesSuccess = (state: { devices: DevicesState }) => state.devices.success;

export const {clearError, clearSuccess, resetDevicesState} = devicesSlice.actions;

export default devicesSlice.reducer;
