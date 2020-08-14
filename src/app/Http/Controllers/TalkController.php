<?php

namespace App\Http\Controllers;

use App\Talk;
use App\GroupList;
use App\NewMessage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Intervention\Image\Facades\Image;

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
        $now = Carbon::now();
        try{
            //new_messagesテーブルに追加
            $group_user_id = DB::table('group_lists')
                            ->where('room_id','=',$request->id)
                            ->select('to_user_id');
            $others_user_id=DB::table('friend_lists')
                            ->where('room_id','=',$request->id)
                            ->where('to_user_id','<>',Auth::user()->id)
                            ->select('to_user_id')
                            ->union($group_user_id)
                            ->get();
            $arrayOtherId = array();
            foreach ( $others_user_id as $oid){
                array_push($arrayOtherId,array('room_id' => $request->id, 'to_user_id' => $oid->to_user_id , 'read_flg' => 0, 'created_at' => $now, 'updated_at' => $now));
            }
            $ci = DB::table('new_messages')
                    ->insert($arrayOtherId);

            //トークテーブルに追加
            $new_message=Talk::create([
                'room_id'=>$request->id,
                'from_user_id'=>Auth::user()->id,
                'message'=>$request->message,
                'read_flg'=>0
            ]);

            DB::commit();
        }catch(\Exception $e){

            DB::rollback();
            return($e->message);

        }
    }

    public function imagePostRequest(Request $request)
    {
        DB::beginTransaction();
        $now = Carbon::now();
        try{
            //new_messagesテーブルに追加
            $group_user_id = DB::table('group_lists')
                            ->where('room_id','=',$request->id)
                            ->select('to_user_id');
            $others_user_id=DB::table('friend_lists')
                            ->where('room_id','=',$request->id)
                            ->where('to_user_id','<>',Auth::user()->id)
                            ->select('to_user_id')
                            ->union($group_user_id)
                            ->get();
            $arrayOtherId = array();
            foreach ( $others_user_id as $oid){
                array_push($arrayOtherId,array('room_id' => $request->id, 'to_user_id' => $oid->to_user_id , 'read_flg' => 0, 'created_at' => $now, 'updated_at' => $now));
            }
            $ci = DB::table('new_messages')
                    ->insert($arrayOtherId);

            //トークテーブルに追加
            $new_message=Talk::create([
                'room_id'=>$request->id,
                'from_user_id'=>Auth::user()->id,
                'image'=>$request->image,
                'read_flg'=>0
            ]);

            DB::commit();
        }catch(\Exception $e){

            DB::rollback();
            return($e->message);

        }
    }
    public function upDateReadFlg(Request $request)
    {
        DB::beginTransaction();

        try{

            NewMessage::where('room_id',$request->room_id)
                ->where('to_user_id',Auth::user()->id)
                ->where('read_flg',0)
                ->delete();

            DB::commit();
        }catch(\Exception $e){

            DB::rollback();
            return($e);

        }
    }
    
}
