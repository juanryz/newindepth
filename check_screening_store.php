<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $req = new \Illuminate\Http\Request();
    $req->replace(['step_data' => ['skala' => 9, 'masalah_utama' => 'Halusinasi'], 'chat_history' => []]);
    $req->setUserResolver(function () {
        return \App\Models\User::role('patient')->first();
    });
    $res = (new \App\Http\Controllers\Clinic\ScreeningController())->store($req);
    echo "Success!\n";
}
catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n" . $e->getTraceAsString();
}
