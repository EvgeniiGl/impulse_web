/**
 * API для управления мобильными устройствами (FCM / APNs)
 */

import ApiClient from '@/api/api';
import { config } from '@api/api_config';
import type {
    RegisterDeviceRequest,
    DeviceListResponse,
    DeviceActionResponse,
    RegisterDeviceResponse,
} from './types/deviceTypes';

export class DevicesApiClient extends ApiClient {
    /**
     * Регистрация токена устройства
     */
    async registerDevice(data: RegisterDeviceRequest): Promise<RegisterDeviceResponse | null> {
        try {
            const response = await this.post<RegisterDeviceRequest, RegisterDeviceResponse>(
                `${this.client.defaults.baseURL}/api/devices/register`,
                data
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Получение списка устройств текущего пользователя
     */
    async getDevices(): Promise<DeviceListResponse> {
        try {
            const response = await this.get<DeviceListResponse>(
                `${this.client.defaults.baseURL}/api/devices`
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Удаление устройства
     */
    async removeDevice(id: string): Promise<boolean> {
        try {
            const response = await this.delete<{ success: boolean }>(
                `${this.client.defaults.baseURL}/api/devices/${id}`
            );
            return response?.success || false;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Переключение активности устройства
     */
    async toggleDevice(id: string): Promise<DeviceActionResponse | null> {
        try {
            const response = await this.patch<null, DeviceActionResponse>(
                `${this.client.defaults.baseURL}/api/devices/${id}/toggle`,
                null
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Тестовое push-уведомление
     */
    async sendTestPush(id: string): Promise<DeviceActionResponse | null> {
        try {
            const response = await this.post<null, DeviceActionResponse>(
                `${this.client.defaults.baseURL}/api/devices/${id}/test`,
                null
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export const DevicesApi = new DevicesApiClient(config);
