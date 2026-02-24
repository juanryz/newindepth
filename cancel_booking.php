<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    // First cancel transaction
    $updated = \Illuminate\Support\Facades\DB::statement(
        "UPDATE transactions SET status='cancelled' WHERE transactionable_id=22 AND transactionable_type='App\\\\Models\\\\Booking'"
    );
    echo "TX updated.\n";

    // Then cancel booking
    \Illuminate\Support\Facades\DB::statement("UPDATE bookings SET status='cancelled' WHERE id=22");
    echo "Booking 22 cancelled.\n";

} catch (\Throwable $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
