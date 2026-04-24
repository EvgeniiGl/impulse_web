import ApiClient from "@/api/api";
import {config} from "@api/api_config.ts";

export interface TodayCardInfo {
    id: string;
    title: string;
    description: string | null;
    url: string;
}

export interface TodayNotificationItem {
    schedule_id: string;
    card_id: string;
    frequency: string;
    is_sent: boolean;
    notification_time: string;
    is_active: boolean;
    sent_count: number;
    repeat_count: number | null;
    end_date: string | null;
    card: TodayCardInfo | null;
}

export interface TodayStats {
    total: number;
    sent: number;
    pending: number;
}

export interface GetTodayResponse {
    success: boolean;
    data: {
        notifications: TodayNotificationItem[];
        stats: TodayStats;
    };
}

class TodayApiClient extends ApiClient {
    async getTodayNotifications(timezone?: string): Promise<GetTodayResponse> {
        try {
            const tz = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
            const url = `${this.client.defaults.baseURL}/api/today/notifications?timezone=${encodeURIComponent(tz)}`;
            const response = await this.get<GetTodayResponse>(url);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export const TodayApi = new TodayApiClient(config);
