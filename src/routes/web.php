<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');
Route::group(['middleware' => 'auth'], function(){
    Route::get('/get', 'HomeController@getMyRelationData');
    Route::get('AddFriend/get', 'AddFriendController@getAllUserWithOutFriend');
    Route::get('AddGroup/get', 'AddGroupController@getMyFriend');
    Route::post('AddGroup/post', 'AddGroupController@postRequest');
    Route::post('AddFriend/post', 'AddFriendController@postRequest');
    Route::post('Option/post', 'OptionController@postRequest');
    ROute::post('Sequrity/post/match','SequrityController@matchPassword');
    ROute::post('Sequrity/post/new/mail','SequrityController@postNewMail');
    ROute::post('Sequrity/post/new/valid','SequrityController@validateNewPassword');
    ROute::post('Sequrity/post/new/password','SequrityController@postNewPassword');
    Route::post('Admin/post/new/icon', 'AdminController@postNewIcon');
    Route::post('Admin/post/new/stamp', 'AdminController@postNewStamp');
    Route::post('Request/post/allow', 'RequestController@postRequestAllow');
    Route::post('Request/post/ignore', 'RequestController@postRequestIgnore');
    Route::get('Talk/get/stamp', 'TalkController@getAllStamp');
    Route::post('Talk/post', 'TalkController@postRequest');
    Route::post('Talk/imagePost', 'TalkController@imagePostRequest');
    Route::post('Talk/upDateReadFlg', 'TalkController@upDateReadFlg');
    Route::post('TimeLine/post', 'TimeLineController@tweetInsert');
    Route::get('TimeLine/get','TimeLineController@getTweetData');
    Route::get('TimeLine/old/get','TimeLineController@getOldTweetData');
    Route::get('logout', 'Auth\LoginController@logout', function () {
        return abort(404);
    });
});
