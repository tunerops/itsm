<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Ticket;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Ticket>
 */
class TicketFactory extends Factory
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
            // Генерируем заголовок и описание проблемы на русском
            'title' => $faker->sentence(6),
            'description' => $faker->realText(300),

            // Назначаем случайный приоритет и статус
            'priority' => $this->faker->randomElement(['low', 'medium', 'high']),
            'status' => $this->faker->randomElement(['new', 'in_progress', 'resolved']),

            // Связываем с авторами и исполнителями, если они не заданы
            'author_id' => User::factory(),
            'assignee_id' => User::factory(),
        ];
    }
}
