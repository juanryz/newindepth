<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$request = Illuminate\Http\Request::create('/courses');
$response = $kernel->handle($request);
file_put_contents('test-courses-output.html', $response->getContent());
echo "Saved to test-courses-output.html\n";
