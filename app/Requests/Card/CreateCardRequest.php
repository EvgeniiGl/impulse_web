<?php
declare(strict_types=1);

namespace App\Requests\Card;

use App\Helpers\TranslationHelper;
use Phalcon\Filter\Validation;
use Phalcon\Filter\Validation\Validator\PresenceOf;
use Phalcon\Filter\Validation\Validator\StringLength;
use Phalcon\Filter\Validation\Validator\InclusionIn;
use Phalcon\Http\Request\File;
use Phalcon\Messages\Messages;

class CreateCardRequest
{
    private ?array $data;
    private File   $file;

    public function __construct(?array $data, File $file)
    {
        $this->data = $data;
        $this->file = $file;
    }

    public function getTitle(): ?string
    {
        return $this->data['title'] ?? null;
    }

    public function getDescription(): ?string
    {
        return $this->data['description'] ?? null;
    }

    public function getAccessType(): ?string
    {
        return $this->data['access_type'] ?? 'private';
    }

    public function getShowTitleOnImage(): ?bool
    {
        return $this->data['show_title_on_image'] === 'true';
    }

    public function getCollectionIds(): array
    {
        // Обработка различных форматов входящих данных
        if (isset($this->data['collection_ids']) && is_array($this->data['collection_ids'])) {
            // Если пришел как обычный массив
            return array_values(array_filter($this->data['collection_ids']));
        }

        // Если пришел как collection_ids[] или collection_ids[0], collection_ids[1] и т.д.
        $collectionIds = [];
        foreach ($this->data as $key => $value) {
            if (strpos($key, 'collection_ids') === 0) {
                if (!empty($value)) {
                    $collectionIds[] = $value;
                }
            }
        }

        // Если пришел как JSON строка
        if (isset($this->data['collection_ids']) && is_string($this->data['collection_ids'])) {
            $decoded = json_decode($this->data['collection_ids'], true);
            if (is_array($decoded)) {
                return array_values(array_filter($decoded));
            }
        }

        return array_values(array_filter($collectionIds));
    }

    public function getFile(): File
    {
        return $this->file;
    }

    public function hasFile(): bool
    {
        return !empty($this->file->getTempName());
    }

    public function validate(): Messages
    {
        $validation = new Validation();

        // Валидация заголовка
        $validation->add(
            'title',
            new PresenceOf([
                'message' => TranslationHelper::translate('Title is required')
            ])
        );

        $validation->add(
            'title',
            new StringLength([
                'min'            => 3,
                'max'            => 100,
                'messageMinimum' => TranslationHelper::translate('Title must be at least 3 characters'),
                'messageMaximum' => TranslationHelper::translate('Title must not exceed 100 characters')
            ])
        );

        // Валидация описания
        $validation->add(
            'description',
            new StringLength([
                'max'            => 1500,
                'messageMaximum' => TranslationHelper::translate('Description must not exceed 1500 characters'),
                'allowEmpty'     => true
            ])
        );

        // Валидация типа доступа
        $validation->add(
            'access_type',
            new InclusionIn([
                'domain'  => ['private', 'shared', 'public'],
                'message' => TranslationHelper::translate('Access type must be one of: private, shared, public')
            ])
        );

        // Валидация collection_ids
        $collectionIds = $this->getCollectionIds();

        // Проверка, что collection_ids массив
        if (!is_array($collectionIds)) {
            $messages = new Messages();
            $messages->appendMessage(
                new \Phalcon\Messages\Message(
                    TranslationHelper::translate('Collection IDs must be an array'),
                    'collection_ids',
                    'InvalidType'
                )
            );
            return $messages;
        }

        // Проверка максимального количества коллекций (опционально)
        $maxCollections = 10; // можно вынести в конфиг
        if (count($collectionIds) > $maxCollections) {
            $messages = new Messages();
            $messages->appendMessage(
                new \Phalcon\Messages\Message(
                    TranslationHelper::translate('Maximum %d collections allowed', $maxCollections),
                    'collection_ids',
                    'TooMany'
                )
            );
            return $messages;
        }

        // Валидация каждого ID коллекции (если нужно проверить формат UUID или другой формат)
        foreach ($collectionIds as $index => $id) {
            if (!is_string($id) || empty($id)) {
                $messages = new Messages();
                $messages->appendMessage(
                    new \Phalcon\Messages\Message(
                        TranslationHelper::translate('Each collection ID must be a non-empty string'),
                        "collection_ids[{$index}]",
                        'InvalidValue'
                    )
                );
                return $messages;
            }

            // Если используете UUID, можно добавить проверку формата
            if (!$this->isValidUuid($id)) {
                $messages = new Messages();
                $messages->appendMessage(
                    new \Phalcon\Messages\Message(
                        TranslationHelper::translate('Collection ID must be a valid UUID'),
                        "collection_ids[{$index}]",
                        'InvalidFormat'
                    )
                );
                return $messages;
            }
        }

        return $validation->validate([
            'title'       => $this->getTitle(),
            'description' => $this->getDescription(),
            'access_type' => $this->getAccessType()
        ]);
    }

    public function validateFile(array $allowedTypes, int $maxSize): bool
    {
        if (!$this->hasFile()) {
            return true;
        }

        $file = $this->file;
        // Проверка ошибок загрузки
        if ($file->getError()) {
            return false;
        }

        // Проверка размера файла
        if ($file->getSize() > $maxSize) {
            return false;
        }

        // Проверка типа файла
        $finfo    = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file->getTempName());
        finfo_close($finfo);

        if (!in_array($mimeType, $allowedTypes, true)) {
            return false;
        }

        return true;
    }

    /**
     * Проверка валидности UUID (опционально)
     */
    private function isValidUuid(string $uuid): bool
    {
        // Базовая проверка формата UUID
        return preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $uuid) === 1;
    }
}