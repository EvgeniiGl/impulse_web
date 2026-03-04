import ApiClient from "@/api/api";
import {config} from "@api/api_config.ts";
import {AccessType, Card} from "@store/store.ts";

export interface CreateCardResponse {
    data: Card;
    success?: boolean;
}

export interface CreateCardRequest {
    title: string;
    description: string | null;
    access_type: AccessType;
    is_active: boolean;
    collection_ids: string[];
    file: File | null;
    show_title_on_image: boolean;
}

export interface UpdateCardRequest {
    title?: string;
    description?: string | null;
    access_type?: AccessType;
    is_active?: boolean;
    collection_ids: string[];
}

export interface GetCardsResponse {
    success: boolean;
    data: {
        cards: Card[];
        total: number;
        page: number;
        per_page: number;
    };
}

export interface GetCardResponse {
    success: boolean;
    data: {
        card: Card;
    };
}

export class Api extends ApiClient {
    async create(data: { card: CreateCardRequest, file: File }): Promise<CreateCardResponse | undefined> {
        try {
            const formData = new FormData();

            // Добавляем файл
            formData.append("file", data.file, data.file.name);

            // Добавляем все поля из CreateCardRequest
            formData.append("title", data.card.title);
            formData.append("description", data.card.description ?? "");
            formData.append("access_type", data.card.access_type);
            formData.append("is_active", data.card.is_active.toString());
            formData.append("show_title_on_image", data.card.show_title_on_image.toString());
            // Добавляем collection_ids (массив строк)
            data.card.collection_ids.forEach((id, index) => {
                formData.append(`collection_ids[${index}]`, id);
            });

            const response = await this.post<FormData, CreateCardResponse>(
                `${this.client.defaults.baseURL}/cards`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response) {
                return response;
            }
        } catch (exception) {
            throw exception;
        }
    }

    async getCards(page: number = 1, perPage: number = 12): Promise<GetCardsResponse | undefined> {
        try {
            const response = await this.get<GetCardsResponse>(
                `${this.client.defaults.baseURL}/cards?page=${page}&per_page=${perPage}`
            );
            return response;
        } catch (exception) {
            throw exception;
        }
    }

    async getCardsByCollection(collectionId: string, page: number = 1, perPage: number = 12): Promise<GetCardsResponse | undefined> {
        try {
            const response = await this.get<GetCardsResponse>(
                `${this.client.defaults.baseURL}/api/collections/${collectionId}?page=${page}&per_page=${perPage}`
            );
            return response;
        } catch (exception) {
            throw exception;
        }
    }

    async getMyCards(page: number, perPage: number): Promise<GetCardsResponse | null> {
        try {
            const response = await this.get<GetCardsResponse>(
                `${this.client.defaults.baseURL}/api/cards/my?page=${page}&perPage=${perPage}`
            );

            return response;
        } catch (exception) {
            throw exception;
        }
    }

    async getCard(id: string): Promise<GetCardResponse | null> {
        try {
            const response = await this.get<GetCardResponse>(
                `${this.client.defaults.baseURL}/api/card/${id}`
            );

            return response;
        } catch (exception) {
            throw exception;
        }
    }

    async updateCardCollections(cardId: string, collectionIds: string[]): Promise<GetCardResponse | null> {
        try {
            const response = await this.patch<{ collection_ids: string[] }, GetCardResponse>(
                `${this.client.defaults.baseURL}/api/collections/${cardId}/cards`,
                {collection_ids: collectionIds}
            );

            return response;
        } catch (exception) {
            throw exception;
        }
    }
}

export const CardsApi = new Api(config);

