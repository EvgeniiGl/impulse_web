<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Requests\Auth\LoginRequest;
use Phalcon\Http\Response;

class AuthController extends BaseController
{
    public function loginAction(): Response
    {
       $req = new LoginRequest();
       if($req){

       }
die(
"<pre>".print_r('l', true)."</pre>".
"<pre>File: ".__FILE__.": ".__LINE__."</pre>"
);
        return $this->jsonResponse([
            'success' => true,
            'data'    => ['fdgfg'],
        ]);
    }
}