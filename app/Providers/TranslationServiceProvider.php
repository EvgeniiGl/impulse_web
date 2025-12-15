<?php

namespace App\Providers;

use Phalcon\Di\DiInterface;
use Phalcon\Di\ServiceProviderInterface;
use Phalcon\Translate\InterpolatorFactory;
use Phalcon\Translate\TranslateFactory;

class TranslationServiceProvider implements ServiceProviderInterface
{
    public function register(DiInterface $di): void
    {
        $di->setShared('translation', function () use ($di) {
            $request = $di->get('request');
            $defaultLocale = 'en';

            // Получаем язык из запроса
            $locale = $request->getBestLanguage() ?? $defaultLocale;

            // Нормализуем локаль (например, ru_RU -> ru)
            $locale = explode('_', $locale)[0];

            // Определяем базовый путь
            $basePath = defined('APP_PATH')
                ? APP_PATH
                : dirname(__DIR__, 2);

            // Пробуем загрузить файл перевода
            $translationFile = $basePath . '/Messages/' . $locale . '.php';

            if (!file_exists($translationFile)) {
                $locale = $defaultLocale;
                $translationFile = $basePath . '/Messages/' . $locale . '.php';
            }

            // Загружаем переводы
            $messages = file_exists($translationFile)
                ? require $translationFile
                : [];

            // Создаем экземпляр переводчика
            $interpolator = new InterpolatorFactory();
            $factory = new TranslateFactory($interpolator);

            return $factory->newInstance(
                'array',
                [
                    'content' => $messages,
                ]
            );
        });
    }
}