<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Base\Controllers\BaseController;
use Phalcon\Http\Response;

class AuthController extends BaseController
{
    public function loginAction(): Response
    {

        return $this->jsonResponse([
            'success' => true,
            'data'    => ['fd'],
        ]);
    }
}