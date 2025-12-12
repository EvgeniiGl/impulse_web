<?php

declare(strict_types=1);

namespace App\Exceptions;

use Phalcon\Http\Message\ResponseStatusCodeInterface;

class InvalidArgumentException extends BaseException
{
    protected $code = ResponseStatusCodeInterface::STATUS_UNPROCESSABLE_ENTITY;
    public $message = 'Incorrect data';
}