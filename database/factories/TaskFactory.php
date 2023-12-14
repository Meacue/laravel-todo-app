<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'responsible_id' => rand(3,10),
            'creator_id' => rand(1, 2),
            "title" => fake()->title(),
            "description" => fake()->realText(200),
            "priority" => fake()->randomElement(['высокий', 'средний', 'низкий']),
            "status" => fake()->randomElement(['к выполнению', 'выполняется', 'выполнена', 'отменена']),
        ];
    }
}
