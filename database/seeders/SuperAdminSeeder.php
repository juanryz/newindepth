<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        Role::firstOrCreate(['name' => 'super_admin', 'guard_name' => 'web']);

        $user = User::firstOrCreate(
            ['email' => 'admin@indepth.co.id'],
            [
                'name' => 'Super Admin',
                'password' => bcrypt('Anakanak12'),
            ]
        );

        $user->assignRole('super_admin');

        $this->command->info('Super Admin created: ' . $user->email);
    }
}
