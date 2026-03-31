import ApiClient from "@/api/api";
import {config} from "@api/api_config.ts";

// Типы причин жалоб
export type ReportReason =
    | 'sexual_content'
    | 'violent_content'
    | 'hateful_content'
    | 'harassment'
    | 'harmful_actions'
    | 'self_harm'
    | 'misinformation'
    | 'child_abuse'
    | 'terrorism'
    | 'spam';

export interface ReportRequest {
    reason: ReportReason;
}

export interface ReportResponse {
    success: boolean;
    data: {
        id: string;
        card_id: string;
        reason: ReportReason;
        created_at: string;
    };
    message?: string;
}

export interface HideCardResponse {
    success: boolean;
    message?: string;
}

export class Api extends ApiClient {
    /**
     * Отправить жалобу на карточку
     */
    async reportCard(cardId: string, reason: ReportReason): Promise<ReportResponse | null> {
        try {
            const response = await this.post<ReportRequest, ReportResponse>(
                `${this.client.defaults.baseURL}/api/cards/${cardId}/report`,
                {reason}
            );
            return response;
        } catch (exception) {
            throw exception;
        }
    }

    /**
     * Скрыть карточку (не показывать пользователю)
     */
    async hideCard(cardId: string): Promise<HideCardResponse | null> {
        try {
            const response = await this.post<object, HideCardResponse>(
                `${this.client.defaults.baseURL}/api/cards/${cardId}/hide`,
                {}
            );
            return response;
        } catch (exception) {
            throw exception;
        }
    }
}

export const ReportApi = new Api(config);