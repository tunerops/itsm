<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Сохранение нового комментария к заявке.
     */
    public function store(Request $request, Ticket $ticket)
    {
        // 1. Валидируем ввод
        $validated = $request->validate([
            'body' => 'required|string',
            'is_internal' => 'boolean',
        ]);

        // 2. Создаем комментарий, привязанный к заявке
        $ticket->comments()->create([
            'body' => $validated['body'],
            'is_internal' => $validated['is_internal'] ?? false,
            'user_id' => 1, // Временно жестко задаем ID (например 1), пока нет авторизации
        ]);

        // 3. Возвращаем пользователя обратно на страницу заявки
        return redirect()->back();
    }
}
