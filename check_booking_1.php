<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

use App\Models\Booking;

$b = Booking::withTrashed()->find(1);
if (!$b) {
    echo "ID 1 absolutely not found, even trashed\n";
    exit;
}
echo "ID 1 status: " . $b->status . "\n";
if ($b->trashed()) {
    echo "It is currently soft deleted\n";
} else {
    echo "It is active\n";
}
