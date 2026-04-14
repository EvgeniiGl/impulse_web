<?php
declare(strict_types=1);

namespace App\Requests\Card;

use App\Helpers\TranslationHelper;
use Phalcon\Filter\Validation;
use Phalcon\Filter\Validation\Validator\StringLength;
use Phalcon\Filter\Validation\Validator\InclusionIn;
use Phalcon\Http\Request\File;
use Phalcon\Messages\Messages;

class UpdateCardRequest
{
    private ?array $data;
    private ?File  $file;

    public function __construct(?array $data, ?File $file = null)
    {
        $this->data = $data;
        $this->file = $file;
    }

    public function getTitle(): ?string
    {
        if (!$this->hasTitle()) {
            return null;
        }
        $title = $this->data['title'] ?? null;
        return $title ? trim($title) : '';
    }

    public function getDescription(): ?string
    {
        return $this->data['description'] ?? null;
    }

    public function getAccessType(): ?string
    {
        return $this->data['access_type'] ?? null;
    }

    public function getIsActive(): ?bool
    {
        if (!isset($this->data['is_active'])) {
            return null;
        }
        return $this->data['is_active'] === 'true' || $this->data['is_active'] === true;
    }

    public function getShowTitleOnImage(): ?bool
    {
        if (!isset($this->data['show_title_on_image'])) {
            return null;
        }
        // Если нет заголовка, не показываем его на изображении
        $title = $this->getTitle();
        if ($title !== null && empty($title)) {
            return false;
        }
        return $this->data['show_title_on_image'] === 'true' || $this->data['show_title_on_image'] === true;
    }

    public function getTitleColor(): ?string
    {
        if (!isset($this->data['title_color'])) {
            return null;
        }
        return $this->data['title_color'];
    }

    public function getFile(): ?File
    {
        return $this->file;
    }

    public function hasFile(): bool
    {
        return $this->file !== null && !empty($this->file->isUploadedFile());
    }

    public function hasTitle(): bool
    {
        return isset($this->data['title']);
    }

    public function hasDescription(): bool
    {
        return isset($this->data['description']);
    }

    public function hasAccessType(): bool
    {
        return isset($this->data['access_type']);
    }

    public function hasTitleColor(): bool
    {
        return isset($this->data['title_color']);
    }

    public function validate(): Messages
    {
        $validation = new Validation();

        // Валидация заголовка (только если присутствует и не пустой)
        if ($this->hasTitle()) {
            $title = $this->getTitle();
            if (!empty($title)) {
                $validation->add(
                    'title',
                    new StringLength([
                        'max'            => 100,
                        'messageMaximum' => TranslationHelper::translate('Title must not exceed 100 characters'),
                        'allowEmpty'     => true
                    ])
                );
            }
        }

        // Валидация описания (только если присутствует)
        if ($this->hasDescription()) {
            $validation->add(
                'description',
                new StringLength([
                    'max'            => 5000,
                    'messageMaximum' => TranslationHelper::translate('Description must not exceed 5000 characters'),
                    'allowEmpty'     => true
                ])
            );
        }

        // Валидация типа доступа (только если присутствует)
        if ($this->hasAccessType()) {
            $validation->add(
                'access_type',
                new InclusionIn([
                    'domain'  => ['private', 'shared', 'public'],
                    'message' => TranslationHelper::translate('Access type must be one of: private, shared, public')
                ])
            );
        }

        // Валидация цвета заголовка
        if ($this->hasTitleColor()) {
            $titleColor = $this->getTitleColor();
            if ($titleColor && !preg_match('/^#[0-9A-Fa-f]{6}$/', $titleColor)) {
                $messages = new Messages();
                $messages->appendMessage(
                    new \Phalcon\Messages\Message(
                        TranslationHelper::translate('Title color must be a valid HEX color'),
                        'title_color',
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

    public function validateFile(array $allowedTypes, int $maxSize): bool
    {
        if (!$this->hasFile()) {
            return true;
        }

        // Определяем данные файла в зависимости от типа
        if ($this->file instanceof File) {
            $error   = $this->file->getError();
            $size    = $this->file->getSize();
            $tmpName = $this->file->getTempName();
        } elseif (is_array($this->file)) {
            $error   = $this->file['error'] ?? UPLOAD_ERR_OK;
            $size    = $this->file['size'] ?? 0;
            $tmpName = $this->file['tmp_name'] ?? null;
        } else {
            return false;
        }

        // Проверка ошибок загрузки
        if ($error !== UPLOAD_ERR_OK) {
            return false;
        }

        // Проверка размера файла
        if ($size > $maxSize) {
            return false;
        }

        // Проверка типа файла
        if (!$tmpName || !file_exists($tmpName)) {
            return false;
        }

        $finfo    = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $tmpName);
        finfo_close($finfo);

        if (!in_array($mimeType, $allowedTypes, true)) {
            return false;
        }

        return true;
    }

    public function hasAnyData(): bool
    {
        return $this->hasTitle() ||
            $this->hasDescription() ||
            $this->hasAccessType() ||
            $this->hasTitleColor() ||
            $this->hasFile() ||
            isset($this->data['show_title_on_image']);
    }
}