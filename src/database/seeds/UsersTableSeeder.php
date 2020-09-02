<?php

use Illuminate\Database\Seeder;
use App\User;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

                $faker = Faker::create('ja_JP');

                //ダミーユーザー
                for($i = 0; $i < 20; $i++){

                    $randomIcon =DB::table('icon_lists')
                                ->inRandomOrder()
                                ->select('icon')
                                ->first();

                    User::create([
                        'name' => $faker->name,
                        'email' => $faker->email,
                        'password' => Hash::make('password'),
                        'icon'=>$randomIcon->icon,
                        'admin'=>'guest'
                    ]);
                }

    }
}
