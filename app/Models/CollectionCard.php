<?php

declare(strict_types=1);

namespace App\Models;

use Phalcon\Mvc\Model;
use Ramsey\Uuid\Uuid;

/**
 * @property string $id
 * @property string $collection_id
 * @property string $card_id
 * @property string $created_at
 * @property string $updated_at
 *
 * @property Collection $collection
 * @property Card $card
 */
class CollectionCard extends Model
{
    public ?string $id         = null;
    public string  $collection_id;
    public string  $card_id;
    public ?string $created_at = null;
    public ?string $updated_at = null;

    public function initialize(): void
    {
        $this->setSource('collection_card');

        $this->belongsTo(
            'collection_id',
            Collection::class,
            'id',
            [
                'alias'    => 'collection',
                'reusable' => true
            ]
        );

        $this->belongsTo(
            'card_id',
            Card::class,
            'id',
            [
                'alias'    => 'card',
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

    /**
     * Получить коллекцию
     */
    public function getCollection(): ?Collection
    {
        return $this->getRelated('collection');
    }

    /**
     * Получить карточку
     */
    public function getCard(): ?Card
    {
        return $this->getRelated('card');
    }
}