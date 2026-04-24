<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Сохранение нового комментария.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ticket_id' => 'required|exists:tickets,id',
            'body' => 'required|string',
        ]);

        Comment::create([
            'ticket_id' => $validated['ticket_id'],
            'body' => $validated['body'],
            'user_id' => 1, // Пока жестко задаем ID автора
            'is_internal' => false,
        ]);

        return redirect()->back();
    }
}
