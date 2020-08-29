@extends('layouts.app')

@section('content')
<div class="login-area h-100">
    <div class="col-md-7 col-12" id="titleside">
        <div class="title-side-parent">
            <div class="title-side-children">  
                <p class="title-white title_w">
                    SinjiChat
                </p>
            </div>
        </div>
    </div>
    <form class="col-md-5 col-12 h-100 form-area white_touka text-center" method="POST" action="{{ route('register') }}" enctype="multipart/form-data">
        <h1 class="title_B mt-5">SinjiChat</h1>
        <div class="form-inner-area h-50">

            <div class="h-100 login-form">
                @csrf
                <div class="login-form-area in-register h-100 w-100">


                    <div class="form-group row mt-4">
        
                        <div class="cp_iptxt p-0  col-8 offset-2">
                            <input id="name" type="text" class="txt_M @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" placeholder="Name" maxlength="20" autocomplete="name" autofocus>
                            @error('name')
                                <div class="error-form-group w-100 p-2 txt_XS">
                                    <em>{{ $message }}</em>
                                </div>
                            @enderror
                        </div>
                    </div>
        
                    <div class="form-group row mt-4">
                        <div class="cp_iptxt p-0  col-8 offset-2">
                            <input id="email" type="text" class="txt_M @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" placeholder="E-mail" maxlength="60" autocomplete="email">
                            @error('email')
                                <div class="error-form-group w-100 p-2 txt_XS">
                                    <em>{{ $message }}</em>
                                </div>
                            @enderror
                        </div>      
        
                    </div>

                    <div class="form-group row mt-4">
                        <div class="cp_iptxt p-0  col-8 offset-2">
                            <input id="password" type="password" class="txt_M @error('password') is-invalid @enderror" name="password" placeholder="Password" maxlength="60" autocomplete="new-password">
                            @error('password')
                                <div class="error-form-group w-100 p-2 txt_XS">
                                    <em>{{ $message }}</em>
                                </div>
                            @enderror
                        </div>
                    </div>
                    <div class="form-group row mt-4">
                        <div class="cp_iptxt p-0  col-8 offset-2">
                            <input id="password-confirm" type="password" class="txt_M" name="password_confirmation" placeholder="Password-Confirm" maxlength="60" autocomplete="new-password">
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="button-form w-100">
            <div class="col-5">
                <button type="submit" class="w-100 commonBtn"><span class="txt_M">Sign-Up</span></button>
            </div>
        </div>
        <div class="mt-5 w-100">
            <a href="{{ route('login') }}">{{ __('Sign-In') }}</a>
            
        </div>
    </form>
</div>





@endsection
