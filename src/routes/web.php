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
    Route::post('AddFriend/post', 'AddFriendController@postRequest');
    Route::get('Talk/get', 'TalkController@getAllFriend');
    Route::post('Talk/post', 'TalkController@postRequest');
    Route::post('TimeLine/post', 'TimeLineController@tweetInsert');
});
