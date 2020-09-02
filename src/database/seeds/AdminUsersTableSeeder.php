<?php

use Illuminate\Database\Seeder;
use App\User;
use Illuminate\Support\Facades\Hash;

class AdminUsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        User::create([
            'name' => '管理者',
            'email' => 'sinjichat.admin@email.com',
            'password' => Hash::make('sinjichat2020passpass'),
            'admin'=>'administrator'
        ]);
    }
}
