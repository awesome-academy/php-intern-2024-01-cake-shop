<?php

use App\Http\Controllers\Api\UserController as ApiUserController;
use App\Http\Controllers\CakeController;
use App\Http\Controllers\CakeTypeController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::name('.cakes')
    ->prefix('cakes')
    ->group(function () {
        Route::get('/create', [CakeController::class, 'create'])
            ->name('.create');
        Route::get('/{cake}/edit', [CakeController::class, 'edit'])
            ->name('.edit');
    });

Route::name('.cake-types')
    ->prefix('cake-types')
    ->group(function () {
        Route::get('/create', [CakeTypeController::class, 'create'])
            ->name('.create');
        Route::get('/{cakeType}/edit', [CakeTypeController::class, 'edit'])
            ->name('.edit');
    });

Route::name('.users')
    ->prefix('users')
    ->group(function () {
        Route::get('/', [UserController::class, 'index'])
            ->name('.index');
        Route::get('/register', [UserController::class, 'create'])
            ->name('.register');
        Route::post('/register', [ApiUserController::class, 'storeEmployee'])
            ->name('.store');
        Route::put('/{user}/change-role', [ApiUserController::class, 'changeUserRole'])
            ->name('.changeRole');
    });

Route::name('.ingredients.')
    ->prefix('ingredients')
    ->middleware(['auth:sanctum', 'lang'])
    ->group(function () {
        Route::get('/', [IngredientController::class, 'index'])
            ->name('index');
        Route::get('/create', [IngredientController::class, 'create'])
            ->name('create');
        Route::get('/{ingredient}/edit', [IngredientController::class, 'edit'])
            ->name('edit');
        Route::get('/{ingredient}', [IngredientController::class, 'show'])
            ->name('show');
    });
