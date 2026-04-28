/**
 * Типы для мобильных устройств и push-уведомлений
 */

export type DevicePlatform = 'ios' | 'android';

export interface MobileDeviceToken {
    id: string;
    user_id: string;
    device_token: string;
    platform: DevicePlatform;
    device_name: string | null;
    app_version: string | null;
    os_version: string | null;
    is_active: boolean;
    last_used_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface RegisterDeviceRequest {
    device_token: string;
    platform: DevicePlatform;
    device_name?: string;
    app_version?: string;
    os_version?: string;
}

export interface DeviceListResponse {
    success: boolean;
    data: MobileDeviceToken[];
}

export interface DeviceActionResponse {
    success: boolean;
    data?: MobileDeviceToken;
    message?: string;
}

export interface RegisterDeviceResponse {
    success: boolean;
    data: MobileDeviceToken;
    message?: string;
}
