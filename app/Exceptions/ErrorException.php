<?php

declare(strict_types=1);

namespace App\Exceptions;

use Phalcon\Http\Message\ResponseStatusCodeInterface;

class ErrorException extends BaseException
{
    protected $code    = ResponseStatusCodeInterface::STATUS_INTERNAL_SERVER_ERROR;
    public    $message = 'Internal server error';
}