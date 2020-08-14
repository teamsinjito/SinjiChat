<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NewMessage extends Model
{
    //
    protected $fillable = [
        'room_id', 'to_user_id', 'read_flg','created_at','updated_at'
    ];
}
