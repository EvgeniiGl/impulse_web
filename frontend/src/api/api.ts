import Axios, {AxiosInstance, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig} from 'axios';
import {IApiConfiguration} from './api_config';
import {showToast} from "@components/Toast/Toast.tsx";
import {store} from '@/store/store.ts'; // Импорт вашего Redux store
import {refreshAccessToken} from '@store/auth/authSlice.ts';

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

export function handleServiceError(error: unknown) {
    console.error('api error', error);
    let errorMessage = 'Произошла ошибка при выполнении запроса';

    if (error instanceof AxiosError) {
        if (error.response) {
            console.log("log--",
                "\nerror.response--", error.response,
            );
            errorMessage = error.response.data?.error || error.response.data?.message || `Ошибка ${error.response.status}`;
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
    private isRefreshing = false;
    private failedQueue: Array<{
        resolve: (value?: any) => void;
        reject: (reason?: any) => void;
    }> = [];

    constructor(apiConfiguration: IApiConfiguration) {
        this.client = this.createAxiosClient(apiConfiguration);
        this.setupInterceptors();
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

    private setupInterceptors() {
        // Request interceptor для добавления токена
        this.client.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const state = store.getState();
                const token = state.auth.token;

                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor для обработки 401
        this.client.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
                console.log("log--",
                    "\nerror.response--", error.response,
                );
                // Проверяем, что это 401 ошибка и запрос еще не повторялся
                if (error.response?.status === 401 && !originalRequest._retry) {
                    if (this.isRefreshing) {
                        // Если токен уже обновляется, добавляем запрос в очередь
                        return new Promise((resolve, reject) => {
                            this.failedQueue.push({resolve, reject});
                        })
                            .then(() => {
                                return this.client(originalRequest);
                            })
                            .catch((err) => {
                                return Promise.reject(err);
                            });
                    }

                    originalRequest._retry = true;
                    this.isRefreshing = true;

                    try {
                        // Обновляем токен через Redux thunk
                        const result = await store.dispatch(refreshAccessToken());

                        if (refreshAccessToken.fulfilled.match(result)) {
                            const newToken = result.payload.token;

                            // Обновляем токен в заголовке оригинального запроса
                            if (originalRequest.headers) {
                                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                            }

                            // Обрабатываем очередь неудачных запросов
                            this.processQueue(null);

                            // Повторяем оригинальный запрос
                            return this.client(originalRequest);
                        } else {
                            // Если обновление токена не удалось
                            this.processQueue(new Error('Token refresh failed'));
                            handleServiceError(error);
                            return Promise.reject(error);
                        }
                    } catch (refreshError) {
                        this.processQueue(refreshError);
                        handleServiceError(error);
                        return Promise.reject(refreshError);
                    } finally {
                        this.isRefreshing = false;
                    }
                }

                // Для всех остальных ошибок
                handleServiceError(error);
                return Promise.reject(error);
            }
        );
    }

    private processQueue(error: any) {
        this.failedQueue.forEach((promise) => {
            if (error) {
                promise.reject(error);
            } else {
                promise.resolve();
            }
        });

        this.failedQueue = [];
    }

    async post<TRequest, TResponse>(
        path: string,
        payload: TRequest,
        config?: AxiosRequestConfig
    ): Promise<TResponse> {
        const finalConfig = payload instanceof FormData
            ? {
                ...config,
                headers: {
                    ...config?.headers,
                    'Content-Type': undefined,
                },
            }
            : config;

        const response = await this.client.post<TResponse>(path, payload, finalConfig);
        return response.data;
    }

    async put<TRequest, TResponse>(
        path: string,
        payload: TRequest,
        config?: AxiosRequestConfig
    ): Promise<TResponse> {
        const finalConfig = payload instanceof FormData
            ? {
                ...config,
                headers: {
                    ...config?.headers,
                    'Content-Type': undefined,
                },
            }
            : config;

        const response = await this.client.put<TResponse>(path, payload, finalConfig);
        return response.data;
    }

    async patch<TRequest, TResponse>(
        path: string,
        payload: TRequest,
        config?: AxiosRequestConfig
    ): Promise<TResponse> {
        const finalConfig = payload instanceof FormData
            ? {
                ...config,
                headers: {
                    ...config?.headers,
                    'Content-Type': undefined,
                },
            }
            : config;

        const response = await this.client.patch<TResponse>(path, payload, finalConfig);
        return response.data;
    }

    async get<TResponse>(path: string): Promise<TResponse> {
        const response = await this.client.get<TResponse>(path);
        return response.data;
    }

    async delete<TResponse>(path: string): Promise<TResponse> {
        const response = await this.client.delete<TResponse>(path);
        return response.data;
    }
}
