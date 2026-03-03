<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Database\Seeders\SantaMariaSeeder;
use Database\Seeders\ResourcesPermissionSeeder;
use Database\Seeders\RoleSeeder;

try {
    echo "Seeding RoleSeeder...\n";
    (new RoleSeeder())->run();

    echo "Seeding ResourcesPermissionSeeder...\n";
    (new ResourcesPermissionSeeder())->run();

    echo "Seeding SantaMariaSeeder...\n";
    (new SantaMariaSeeder())->run();

    echo "Success!\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
