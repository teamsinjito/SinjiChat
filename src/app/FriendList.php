<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FriendList extends Model
{
    //
    protected $fillable = [
        'from_user_id', 'to_user_id', 'room_id','status'
    ];
}
