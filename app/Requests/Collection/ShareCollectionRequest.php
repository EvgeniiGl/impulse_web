<?php

declare(strict_types=1);

namespace App\Requests\Collection;

use App\Helpers\TranslationHelper;
use App\Requests\Request;
use Phalcon\Filter\Validation\Validator\PresenceOf;
use Phalcon\Filter\Validation\Validator\Regex;
use Phalcon\Messages\Messages;

class ShareCollectionRequest extends Request
{
    protected function rules(): void
    {
        $this->validation->add(
            'user_id',
            new PresenceOf([
                'message'      => TranslationHelper::translate('User ID is required'),
                'cancelOnFail' => true
            ])
        );

        $this->validation->add(
            'user_id',
            new Regex([
                'pattern' => '/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i',
                'message' => TranslationHelper::translate('Invalid user ID format'),
            ])
        );
    }

    public function messages(): Messages
    {
        return new Messages([
            'user_id.required' => 'User ID is required',
            'user_id.invalid'  => 'Invalid user ID format',
        ]);
    }
}
