<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use App\FriendList;
use illuminate\Support\Facades\Mail;
use App\Mail\PushNotification;



class AddFriendController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function getAllUserWithOutFriend()
    {
        try{
            $friendList=DB::table('friend_lists as f')
                    ->select('to_user_id as tid','status as st')
                    ->where('from_user_id','=',Auth::user()->id);

            $users=DB::table('users as u')
                    ->leftJoinSub($friendList,'f',function($join){
                        $join->on('u.id','=','f.tid');
                    })
                    ->where('u.id','!=',Auth::user()->id)
                    ->where('u.admin','=','guest')
                    ->select('u.icon','u.name','u.id','u.profile',
                    DB::raw('COALESCE(f.st,0) as status'))
                    ->get();


            return Response::json($users);

        }catch(\Exception $e){
            return($e);
        }
    }

    public function postRequest(Request $request)
    {
        
        DB::beginTransaction();

        try{
            //既にテーブルに追加している場合、不正処理のためステータスコードのみ返す
            $exits = DB::table('friend_lists')
                    ->where('from_user_id','=',Auth::user()->id)
                    ->where('to_user_id','=',$request->to_user_id)
                    ->select('status')
                    ->get();
            if($exits->count() > 0){
                DB::rollBack();
                return($exits);
            } 

            //相手から既に申請が来ている場合、友達追加する
            $to_request = DB::table('friend_lists')
                    ->where('from_user_id','=',$request->to_user_id)
                    ->where('to_user_id','=',Auth::user()->id)
                    ->select('room_id')
                    ->get();
            
            if($to_request->count() ==1){

                $r_str=$to_request[0]->room_id;
                $status=config('const.Request.FRIEND_STATUS.friend');

                //相手側のstatusを更新
                FriendList::where('room_id',$r_str)
                            ->update(['status'=>$status]);

            }else{
                //ランダム文字列作成
                $str = array_merge(range('a', 'z'), range('0', '9'), range('A', 'Z'));
                $r_str = null;
                for ($i = 0; $i < 60; $i++) {
                    $r_str .= $str[rand(0, count($str) - 1)];
                }

                $status=config('const.Request.FRIEND_STATUS.success');
            }

            $friendList = FriendList::create([
                'from_user_id'=>Auth::user()->id,
                'to_user_id'=>$request->to_user_id,
                'room_id'=>$r_str,
                'status'=>$status

            ]);
            // Mail::to('test@example.com')
            // ->send(new PushNotification());
            DB::commit();
            return($friendList->status);




        }catch(\Exception $e){

            DB::rollback();
            return(config('const.Request.FRIEND_STATUS.failed'));

        }
    }
}
