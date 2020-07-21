@extends('layouts.app')

@section('content')
<div class="login-area h-100">
    <div class="col-md-7" id="titleside"></div>
    <form class="col-md-5 form-area white_touka text-center" method="POST" action="{{ route('login') }}">
        <h1 class="title_B mt-5 mb-5">SinjiChat</h1>
        <div class="form-area h-50">

            <div class="mt-5 login-form">
                @csrf
                <div class="login-form-area w-100">
                    <div class="form-group row mt-5">
        
                        <div class="cp_iptxt col-8 offset-2">
                            <input id="email" type="email" class="txt_M @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" placeholder="E-mail" maxlength="60" autofocus>
        
                            @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
        
                    <div class="form-group row mt-5">
                        <div class="cp_iptxt col-8 offset-2">
                            <input id="password" type="password" class="txt_M @error('password') is-invalid @enderror" name="password" placeholder="Password" required maxlength="60" autocomplete="current-password">
                        </div>
        
        
                            @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
        
                    </div>
                </div>
                
            </div>
        </div>
        <div class="button-form w-100">
            <div class="col-5">
                <button type="submit" class="w-100 commonBtn"><span class="txt_M">Sign in</span></button>
            </div>
        </div>
        <a href="{{ route('register') }}">{{ __('Register') }}</a>
    </form>
</div>
@endsection
