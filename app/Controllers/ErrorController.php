<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Helpers\TranslationHelper;

class ErrorController extends BaseController
{
    public function notFoundAction(): void
    {
        $this->response->setStatusCode(404, 'Not Found');
        $this->view->pick('error/404');
    }
}