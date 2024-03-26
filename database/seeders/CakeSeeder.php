<?php

namespace Database\Seeders;

use App\Models\Cake;
use App\Models\CakeType;
use App\Models\Ingredient;
use Illuminate\Database\Seeder;

class CakeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ingredients = Ingredient::factory(30)->create();
        CakeType::factory(10)->create();

        Cake::factory(100)
            ->create([
                'type_id' => 1,
            ])
            ->each(function ($cake) use ($ingredients) {
                $cake->type_id = rand(1, 10);
                // Select a random number of ingredients (2-6):
                $n = rand(2, 10);
                // Randomly choose ingredients, avoiding duplicates:
                $remainingIngredients = $ingredients->pluck('id')->toArray();
                $chosenIngredients = [];
                for ($i = 0; $i < $n; $i++) {
                    $randomIndex = array_rand($remainingIngredients);
                    $chosenIngredientId = $remainingIngredients[$randomIndex];
                    array_push($chosenIngredients, $chosenIngredientId);
                    unset($remainingIngredients[$randomIndex]); // Prevent duplicates
                }

                // Attach chosen ingredients to the cake:
                $cake->ingredients()->sync($chosenIngredients);
                $cake->save();
            });
    }
}
