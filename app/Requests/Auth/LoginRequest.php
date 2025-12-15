<?php

declare(strict_types=1);

namespace App\Requests\Auth;

use App\Helpers\TranslationHelper;
use App\Requests\Request;
use Phalcon\Filter\Validation\Validator\Email;
use Phalcon\Filter\Validation\Validator\PresenceOf;
use Phalcon\Messages\Messages;

class LoginRequest extends Request
{
    protected function rules(): void
    {
        $this->validation->add(
            'email',
            new PresenceOf([
                'message'      => TranslationHelper::translate('Field is required'),
                'cancelOnFail' => true
            ])
        );
        $this->validation->add(
            'email',
            new Email([
                'message' => 'The e-mail is not valid',
            ])
        );
        $this->validation->add(
            'password',
            new PresenceOf([
                'message'      => TranslationHelper::translate('Field is required'),
                'cancelOnFail' => true
            ])
        );
    }

    public function messages(): Messages
    {
        return new Messages([
            'email.required'    => 'Email is required',
            'password.required' => 'Password is required',
        ]);
    }
}