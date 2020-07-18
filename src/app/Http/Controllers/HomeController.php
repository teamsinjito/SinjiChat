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

            //友達データを取得
            $friendListId=DB::table('friend_lists as f')
            ->join('users as u',function($join){
                $join->on('u.id','=','f.to_user_id')
                ->where('f.from_user_id','=',Auth::user()->id)
                ->where('f.status','=',config('const.Request.FRIEND_STATUS.friend'));
            });

            //友達リストを抽出
            $friendList=$friendListId
            ->select('u.icon','u.name','f.room_id as id','u.profile','f.status')
            ->get();

            //友達とのトークリストを抽出
            $talkList=$friendListId->rightjoin('talks as t',function($join){
                $join->on('f.room_id','=','t.room_id');
            })
            ->select('t.room_id','t.message','t.image',DB::raw("CASE WHEN t.from_user_id =".Auth::user()->id." THEN 0 ELSE ".'t.from_user_id END'),'u.icon','u.profile','t.created_at')
            ->orderBy('t.created_at')
            ->get();

            

            return Response::json([
                'friend'=>$friendList,
                'talk'=>$talkList,
                'me'=>Auth::user()->id
            ]);

        }catch(\Exception $e){

            return($e);

        }

    }
}
