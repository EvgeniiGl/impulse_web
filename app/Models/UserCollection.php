<?php

declare(strict_types=1);

namespace App\Models;

use Phalcon\Mvc\Model;

class UserCollection extends Model
{
    public int    $id;
    public int    $collection_id;
    public int    $user_id;
    public string $created_at;

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
}
