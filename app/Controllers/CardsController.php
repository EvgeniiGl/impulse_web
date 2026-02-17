<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Exceptions\UnauthorizedException;
use App\Helpers\TranslationHelper;
use App\Requests\Card\CreateCardRequest;
use App\Requests\Card\UpdateCardRequest;
use App\Services\CardService;
use App\Models\Card;
use App\Models\User;
use Exception;

class CardsController extends BaseController
{
    private CardService $cardService;

    /**
     * @throws UnauthorizedException
     */
    public function onConstruct(): void
    {
        $this->cardService = $this->di->get('cardService');
        parent::onConstruct();
    }

    /**
     * Создание карточки
     */
    public function createAction(): \Phalcon\Http\Response
    {
        try {
            // Получаем текущего пользователя из JWT
            $user = $this->getAuthenticatedUser();
            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Authentication required')
                ], 401);
            }

            // Получаем данные из запроса
            $data = $this->request->getPost();
            $file = $this->request->getUploadedFiles();
            $file = !empty($file) ? $file[0] : null;

            if (!$file) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('File required')
                ], 422);
            }

            $request = new CreateCardRequest($data, $file);

            // Создаем карточку
            $card = $this->cardService->createCard($request, $user);

            return $this->jsonResponse([
                'success' => true,
                'data'    => [
                    'id'            => $card->id,
                    'title'         => $card->title,
                    'description'   => $card->description,
                    'url'           => $card->url,
                    'object_path'   => $card->object_path,
                    'file_name'     => $card->file_name,
                    'original_name' => $card->original_name,
                    'access_type'   => $card->access_type,
                    'creator_id'    => $card->creator_id,
                    'created_at'    => $card->created_at,
                    'updated_at'    => $card->updated_at,
                ]
            ], 201);

        } catch (Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Получение карточки по ID
     */
    public function getAction(string $id): \Phalcon\Http\Response
    {
        try {
            $user = $this->getAuthenticatedUser();
            $card = Card::findFirst([
                'conditions' => 'id = :id:',
                'bind'       => ['id' => $id]
            ]);

            if (!$card) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Card not found')
                ], 404);
            }

            // Проверяем доступ
            if (!$card->hasAccess($user)) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Access denied')
                ], 403);
            }

            // Получаем создателя
            $creator = $card->getCreator();

            return $this->jsonResponse([
                'success' => true,
                'data'    => [
                    'card' => [
                        'id'                  => $card->id,
                        'title'               => $card->title,
                        'description'         => $card->description,
                        'url'                 => $card->url,
                        'object_path'         => $card->object_path,
                        'file_name'           => $card->file_name,
                        'original_name'       => $card->original_name,
                        'access_type'         => $card->access_type,
                        'access_type_label'   => $card->getAccessTypeLabel(),
                        'is_active'           => $card->is_active,
                        'show_title_on_image' => $card->show_title_on_image,
                        'creator'             => $creator ? [
                            'id'    => $creator->id,
                            'name'  => $creator->name,
                            'email' => $creator->email
                        ] : null,
                        'created_at'          => $card->created_at,
                        'updated_at'          => $card->updated_at,
                    ]
                ]
            ]);

        } catch (Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Получение всех карточек пользователя
     */
    public function indexAction(): \Phalcon\Http\Response
    {
        try {
            $user = $this->getAuthenticatedUser();
            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Authentication required')
                ], 401);
            }

            // Получаем все доступные карточки
            $accessibleCards = $user->getAllAccessibleCards();

            $cards = [];
            foreach ($accessibleCards as $cardData) {
                $card    = $cardData['card'];
                $cards[] = [
                    'id'                => $card->id,
                    'title'             => $card->title,
                    'description'       => $card->description,
                    'url'               => $card->url,
                    'access_type'       => $card->access_type,
                    'access_type_label' => $card->getAccessTypeLabel(),
                    'access_level'      => $cardData['permission'],
                    'is_owner'          => $cardData['access_type'] === 'owner',
                    'creator_id'        => $card->creator_id,
                    'created_at'        => $card->created_at,
                    'updated_at'        => $card->updated_at,
                ];
            }

            return $this->jsonResponse([
                'success' => true,
                'data'    => [
                    'cards' => $cards,
                    'total' => count($cards)
                ]
            ]);

        } catch (Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Обновление карточки
     */
    public function updateAction(string $id): \Phalcon\Http\Response
    {
        try {
            $user = $this->getAuthenticatedUser();
            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Authentication required')
                ], 401);
            }

            $card = Card::findFirst([
                'conditions' => 'id = :id:',
                'bind'       => ['id' => $id]
            ]);

            if (!$card) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Card not found')
                ], 404);
            }

            $data    = $this->request->getPut();
            $file    = $this->request->getUploadedFiles();
            $file    = !empty($file) ? $file[0] : null;
            $request = new UpdateCardRequest($data, $file ? $file->toArray() : null);

            // Обновляем карточку
            $updatedCard = $this->cardService->updateCard($card, $request, $user);

            return $this->jsonResponse([
                'success' => true,
                'data'    => [
                    'card' => [
                        'id'          => $updatedCard->id,
                        'title'       => $updatedCard->title,
                        'description' => $updatedCard->description,
                        'url'         => $updatedCard->url,
                        'access_type' => $updatedCard->access_type,
                        'updated_at'  => $updatedCard->updated_at,
                    ]
                ]
            ]);

        } catch (Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Удаление карточки
     */
    public function deleteAction(string $id): \Phalcon\Http\Response
    {
        try {
            $user = $this->getAuthenticatedUser();
            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Authentication required')],
                    401);
            }

            $card = Card::findFirst([
                'conditions' => 'id = :id:',
                'bind'       => ['id' => $id]
            ]);

            if (!$card) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Card not found')
                ], 404);
            }

            $this->cardService->deleteCard($card, $user);

            return $this->jsonResponse([
                'success' => true,
                'message' => TranslationHelper::translate('Card deleted successfully')
            ]);

        } catch (Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Получение карточек пользователя: созданные им + с правом записи (write/admin)
     */
    public function myAction(): \Phalcon\Http\Response
    {
        try {
            $user = $this->getAuthenticatedUser();
            if (!$user) {
                return $this->jsonResponse([
                    'success' => false,
                    'error'   => TranslationHelper::translate('Authentication required')
                ], 401);
            }

            $accessibleCards = $user->getMyCardsWithWriteAccess();
            $cards           = [];

            foreach ($accessibleCards as $cardData) {
                /** @var Card $card */
                $card    = $cardData['card'];
                $cards[] = [
                    'id'                  => $card->id,
                    'title'               => $card->title,
                    'description'         => $card->description,
                    'url'                 => $card->url,
                    'access_type'         => $card->access_type,
                    'access_type_label'   => $card->getAccessTypeLabel(),
                    'access_level'        => $cardData['permission'],
                    'is_owner'            => $cardData['access_type'] === 'owner',
                    'creator_id'          => $card->creator_id,
                    'created_at'          => $card->created_at,
                    'updated_at'          => $card->updated_at,
                    'show_title_on_image' => $card->show_title_on_image,
                    'is_active'           => $card->is_active,
                ];
            }

            // Сортировка: сначала свои, затем по дате создания (новые выше)
            usort($cards, function ($a, $b) {
                if ($a['is_owner'] !== $b['is_owner']) {
                    return $b['is_owner'] <=> $a['is_owner']; // Свои в начало
                }
                return strtotime($b['created_at']) <=> strtotime($a['created_at']);
            });

            return $this->jsonResponse([
                'success' => true,
                'data'    => [
                    'cards' => $cards,
                    'total' => count($cards)
                ]
            ]);

        } catch (Exception $e) {
            return $this->jsonResponse([
                'success' => false,
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}