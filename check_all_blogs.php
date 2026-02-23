<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\BlogPost;

$posts = BlogPost::all();
foreach ($posts as $p) {
    echo "ID: {$p->id} | Slug: {$p->slug} | Publ: " . ($p->is_published ? 'Y' : 'N') . " | Body Len: " . strlen($p->body) . "\n";
    if (strlen($p->body) < 10) {
        echo "   WARNING: Body is very short or empty!\n";
    }
}
