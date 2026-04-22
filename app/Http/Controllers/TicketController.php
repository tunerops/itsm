<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    /**
     * Отобразить список билетов.
     */
    public function index()
    {
        // Получить все билеты вместе с их авторами
        $tickets = Ticket::with(['author', 'assignee'])->latest()->get();

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets
        ]);
    }
}
