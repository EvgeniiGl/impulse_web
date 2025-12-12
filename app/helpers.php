<?php

use App\Helpers\TranslationHelper;

if (!function_exists('trans')) {
    function trans(string $key, array $placeholders = []): string
    {
        return TranslationHelper::translate($key, $placeholders);
    }
}