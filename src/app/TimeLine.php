<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TimeLine extends Model
{
    protected $fillable = [
        'user_id', 'message', 'image'
    ];
}
