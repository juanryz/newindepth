<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
$gen = new App\Services\AiContentGenerator();
print_r($gen->generateFeaturedImage('hipnoterapi kucing', 'ilustrasi'));
