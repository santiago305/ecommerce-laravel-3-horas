<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminAndUserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::firstOrCreate(
            ['email' => 'admin@demo.com'],
            [
                'name' => 'Admin',
                'password' => bcrypt('Admin#123'), // cámbialo en prod
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // Usuario normal
        User::firstOrCreate(
            ['email' => 'user@demo.com'],
            [
                'name' => 'Usuario Demo',
                'password' => bcrypt('User#1234'),
                'role' => 'user',
                'email_verified_at' => now(),
            ]
        );
    }
}
