<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

use App\Models\Booking;

$b = Booking::find(1);
if (!$b) {
    echo "ID 1 not found\n";
    exit;
}

echo "Booking exists. Status: " . $b->status . "\n";
try {
    if ($b->userVoucher) {
        $b->userVoucher->update(['is_active' => true, 'booking_id' => null]);
    }
    if ($b->transaction) {
        $b->transaction->delete();
    }
    $b->delete();
    echo "Deleted successfully.\n";
} catch (\Exception $e) {
    echo "Deletion error: " . $e->getMessage() . "\n";
}
