import Axios, {AxiosInstance} from 'axios';
import {IApiConfiguration} from './api_config';
import {AxiosRequestConfig, AxiosError} from 'axios'
import {showToast} from "@components/Toast/Toast.tsx";

export interface IApiClient {
    post<TRequest, TResponse>(
        path: string,
        object: TRequest,
        config?: AxiosRequestConfig
    ): Promise<TResponse>;

    patch<TRequest, TResponse>(
        path: string,
        object: TRequest
    ): Promise<TResponse>;

    put<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;

    get<TResponse>(path: string): Promise<TResponse>;

    delete<TResponse>(path: string): Promise<TResponse>;
}

let toastCallback: ((message: string, type: 'error') => void) | null = null;

export function setToastCallback(callback: (message: string, type: 'error') => void) {
    toastCallback = callback;
}

export function handleServiceError(error: unknown) {
    console.error('api error', error);

    let errorMessage = 'Произошла ошибка при выполнении запроса';

    if (error instanceof AxiosError) {
        if (error.response) {
            errorMessage = error.response.data?.message || `Ошибка ${error.response.status}`;
        } else if (error.request) {
            errorMessage = 'Нет ответа от сервера';
        } else {
            errorMessage = error.message;
        }
    }

    showToast(errorMessage, 'error');

    return error;
}

export default class ApiClient implements IApiClient {
    protected client: AxiosInstance;

    constructor(apiConfiguration: IApiConfiguration) {
        this.client = this.createAxiosClient(apiConfiguration);
    }

    protected createAxiosClient(apiConfiguration: IApiConfiguration): AxiosInstance {
        return Axios.create({
            baseURL: apiConfiguration.url,
            responseType: 'json' as const,
            headers: {
                'Content-Type': 'application/json',
                ...(apiConfiguration.accessToken && {
                    Authorization: `Token ${apiConfiguration.accessToken}`,
                }),
            },
            timeout: 10 * 1000,
        });
    }

    async post<TRequest, TResponse>(
        path: string,
        payload: TRequest,
        config?: AxiosRequestConfig
    ): Promise<TResponse> {
        try {
            const response = await this.client.post<TResponse>(path, payload, config);
            return response.data;
        } catch (error) {
            handleServiceError(error);
            throw error;
        }
        return {} as TResponse;
    }

    async patch<TRequest, TResponse>(
        path: string,
        payload: TRequest
    ): Promise<TResponse> {
        try {
            const response = await this.client.patch<TResponse>(path, payload);
            return response.data;
        } catch (error) {
            handleServiceError(error);
            throw error;
        }
    }

    async put<TRequest, TResponse>(
        path: string,
        payload: TRequest
    ): Promise<TResponse> {
        try {
            const response = await this.client.put<TResponse>(path, payload);
            return response.data;
        } catch (error) {
            handleServiceError(error);
            throw error;
        }
    }

    async get<TResponse>(path: string, config?: AxiosRequestConfig): Promise<TResponse> {
        try {
            const response = await this.client.get<TResponse>(path, config);
            return response.data;
        } catch (error) {
            handleServiceError(error);
            throw error;
        }
    }

    async delete<TResponse>(path: string): Promise<TResponse> {
        try {
            const response = await this.client.delete<TResponse>(path);
            return response.data;
        } catch (error) {
            handleServiceError(error);
            throw error;
        }
    }
}
