import ApiClient from "@/api/api";
import {config} from "@api/api_config.ts";

export interface LikeResponse {
    success: boolean;
    liked: boolean;
    likes_count: number;
    message?: string;
}

export interface LikedCardsResponse {
    success: boolean;
    data: {
        cards: Array<{
            id: string;
            title: string;
            description?: string;
            url: string;
            access_type: string;
            creator_id: string;
            liked_at: string;
            likes_count: number;
        }>;
        total: number;
        page: number;
    };
}

export interface LikedCollectionsResponse {
    success: boolean;
    data: {
        collections: Array<{
            id: string;
            name: string;
            access_type: string;
            creator_id: string;
            liked_at: string;
            likes_count: number;
        }>;
        total: number;
        page: number;
    };
}

class LikesApiClass extends ApiClient {
    /**
     * Переключить лайк на карточке
     */
    async toggleCardLike(cardId: string): Promise<LikeResponse | undefined> {
        try {
            const response = await this.post<{}, LikeResponse>(
                `${this.client.defaults.baseURL}/api/cards/${cardId}/like`,
                {}
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Получить статус лайка карточки
     */
    async getCardLikeStatus(cardId: string): Promise<LikeResponse | undefined> {
        try {
            const response = await this.get<LikeResponse>(
                `${this.client.defaults.baseURL}/api/cards/${cardId}/like`
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Переключить лайк на коллекции
     */
    async toggleCollectionLike(collectionId: string): Promise<LikeResponse | undefined> {
        try {
            const response = await this.post<{}, LikeResponse>(
                `${this.client.defaults.baseURL}/api/collections/${collectionId}/like`,
                {}
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Получить статус лайка коллекции
     */
    async getCollectionLikeStatus(collectionId: string): Promise<LikeResponse | undefined> {
        try {
            const response = await this.get<LikeResponse>(
                `${this.client.defaults.baseURL}/api/collections/${collectionId}/like`
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Получить список лайкнутых карточек
     */
    async getLikedCards(page: number = 1, perPage: number = 12): Promise<LikedCardsResponse | undefined> {
        try {
            const response = await this.get<LikedCardsResponse>(
                `${this.client.defaults.baseURL}/api/cards/liked?page=${page}&per_page=${perPage}`
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Получить список лайкнутых коллекций
     */
    async getLikedCollections(page: number = 1, perPage: number = 12): Promise<LikedCollectionsResponse | undefined> {
        try {
            const response = await this.get<LikedCollectionsResponse>(
                `${this.client.defaults.baseURL}/api/collections/liked?page=${page}&per_page=${perPage}`
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export const LikesApi = new LikesApiClass(config);
