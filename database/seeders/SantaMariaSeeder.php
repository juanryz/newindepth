<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class SantaMariaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::firstOrCreate([
            'email' => 'santamaria@indepth.co.id',
        ], [
            'name' => 'Santa Maria Admin',
            'password' => Hash::make('password'), // Suggest to change this later
            'email_verified_at' => now(),
        ]);

        $user->assignRole('santa_maria');
    }
}
