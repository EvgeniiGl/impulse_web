<?php

declare(strict_types=1);

namespace App\Requests\Collection;

use App\Helpers\TranslationHelper;
use App\Requests\Request;
use Phalcon\Filter\Validation\Validator\PresenceOf;
use Phalcon\Messages\Messages;
use Phalcon\Messages\Message;

class MoveCardRequest extends Request
{
    protected function rules(): void
    {
        $this->validation->add(
            'collection_ids',
            new PresenceOf([
                'message'    => TranslationHelper::translate('Collection IDs are required'),
                'allowEmpty' => true, // разрешаем пустой массив (убрать карточку из всех коллекций)
            ])
        );
    }

    public function validate(): bool
    {
        parent::validate();

        // Дополнительная проверка: collection_ids должен быть массивом
        $collectionIds = $this->data['collection_ids'] ?? null;

        if ($collectionIds !== null && !is_array($collectionIds)) {
            $this->messages->appendMessage(new Message(
                TranslationHelper::translate('Collection IDs must be an array'),
                'collection_ids',
                'InvalidType'
            ));
            $this->passedValidation = false;
        }

        return $this->passedValidation;
    }

    public function messages(): Messages
    {
        return $this->messages;
    }

    /**
     * Получить массив ID коллекций из тела запроса
     */
    public function getCollectionIds(): array
    {
        $collectionIds = $this->data['collection_ids'] ?? [];

        if (!is_array($collectionIds)) {
            return [];
        }

        return array_values(array_filter($collectionIds, fn($id) => !empty($id) && is_string($id)));
    }
}