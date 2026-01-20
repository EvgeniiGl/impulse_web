<?php

declare(strict_types=1);

namespace App\Requests\Collection;

use App\Helpers\TranslationHelper;
use App\Requests\Request;
use Phalcon\Filter\Validation\Validator\PresenceOf;
use Phalcon\Filter\Validation\Validator\Regex;
use Phalcon\Messages\Messages;

class AddCardRequest extends Request
{
    protected function rules(): void
    {
        $this->validation->add(
            'card_id',
            new PresenceOf([
                'message'      => TranslationHelper::translate('Card ID is required'),
                'cancelOnFail' => true
            ])
        );

        $this->validation->add(
            'card_id',
            new Regex([
                'pattern' => '/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i',
                'message' => TranslationHelper::translate('Invalid card ID format'),
            ])
        );
    }

    public function messages(): Messages
    {
        return new Messages([
            'card_id.required' => 'Card ID is required',
            'card_id.invalid'  => 'Invalid card ID format',
        ]);
    }
}
