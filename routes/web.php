<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\CommentController;

// Переадресация с главной страницы на список заявок
Route::get('/', function () {
    return redirect()->route('tickets.index');
});

// Группа маршрутов для заявок
Route::get('/tickets', [TicketController::class, 'index'])->name('tickets.index');
Route::get('/tickets/create', [TicketController::class, 'create'])->name('tickets.create');
Route::post('/tickets', [TicketController::class, 'store'])->name('tickets.store');
Route::get('/tickets/{ticket}', [TicketController::class, 'show'])->name('tickets.show');
Route::patch('/tickets/{ticket}/status', [TicketController::class, 'updateStatus'])->name('tickets.update-status');

// Маршруты для комментариев
Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
