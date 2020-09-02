<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Http\Traits\EditImage;


class OptionController extends Controller
{
    //
    use EditImage;
    
    public function postRequest(Request $request)
    {

        DB::beginTransaction();

        try{
            //intervention/imageで画像リサイズ
            $image = $this->ResizeImage($request->image);

            User::where('id',Auth::user()->id)
                ->update([
                    'name'=>$request->name,
                    'profile'=>$request->profile,
                    'icon'=>$image
                ]);

            DB::commit();

        }catch(\Exception $e){

            DB::rollBack();

        }
    }
}
