<?php
declare(strict_types=1);

namespace App\Requests\Auth;

use Phalcon\Filter\Validation;
use Phalcon\Filter\Validation\Validator\Email;
use Phalcon\Filter\Validation\Validator\PresenceOf;
use Phalcon\Filter\Validation\Validator\StringLength;
use Phalcon\Messages\Messages;

class RegisterRequest
{
    private string $email;
    private string $password;

    public function __construct(array $data)
    {
        $this->email = $data['email'] ?? '';
        $this->password = $data['password'] ?? '';
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function validate(): Messages
    {
        $validation = new Validation();

        // Email validation
        $validation->add(
            'email',
            new PresenceOf(['message' => 'Email is required'])
        );

        $validation->add(
            'email',
            new Email(['message' => 'Invalid email format'])
        );

        $validation->add(
            'email',
            new StringLength([
                'max' => 255,
                'messageMaximum' => 'Email must not exceed 255 characters'
            ])
        );

        // Password validation
        $validation->add(
            'password',
            new PresenceOf(['message' => 'Password is required'])
        );

        $validation->add(
            'password',
            new StringLength([
                'min' => 8,
                'max' => 72,
                'messageMinimum' => 'Password must be at least 8 characters',
                'messageMaximum' => 'Password must not exceed 72 characters'
            ])
        );

        // Custom password validator
        $validation->add(
            'password',
            new Validation\Validator\Callback([
                'callback' => [$this, 'validatePasswordStrength'],
                'message' => 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            ])
        );

        return $validation->validate([
            'email' => $this->email,
            'password' => $this->password
        ]);
    }

    public function validatePasswordStrength($validation): bool
    {
        $password = $this->password;

        if (strlen($password) < 8) {
            return false;
        }

        $hasUpper = preg_match('/[A-Z]/', $password);
        $hasLower = preg_match('/[a-z]/', $password);
        $hasNumber = preg_match('/\d/', $password);
        // $hasSpecial = preg_match('/[^A-Za-z0-9]/', $password);

        return $hasUpper && $hasLower && $hasNumber; // && $hasSpecial
    }
}