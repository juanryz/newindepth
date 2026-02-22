<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$result = App\Models\ScreeningResult::latest()->first();
print_r($result ? $result->toArray() : 'No results found.');
