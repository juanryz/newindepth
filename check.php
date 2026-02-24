<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$roles = \Spatie\Permission\Models\Role::with('permissions')->get();
foreach ($roles as $r) {
    echo "Role " . $r->name . ":\n";
    foreach ($r->permissions as $p) {
        echo " - " . $p->name . "\n";
    }
}
