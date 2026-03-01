<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

use App\Models\ScreeningResult;
$sr = ScreeningResult::where('user_id', 21)->latest()->first();
if ($sr) {
    echo "User 21 Screening Status: " . $sr->status . "\n";
    echo "Completed At: " . ($sr->completed_at ?? 'null') . "\n";
} else {
    echo "No screening found for user 21\n";
}
