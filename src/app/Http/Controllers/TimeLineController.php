<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\TimeLine;
use Intervention\Image\Facades\Image;
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

    public function getTweetData(Request $request)
    {
        try{
            // 最新データを10件取得
            $timeLineData = DB::table('time_lines')
            ->orderBy('id', 'DESC')
            ->take(10)
            ->get();
        }
        catch(\Exception $e){
            return($e);
        }
        return($timeLineData);
    }
}
