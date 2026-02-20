<?php

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Auto-loader
require __DIR__ . '/../vendor/autoload.php';

// Bootstrap Laravel
$app = require_once __DIR__ . '/../bootstrap/app.php';

$kernel = $app->make(Kernel::class);
$response = $kernel->handle(
    $request = Request::capture()
);

try {
    $user = \App\Models\User::firstOrCreate(
        ['email' => 'admin@indepth.co.id'],
        [
            'name' => 'Super Admin',
            'password' => bcrypt('Anakanak12'),
            'email_verified_at' => now(),
        ]
    );

    $role = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'super_admin']);
    \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'admin']);
    \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'cs']);

    if (!$user->hasRole('super_admin')) {
        $user->assignRole('super_admin');
        echo "Successfully assigned super_admin role to admin@indepth.co.id\n";
    } else {
        echo "User already had super_admin role\n";
    }
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

$kernel->terminate($request, $response);
