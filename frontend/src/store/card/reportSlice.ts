import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {ReportApi, ReportReason, ReportResponse} from '@/api/reportApi';
import {fetchLikedCards, myCollections} from "@store/card/myCardSlice.ts";

export type {ReportReason} from '@/api/reportApi';

interface ReportPayload {
    cardId: string;
    reason: ReportReason;
}

interface ReportState {
    loading: boolean;
    error: string | null;
    success: boolean;
    lastReportedCardId: string | null;
    hiddenCardIds: string[];
}

const initialState: ReportState = {
    loading: false,
    error: null,
    success: false,
    lastReportedCardId: null,
    hiddenCardIds: [],
};

// Async thunk для отправки жалобы
export const submitReport = createAsyncThunk<
    ReportResponse,
    ReportPayload,
    { rejectValue: string }
>(
    'report/submitReport',
    async ({cardId, reason}, {rejectWithValue, dispatch}) => {
        try {
            const response = await ReportApi.reportCard(cardId, reason);
            if (!response) {
                return rejectWithValue('Failed to submit report');
            }
            dispatch(fetchLikedCards({
                page: 1,
                perPage: 12
            }))
            dispatch(myCollections())
            return response;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Failed to submit report');
        }
    }
);

// Async thunk для скрытия карточки
export const hideCard = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>(
    'report/hideCard',
    async (cardId, {rejectWithValue, dispatch}) => {
        try {
            const response = await ReportApi.hideCard(cardId);
            if (!response) {
                return rejectWithValue('Failed to hide card');
            }
            dispatch(fetchLikedCards({
                page: 1,
                perPage: 12
            }))
            dispatch(myCollections())
            return cardId;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Failed to hide card');
        }
    }
);

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        clearReportState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.lastReportedCardId = null;
        },
        clearReportError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Submit report
            .addCase(submitReport.pending, (state: ReportState) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(submitReport.fulfilled, (state: ReportState, action: PayloadAction<ReportResponse>) => {
                state.loading = false;
                state.success = true;
                state.lastReportedCardId = action.payload.data.card_id;
                state.error = null;
            })
            .addCase(submitReport.rejected, (state: ReportState, action) => {
                state.loading = false;
                state.error = action.payload || 'Unknown error occurred';
                state.success = false;
            })
            // Hide card
            .addCase(hideCard.pending, (state: ReportState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(hideCard.fulfilled, (state: ReportState, action: PayloadAction<string>) => {
                state.loading = false;
                state.hiddenCardIds.push(action.payload);
                state.error = null;
            })
            .addCase(hideCard.rejected, (state: ReportState, action) => {
                state.loading = false;
                state.error = action.payload || 'Unknown error occurred';
            });
    },
});

export const {clearReportState, clearReportError} = reportSlice.actions;
export default reportSlice.reducer;