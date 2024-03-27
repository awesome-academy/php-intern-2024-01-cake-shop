<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fakePhone = '0';
        for ($i = 0; $i < 10; $i++) {
            $fakePhone .= mt_rand(0, 9);
        }

        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'dob' => '2002-03-12',
            'phone' => $fakePhone,
            'address' => 'Ha noi',
            'role_id' => config('roles.admin'),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('users')->insert([
            'name' => 'employee',
            'email' => 'employee@admin.com',
            'email_verified_at' => now(),
            'dob' => '2002-03-12',
            'phone' => $fakePhone,
            'address' => 'Ha noi',
            'role_id' => config('roles.employee'),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        User::factory(10)->create([
            'role_id' => 3,
        ]);
    }
}
