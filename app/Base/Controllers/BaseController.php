<?php

declare(strict_types=1);

namespace App\Base\Controllers;

use Phalcon\Http\Response;
use Phalcon\Mvc\Controller as PhalconController;

class BaseController extends PhalconController
{
    /**
     * @param array<string,mixed> $data
     * @param int $statusCode
     * @return Response
     */
    protected function jsonResponse(array $data, int $statusCode = 200): Response
    {
        $response = new Response();
        $response->setStatusCode($statusCode);
        $response->setContentType('application/json', 'UTF-8');
        $response->setContent(json_encode($data, JSON_UNESCAPED_UNICODE) ?: '');

        return $response;
    }
}