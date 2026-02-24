<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$tx = \App\Models\Transaction::where('status', 'pending')->first();
if (!$tx) {
    echo "No pending tx.\n";
    exit;
}

try {
    $controller = app()->make(\App\Http\Controllers\Admin\TransactionValidationController::class);
    $controller->validatePayment($request, $tx);
    echo "Validation Success\n";
} catch (\Throwable $e) {
    echo "Error: " . $e->getMessage() . "\n" . $e->getTraceAsString() . "\n";
}
