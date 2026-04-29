<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Exceptions\InvalidArgumentException;
use App\Helpers\TranslationHelper;
use App\Models\MobileDeviceToken;
use App\Requests\Notification\RegisterDeviceTokenRequest;
use App\Services\MobilePushService;

class MobileDeviceController extends BaseController
{
    private MobilePushService $mobilePushService;

    public function initialize(): void
    {
        $this->mobilePushService = new MobilePushService();
    }

    /**
     * POST /api/devices/register
     */
    public function registerAction(): \Phalcon\Http\ResponseInterface
    {
        try {
            $user = $this->getAuthenticatedUser();
            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'message' => TranslationHelper::translate('Authentication required'),
                ], 401);
            }

            $request = new RegisterDeviceTokenRequest();

            $token = $this->mobilePushService->registerToken(
                $user->id,
                $request->get('device_token'),
                $request->get('platform'),
                $request->get('device_name'),
                $request->get('app_version'),
                $request->get('os_version')
            );

            return $this->jsonResponse([
                'success' => true,
                'data'    => $token->toArray(),
                'message' => TranslationHelper::translate('Device registered successfully'),
            ]);
        } catch (InvalidArgumentException $e) {
            return $this->jsonResponse([
                'success' => false,
                'errors'  => $e->getErrors(),
            ], 422);
        } catch (\Exception $e) {
            error_log("Error registering device: " . $e->getMessage());
            return $this->jsonResponse([
                'success' => false,
                'message' => TranslationHelper::translate('Failed to register device'),
            ], 500);
        }
    }

    /**
     * DELETE /api/devices/{id}
     */
    public function unregisterAction(string $id): \Phalcon\Http\ResponseInterface
    {
        try {
            $user = $this->getAuthenticatedUser();
            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'message' => TranslationHelper::translate('Authentication required'),
                ], 401);
            }

            if (!preg_match('/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/', $id)) {
                return $this->jsonResponse([
                    'success' => false,
                    'message' => TranslationHelper::translate('Invalid device ID format'),
                ], 400);
            }

            $success = $this->mobilePushService->deleteToken($user->id, $id);

            if (!$success) {
                return $this->jsonResponse([
                    'success' => false,
                    'message' => TranslationHelper::translate('Device not found'),
                ], 404);
            }

            return $this->jsonResponse([
                'success' => true,
                'message' => TranslationHelper::translate('Device unregistered successfully'),
            ]);
        } catch (\Exception $e) {
            error_log("Error unregistering device: " . $e->getMessage());
            return $this->jsonResponse([
                'success' => false,
                'message' => TranslationHelper::translate('Failed to unregister device'),
            ], 500);
        }
    }

    /**
     * GET /api/devices
     */
    public function listAction(): \Phalcon\Http\ResponseInterface
    {
        try {
            $user = $this->getAuthenticatedUser();
            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'message' => TranslationHelper::translate('Authentication required'),
                ], 401);
            }

            $devices = $this->mobilePushService->getUserDevices($user->id);

            return $this->jsonResponse([
                'success' => true,
                'data'    => $devices,
            ]);
        } catch (\Exception $e) {
            error_log("Error listing devices: " . $e->getMessage());
            return $this->jsonResponse([
                'success' => false,
                'message' => TranslationHelper::translate('Failed to list devices'),
            ], 500);
        }
    }

    /**
     * PATCH /api/devices/{id}/toggle
     */
    public function toggleAction(string $id): \Phalcon\Http\ResponseInterface
    {
        try {
            $user = $this->getAuthenticatedUser();
            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'message' => TranslationHelper::translate('Authentication required'),
                ], 401);
            }

            if (!preg_match('/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/', $id)) {
                return $this->jsonResponse([
                    'success' => false,
                    'message' => TranslationHelper::translate('Invalid device ID format'),
                ], 400);
            }

            $token = MobileDeviceToken::findFirst([
                'conditions' => 'id = :id: AND user_id = :user_id:',
                'bind'       => [
                    'id'      => $id,
                    'user_id' => $user->id,
                ],
            ]);

            if (!$token) {
                return $this->jsonResponse([
                    'success' => false,
                    'message' => TranslationHelper::translate('Device not found'),
                ], 404);
            }

            $token->is_active = !$token->is_active;

            if (!$token->save()) {
                return $this->jsonResponse([
                    'success' => false,
                    'message' => TranslationHelper::translate('Failed to update device'),
                ], 500);
            }

            return $this->jsonResponse([
                'success' => true,
                'data'    => $token->toArray(),
                'message' => TranslationHelper::translate(
                    $token->is_active ? 'Device activated' : 'Device deactivated'
                ),
            ]);
        } catch (\Exception $e) {
            error_log("Error toggling device: " . $e->getMessage());
            return $this->jsonResponse([
                'success' => false,
                'message' => TranslationHelper::translate('Failed to toggle device'),
            ], 500);
        }
    }

    /**
     * POST /api/devices/{id}/test
     */
    public function testPushAction(string $id): \Phalcon\Http\ResponseInterface
    {
        try {
            $user = $this->getAuthenticatedUser();
            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'message' => TranslationHelper::translate('Authentication required'),
                ], 401);
            }

            if (!preg_match('/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/', $id)) {
                return $this->jsonResponse([
                    'success' => false,
                    'message' => TranslationHelper::translate('Invalid device ID format'),
                ], 400);
            }

            $token = MobileDeviceToken::findFirst([
                'conditions' => 'id = :id: AND user_id = :user_id: AND is_active = true',
                'bind'       => [
                    'id'      => $id,
                    'user_id' => $user->id,
                ],
            ]);

            if (!$token) {
                return $this->jsonResponse([
                    'success' => false,
                    'message' => TranslationHelper::translate('Active device not found'),
                ], 404);
            }

            return $this->jsonResponse([
                'success' => true,
                'message' => TranslationHelper::translate('Test notification sent'),
            ]);
        } catch (\Exception $e) {
            error_log("Error sending test push: " . $e->getMessage());
            return $this->jsonResponse([
                'success' => false,
                'message' => TranslationHelper::translate('Failed to send test notification'),
            ], 500);
        }
    }
}