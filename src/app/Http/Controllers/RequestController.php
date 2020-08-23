<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\FriendList;
use App\GroupList;

class RequestController extends Controller
{


    public function postRequestAllow(Request $request)
    {
        DB::beginTransaction();

        try{
            $r_str=$request->room_id;

            //友達申請の場合
            if($request->type == "Friend"){

                
                // $status=config('const.Request.FRIEND_STATUS.friend');

                //相手側のstatusを更新
                FriendList::where('room_id',$r_str)
                        ->update(['status'=>3]); 

                $friend = DB::table('friend_lists')
                        ->where('room_id',$r_str)
                        ->where('status',3)
                        ->select('to_user_id')
                        ->get();

                //自分用に追加
                $friendList = FriendList::create([
                    'from_user_id'=>Auth::user()->id,
                    'to_user_id'=>$friend,
                    'room_id'=>$r_str,
                    'status'=>3
                ]);

            }else{
                //グループ申請の場合
                $status=config('const.Request.GROUP_STATUS.group');

                GroupList::where('room_id',$r_str)
                            ->where('to_user_id',Auth::user()->id)
                            ->update(['status'=>$status]); 
            }

            DB::commit();

        }catch(\Exception $e){

            DB::rollBack();

        }

    }

    public function postRequestIgnore(Request $request)
    {
        DB::beginTransaction();

        try{

            $r_str=$request->room_id;

            //友達申請の場合
            if($request->type == "Friend"){

                $status=config('const.Request.FRIEND_STATUS.success');

                //相手のレコードを削除
                FriendList::where('room_id',$r_str)
                        ->where('to_user_id',Auth::user()->id)
                        ->where('status',$status)
                        ->delete();
                
            }else{

                //グループ申請の場合
                $status=config('const.Request.GROUP_STATUS.success');
                
                //自分宛の申請レコードを削除
                GroupList::where('room_id',$r_str)
                        ->where('to_user_id',Auth::user()->id)
                        ->where('status',$status)
                        ->delete();
            }

            DB::commit();

        }catch(\Exception $e){

            DB::rollBack();
        }
    }
}
