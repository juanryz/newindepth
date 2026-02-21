<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$request = Illuminate\Http\Request::create('/courses');
$response = $kernel->handle($request);
$content = $response->getContent();
preg_match('/data-page="(.*?)"/', $content, $matches);
if (!empty($matches[1])) {
    echo json_encode(json_decode(html_entity_decode($matches[1])), JSON_PRETTY_PRINT);
}
else {
    echo "NO PAGE DATA";
}
