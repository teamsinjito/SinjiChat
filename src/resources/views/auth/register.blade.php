@extends('layouts.app')

@section('content')
<div class="login-area h-100">
    <div class="col-md-7" id="titleside"></div>
    <form class="col-md-5 form-area white_touka text-center" method="POST" action="{{ route('register') }}" enctype="multipart/form-data">
        <h1 class="title_B mt-5 mb-5">SinjiChat</h1>
        <div class="form-area h-50">

            <div class="mt-5 login-form">
                @csrf
                <div class="login-form-area w-100">

                    <!-- 仮 -->
                    <div class="form-group row mt-4">
                    <div class="col-md-6 offset-md-4 offset-3 image-area">
                                    <input type="file" id="file" accept="image/*" name="image">
                                @error('image')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                    </div>
                    <!-- ここまで仮 -->
                    <div class="form-group row mt-4">
        
                        <div class="cp_iptxt col-8 offset-2">
                            <input id="name" type="text" class="txt_M @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" placeholder="Name" maxlength="20"　required autocomplete="name" autofocus>
                            @error('name')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
        
                    <div class="form-group row mt-4">
                        <div class="cp_iptxt col-8 offset-2">
                            <input id="email" type="email" class="txt_M @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" placeholder="E-mail" maxlength="60" required autocomplete="email">
                        </div>      
                        @error('email')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
        
                    </div>

                    <div class="form-group row mt-4">
                        <div class="cp_iptxt col-8 offset-2">
                            <input id="password" type="password" class="txt_M @error('password') is-invalid @enderror" name="password" placeholder="Password" maxlength="60"required autocomplete="new-password">
                        </div>
                        @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                        @enderror
                    </div>
                    <div class="form-group row mt-4">
                        <div class="cp_iptxt col-8 offset-2">
                            <input id="password-confirm" type="password" class="txt_M" name="password_confirmation" placeholder="Password-Confirm" maxlength="60" required autocomplete="new-password">
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="button-form w-100">
            <div class="col-5">
                <button type="submit" class="w-100 commonBtn"><span class="txt_M">Sign up</span></button>
            </div>
        </div>
        <a href="{{ route('login') }}">{{ __('Login') }}</a>
    </form>
</div>





@endsection
