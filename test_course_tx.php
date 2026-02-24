<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$course = \App\Models\Course::first();
if (!$course) {
    if (!class_exists(\App\Models\Course::class))
        die("No Course class");
    $course = \App\Models\Course::create(['title' => 'Test Course', 'slug' => 'test-course', 'price' => 1000]);
}
$user = \App\Models\User::first();

\App\Models\Transaction::create([
    'invoice_number' => 'INV-TEST-COURSE',
    'user_id' => $user->id,
    'amount' => 1000,
    'status' => 'paid',
    'payment_method' => 'manual',
    'transactionable_type' => \App\Models\Course::class,
    'transactionable_id' => $course->id,
]);
echo "Test transaction created.\n";
