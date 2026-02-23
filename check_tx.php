<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Transaction;
use App\Models\Booking;

$tx = Transaction::with(['user', 'transactionable'])->orderBy('created_at', 'desc')->take(5)->get();

foreach ($tx as $t) {
    echo "ID: {$t->id} | Invoice: {$t->invoice_number} | Status: {$t->status} | Type: {$t->transactionable_type}\n";
    if ($t->transactionable_type === Booking::class) {
        $b = $t->transactionable;
        echo "  - Booking ID: " . ($b->id ?? 'N/A') . " | Booking Status: " . ($b->status ?? 'N/A') . " | Therapist: " . ($b->therapist_id ?? 'None') . "\n";
    }
}
