<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Models\User;

class UsersController extends BaseController
{
    /**
     * Блокировка пользователя по ID
     */
    public function blockAction(string $id): \Phalcon\Http\ResponseInterface
    {
        $user = User::findFirst([
            'conditions' => 'id = :id:',
            'bind'       => ['id' => $id]
        ]);

        if (!$user) {
            return $this->response->setJsonContent([
                'success' => false,
                'message' => 'Пользователь не найден'
            ])->setStatusCode(404);
        }

        if ($user->block()) {
            return $this->response->setJsonContent([
                'success' => true,
                'message' => 'Пользователь заблокирован'
            ]);
        }

        return $this->response->setJsonContent([
            'success' => false,
            'message' => 'Ошибка блокировки',
            'errors'  => $user->getMessages()
        ])->setStatusCode(500);
    }

    /**
     * Разблокировка пользователя
     */
    public function unblockAction(string $id): \Phalcon\Http\ResponseInterface
    {
        $user = User::findFirst([
            'conditions' => 'id = :id:',
            'bind'       => ['id' => $id]
        ]);

        if (!$user) {
            return $this->response->setJsonContent([
                'success' => false,
                'message' => 'Пользователь не найден'
            ])->setStatusCode(404);
        }

        if ($user->unblock()) {
            return $this->response->setJsonContent([
                'success' => true,
                'message' => 'Пользователь разблокирован'
            ]);
        }

        return $this->response->setJsonContent([
            'success' => false,
            'message' => 'Ошибка разблокировки',
            'errors'  => $user->getMessages()
        ])->setStatusCode(500);
    }
}