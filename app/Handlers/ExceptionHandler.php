<?php

declare(strict_types=1);

namespace App\Handlers;

use Phalcon\Http\Response;
use Phalcon\Logger\LoggerInterface;
use Throwable;
use Phalcon\Mvc\Dispatcher\Exception as DispatcherException;
use Phalcon\Filter\Validation\Exception as ValidationException;

class ExceptionHandler
{
    private LoggerInterface $logger;
    private bool $debug;

    public function __construct(LoggerInterface $logger, bool $debug = false)
    {
        $this->logger = $logger;
        $this->debug = $debug;
    }

    public function handle(Throwable $exception): Response
    {
        $this->logger->error(
            'Exception occurred: ' . $exception->getMessage(),
            [
                'file' => $exception->getFile(),
                'line' => $exception->getLine(),
                'trace' => $exception->getTraceAsString(),
                'request_uri' => $_SERVER['REQUEST_URI'] ?? 'unknown',
                'request_method' => $_SERVER['REQUEST_METHOD'] ?? 'unknown',
            ]
        );

        $statusCode = $this->getStatusCode($exception);
        
        $response = new Response();
        $response->setStatusCode($statusCode);
        $response->setContentType('application/json', 'UTF-8');

        $errorData = [
            'error' => true,
            'message' => $this->getErrorMessage($exception),
            'code' => $statusCode,
        ];

        if ($this->debug) {
            $errorData['debug'] = [
                'file' => $exception->getFile(),
                'line' => $exception->getLine(),
                'trace' => $exception->getTrace(),
            ];
        }

        $response->setJsonContent($errorData);

        return $response;
    }

    private function getStatusCode(Throwable $exception): int
    {
        // Если у исключения есть метод getCode() и это валидный HTTP код
        $code = $exception->getCode();
        if (is_int($code) && $code >= 400 && $code < 600) {
            return $code;
        }

        // Определяем код по типу исключения
        $className = get_class($exception);
        
        switch ($className) {
            case DispatcherException::class:
                return 404;
            case ValidationException::class:
                return 422;
            default:
                return 500;
        }
    }

    private function getErrorMessage(Throwable $exception): string
    {
        if (!$this->debug) {
            $statusCode = $this->getStatusCode($exception);
            
            switch ($statusCode) {
                case 404:
                    return 'Resource not found';
                case 422:
                    return 'Validation error';
                case 500:
                    return 'Internal server error';
                default:
                    return 'An error occurred';
            }
        }

        return $exception->getMessage();
    }
}
