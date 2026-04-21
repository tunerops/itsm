<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Ticket;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        /** @var \Faker\Generator $faker */
        $faker = fake('ru_RU');

        return [
            // Создаем связь с Ticket и User
            'ticket_id' => Ticket::factory(),
            'user_id' => User::factory(),

            // Текст комментария на русском языке
            'body' => $faker->realText(200),

            // Задаем случайное значение для внутреннего комментария
            'is_internal' => $faker->boolean(20), // 20% шанс, что это внутренний комментарий
        ];
    }
}
