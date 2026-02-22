<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Spatie\Permission\Models\Role;

echo "ROLES:\n";
foreach (Role::all() as $role) {
    echo "- " . $role->name . "\n";
}

echo "\nADMIN USERS:\n";
$admins = User::role(['admin', 'super_admin'])->get();
foreach ($admins as $admin) {
    echo "- " . $admin->email . " (Roles: " . $admin->getRoleNames()->implode(', ') . ")\n";
}

if ($admins->isEmpty()) {
    echo "NO ADMINS FOUND. Checking all users...\n";
    foreach (User::all() as $user) {
        echo "- " . $user->email . " (Roles: " . $user->getRoleNames()->implode(', ') . ")\n";
    }
}
