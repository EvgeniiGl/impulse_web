<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Requests\Auth\LoginRequest;
use App\Requests\Auth\RegisterRequest;
use App\Models\User;
use Exception;
use Firebase\JWT\JWT;
use Phalcon\Http\Response;
use Phalcon\Mvc\Controller;
use Phalcon\Messages\Messages;

class AuthController extends BaseController
{
    /**
     * @throws Exception
     */
    public function loginAction(): Response
    {
        $req        = new LoginRequest();
        $validation = $req->validate();

        if (!$validation) {
            $errors = [];
            foreach ($req->messages() as $message) {
                $errors[] = $message->getMessage();
            }

            return $this->jsonResponse([
                'success' => false,
                'errors'  => $errors
            ], 422);
        }

        // Find user by email
        $user = User::findFirst([
            'conditions' => 'email = :email:',
            'bind'       => ['email' => $req->get('email')]
        ]);

        if (!$user || !$user->verifyPassword($req->get('password'))) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => 'Invalid email or password'
            ], 401);
        }

        if (!$user->is_active) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => 'Account is deactivated'
            ], 403);
        }

        // Generate JWT token
        $token = $this->generateToken($user);

        return $this->jsonResponse([
            'success' => true,
            'data'    => [
                'token' => $token,
                'user'  => [
                    'id'    => $user->id,
                    'name'  => $user->name,
                    'email' => $user->email
                ]
            ]
        ]);
    }

    public function registerAction(): Response
    {
        $data = $this->request->getJsonRawBody(true);

        if (!$data) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => 'Invalid JSON data'
            ], 400);
        }

        $req        = new RegisterRequest($data);
        $validation = $req->validate();

        if ($validation->count() > 0) {
            $errors = [];
            foreach ($validation as $message) {
                $errors[] = $message->getMessage();
            }

            return $this->jsonResponse([
                'success' => false,
                'errors'  => $errors
            ], 422);
        }

        // Check if user exists
        $existingUser = User::findFirst([
            'conditions' => 'email = :email:',
            'bind'       => ['email' => $req->getEmail()]
        ]);

        if ($existingUser) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => 'User with this email already exists'
            ], 409);
        }

        // Create new user
        $user        = new User();
        $user->email = $req->getEmail();

        $user->setPassword($req->getPassword());
        $user->name = $data['name'] ?? '';
        $user->age  = $data['age'] ?? null;

        if (!$user->save()) {
            $messages = [];
            foreach ($user->getMessages() as $message) {
                $messages[] = $message->getMessage();
            }

            return $this->jsonResponse([
                'success' => false,
                'errors'  => $messages
            ], 500);
        }

        // Generate JWT token
        $token = $this->generateToken($user);

        return $this->jsonResponse([
            'success' => true,
            'data'    => [
                'token' => $token,
                'user'  => [
                    'id'    => $user->id,
                    'name'  => $user->name,
                    'email' => $user->email
                ]
            ]
        ], 201);
    }

    private function generateToken(User $user): string
    {
        // Implement JWT token generation
        // Example using Firebase JWT:
        $payload = [
            'iss'   => $this->config->application->domain,
            'aud'   => $this->config->application->domain,
            'iat'   => time(),
            'exp'   => time() + 3600, // 1 hour expiration
            'sub'   => $user->id,
            'email' => $user->email
        ];

        return JWT::encode(
            $payload,
            $this->config->jwt->secret,
            'HS256'
        );
    }
}