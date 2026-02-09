import ApiClient from "@/api/api";
import {config} from "@api/api_config.ts";
import {AccessType, Collection} from "@store/card/cardSlice.ts";

export class Api extends ApiClient {
    async my(): Promise<Collection[] | undefined> {
        try {
            const response = await this.get<Collection[]>(`${this.client.defaults.baseURL}/collections/my`);
            if (response) {
                return response;
            }
        } catch (exception) {
            throw exception
        }
    }

    async list(): Promise<Collection[] | undefined> {
        try {
            const response = await this.get<Collection[]>(`${this.client.defaults.baseURL}/collections`);
            if (response) {
                return response;
            }
        } catch (exception) {
            throw exception
        }
    }

    async create(data: { name: string, access_type: AccessType }): Promise<Collection[] | undefined> {
        try {
            const response = await this.post<{
                name: string,
                access_type: AccessType
            }, Collection[]>(`${this.client.defaults.baseURL}/collections`, data);
            if (response) {
                return response;
            }
        } catch (exception) {
            throw exception
        }
    }
}

export const CollectionsApi = new Api(config);

