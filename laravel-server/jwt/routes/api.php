<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTController;

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\TestController;

Route::group(['prefix' => 'v1'], function(){

    Route::group(['prefix' => 'admin'], function(){
        Route::group(['middleware' => 'role.admin'], function(){
            Route::post('/add_item', [AdminController::class, 'addItem']);
            Route::post('/add_category', [AdminController::class, 'addCategory']);
        });
    });

    Route::group(['prefix' => 'user'], function(){
            Route::get('/all_items/{id?}', [UserController::class, 'getAllItems']);
            Route::get('/category_search/{category?}', [UserController::class, 'getCategory']);
            Route::get('/item_search/{category}', [UserController::class, 'getItemByCategory']);
            
            Route::group(['middleware' => 'role.user'], function(){
                Route::post('/add_favourite', [UserController::class, 'addFavourite']);
            });
    });
    
    // Function called when not an admin tried to reach the add_item page
    Route::get('/not_found', [TestController::class, 'notFound'])->name("not-found");
});




/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'api'], function($router) {
    Route::post('/register', [JWTController::class, 'register']);
    Route::post('/login', [JWTController::class, 'login']);
    Route::post('/logout', [JWTController::class, 'logout']);
    Route::post('/refresh', [JWTController::class, 'refresh']);
    Route::post('/profile', [JWTController::class, 'profile']);
});
