<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;

// Переадресация с главной страницы на список заявок
Route::get('/', function () {
    return redirect()->route('tickets.index');
});

// Группа маршрутов для заявок
Route::get('/tickets', [TicketController::class, 'index'])->name('tickets.index');
Route::get('/tickets/create', [TicketController::class, 'create'])->name('tickets.create');
Route::post('/tickets', [TicketController::class, 'store'])->name('tickets.store');
