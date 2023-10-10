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
        session([
            'userId' => $user->id, 
            'userRole' => $user->userRole, 
            'banned' => $user->banned, 
            'warning' => $user->warning
        ]);
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
            $request->session()->put('banned', $user->banned);
            $request->session()->put('warning', $user->warning);
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

    public function getSession(){
        $userSessionData = session()->all();
        return response()->json($userSessionData);
    }

    public function getAllUsers(){
        $users = User::whereNotIn('userRole', ['admin', 'owner'])
        ->orderBy('created_at', 'desc')
        ->get();
        return response()->json($users);
    }

    public function sendWarningMessage(Request $request){
        $userId = $request->json('userId');
        $user = User::find(intval($userId));
        $user->update([
            'warning' => $request->json('message'),
        ]);
    }

    public function banUser(Request $request){
        $userId = $request->json('userId');
        $user = User::find(intval($userId));
        $user->update([
            'banned' => true,
        ]);
    }

    public function getUserProfile(Request $request){
        $userId = $request->query('userId');
        $user = User::find(intval($userId));
        return response()->json($user);
    }

    public function updateUserProfile(Request $request){
        $userId = $request->query('userId');
        $updateData = $request->json()->all();
        $user = User::find(intval($userId));
        $user->update($updateData);
        $user->refresh();
        return response()->json($user);
    }
}