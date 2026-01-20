<?php

use App\Services\CollectionService;
use Phalcon\Mvc\Model\Transaction\Manager as TransactionManager;

return function () {
    return new CollectionService(
        new TransactionManager()
    );
};