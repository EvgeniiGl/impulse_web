<?php

declare(strict_types=1);

namespace App\Requests\Notification;

use App\Helpers\TranslationHelper;
use App\Requests\Request;
use Phalcon\Filter\Validation\Validator\PresenceOf;
use Phalcon\Filter\Validation\Validator\InclusionIn;
use Phalcon\Filter\Validation\Validator\StringLength;
use Phalcon\Messages\Messages;

class RegisterDeviceTokenRequest extends Request
{
    protected function rules(): void
    {
        // device_token — обязательный
        $this->validation->add(
            'device_token',
            new PresenceOf([
                'message'      => TranslationHelper::translate('Device token is required'),
                'cancelOnFail' => true,
            ])
        );

        $this->validation->add(
            'device_token',
            new StringLength([
                'min'            => 10,
                'max'            => 4096,
                'messageMinimum' => TranslationHelper::translate('Device token is too short'),
                'messageMaximum' => TranslationHelper::translate('Device token is too long'),
            ])
        );

        // platform — обязательный, ios | android
        $this->validation->add(
            'platform',
            new PresenceOf([
                'message'      => TranslationHelper::translate('Platform is required'),
                'cancelOnFail' => true,
            ])
        );

        $this->validation->add(
            'platform',
            new InclusionIn([
                'message' => TranslationHelper::translate('Platform must be ios or android'),
                'domain'  => ['ios', 'android'],
            ])
        );

        // device_name — необязательное, но с ограничением длины
        $this->validation->add(
            'device_name',
            new StringLength([
                'max'            => 255,
                'messageMaximum' => TranslationHelper::translate('Device name is too long'),
                'allowEmpty'     => true,
            ])
        );

        // app_version — необязательное
        $this->validation->add(
            'app_version',
            new StringLength([
                'max'            => 50,
                'messageMaximum' => TranslationHelper::translate('App version is too long'),
                'allowEmpty'     => true,
            ])
        );

        // os_version — необязательное
        $this->validation->add(
            'os_version',
            new StringLength([
                'max'            => 50,
                'messageMaximum' => TranslationHelper::translate('OS version is too long'),
                'allowEmpty'     => true,
            ])
        );
    }

    public function messages(): Messages
    {
        return $this->messages;
    }
}
