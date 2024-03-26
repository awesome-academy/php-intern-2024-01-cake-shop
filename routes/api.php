<?php

use App\Http\Controllers\Api\CakeController;
use App\Http\Controllers\Api\CakeTypeController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\IngredientController;
use App\Http\Controllers\Api\PictureController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'currentUser']);

Route::name('image.')
    ->prefix('images')
    ->group(function () {
        Route::post('/', [PictureController::class, 'store'])
            ->name('store');
        Route::get('/{picture}', [PictureController::class, 'show'])
            ->name('show');
        Route::delete('/{picture}', [PictureController::class, 'destroy'])
            ->name('destroy');
    });

Route::name('cakes.')
    ->prefix('cakes')
    ->group(function () {
        Route::get('/', [CakeController::class, 'getAllCakes'])
            ->name('index');

        Route::middleware(['admin', 'auth:sanctum'])
            ->group(function () {
                Route::post('/', [CakeController::class, 'store'])
                    ->name('store');
                Route::put('{cake}', [CakeController::class, 'update'])
                    ->name('update');
                Route::post('/{cake}/add-cake', [CakeController::class, 'addCake'])
                    ->name('addCake');
                Route::delete('/{cake}', [CakeController::class, 'destroy'])
                    ->name('destroy');
            });

        Route::get('/{cake}', [CakeController::class, 'getCake'])
            ->name('show');
    });

Route::name('cake-types.')->prefix('cake-types')->group(function () {
    Route::get('/', [CakeTypeController::class, 'getListCakeType'])
        ->name('index');

    Route::middleware(['admin', 'auth:sanctum'])
        ->group(function () {
            Route::post('/', [CakeTypeController::class, 'store'])
                ->name('store');
            Route::put('/{cakeType}', [CakeTypeController::class, 'update'])
                ->name('update');
            Route::delete('{cakeType}', [CakeTypeController::class, 'destroy'])
                ->name('destroy');
        });
});

Route::name('ingredient.')
    ->prefix('ingredients')
    ->group(function () {
        Route::get('/', [IngredientController::class, 'index'])
            ->name('index');
        Route::middleware(['auth:sanctum', 'lang', 'admin'])->group(function () {
            Route::post('/', [IngredientController::class, 'store'])
                ->name('store');
            Route::put('/{ingredient}', [IngredientController::class, 'update'])
                ->name('update');
            Route::delete('/{ingredient}', [IngredientController::class, 'destroy'])
                ->name('destroy');
        });
    });

Route::name('users.')
    ->prefix('users')
    ->middleware(['auth:sanctum', 'lang'])
    ->group(function () {
        Route::put('/{user}', [UserController::class, 'update'])
            ->name('update');
        Route::post('/{user}/password', [UserController::class, 'updatePassword'])
            ->name('updatePassword');
        Route::middleware('admin')
            ->group(function () {
                Route::delete('/{user}', [UserController::class, 'destroy'])
                    ->name('destroy');
            });
    });

Route::name('orders.')
    ->prefix('orders')
    ->middleware(['auth:sanctum', 'lang'])
    ->group(function () {
        Route::get('/', [CartController::class, 'index'])->name('index');
        Route::delete('/{order}/{orderDetail}', [CartController::class, 'deleteItem'])
            ->name('deleteItem');
        Route::post('/', [CartController::class, 'addItem'])
            ->name('addItem');
        Route::put('/{order}', [CartController::class, 'buy'])
            ->name('buy');
    });
