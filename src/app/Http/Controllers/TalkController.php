<?php

namespace App\Http\Controllers;

use App\Talk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class TalkController extends Controller
{
    public function getAllFriend()
    {
        //友達リストを取得
        try{
            $friendListId=DB::table('friend_lists as f')
            ->join('users as u',function($join){
                $join->on('u.id','=','f.to_user_id')
                ->where('f.from_user_id','=',Auth::user()->id)
                ->where('f.status','=',3);
            });

            $friendList=$friendListId
            ->select('u.icon','u.name','f.room_id as id','u.profile','f.status')
            ->get();

            $talkList=$friendListId->leftjoin('talks as t',function($join){
                $join->on('f.room_id','=','t.room_id');
            })
            ->select('t.room_id','t.message','t.image','t.from_user_id','t.created_at')
            ->latest()
            ->get();

            return Response::json(['friend'=>$friendList,'talk'=>$talkList]);

        }catch(\Exception $e){
            return($e);

        }
    }
    public function postRequest(Request $request)
    {
        DB::beginTransaction();

        try{
            $new_message=Talk::create([
                'room_id'=>$request->id,
                'from_user_id'=>Auth::user()->id,
                'message'=>$request->message,
                'read_flg'=>0
            ]);

            DB::commit();
        }catch(\Exception $e){

            DB::rollback();
            return($e);

        }
    }
    
}
