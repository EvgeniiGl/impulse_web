import ApiClient from "@/api/api";
import {config} from "@api/api_config.ts";

export type NotificationFrequency =
    | 'once'
    | 'minutely'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly';

export interface NotificationSchedule {
    id: string;
    card_id: string;
    user_id: string;
    frequency: NotificationFrequency;
    scheduled_at: string;
    last_sent_at: string | null;
    next_send_at: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    repeat_count: number | null;
    sent_count: number;
    end_date: string | null;
    title: string | null;
    url: string | null;
}

export interface CreateScheduleRequest {
    card_id: string;
    frequency: NotificationFrequency;
    scheduled_at: string;
    repeat_count?: number | null;
    end_date?: string | null;
}

export interface UpdateScheduleRequest {
    id: string;
    card_id: string;
    frequency: NotificationFrequency;
    scheduled_at: string;
    repeat_count?: number | null;
    end_date?: string | null;
    is_active: boolean
}

export interface GetSchedulesResponse {
    success: boolean;
    data: NotificationSchedule[];
}

export interface CreateScheduleResponse {
    success: boolean;
    data: NotificationSchedule;
}

export interface ValidateSubscriptionResponse {
    success: boolean;
    data: {
        isValid: boolean;
        hasSubscription: boolean;
    };
}

export class Api extends ApiClient {
    async getVapidKey(): Promise<{ publicKey: string } | null> {
        try {
            const response = await this.get<{ success: boolean; data: { publicKey: string } }>(
                `${this.client.defaults.baseURL}/api/notifications/vapid-key`
            );
            return response?.data || null;
        } catch (error) {
            throw error;
        }
    }

    async subscribe(subscription: any): Promise<boolean> {
        try {
            const response = await this.post<any, { success: boolean }>(
                `${this.client.defaults.baseURL}/api/notifications/subscribe`,
                {subscription}
            );
            return response?.success || false;
        } catch (error) {
            throw error;
        }
    }

    async createSchedule(data: CreateScheduleRequest): Promise<CreateScheduleResponse | null> {
        try {
            const response = await this.post<CreateScheduleRequest, CreateScheduleResponse>(
                `${this.client.defaults.baseURL}/api/notifications/schedules`,
                data
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getSchedules(isActive: boolean | null): Promise<GetSchedulesResponse> {
        try {
            // Добавляем query параметр для фильтрации
            let url = `${this.client.defaults.baseURL}/api/notifications/schedules`;
            if (isActive !== null) {
                url += `?is_active=${isActive}`;
            }
            const response = await this.get<GetSchedulesResponse>(url);

            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateSchedule(id: string, data: UpdateScheduleRequest): Promise<CreateScheduleResponse | null> {
        try {
            const response = await this.put<UpdateScheduleRequest, CreateScheduleResponse>(
                `${this.client.defaults.baseURL}/api/notifications/schedules/${id}`,
                data
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteSchedule(id: string): Promise<boolean> {
        try {
            const response = await this.delete<{ success: boolean }>(
                `${this.client.defaults.baseURL}/api/notifications/schedules/${id}`
            );
            return response?.success || false;
        } catch (error) {
            throw error;
        }
    }

    async validateSubscription(): Promise<ValidateSubscriptionResponse> {
        try {
            const response = await this.post<null, ValidateSubscriptionResponse>(
                `${this.client.defaults.baseURL}/api/notifications/validate-subscription`,
                null
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export const NotificationsApi = new Api(config);