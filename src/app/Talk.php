<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Talk extends Model
{
    //
    protected $fillable = [
        'room_id', 'from_user_id', 'message','image','read_flg'
    ];
}
