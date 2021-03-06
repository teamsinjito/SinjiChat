<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\TimeLine;
use App\Http\Traits\EditImage;

class TimeLineController extends Controller
{
    use EditImage;

    //これでAuthのデータを引っ張って来れる？
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function tweetInsert(Request $request)
    {
        try{
        // トランザクション開始
        DB::beginTransaction();
        

            //リサイズ処理呼び出し
            $image=$this->ResizeImage($request->image);

            //DB登録
            $time_lines = TimeLine::create([
                'user_id'=>Auth::user()->id,
                'message'=>$request->message,
                'image'=>$image
            ]);
            
            //コミット
            DB::commit();

            
        }catch(\Exception $e){
            //エラー時ロールバック
            DB::rollback();
            
        }
    }

    public function getTweetData()
    {
        try{
            // 最新データを10件取得
            $timeLineData = DB::table('time_lines as t')
                        ->join('users as u',function($join){
                            $join->on('u.id','=','t.user_id');
                        })
                        ->select('t.id','u.name','t.message','t.image')
                        ->orderBy('t.id', 'DESC')
                        ->take(10)
                        ->get();
                        
            return Response::json($timeLineData);


        }
        catch(\Exception $e){

            return($e);

        }
    }
    public function getOldTweetData(Request $request)
    {
        try{
            // 最新データを10件取得
            $timeLineData = DB::table('time_lines as t')
                        ->join('users as u',function($join){
                            $join->on('u.id','=','t.user_id');
                        })
                        ->where('t.id','<',$request->id)
                        ->select('t.id','u.name','t.message','t.image')
                        ->orderBy('t.id', 'DESC')
                        ->take(10)
                        ->get();
                        
            return Response::json($timeLineData);


        }
        catch(\Exception $e){

            return($e);

        }
    }
}
