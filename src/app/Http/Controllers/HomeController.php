<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    ///メイン画面表示時、ユーザ関連データを全て取得
    public function getMyRelationData()
    {

        try{
            //自分のデータを取得
            $me = DB::table('users')
                ->where('id','=',Auth::user()->id)
                ->select('name','icon','profile')
                ->get();

            //友達データを取得
            $friendListId=DB::table('friend_lists as f')
            ->join('users as u',function($join){
                $join->on('u.id','=','f.to_user_id')
                ->where('f.from_user_id','=',Auth::user()->id)
                ->where('f.status','=',config('const.Request.FRIEND_STATUS.friend'));
            });
            $friendListId2=DB::table('friend_lists as f2')
            ->join('users as u2',function($join){
                $join->on('u2.id','=','f2.to_user_id')
                ->where('f2.from_user_id','=',Auth::user()->id)
                ->where('f2.status','=',config('const.Request.FRIEND_STATUS.friend'));
            });
            //自分のグループリストを取得
            $groupListId=DB::table('group_lists as gl')
            ->join('groups as g',function($join){
                $join->on('g.id','=','gl.group_id')
                ->where('gl.to_user_id','=',Auth::user()->id)
                ->where('gl.status','=',config('const.Request.GROUP_STATUS.group'));
            });
            $groupListId2=DB::table('group_lists as gl2')
            ->join('groups as g2',function($join){
                $join->on('g2.id','=','gl2.group_id')
                ->where('gl2.to_user_id','=',Auth::user()->id)
                ->where('gl2.status','=',config('const.Request.GROUP_STATUS.group'));
            });

            //ルーム毎の未読メッセージ数取得new_messages
            $unRead=DB::table('new_messages as t3')
                    ->groupBy('t3.room_id','t3.read_flg','t3.to_user_id')
                    ->having('t3.to_user_id','=',Auth::user()->id)
                    ->having('t3.read_flg','=',0)
                    ->select('t3.room_id',DB::raw('count(t3.read_flg) as new'));
            //ルーム毎の未読メッセージ数取得new_messages
            $unRead2=DB::table('new_messages as t4')
                    ->groupBy('t4.room_id','t4.read_flg','t4.to_user_id')
                    ->having('t4.to_user_id','=',Auth::user()->id)
                    ->having('t4.read_flg','=',0)
                    ->select('t4.room_id',DB::raw('count(t4.read_flg) as new'));

            //友達リストを抽出
            $friendList=$friendListId2->leftjoinSub($unRead,'ur',function($join){
                $join->on('f2.room_id','=','ur.room_id');
            })
            ->select('u2.icon','u2.name','f2.room_id as id','u2.profile','f2.status','ur.new');

            //グループリストを抽出
            $groupList = $groupListId->leftJoinSub($unRead2,'ur2',function($join){
                $join->on('gl.room_id','=','ur2.room_id');
            })
            ->select('g.icon','g.name','gl.room_id as id','g.profile','gl.status','ur2.new');

            $friendGroupList=$friendList->union($groupList)
            ->get();

            //友達とのトークリストを抽出
            $talkList=$friendListId->rightjoin('talks as t',function($join){
                $join->on('f.room_id','=','t.room_id');
            })
            ->join('users as u2',function($join){
                $join->on('u2.id','=','t.from_user_id');
            })
            ->select('t.room_id','t.message','t.image',DB::raw("CASE WHEN t.from_user_id =".Auth::user()->id." THEN 0 ELSE ".'t.from_user_id END'),'u2.icon','u2.profile','t.read_flg','t.created_at')
            ->orderBy('t.created_at');

            //グループ内のトークリストを抽出
            $groupTalkList=$groupListId2->rightJoin('talks as t2',function($join){
                $join->on('gl2.room_id','=','t2.room_id');
            })
            ->join('users as u3',function($join){
                $join->on('u3.id','=','t2.from_user_id');
            })
            ->select('t2.room_id','t2.message','t2.image',DB::raw("CASE WHEN t2.from_user_id =".Auth::user()->id." THEN 0 ELSE ".'t2.from_user_id END'),'u3.icon','u3.profile','t2.read_flg','t2.created_at')
            ->orderBy('t2.created_at');

            $friendGroupTalkList=$talkList->union($groupTalkList)->orderBy('created_at')->get();

            //友達申請およびグループ申請のリクエストを取得
            $friendRequest=DB::table('friend_lists as f3')
            ->join('users as u3',function($join){
                $join->on('u3.id','=','f3.from_user_id')
                ->where('f3.to_user_id','=',Auth::user()->id)
                ->where('f3.status','=',config('const.Request.FRIEND_STATUS.success'));
            })
            ->select('f3.room_id','u3.name','u3.profile','u3.icon','f3.created_at',DB::raw("'Friend' as requesttype"));

            $groupRequest=DB::table('group_lists as gl')
            ->join('groups as g',function($join){
                $join->on('g.id','=','gl.group_id')
                ->where('gl.to_user_id','=',Auth::user()->id)
                ->where('gl.status','=',config('const.Request.GROUP_STATUS.success'));
            })
            ->select('gl.room_id','g.name','g.profile','g.icon','gl.created_at',DB::raw("'Group' as requesttype"));


            $friendAndGroupRequest=$friendRequest->union($groupRequest)
                                    ->orderBy('created_at','DESC')
                                    ->get();

            return Response::json([
                'friend'=>$friendGroupList,
                'talk'=>$friendGroupTalkList,
                'request'=>$friendAndGroupRequest,
                'me'=>$me
            ]);

        }catch(\Exception $e){

            return($e);

        }

    }
}
