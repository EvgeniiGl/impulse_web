<?php
declare(strict_types=1);

namespace App\Models;

use Phalcon\Mvc\Model;
use Ramsey\Uuid\Uuid;

/**
 * @property string $id
 * @property string $title
 * @property string|null $description
 * @property string $url
 * @property string $object_path
 * @property string $file_name
 * @property string $original_name
 * @property string $creator_id
 * @property string $access_type
 * @property bool $is_active
 * @property string $created_at
 * @property string $updated_at
 *
 * @property User $creator
 * @property AccessRule[] $accessRules
 */
class Card extends Model
{
    public const string ACCESS_PRIVATE = 'private';
    public const string ACCESS_SHARED  = 'shared';
    public const string ACCESS_PUBLIC  = 'public';

    public ?string $id            = null;
    public string  $title;
    public string  $description;
    public string  $url;
    public string  $object_path   = '';
    public string  $file_name     = '';
    public string  $original_name = '';
    public string  $creator_id;
    public string  $access_type   = self::ACCESS_PRIVATE;
    public bool    $is_active     = true;
    public ?string $created_at    = null;
    public ?string $updated_at    = null;

    public function initialize(): void
    {
        $this->setSource('cards');

        // Связь с создателем
        $this->belongsTo(
            'creator_id',
            User::class,
            'id',
            [
                'alias'    => 'creator',
                'reusable' => true
            ]
        );

        // Связь с правилами доступа
        $this->hasMany(
            'id',
            AccessRule::class,
            'card_id',
            [
                'alias'    => 'accessRules',
                'reusable' => true
            ]
        );

        // Связь с пользователями через правила доступа (многие-ко-многим)
        $this->hasManyToMany(
            'id',
            AccessRule::class,
            'card_id',
            'user_id',
            User::class,
            'id',
            [
                'alias'    => 'sharedUsers',
                'reusable' => true
            ]
        );
    }

    public function beforeCreate(): void
    {
        $this->id         = Uuid::uuid4()->toString();
        $this->created_at = date('Y-m-d H:i:s');
        $this->updated_at = date('Y-m-d H:i:s');

        // Генерация уникального имени файла, если не указано
        if (empty($this->file_name)) {
            $this->file_name = 'card_' . $this->id . '_' . time();
        }

        // Установка оригинального имени, если не указано
        if (empty($this->original_name)) {
            $this->original_name = 'unknown_file';
        }
    }

    public function beforeUpdate(): void
    {
        $this->updated_at = date('Y-m-d H:i:s');
    }

    public function getAccessTypeLabel(): string
    {
        return match ($this->access_type) {
            self::ACCESS_PRIVATE => 'Private',
            self::ACCESS_SHARED => 'Shared',
            self::ACCESS_PUBLIC => 'Public',
            default => 'Unknown'
        };
    }

    /**
     * Проверяет, имеет ли пользователь доступ к карточке
     */
    public function hasAccess(User $user, string $requiredPermission = 'read'): bool
    {
        // Если пользователь - создатель, у него полный доступ
        if ($this->creator_id === $user->id) {
            return true;
        }

        // Для публичных карточек - доступ на чтение всем
        if ($this->access_type === self::ACCESS_PUBLIC && $requiredPermission === 'read') {
            return true;
        }

        // Для общих карточек - проверка правил доступа
        if ($this->access_type === self::ACCESS_SHARED) {
            return $this->checkAccessRule($user, $requiredPermission);
        }

        return false;
    }

    /**
     * Проверяет правило доступа для пользователя
     */
    private function checkAccessRule(User $user, string $requiredPermission): bool
    {
        $accessRule = AccessRule::findFirst([
            'conditions' => 'card_id = :card_id: AND user_id = :user_id:',
            'bind'       => [
                'card_id' => $this->id,
                'user_id' => $user->id
            ]
        ]);

        if (!$accessRule) {
            return false;
        }

        // Проверка уровня доступа
        $permissionHierarchy = [
            'read'  => 1,
            'write' => 2,
            'admin' => 3
        ];

        $userPermissionLevel = $permissionHierarchy[$accessRule->permission] ?? 0;
        $requiredLevel       = $permissionHierarchy[$requiredPermission] ?? 0;

        return $userPermissionLevel >= $requiredLevel;
    }

    /**
     * Добавляет правило доступа для пользователя
     */
    public function addAccessRule(User $user, string $permission = 'read'): bool
    {
        // Проверяем, не существует ли уже правило
        $existingRule = AccessRule::findFirst([
            'conditions' => 'card_id = :card_id: AND user_id = :user_id:',
            'bind'       => [
                'card_id' => $this->id,
                'user_id' => $user->id
            ]
        ]);

        if ($existingRule) {
            $existingRule->permission = $permission;
            return $existingRule->save();
        }

        // Создаем новое правило
        $accessRule             = new AccessRule();
        $accessRule->card_id    = $this->id;
        $accessRule->user_id    = $user->id;
        $accessRule->permission = $permission;

        return $accessRule->save();
    }

    /**
     * Удаляет правило доступа для пользователя
     */
    public function removeAccessRule(User $user): bool
    {
        $accessRule = AccessRule::findFirst([
            'conditions' => 'card_id = :card_id: AND user_id = :user_id:',
            'bind'       => [
                'card_id' => $this->id,
                'user_id' => $user->id
            ]
        ]);

        if ($accessRule) {
            return $accessRule->delete();
        }

        return true;
    }

    /**
     * Получает всех пользователей с доступом к карточке
     */
    public function getUsersWithAccess(): array
    {
        $users = [];

        // Добавляем создателя
        $creator = $this->getCreator();
        if ($creator) {
            $users[] = [
                'user'       => $creator,
                'permission' => 'admin',
                'is_creator' => true
            ];
        }

        // Добавляем пользователей из правил доступа
        $accessRules = $this->getAccessRules([
            'conditions' => 'card_id = :card_id:',
            'bind'       => ['card_id' => $this->id],
            'with'       => ['user']
        ]);

        foreach ($accessRules as $accessRule) {
            $user = $accessRule->getUser();
            if ($user) {
                $users[] = [
                    'user'       => $user,
                    'permission' => $accessRule->permission,
                    'is_creator' => false
                ];
            }
        }

        return $users;
    }

    /**
     * Проверяет уникальность имени файла
     */
    public function validation(): bool
    {
        $validator = new \Phalcon\Filter\Validation();

        $validator->add(
            'file_name',
            new \Phalcon\Filter\Validation\Validator\Uniqueness([
                'model'   => $this,
                'message' => 'File name must be unique'
            ])
        );

        $validator->add(
            'access_type',
            new \Phalcon\Filter\Validation\Validator\InclusionIn([
                'domain'  => [
                    self::ACCESS_PRIVATE,
                    self::ACCESS_SHARED,
                    self::ACCESS_PUBLIC
                ],
                'message' => 'Invalid access type'
            ])
        );

        return $this->validate($validator);
    }
}