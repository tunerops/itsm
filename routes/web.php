<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;

Route::get('/', function () {
    return redirect()->route('tickets.index');
});

Route::get('/tickets', [TicketController::class, 'index'])->name('tickets.index');
