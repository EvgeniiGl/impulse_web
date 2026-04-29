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
     * Перевести строку с подстановкой плейсхолдеров вида %key%.
     *
     * Сначала получаем переведённую строку из Phalcon Translate,
     * затем вручную заменяем %key% → value, чтобы не зависеть
     * от конкретного интерполятора (AssignedInterpolator, IndexedInterpolator и т.д.).
     */
    public static function translate(string $key, array $placeholders = []): string
    {
        $translator = self::getTranslator();

        $translated = $translator->has($key)
            ? $translator->_($key)
            : $key;

        if (!empty($placeholders)) {
            $translated = self::interpolate($translated, $placeholders);
        }

        return $translated;
    }

    /**
     * Заменяет плейсхолдеры %key% в строке на соответствующие значения.
     *
     * Поддерживает оба формата ключей:
     *   ['%limit%' => 10]  — с процентами (явный)
     *   ['limit'   => 10]  — без процентов (удобный)
     */
    private static function interpolate(string $message, array $placeholders): string
    {
        $search  = [];
        $replace = [];

        foreach ($placeholders as $key => $value) {
            // Нормализуем ключ: убираем % если уже есть, затем оборачиваем
            $normalized = trim((string)$key, '%');
            $search[]   = '%' . $normalized . '%';
            $replace[]  = (string)$value;
        }

        return str_replace($search, $replace, $message);
    }

    /**
     * Получить текущий язык
     */
    public static function getLocale(): string
    {
        $di      = Di::getDefault();
        $request = $di->get('request');
        $lang    = $request->getBestLanguage() ?? 'en';

        // Нормализуем: ru-RU → ru, en-US → en
        return explode('-', explode('_', $lang)[0])[0];
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