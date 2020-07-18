<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTalksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('talks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('room_id',60);
            $table->unsignedBigInteger('from_user_id');
            $table->string('message',100)->nullable();
            $table->text('image')->nullable(); 
            $table->integer('read_flg');
            $table->timestamps();
        });

        Schema::table('talks', function ($table) {
            $table->foreign('from_user_id')->references('id')->on('users')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('talks');
    }
}
