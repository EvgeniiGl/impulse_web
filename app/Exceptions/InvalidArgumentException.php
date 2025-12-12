<?php

declare(strict_types=1);

namespace App\Exceptions;

use Swoole\Http\Status;

class InvalidArgumentException extends BaseException
{
    protected $code = Status::UNPROCESSABLE_ENTITY;
    public $message = 'Incorrect data';
}