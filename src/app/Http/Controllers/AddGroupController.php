<?php

namespace App\Http\Controllers;

use App\Group;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use App\Http\Traits\EditImage;

class AddGroupController extends Controller
{
    //
    use EditImage;

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getMyFriend()
    {
        try{

            $friendList=DB::table('friend_lists as f')
            ->join('users as u',function($join){
                $join->on('u.id','=','f.to_user_id')
                ->where('f.from_user_id','=',Auth::user()->id)
                ->where('f.status','=',config('const.Request.FRIEND_STATUS.friend'));
            })
            ->select('u.icon','u.name','u.id','u.profile',
            DB::raw("false as checked"))
            ->get();

            return Response::json($friendList);

        }catch(\Exception $e){
            return($e);
        }
    }

    public function postRequest(Request $request)   
    {
        DB::beginTransaction();
        $now = Carbon::now();
        try{

            //intervention/imageで画像リサイズ
            $image = $this->ResizeImage($request->icon);

            //新しいグループを作成
            $newGroup = Group::create([
                'name'=>$request->name,
                'profile'=>$request->profile,
                'icon'=>$image,
            ]);

            //画面で選択したユーザをグループリストに追加
            $arrayToUserId = array();

            //ランダム文字列作成
            $str = array_merge(range('a', 'z'), range('0', '9'), range('A', 'Z'));
            $r_str = null;
            for ($i = 0; $i < 60; $i++) {
                $r_str .= $str[rand(0, count($str) - 1)];
            }

            //自身をグループリストに追加
            array_push($arrayToUserId,array(
                'group_id' => $newGroup->id,
                'to_user_id' => Auth::user()->id,
                'room_id' => $r_str,
                'status' => config('const.Request.GROUP_STATUS.group'),
                'created_at' => $now,
                'updated_at' => $now
            ));

            //選択ユーザ
            foreach ($request->to_user_id as $uid){
                array_push($arrayToUserId,array(
                    'group_id' => $newGroup->id,
                    'to_user_id' => $uid,
                    'room_id' => $r_str,
                    'status' => config('const.Request.GROUP_STATUS.success'),
                    'created_at' => $now,
                    'updated_at' => $now
                ));
            }

            $gl=DB::table(('group_lists'))
                    ->insert($arrayToUserId);
            
            DB::commit();

            return(config('const.Request.GROUP_STATUS.group'));

        }catch(\Exception $e){

            DB::rollback();
            return(config('const.Request.GROUP_STATUS.failed'));

        }
    }
}
