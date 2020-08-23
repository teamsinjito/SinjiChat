<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNewMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('new_messages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('room_id',60);
            $table->unsignedBigInteger('to_user_id');
            $table->integer('read_flg');
            $table->timestamps();
        });

        Schema::table('new_messages', function ($table) {
            $table->foreign('to_user_id')->references('id')->on('users')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('new_messages');
    }
}
