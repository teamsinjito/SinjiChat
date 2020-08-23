<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GroupList extends Model
{
    //
    protected $fillable = [
        'group_id','to_user_id', 'room_id', 'status','created_at','updated_at'
    ];
}
