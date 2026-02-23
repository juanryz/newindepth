<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Transaction;
use App\Models\Booking;

$tx = Transaction::with(['user', 'transactionable'])->orderBy('created_at', 'desc')->take(10)->get();

foreach ($tx as $t) {
    echo sprintf(
        "TX[%d] %s | ST:%s | TYPE:%s\n",
        $t->id,
        $t->invoice_number,
        $t->status,
        collect(explode('\\', $t->transactionable_type))->last()
    );
    if ($t->transactionable) {
        $st = $t->transactionable->status ?? 'N/A';
        $th = $t->transactionable->therapist_id ?? 'N/A';
        echo "   -> Rel Status: $st | Therapist: $th\n";
    } else {
        echo "   -> Relation MISSING!\n";
    }
}
