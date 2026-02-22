<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateVerifiedUser extends Command
{
    protected $signature = 'user:create-verified {email} {name} {role=patient}';
    protected $description = 'Create a new verified user with a specific role';

    public function handle()
    {
        $email = $this->argument('email');
        $name = $this->argument('name');
        $role = $this->argument('role');
        $password = 'password123';

        if (User::where('email', $email)->exists()) {
            $this->error("User with email {$email} already exists!");
            return;
        }

        $user = new User();
        $user->name = $name;
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->email_verified_at = now();
        $user->save();

        $user->assignRole($role);

        $this->info("User created successfully!");
        $this->info("Email: {$email}");
        $this->info("Password: {$password}");
        $this->info("Role: {$role}");
        $this->info("Status: Verified");
    }
}
