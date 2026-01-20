<?php

declare(strict_types=1);

namespace App\Models;

use Phalcon\Mvc\Model;
use Ramsey\Uuid\Uuid;

class CollectionCard extends Model
{
    public ?string $id         = null;
    public string  $collection_id;
    public string  $card_id;
    public ?string $created_at = null;

    public function initialize(): void
    {
        $this->setSource('collection_card');

        $this->belongsTo(
            'collection_id',
            Collection::class,
            'id',
            ['alias' => 'collection']
        );

        $this->belongsTo(
            'card_id',
            Card::class,
            'id',
            ['alias' => 'card']
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
}
