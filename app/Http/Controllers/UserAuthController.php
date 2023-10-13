<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserAuthController extends Controller
{
   
    public function registerUser(Request $request){
        $rules = [
            'username' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'password' => 'required',
        ];
        $validator = Validator::make($request->all(), $rules);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }   
        $userData = $request->all();
        $twitterLink = isset($userData["twitterLink"]) ? $userData["twitterLink"] : '';
        $instagramLink = isset($userData["instagramLink"]) ? $userData["instagramLink"] : '';
        $facebookLink = isset($userData["facebookLink"]) ? $userData["facebookLink"] : '';
        $hashedPassword = Hash::make($userData['password']);
    
        $user = User::create([
            'username' => $userData["username"],
            'email' => $userData["email"],
            'phone' => $userData["phone"],
            'password' => $hashedPassword,
            'twitter_link' => $twitterLink,
            'instagram_link' => $instagramLink,
            'facebook_link' => $facebookLink,
        ]);
    
        session([
            'userId' => $user->id,
            'userRole' => $user->userRole,
            'banned' => $user->banned,
            'warning' => $user->warning,
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
        }else {
            return back()->withErrors([
                'email' => 'Вашите имейл и/или парола са грешни.',
            ])->onlyInput('email');
        }
    } 

    public function logoutUser(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }

    public function getSession(){
        $userSessionData = session()->all();
        return response()->json($userSessionData);
    }

    public function getAllUsers() {
        try {
            $users = User::whereNotIn('userRole', ['admin', 'owner'])
                ->orderBy('created_at', 'desc')
                ->get();
            return response()->json($users);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Грешка при търсенето на потребители'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function sendWarningMessage(Request $request) {
        try {
            $userId = $request->json('userId');
            $user = User::findOrFail(intval($userId));
    
            $user->update([
                'warning' => $request->json('message'),
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Потребителя не беше намерен.'], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Грешка при изпращането на предупреждение.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function banUser(Request $request) {
        try {
            $userId = $request->json('userId');
            $user = User::findOrFail(intval($userId));
    
            $user->update([
                'banned' => true,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Потребителя не беше намерен'], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Грешка при модификация на бан статус'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getUserProfile(Request $request){
        try {
            $userId = $request->query('userId');
            $user = User::find(intval($userId));
            return response()->json($user);
        } catch(ModelNotFoundException){
            return response()->json(['error' => 'Потребителя не беше намерен'], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Грешка при търсенето на потребителя.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateUserProfile(Request $request) {
        try {
            $userId = $request->query('userId');
            $updateData = $request->json()->all();
            if (empty($updateData['username']) || empty($updateData['email']) || empty($updateData['phone'])) {
                return response()->json(['error' => 'Потребителско име, имейл и телефон са задължителни за попълване'], Response::HTTP_BAD_REQUEST);
            }
            $user = User::findOrFail(intval($userId));
            $user->update($updateData);
            $user->refresh();
            return response()->json($user);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Потребителя не беше намерен.'], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Грешка при редактирането.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function deleteUserProfile(Request $request) {
        try {
            $userId = $request->query('userId');
            $user = User::findOrFail(intval($userId));
            $user->delete();
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Потребителя не беше намерен.'], Response::HTTP_NOT_FOUND);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Грешка при изтриването.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Грешка при изтриването.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function removeWarningMessage(Request $request) {
        try {
            $userId = $request->query('userId');
            $user = User::findOrFail(intval($userId));
    
            $user->update(['warning' => '']);
            $user->refresh();
            session()->put('warning', $user->warning);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Потребителя не беше намерен.'], Response::HTTP_NOT_FOUND);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Грешка при премахането на предупреждение.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Грешка при премахането на предупреждение.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}