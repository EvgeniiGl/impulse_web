<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Helpers\TranslationHelper;
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
                'message' => TranslationHelper::translate('User not found')
            ])->setStatusCode(404);
        }

        if ($user->block()) {
            return $this->response->setJsonContent([
                'success' => true,
                'message' => TranslationHelper::translate('User blocked')
            ]);
        }

        return $this->response->setJsonContent([
            'success' => false,
            'message' => TranslationHelper::translate('Failed to block user'),
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
                'message' => TranslationHelper::translate('User not found')
            ])->setStatusCode(404);
        }

        if ($user->unblock()) {
            return $this->response->setJsonContent([
                'success' => true,
                'message' => TranslationHelper::translate('User unblocked')
            ]);
        }

        return $this->response->setJsonContent([
            'success' => false,
            'message' => TranslationHelper::translate('Failed to unblock user'),
            'errors'  => $user->getMessages()
        ])->setStatusCode(500);
    }
}