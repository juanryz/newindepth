<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::create(
        '/admin/schedules',
        'GET'
    )
);
$content = $response->getContent();
if (preg_match('/data-page="(.*?)"/', $content, $matches)) {
    echo json_encode(json_decode(html_entity_decode($matches[1])), JSON_PRETTY_PRINT);
} else {
    echo "NO PAGE DATA";
}
