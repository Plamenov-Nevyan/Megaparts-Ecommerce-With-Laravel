<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
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
        session(['userId' => $user->id, 'userRole' => $user->userRole]);
        $response = json_encode(['url' => 'catalog']);
        return $response;
    }
    public function loginUser (Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if(Auth::attempt($credentials))
        {
            $user = Auth::user();
            $request->session()->put('userId', $user->id);
            $request->session()->put('userRole', $user->userRole);
            $request->session()->regenerate();
            // return redirect()->route('catalog')
            //     ->withSuccess('You have successfully logged in!');
        }

        return back()->withErrors([
            'email' => 'Your provided credentials do not match in our records.',
        ])->onlyInput('email');

    } 

    public function logoutUser(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        $response = json_encode(['url' => 'login']);
        $response->header('Content-Type: application/json');
        return $response;
    }
}
