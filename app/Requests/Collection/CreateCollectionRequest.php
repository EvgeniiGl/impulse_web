<?php

declare(strict_types=1);

namespace App\Requests\Collection;

use App\Helpers\TranslationHelper;
use App\Requests\Request;
use Phalcon\Filter\Validation\Validator\PresenceOf;
use Phalcon\Filter\Validation\Validator\StringLength;
use Phalcon\Filter\Validation\Validator\InclusionIn;
use Phalcon\Messages\Messages;

class CreateCollectionRequest extends Request
{
    protected function rules(): void
    {
        $this->validation->add(
            'name',
            new PresenceOf([
                'message'      => TranslationHelper::translate('Collection name is required'),
                'cancelOnFail' => true
            ])
        );

        $this->validation->add(
            'name',
            new StringLength([
                'min'            => 3,
                'max'            => 255,
                'messageMinimum' => TranslationHelper::translate('Collection name must be at least 3 characters'),
                'messageMaximum' => TranslationHelper::translate('Collection name must not exceed 255 characters'),
            ])
        );

        $this->validation->add(
            'access_type',
            new InclusionIn([
                'domain'  => ['private', 'public', 'shared'],
                'message' => TranslationHelper::translate('Invalid access type'),
            ])
        );
    }

    public function messages(): Messages
    {
        return new Messages([
            'name.required'       => TranslationHelper::translate('Collection name is required'),
            'name.min'            => TranslationHelper::translate('Collection name is too short'),
            'access_type.invalid' => TranslationHelper::translate('Access type must be private, public or shared'),
        ]);
    }
}
