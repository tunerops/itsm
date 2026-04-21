<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TicketController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Регистрация маршрутов API для билетов (исключаем index)
Route::apiResource('tickets', TicketController::class)->only(['show']);
