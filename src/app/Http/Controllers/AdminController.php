<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Traits\EditImage;
class AdminController extends Controller
{
    //
    use EditImage;

    public function postNewIcon(Request $request)
    {
        DB::beginTransaction();
        $now = Carbon::now();

        try{
            $newIcons = array();
            foreach($request->icon as $icon){

                $image = $this->ResizeImage($icon);

                array_push($newIcons,array('icon'=>$image, 'created_at' => $now, 'updated_at' => $now));
            }

            $ci = DB::table('icon_lists')->insert($newIcons);

            DB::commit();
        }catch(\Exception $e){
            DB::rollback();
            return($e->message);
        }
    }

    public function postNewStamp(Request $request)
    {
        DB::beginTransaction();
        $now = Carbon::now();

        try{
            $newIcons = array();
            foreach($request->icon as $icon){

                $image = $this->ResizeStamp($icon);

                array_push($newIcons,array('stamp'=>$image, 'created_at' => $now, 'updated_at' => $now));
            }

            $ci = DB::table('stamp_lists')->insert($newIcons);

            DB::commit();
        }catch(\Exception $e){
            DB::rollback();
            return($e->message);
        }
    }
}
