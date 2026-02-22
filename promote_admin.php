<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;

$user = User::where('email', 'user@indepth.com')->first();
if ($user) {
    if (!$user->hasRole('super_admin')) {
        $user->assignRole('super_admin');
        echo "Successfully assigned super_admin role to user@indepth.com\n";
    }
    else {
        echo "user@indepth.com already has super_admin role\n";
    }
}
else {
    echo "User user@indepth.com not found.\n";
}
