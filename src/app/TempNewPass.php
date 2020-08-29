<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TempNewPass extends Model
{
    //
    protected $fillable = [
        'user_id', 'password'
    ];
}
