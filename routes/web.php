<?php
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShoppingCartController;
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
    Route::post('/logout', [UserAuthController::class, 'logoutUser'])->middleware('auth');
    Route::post('/signUp', [UserAuthController::class,'registerUser'])->middleware('guest');
    Route::post('/signIn', [UserAuthController::class,'loginUser'])->middleware('guest');
    Route::post('/sendWarning', [UserAuthController::class, 'sendWarningMessage'])->middleware('auth');
    Route::post('/ban', [UserAuthController::class, 'banUser'])->middleware('auth');
    Route::post('/createProduct', [ProductController::class, 'createNewProduct'])->middleware('auth');
    Route::post('/getProductDetails', [ProductController::class, 'getOneProduct'])->middleware('auth');
    Route::post('/add_to_cart', [ShoppingCartController::class, 'addToCart'])->middleware('auth');
    Route::get('/getAllProducts', [ProductController::class, 'getProducts'])->middleware('auth');
    Route::get('/getAllUsers', [UserAuthController::class, 'getAllUsers'])->middleware('auth');
    Route::get('/getSession', [UserAuthController::class, 'getSession'])->middleware('auth');
    Route::get('/user_profile', [UserAuthController::class, 'getUserProfile'])->middleware('auth');
    Route::put('/update_user_profile', [UserAuthController::class, 'updateUserProfile'])->middleware('auth');
    Route::put('/update_product', [ProductController::class, 'updateProduct'])->middleware('auth');
    Route::put('/remove_warning', [UserAuthController::class, 'removeWarningMessage'])->middleware('auth');
    Route::delete('/delete_user_profile', [UserAuthController::class, 'deleteUserProfile'])->middleware('auth');
    Route::delete('/delete_product', [ProductController::class, 'deleteProduct'])->middleware('auth');
    Route::get('/check_if_in_cart', [ShoppingCartController::class, 'checkIfInCart'])->middleware('auth');
    Route::put('/remove_from_cart', [ShoppingCartController::class, 'removeFromCart'])->middleware('auth');
    Route::get('/get_current_quantity', [ShoppingCartController::class, 'getCurrentQuantity'])->middleware('auth');
});
Route::get('/catalog', [RegisteredUserController::class, 'showCatalog'])->name('catalog');
Route::get('/login', [RegisteredUserController::class, 'showLoginForm'])->name('login');
Route::get('/register', [RegisteredUserController::class, 'showRegisterForm'])->name('register');
Route::get('/productDetails', [ProductController::class, 'showDetails'])->name('details');
Route::get('/dashboard', [RegisteredUserController::class, 'showDashboard'])->name('adminDashboard');
// Route::post('/ulogin', [UserAuthController::class, 'registerUser']);

require __DIR__.'/auth.php';

