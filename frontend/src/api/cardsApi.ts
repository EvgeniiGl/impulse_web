import ApiClient from "@/api/api";
import {config} from "@api/api_config.ts";
import {AccessType, Card, Collection} from "@store/card/cardSlice.ts";

export interface CreateCardResponse {
    data: Card;
    success?: boolean;
}

export interface CreateCardRequest {
    title: string;
    description: string | null;
    creator_id: string;
    access_type: AccessType;
    is_active: boolean;
    collection_ids: string[];
    file: File | null;
}

export interface UpdateCardRequest {
    title?: string;
    description?: string | null;
    access_type?: AccessType;
    is_active?: boolean;
    collection_ids: string[];
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
            formData.append("creator_id", data.card.creator_id);
            formData.append("access_type", data.card.access_type);
            formData.append("is_active", data.card.is_active.toString());
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
            throw exception
        }
    }
}

export const CardsApi = new Api(config);

