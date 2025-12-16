<?php
declare(strict_types=1);

namespace App\Models;

use Phalcon\Mvc\Model;
use Ramsey\Uuid\Uuid;

/**
 * @property string $id
 * @property string $card_id
 * @property string $user_id
 * @property string $permission
 * @property string $created_at
 * @property string $updated_at
 *
 * @property Card $card
 * @property User $user
 */
class AccessRule extends Model
{
    public const string PERMISSION_READ  = 'read';
    public const string PERMISSION_WRITE = 'write';
    public const string PERMISSION_ADMIN = 'admin';

    public string $id;
    public string $card_id;
    public string $user_id;
    public string $permission = self::PERMISSION_READ;
    public string $created_at;
    public string $updated_at;

    public function initialize(): void
    {
        $this->setSource('access_rules');

        // Связь с карточкой
        $this->belongsTo(
            'card_id',
            Card::class,
            'id',
            [
                'alias'    => 'card',
                'reusable' => true
            ]
        );

        // Связь с пользователем
        $this->belongsTo(
            'user_id',
            User::class,
            'id',
            [
                'alias'    => 'user',
                'reusable' => true
            ]
        );
    }

    public function beforeCreate(): void
    {
        $this->id         = Uuid::uuid4()->toString();
        $this->created_at = date('Y-m-d H:i:s');
        $this->updated_at = date('Y-m-d H:i:s');
    }

    public function beforeUpdate(): void
    {
        $this->updated_at = date('Y-m-d H:i:s');
    }

    public function getPermissionLabel(): string
    {
        return match ($this->permission) {
            self::PERMISSION_READ => 'Read Only',
            self::PERMISSION_WRITE => 'Read & Write',
            self::PERMISSION_ADMIN => 'Administrator',
            default => 'Unknown'
        };
    }

    /**
     * Проверяет, имеет ли правило достаточный уровень доступа
     */
    public function hasPermission(string $requiredPermission): bool
    {
        $permissionHierarchy = [
            self::PERMISSION_READ  => 1,
            self::PERMISSION_WRITE => 2,
            self::PERMISSION_ADMIN => 3
        ];

        $userPermissionLevel = $permissionHierarchy[$this->permission] ?? 0;
        $requiredLevel       = $permissionHierarchy[$requiredPermission] ?? 0;

        return $userPermissionLevel >= $requiredLevel;
    }

    public function validation(): bool
    {
        $validator = new \Phalcon\Filter\Validation();

        $validator->add(
            'permission',
            new \Phalcon\Filter\Validation\Validator\InclusionIn([
                'domain'  => [
                    self::PERMISSION_READ,
                    self::PERMISSION_WRITE,
                    self::PERMISSION_ADMIN
                ],
                'message' => 'Invalid permission type'
            ])
        );

        // Проверка уникальности комбинации card_id + user_id
        $validator->add(
            ['card_id', 'user_id'],
            new \Phalcon\Filter\Validation\Validator\Uniqueness([
                'model'   => $this,
                'message' => 'Access rule for this user and card already exists'
            ])
        );

        return $this->validate($validator);
    }
}