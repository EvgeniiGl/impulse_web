<?php

declare(strict_types=1);

namespace App\Models;

use Phalcon\Mvc\Model;
use Ramsey\Uuid\Uuid;

class UserCollection extends Model
{
    public ?string $id         = null;
    public string  $collection_id;
    public string  $user_id;
    public ?string $created_at = null;
    public ?string $updated_at = null;

    public function initialize(): void
    {
        $this->setSource('user_collection');

        $this->belongsTo(
            'collection_id',
            Collection::class,
            'id',
            ['alias' => 'collection']
        );

        $this->belongsTo(
            'user_id',
            User::class,
            'id',
            ['alias' => 'user']
        );

        $this->addBehavior(
            new \Phalcon\Mvc\Model\Behavior\Timestampable([
                'beforeCreate' => [
                    'field'  => 'created_at',
                    'format' => 'Y-m-d H:i:s',
                ]
            ])
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
}
