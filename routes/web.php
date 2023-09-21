<?php
use App\Http\Controllers\UserAuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/', "home");
Route::group(['middleware' => 'web'], function(){
    Route::post('/logout', [UserAuthController::class, 'logoutUser'])->name('logout');
});
Route::post('/signUp', [UserAuthController::class,'registerUser'])->middleware('guest');
Route::get('/login', [RegisteredUserController::class, 'showLoginForm'])->name('login');
Route::get('/register', [RegisteredUserController::class, 'showRegisterForm'])->name('register');
Route::get('/catalog', [RegisteredUserController::class, 'showCatalog'])->name('catalog');
// Route::post('/ulogin', [UserAuthController::class, 'registerUser']);

require __DIR__.'/auth.php';

