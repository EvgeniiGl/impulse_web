import ApiClient from "@/api/api";
import {config} from "@api/api_config.ts";
import {Card} from "@store/store.ts";

export interface SearchCardsResponse {
    success: boolean;
    data: {
        cards: Card[];
        total: number;
        page: number;
        per_page: number;
    };
}

class SearchApiClient extends ApiClient {
    async getPublicCards(page: number = 1, perPage: number = 12): Promise<SearchCardsResponse | null> {
        try {
            return await this.get<SearchCardsResponse>(
                `${this.client.defaults.baseURL}/api/home/cards?page=${page}&per_page=${perPage}`
            );
        } catch (exception) {
            throw exception;
        }
    }

    async searchCards(query: string, page: number = 1, perPage: number = 12): Promise<SearchCardsResponse | null> {
        try {
            const encodedQuery = encodeURIComponent(query);
            return await this.get<SearchCardsResponse>(
                `${this.client.defaults.baseURL}/api/home/search?q=${encodedQuery}&page=${page}&per_page=${perPage}`
            );
        } catch (exception) {
            throw exception;
        }
    }
}

export const SearchApi = new SearchApiClient(config);