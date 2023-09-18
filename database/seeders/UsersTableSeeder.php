<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('users') -> insert([
            'username' => 'owner',
            'email' => 'owner@gmail.com',
            'phone' => '1234567890',
            'password' => 'owner',
            'userRole' => 'owner',
            'twitter_link' => 'https://twitter.com/owner',
            'instagram_link' => 'https://instagram.com/owner',
            'facebook_link' => 'https://facebook.com/owner',
        ]);
    }
}