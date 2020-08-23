<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\TimeLine;
use Intervention\Image\Facades\Image;
const STATUSCODE=array(0,1,2,3); 
//0:呟く 1:呟き中 2:呟き済 3:呟き失敗

class TimeLineController extends Controller
{
    //これでAuthのデータを引っ張って来れる？
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function tweetInsert(Request $request)
    {
        try{
        //intervention/imageで画像リサイズ
        $image = Image::make($request->image);
        $image->resize(368,554);
        $image->stream('jpg');

        //return(STATUSCODE[2]);
        return("data:image/jpeg;base64,".base64_encode($image));
        }
        catch(\Exception $e){
            var_dump($e->messege);
        }

        //トランザクション開始
        // DB::beginTransaction();
        
        // try{
            
        //     //DB登録
        //     $time_lines = TimeLine::create([
        //         'user_id'=>Auth::user()->id,
        //         'message'=>$request->message,
        //         'image'=>"data:image/jpeg;base64,".base64_encode($image)
        //     ]);
            
        //     //コミット
        //     DB::commit();
            
        //     //ボタン表示変更用コード返却
        //     return(STATUSCODE[2]);
            
        // }catch(\Exception $e){
        //     //エラー時ロールバック
        //     DB::rollback();
            
        //     //ボタン表示変更用コード返却
        //     return(STATUSCODE[3]);
        // }
    }
}
