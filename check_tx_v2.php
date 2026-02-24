<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

$sc = \App\Models\ScreeningResult::latest('id')->first();
echo json_encode($sc->chat_history, JSON_PRETTY_PRINT);
