<?php

declare(strict_types=1);

namespace App\Requests;

use App\Exceptions\InvalidArgumentException;
use Exception;
use Phalcon\Filter\Validation;
use Phalcon\Di\Injectable;
use Phalcon\Messages\Messages;

abstract class Request extends Injectable
{
    protected Validation $validation;
    protected Messages   $messages;
    protected bool       $passedValidation = false;

    /**
     * @throws Exception
     */
    public function __construct()
    {
        $this->validation = new Validation();
        $this->rules();
        $valid = $this->validate();
        if (!$valid) {
            throw (new InvalidArgumentException())->withErrors($this->errors());
        }
    }

    abstract protected function rules();

    public function validate(): bool
    {
        $request = $this->request;
        $data    = array_merge(
            $request->getPost(),
            $request->get()
        );

        $this->messages = $this->validation->validate($data);

        if (count($this->messages) === 0) {
            $this->passedValidation = true;
        }

        return $this->passedValidation;
    }

    public function validated(): array
    {
        if (!$this->passedValidation) {
            throw new \Exception("Couldn't verify");
        }

        $request = $this->request;
        $data    = array_merge(
            $request->getPost(),
            $request->get()
        );

        $validated = [];
        foreach ($this->validation->getValidators() as $field => $validators) {
            if (isset($data[$field])) {
                $validated[$field] = $data[$field];
            }
        }

        return $validated;
    }

    public function messages(): Messages
    {
        return $this->messages;
    }

    public function failed(): bool
    {
        return !$this->passedValidation;
    }

    public function errors(): array
    {
        $errors = [];
        foreach ($this->messages as $message) {
            $field            = $message->getField();
            $errors[$field][] = $message->getMessage();
        }
        return $errors;
    }
}