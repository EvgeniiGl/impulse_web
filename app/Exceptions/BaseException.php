<?php

declare(strict_types=1);

namespace App\Exceptions;

use App\Helpers\TranslationHelper;
use Exception;

abstract class BaseException extends Exception
{
    private const int DEFAULT_STATUS_CODE = 500;
    protected mixed $environment;
    protected       $message;
    protected       $code;
    protected array $errors = [];

    public function __construct(
        ?string        $message = null,
        ?int           $code = null,
        ?BaseException $previous = null
    )
    {
        // Detect and set the running environment
        $this->environment = getenv('APP_ENV');

        $this->message = $this->prepareMessage($message);
        $this->code    = $this->prepareStatusCode($code);
        parent::__construct();
    }

    private function prepareMessage(?string $message = null): ?string
    {
        return is_null($message) ? TranslationHelper::translate($this->message) : TranslationHelper::translate($message);
    }

    private function prepareStatusCode(?int $code = null): int
    {
        return is_null($code) ? $this->findStatusCode() : $code;
    }

    private function findStatusCode(): int
    {
        return $this->code ?? self::DEFAULT_STATUS_CODE;
    }

    public function debug(BaseException $error, bool $log = false): Exception
    {
//        if ($this->environment != 'testing' || $log === true) {
//            $logService = new LogService();
//            $logService->log(1, $error->getMessage());
//        }
//
        return $this;
    }

    public function withErrors(array $errors, bool $override = true): Exception
    {
        $translatedErrors = [];
//        $translator = new Translator();
//        $translator->addTranslationFile(
//            'phpArray', 'vendor/zendframework/zendframework/resources/languages/ru/' .
//            'Zend_Validate.php', 'default', 'ru_RU');
//        $translator->setLocale('ru_RU');
        foreach ($errors as $key => $value) {
            $translatedValues = [];
            // here we translate and mutate each error so all error values will be arrays (for consistency)
            // e.g. error => value becomes error => [translated_value]
            // e.g. error => [value1, value2] becomes error => [translated_value1, translated_value2]

            if (is_array($value)) {
                foreach ($value as $translationKey) {
                    $translatedValues[] = TranslationHelper::t($translationKey);
                }
            } else {
                $translatedValues[] = TranslationHelper::t($value);
            }

            $translatedErrors[$key] = $translatedValues;
        }

        if ($override) {
            $this->errors = $translatedErrors;
        } else {
            $this->errors = array_merge($this->errors, $translatedErrors);
        }

        return $this;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

}