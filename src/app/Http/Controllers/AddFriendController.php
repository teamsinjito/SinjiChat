<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
class AddFriendController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getAllUserWithOutFriend()
    {
        try{
            $users = DB::table('users')
                ->where('id','!=',Auth::user()->id)
                ->orderBy('name')
                ->select('icon','name','id')
                ->get();

            return Response::json($users);

        }catch(\Exception $e){
            return($e);
        }
    }
}
