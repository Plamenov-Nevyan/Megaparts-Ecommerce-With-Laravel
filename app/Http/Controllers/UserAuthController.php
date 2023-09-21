<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserAuthController extends Controller
{
    public function registerUser(Request $request){
        $userData = $request->all();
        $twitterLink = isset($userData["twitterLink"] ) ? $userData["twitterLink"] :  '';
        $instagramLink = isset( $userData["instagramLink"]) ? $userData["instagramLink"] : '';
        $facebookLink = isset($userData["facebookLink"]) ? $userData["facebookLink"] : '';
        $hashedPassword = Hash::make($userData['password']);
        $user = User::create([
            'username' => $userData["username"],
            'email' => $userData["email"],
            'phone' => $userData["phone"],
            'password' => $hashedPassword,
            'twitter_link' => $twitterLink,
            'instagram_link' => $instagramLink,
            'facebook_link' => $facebookLink 
        ]);
        $response = json_encode(['url' => 'catalog']);
        return $response;
    }
}
