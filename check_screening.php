<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Schema;
use App\Models\ScreeningResult;

echo "FILLABLE:\n";
print_r((new ScreeningResult)->getFillable());

echo "\nCOLUMNS:\n";
print_r(Schema::getColumnListing('screening_results'));
