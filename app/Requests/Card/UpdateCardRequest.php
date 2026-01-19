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
        return $this->data['title'] ?? null;
    }

    public function getDescription(): ?string
    {
        return $this->data['description'] ?? null;
    }

    public function getAccessType(): ?string
    {
        return $this->data['access_type'] ?? null;
    }

    public function getFile(): ?File
    {
        return $this->file;
    }

    public function hasFile(): bool
    {
        return $this->file !== null && !empty($this->file->getTempName());
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

    public function validate(): Messages
    {
        $validation = new Validation();

        // Валидация заголовка (только если присутствует)
        if ($this->hasTitle()) {
            $validation->add(
                'title',
                new StringLength([
                    'min'            => 3,
                    'max'            => 100,
                    'messageMinimum' => TranslationHelper::translate('Title must be at least 3 characters'),
                    'messageMaximum' => TranslationHelper::translate('Title must not exceed 100 characters')
                ])
            );
        }

        // Валидация описания (только если присутствует)
        if ($this->hasDescription()) {
            $validation->add(
                'description',
                new StringLength([
                    'max'            => 1500,
                    'messageMaximum' => TranslationHelper::translate('Description must not exceed 1500 characters'),
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

    public function hasAnyData(): bool
    {
        return $this->hasTitle() ||
            $this->hasDescription() ||
            $this->hasAccessType() ||
            $this->hasFile();
    }
}
