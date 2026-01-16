<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Helpers\TranslationHelper;

class IndexController extends BaseController
{
    public function indexAction(): void
    {
        $this->view->title = TranslationHelper::translate('Impulse');
    }
}