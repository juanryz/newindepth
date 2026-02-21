<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$request = Illuminate\Http\Request::create(
    '/admin/schedules?therapist_id=2',
    'GET'
);
$request->headers->set('X-Inertia', 'true');

$response = $kernel->handle($request);
echo $response->getContent();
