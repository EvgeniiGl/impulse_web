<?php

declare(strict_types=1);

namespace App\Exceptions;

use Phalcon\Http\Message\ResponseStatusCodeInterface;

class UnauthorizedException extends BaseException
{
    protected $code    = ResponseStatusCodeInterface::STATUS_UNAUTHORIZED;
    public    $message = 'Invalid or expired token';
}