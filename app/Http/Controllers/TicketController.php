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
    // Метод для отображения формы
    public function create()
    {
        return Inertia::render('Tickets/Create');
    }

    // Метод для сохранения новой заявки в базу
    public function store(Request $request)
    {
        // 1. Проверяем, что ввел пользователь
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'required|in:low,medium,high',
        ]);

        // 2. Создаем заявку в базе данных
        Ticket::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'priority' => $validated['priority'],
            'status' => 'new',
            'author_id' => 1, // Пока жестко задаем ID автора (например, 1), пока не настроим авторизацию
        ]);

        // 3. Возвращаем пользователя обратно к списку заявок
        return redirect()->route('tickets.index');
    }

    /**
     * Отобразить конкретный билет с комментариями.
     */
    public function show($id)
    {
        $ticket = Ticket::with(['author', 'assignee', 'comments.user'])->findOrFail($id);

        return Inertia::render('Tickets/Show', [
            'ticket' => $ticket,
        ]);
    }

    /**
     * Обновить статус билета.
     */
    public function updateStatus(Request $request, Ticket $ticket)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:new,in_progress,resolved,closed,open',
        ]);

        $ticket->update([
            'status' => $validated['status'],
        ]);

        return redirect()->back();
    }

    /**
     * Назначить билет текущему авторизованному пользователю.
     */
    public function assign(Ticket $ticket)
    {
        $ticket->update([
            'assignee_id' => auth()->id(),
        ]);

        return redirect()->back();
    }

    /**
     * Снять назначение с билета.
     */
    public function unassign(Ticket $ticket)
    {
        $ticket->update([
            'assignee_id' => null,
        ]);

        return redirect()->back();
    }
}
