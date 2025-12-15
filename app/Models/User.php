<?php
declare(strict_types=1);

namespace App\Models;

use Phalcon\Encryption\Security;
use Phalcon\Mvc\Model;
use Ramsey\Uuid\Uuid;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property int|null $age
 * @property string $password_hash
 * @property bool $is_active
 * @property string $created_at
 * @property string $updated_at
 */
class User extends Model
{
    public string $id;
    public $name;
    public $email;
    public $age;
    public $password_hash;
    public $is_active = true;
    public $created_at;
    public $updated_at;

    // Virtual property for password (not saved to DB)
    private string $password;

    public function onConstruct()
    {
        $this->id = Uuid::uuid4()->toString();
    }
    public function initialize(): void
    {
        $this->setSource('users');

        $this->hasMany(
            'id',
            Card::class,
            'creator_id',
            ['alias' => 'cards']
        );

        $this->hasManyToMany(
            'id',
            AccessRule::class,
            'user_id',
            'card_id',
            Card::class,
            'id',
            ['alias' => 'sharedCards']
        );
    }

    public function beforeCreate(): void
    {
        $this->id = Uuid::uuid4()->toString();
        $this->created_at = date('Y-m-d H:i:s');
        $this->updated_at = date('Y-m-d H:i:s');

        // Hash password if set
        if (!empty($this->password)) {
            /** @var Security $security */
            $security = $this->getDI()->get('security');
            $this->password_hash = $security->hash($this->password);
        }
    }

    public function beforeUpdate(): void
    {
        $this->updated_at = date('Y-m-d H:i:s');

        // Hash password if changed
        if (!empty($this->password)) {
            /** @var Security $security */
            $security = $this->getDI()->get('security');
            $this->password_hash = $security->hash($this->password);
        }
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    public function verifyPassword(string $password): bool
    {
        /** @var Security $security */
        $security = $this->getDI()->get('security');
        return $security->checkHash($password, $this->password_hash);
    }
}