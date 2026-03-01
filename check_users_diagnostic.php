<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;

foreach (User::all() as $user) {
    $roles = $user->getRoleNames()->values()->toArray();
    $perms = $user->getAllPermissions()->pluck('name')->values()->toArray();
    $roleStr = count($roles) ? implode(', ', $roles) : '(none)';
    $permStr = count($perms) ? count($perms) . ' permissions' : '(none)';
    file_put_contents('php://stderr', "ID:{$user->id} | {$user->email}\n  Roles: {$roleStr}\n  Perms: {$permStr}\n\n");
}
echo "Done\n";
