<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\User;
use App\TempNewPass;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\EditMailRequest;
use App\Http\Requests\EditPasswordRequest;


class SequrityController extends Controller
{


    public function matchPassword(Request $request)
    {
        try{
            $user = User::find(Auth::user()->id);
            $inputPass=$request->password;
    
            if(Hash::check($inputPass,$user->password)){
                //一致した場合
                return 0;
            }else{
                //不一致した場合
                return 1;
            }
        }catch(\Exception $e){
            return 1;
        }

        
    }

    public function postNewMail(EditMailRequest $request)
    {


        User::where('id',Auth::user()->id)
            ->update([
                'email'=>$request->email
            ]);

    }
    public function validateNewPassword(EditPasswordRequest $request)
    {
        TempNewPass::where('user_id',Auth::user()->id)
                    ->delete();
        
        $new_message=TempNewPass::create([
            'user_id'=>Auth::user()->id,
            'password'=>Hash::make($request->password)
        ]);
    }

    public function postNewPassword(Request $request)
    {
        DB::beginTransaction();

        try{
            $temp =TempNewPass::where('user_id',Auth::user()->id)->get();
            $inputPass=$request->password;
    
            if(Hash::check($inputPass,$temp[0]->password)){
    
                TempNewPass::where('user_id',Auth::user()->id)
                ->delete(); 
    
                User::where('id',Auth::user()->id)
                ->update([
                    'password'=>Hash::make($request->password),
                ]);

                DB::commit();
                return 0;

            }else{

                DB::rollBack();
                return 1;
            }
        }catch(\Exception $e){

            DB::rollback();
            return($e);
        }


    }
}
