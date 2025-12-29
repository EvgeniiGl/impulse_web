<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Helpers\TranslationHelper;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Phalcon\Cache\Cache;
use Phalcon\Config\Config;
use Phalcon\Http\Response;
use Phalcon\Mvc\Controller as PhalconController;

class IndexController extends BaseController
{
    public function indexAction(): void
    {
        $this->view->title = TranslationHelper::translate('Impulse');
    }
}