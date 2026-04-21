<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Http\Resources\TicketResource;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Отобразить список билетов.
     */
    public function index()
    {
        // Получить все билеты вместе с их авторами и назначенными пользователями
        $tickets = Ticket::with(['author', 'assignee'])->get();

        return TicketResource::collection($tickets);
    }

    /**
     * Отобразить указанный билет.
     */
    public function show(Ticket $ticket)
    {
        // Загрузить отношения автора, назначенного пользователя и комментариев
        $ticket->load(['author', 'assignee', 'comments.user']);

        return new TicketResource($ticket);
    }
}
