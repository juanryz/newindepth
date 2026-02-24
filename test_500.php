<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $request = Illuminate\Http\Request::create('/admin/order-management', 'GET');
    $controller = new \App\Http\Controllers\Admin\OrderManagementController();
    $response = $controller->index($request);
    $data = $response->toResponse($request)->getContent();
    echo "Content Length: " . strlen($data) . "\n";
    echo "Memory: " . memory_get_peak_usage(true) / 1024 / 1024 . " MB\n";
    echo "Success!\n";
} catch (\Throwable $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
}
