import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
    NotificationsApi,
    NotificationSchedule,
    CreateScheduleRequest,
    UpdateScheduleRequest, ValidateSubscriptionResponse
} from "@api/notificationsApi.ts";

export interface NotificationState {
    schedules: NotificationSchedule[];
    currentSchedule: NotificationSchedule | null;
    isLoading: boolean;
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
    error: string | null;
    success: string | null;
    permission: NotificationPermission;
    isSupported: boolean;
    isValidSubscription: boolean | null;
    filter: {
        showActive: boolean | null; // true - активные, false - неактивные, null - все
    };
}

const initialState: NotificationState = {
    schedules: [],
    currentSchedule: null,
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    error: null,
    success: null,
    permission: 'default',
    isSupported: true,
    isValidSubscription: null,
    filter: {
        showActive: null, // по умолчанию показываем все
    },
};

// Async thunks
export const fetchSchedules = createAsyncThunk(
    'notifications/fetchSchedules',
    async (isActive: boolean | null, {rejectWithValue}) => {
        try {
            // Передаем параметр фильтрации в API
            const response = await NotificationsApi.getSchedules(isActive);
            if (!response || !response.success) {
                return rejectWithValue('Failed to fetch schedules');
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

export const createSchedule = createAsyncThunk(
    'notifications/createSchedule',
    async (data: CreateScheduleRequest, {rejectWithValue}) => {
        try {
            const response = await NotificationsApi.createSchedule(data);
            if (!response || !response.success) {
                return rejectWithValue('Failed to create schedule');
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

export const updateSchedule = createAsyncThunk(
    'notifications/updateSchedule',
    async ({id, data}: { id: string; data: UpdateScheduleRequest }, {rejectWithValue}) => {
        try {
            const response = await NotificationsApi.updateSchedule(id, data);
            if (!response || !response.success) {
                return rejectWithValue('Failed to update schedule');
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

export const deleteSchedule = createAsyncThunk(
    'notifications/deleteSchedule',
    async (id: string, {rejectWithValue}) => {
        try {
            const success = await NotificationsApi.deleteSchedule(id);
            if (!success) {
                return rejectWithValue('Failed to delete schedule');
            }
            return id;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

export const checkSubscriptionValidity = createAsyncThunk(
    'notifications/checkValidity',
    async (_, {rejectWithValue}) => {
        try {
            const response = await NotificationsApi.validateSubscription();
            if (!response) {
                return rejectWithValue('Failed to delete schedule');
            }
            return response;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        clearError: (state: NotificationState) => {
            state.error = null;
        },
        clearSuccess: (state: NotificationState) => {
            state.success = null;
        },
        setPermission: (state: NotificationState, action: PayloadAction<NotificationPermission>) => {
            state.permission = action.payload;
        },
        setSupported: (state: NotificationState, action: PayloadAction<boolean>) => {
            state.isSupported = action.payload;
        },
        setValidSubscription: (state: NotificationState, action: PayloadAction<boolean | null>) => {
            state.isValidSubscription = action.payload;
        },
        setFilterActive: (state: NotificationState, action: PayloadAction<boolean | null>) => {
            state.filter.showActive = action.payload;
        },
        resetState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Fetch Schedules
            .addCase(fetchSchedules.pending, (state: NotificationState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSchedules.fulfilled, (state: NotificationState, action: PayloadAction<NotificationSchedule[]>) => {
                state.isLoading = false;
                state.schedules = action.payload;
            })
            .addCase(fetchSchedules.rejected, (state: NotificationState, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Create Schedule
            .addCase(createSchedule.pending, (state: NotificationState) => {
                state.isCreating = true;
                state.error = null;
                state.success = null;
            })
            .addCase(createSchedule.fulfilled, (state: NotificationState, action: PayloadAction<NotificationSchedule>) => {
                state.isCreating = false;
                state.schedules.push(action.payload);
                state.success = 'Schedule created successfully';
            })
            .addCase(createSchedule.rejected, (state: NotificationState, action) => {
                state.isCreating = false;
                state.error = action.payload as string;
            })

            // Update Schedule
            .addCase(updateSchedule.pending, (state: NotificationState) => {
                state.isUpdating = true;
                state.error = null;
                state.success = null;
            })
            .addCase(updateSchedule.fulfilled, (state: NotificationState, action: PayloadAction<NotificationSchedule>) => {
                state.isUpdating = false;
                const index = state.schedules.findIndex(s => s.id === action.payload.id);
                if (index !== -1) {
                    state.schedules[index] = action.payload;
                }
                if (state.currentSchedule?.id === action.payload.id) {
                    state.currentSchedule = action.payload;
                }
                state.success = 'Schedule updated successfully';
            })
            .addCase(updateSchedule.rejected, (state: NotificationState, action) => {
                state.isUpdating = false;
                state.error = action.payload as string;
            })

            // Delete Schedule
            .addCase(deleteSchedule.pending, (state: NotificationState) => {
                state.isDeleting = true;
                state.error = null;
                state.success = null;
            })
            .addCase(deleteSchedule.fulfilled, (state: NotificationState, action: PayloadAction<string>) => {
                state.isDeleting = false;
                state.schedules = state.schedules.filter(s => s.id !== action.payload);
                if (state.currentSchedule?.id === action.payload) {
                    state.currentSchedule = null;
                }
                state.success = 'Schedule deleted successfully';
            })
            .addCase(deleteSchedule.rejected, (state: NotificationState, action) => {
                state.isDeleting = false;
                state.error = action.payload as string;
            })

            // Check Subscription Validity
            .addCase(checkSubscriptionValidity.pending, (state: NotificationState) => {
                state.isLoading = true;
            })
            .addCase(checkSubscriptionValidity.fulfilled, (state: NotificationState, action: PayloadAction<ValidateSubscriptionResponse>) => {
                state.isLoading = false;
                state.isValidSubscription = action.payload.data.isValid;
            })
            .addCase(checkSubscriptionValidity.rejected, (state: NotificationState) => {
                state.isLoading = false;
                state.isValidSubscription = null;
            });
    },
});

// Selectors
export const selectFilteredSchedules = (state: { notifications: NotificationState }) => {
    const {schedules, filter} = state.notifications;

    if (filter.showActive === null) {
        return schedules;
    }

    return schedules.filter(schedule => schedule.is_active === filter.showActive);
};

export const selectActiveSchedules = (state: { notifications: NotificationState }) => {
    return state.notifications.schedules.filter(s => s.is_active);
};

export const selectInactiveSchedules = (state: { notifications: NotificationState }) => {
    return state.notifications.schedules.filter(s => !s.is_active);
};

export const {
    clearError,
    clearSuccess,
    setPermission,
    setSupported,
    setValidSubscription,
    setFilterActive,
    resetState,
} = notificationSlice.actions;

export default notificationSlice.reducer;