<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
$prompt = "Modern digital illustration, vector art style, clean lines, beautiful colors, pet therapy, relaxing cat, animal calming connection, psychology, mental health or hypnotherapy concept, beautiful, high resolution, NO TEXT, NO WORDS.";
$url = "https://image.pollinations.ai/prompt/" . rawurlencode($prompt) . "?width=1600&height=900&nologo=true&seed=" . time();
echo "URL:\n$url\n";
$res = \Illuminate\Support\Facades\Http::timeout(30)->withOptions(['allow_redirects' => ['max' => 5]])->get($url);
echo "Status: " . $res->status() . "\n";
echo "Length: " . strlen($res->body()) . "\n";
