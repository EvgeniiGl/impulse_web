<?php

namespace App\Helpers;

use Phalcon\Di\Di;
use Phalcon\Translate\Adapter\AdapterInterface;

class TranslationHelper
{
    /**
     * Получить экземпляр переводчика
     */
    public static function getTranslator(): AdapterInterface
    {
        $di = Di::getDefault();
        return $di->get('translation');
    }

    /**
     * Перевести строку
     */
    public static function translate(string $key, array $placeholders = []): string
    {
        $translator = self::getTranslator();

        if ($translator->has($key)) {
            return $translator->_($key, $placeholders);
        }

        return $key;
    }

    /**
     * Получить текущий язык
     */
    public static function getLocale(): string
    {
        global $di;
        $request = $di->get('request');
        return $request->getBestLanguage() ?? 'en';
    }

    /**
     * Проверить существование перевода
     */
    public static function has(string $key): bool
    {
        $translator = self::getTranslator();
        return $translator->has($key);
    }

    /**
     * Короткий алиас для translate()
     */
    public static function t(string $key, array $placeholders = []): string
    {
        return self::translate($key, $placeholders);
    }
}