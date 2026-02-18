<?php

declare(strict_types=1);

namespace App\Controllers;

use Phalcon\Mvc\Controller as PhalconController;

class ErrorController extends PhalconController
{
    public function notFoundAction(): void
    {
        $this->response->setStatusCode(404, 'Not Found');
        $this->view->pick('error/404');
    }
}