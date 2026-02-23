<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\BlogPost;

$slug = 'coaba-699bfa6005021';
$post = BlogPost::where('slug', $slug)->first();

if ($post) {
    echo "ID: " . $post->id . "\n";
    echo "Title: " . $post->title . "\n";
    echo "Is Published: " . ($post->is_published ? 'Yes' : 'No') . "\n";
    echo "Body Length: " . strlen($post->body) . "\n";
    echo "Body excerpt: " . substr($post->body, 0, 100) . "\n";
} else {
    echo "Post not found for slug: $slug\n";
    echo "Available posts:\n";
    foreach (BlogPost::all() as $p) {
        echo "- " . $p->slug . " (Published: " . ($p->is_published ? 'Yes' : 'No') . ")\n";
    }
}
