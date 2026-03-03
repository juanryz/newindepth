<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Spatie\Permission\Models\Role;

$user = User::where('name', 'like', '%Santa Maria%')->orWhere('email', 'like', '%santa%')->get();

foreach ($user as $u) {
    echo "User: " . $u->name . " (" . $u->email . ")\n";
    echo "Roles: " . implode(', ', $u->getRoleNames()->toArray()) . "\n";
    echo "Permissions: " . implode(', ', $u->getAllPermissions()->pluck('name')->toArray()) . "\n";
    echo "-------------------\n";
}

if ($user->isEmpty()) {
    echo "No user found containing 'Santa Maria'.\n";
    echo "Listing all users with roles:\n";
    User::all()->each(function ($u) {
        echo "User: " . $u->name . " (" . $u->email . ") -> " . implode(', ', $u->getRoleNames()->toArray()) . "\n";
    });
}
