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
}

export interface CreateScheduleRequest {
    card_id: string;
    frequency: NotificationFrequency;
    scheduled_at: string;
    repeat_count?: number | null;
    end_date?: string | null;
}

export interface UpdateScheduleRequest {
    is_active?: boolean;
    frequency?: NotificationFrequency;
    scheduled_at?: string;
}

export interface GetSchedulesResponse {
    success: boolean;
    data: NotificationSchedule[];
}

export interface CreateScheduleResponse {
    success: boolean;
    data: NotificationSchedule;
}

export class Api extends ApiClient {
    async getVapidKey(): Promise<{ publicKey: string } | null> {
        try {
            const response = await this.get<{ success: boolean; data: { publicKey: string } }>(
                `${this.client.defaults.baseURL}/api/notifications/vapid-key`
            );
            return response?.data || null;
        } catch (error) {
            console.error('Failed to get VAPID key:', error);
            return null;
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
            console.error('Failed to subscribe:', error);
            return false;
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
            console.error('Failed to create schedule:', error);
            throw error;
        }
    }

    async getSchedules(): Promise<GetSchedulesResponse | null> {
        try {
            const response = await this.get<GetSchedulesResponse>(
                `${this.client.defaults.baseURL}/api/notifications/schedules`
            );
            return response;
        } catch (error) {
            console.error('Failed to get schedules:', error);
            return null;
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
            console.error('Failed to update schedule:', error);
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
            console.error('Failed to delete schedule:', error);
            return false;
        }
    }
}

export const NotificationsApi = new Api(config);