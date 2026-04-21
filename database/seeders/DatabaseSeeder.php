<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Group;
use App\Models\Ticket;
use App\Models\Comment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Создаем 3 группы
        $groups = Group::factory(3)->create();

        // Создаем 10 пользователей
        $users = User::factory(10)->create();

        // Создаем 30 тикетов, распределяя авторов и исполнителей
        $tickets = Ticket::factory(30)
            ->recycle($users)
            ->create();

        // Создаем 50 комментариев, распределяя их по тикетам и пользователям
        Comment::factory(50)
            ->recycle($users)
            ->recycle($tickets)
            ->create();
    }
}
