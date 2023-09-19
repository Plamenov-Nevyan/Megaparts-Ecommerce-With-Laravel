<?php

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

Route::get('/login', [RegisteredUserController::class, 'showAuthForms'])->name('login');
Route::get('/catalog', [RegisteredUserController::class, 'showCatalog'])->name('catalog');

require __DIR__.'/auth.php';

