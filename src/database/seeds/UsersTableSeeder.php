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
                //一括削除
                User::truncate();

                $randomIcon =DB::table('icon_lists')
                            ->inRandomOrder()
                            ->select('icon')
                            ->first();

                //開発用ユーザーを追加
                User::create([
                    'name' => 'test1',
                    'email' => 'dummy@email.com',
                    'password' => Hash::make('password'),
                    'icon'=>$randomIcon->icon,
                    'admin'=>'administrator'
                ]);
        
                //必要ならfaker利用
                // $faker = Faker::create('en_US');
                $faker = Faker::create('ja_JP');



                //テストユーザー
                for($i = 0; $i < 10; $i++){

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
