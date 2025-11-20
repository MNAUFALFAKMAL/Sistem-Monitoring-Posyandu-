<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BalitaController;
use App\Http\Controllers\Api\IbuHamilController;
use App\Http\Controllers\Api\JadwalController;
use App\Http\Controllers\Api\PengaduanController;
use App\Http\Controllers\Api\UserController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::get('/jadwal/upcoming', [JadwalController::class, 'upcoming']);
Route::apiResource('pengaduan', PengaduanController::class)->only(['store', 'index']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'me']);

    // Admin and Kader can access these
    Route::apiResource('balita', BalitaController::class);
    Route::apiResource('ibu-hamil', IbuHamilController::class);
    Route::apiResource('jadwal', JadwalController::class);

    // Kader can respond to pengaduan
    Route::post('/pengaduan/{pengaduan}/respond', [PengaduanController::class, 'respond']);
    Route::apiResource('pengaduan', PengaduanController::class)->except(['store', 'index']);

    // Admin only
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('users', UserController::class)->except(['show']);
    });
});
