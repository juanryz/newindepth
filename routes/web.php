<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Socialite Routes
Route::get('/auth/google', [\App\Http\Controllers\Auth\SocialiteController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [\App\Http\Controllers\Auth\SocialiteController::class, 'handleGoogleCallback']);

Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])
    ->middleware(['auth'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/documents', [ProfileController::class, 'updateDocuments'])->name('profile.documents.update');
    Route::post('/profile/agreement', [ProfileController::class, 'updateAgreement'])->name('profile.agreement.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Screening
    Route::get('/screening', [\App\Http\Controllers\Clinic\ScreeningController::class, 'show'])->name('screening.show');
    Route::post('/screening', [\App\Http\Controllers\Clinic\ScreeningController::class, 'store'])->name('screening.store');
    Route::post('/screening/chat', [\App\Http\Controllers\Clinic\ScreeningController::class, 'chatMessage'])->name('screening.chat');

    // Agreement
    Route::get('/agreement', [\App\Http\Controllers\Clinic\AgreementController::class, 'show'])->name('agreement.show');
    Route::post('/agreement', [\App\Http\Controllers\Clinic\AgreementController::class, 'store'])->name('agreement.store');


    // Patient Routes
    Route::middleware(\Spatie\Permission\Middleware\RoleMiddleware::class . ':patient')->group(
        function () {
            // Booking Management
            Route::get('/bookings/history', [\App\Http\Controllers\Clinic\BookingController::class, 'index'])->name('bookings.history');
            Route::get('/bookings/create', [\App\Http\Controllers\Clinic\BookingController::class, 'create'])->name('bookings.create');
            Route::post('/bookings', [\App\Http\Controllers\Clinic\BookingController::class, 'store'])->name('bookings.store');
            Route::get('/bookings/{booking}', [\App\Http\Controllers\Clinic\BookingController::class, 'show'])->name('bookings.show');
            Route::delete('/bookings/{booking}/cancel', [\App\Http\Controllers\Clinic\BookingController::class, 'cancel'])->name('bookings.cancel');

            // Payment routes
            Route::get('/payments/upload/{booking}', [\App\Http\Controllers\Clinic\PaymentController::class, 'create'])->name('payments.create');
            Route::post('/payments/{booking}', [\App\Http\Controllers\Clinic\PaymentController::class, 'store'])->name('payments.store');

            // Voucher routes
            Route::get('/vouchers', [\App\Http\Controllers\Clinic\VoucherController::class, 'index'])->name('vouchers.index');
            Route::post('/vouchers/claim', [\App\Http\Controllers\Clinic\VoucherController::class, 'claim'])->name('vouchers.claim');
            Route::post('/vouchers/apply', [\App\Http\Controllers\Clinic\VoucherController::class, 'apply'])->name('vouchers.apply');
        }
    );

    // Therapist Routes
    Route::middleware(\Spatie\Permission\Middleware\RoleMiddleware::class . ':therapist')->group(
        function () {
            Route::get('/schedules', [\App\Http\Controllers\Clinic\ScheduleController::class, 'index'])->name('schedules.index');
            Route::post('/schedules', [\App\Http\Controllers\Clinic\ScheduleController::class, 'store'])->name('schedules.store');
            Route::delete('/schedules/{schedule}', [\App\Http\Controllers\Clinic\ScheduleController::class, 'destroy'])->name('schedules.destroy');
            Route::post('/schedules/sessions/{booking}/complete', [\App\Http\Controllers\Clinic\ScheduleController::class, 'completeSession'])->name('schedules.complete');
        }
    );

    // CS / Admin Routes for Transaction Validation
    Route::middleware(\Spatie\Permission\Middleware\RoleMiddleware::class . ':cs|admin|super_admin')->prefix('admin')->name('admin.')->group(
        function () {
            Route::get('/transactions', [\App\Http\Controllers\Admin\TransactionValidationController::class, 'index'])->name('transactions.index');
            Route::post('/transactions/{transaction}/validate', [\App\Http\Controllers\Admin\TransactionValidationController::class, 'validatePayment'])->name('transactions.validate');
            Route::post('/transactions/{transaction}/reject', [\App\Http\Controllers\Admin\TransactionValidationController::class, 'rejectPayment'])->name('transactions.reject');

            // Blog CMS
            Route::resource('blog', \App\Http\Controllers\Admin\BlogPostCMSController::class);

            // Reports & Expenses
            Route::get('/reports', [\App\Http\Controllers\Admin\ClinicReportController::class, 'index'])->name('reports.index');
            Route::get('/reports/export-csv', [\App\Http\Controllers\Admin\ClinicReportController::class, 'exportCsv'])->name('reports.export-csv');
            Route::get('/expenses', [\App\Http\Controllers\Admin\ExpenseController::class, 'index'])->name('expenses.index');
            Route::post('/expenses', [\App\Http\Controllers\Admin\ExpenseController::class, 'store'])->name('expenses.store');
            Route::delete('/expenses/{expense}', [\App\Http\Controllers\Admin\ExpenseController::class, 'destroy'])->name('expenses.destroy');

            // Admin E-Learning CMS
            Route::resource('courses', \App\Http\Controllers\Admin\CourseCMSController::class);
            Route::resource('courses.lessons', \App\Http\Controllers\Admin\LessonCMSController::class)->except(['show']);

            // Admin Bookings
            Route::get('/clinic/bookings', [\App\Http\Controllers\Admin\AdminBookingController::class, 'index'])->name('bookings.index');
            Route::patch('/clinic/bookings/{booking}/assign-therapist', [\App\Http\Controllers\Admin\AdminBookingController::class, 'assignTherapist'])->name('bookings.assign-therapist');

            // Admin Schedule Management
            Route::get('/schedules', [\App\Http\Controllers\Admin\AdminScheduleController::class, 'index'])->name('schedules.index');
            Route::post('/schedules', [\App\Http\Controllers\Admin\AdminScheduleController::class, 'store'])->name('schedules.store');
            Route::delete('/schedules/{schedule}', [\App\Http\Controllers\Admin\AdminScheduleController::class, 'destroy'])->name('schedules.destroy');

            // Admin Pricing — Vouchers
            Route::get('/pricing/vouchers', [\App\Http\Controllers\Admin\VoucherController::class, 'index'])->name('pricing.vouchers.index');
            Route::post('/pricing/vouchers', [\App\Http\Controllers\Admin\VoucherController::class, 'store'])->name('pricing.vouchers.store');
            Route::patch('/pricing/vouchers/{voucher}', [\App\Http\Controllers\Admin\VoucherController::class, 'update'])->name('pricing.vouchers.update');
            Route::delete('/pricing/vouchers/{voucher}', [\App\Http\Controllers\Admin\VoucherController::class, 'destroy'])->name('pricing.vouchers.destroy');
        }
    );

    // Super Admin Only Routes (User Management, Role Management)
    Route::middleware(\Spatie\Permission\Middleware\RoleMiddleware::class . ':super_admin')->prefix('admin')->name('admin.')->group(
        function () {
            Route::resource('users', \App\Http\Controllers\Admin\UserController::class);
            Route::resource('roles', \App\Http\Controllers\Admin\RoleController::class);
        }
    );

    // Affiliate Dashboard
    Route::get('/affiliate/dashboard', [\App\Http\Controllers\Affiliate\CommissionController::class, 'index'])->name('affiliate.dashboard');

    // Notifications
    Route::post('/notifications/{id}/read', [\App\Http\Controllers\NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('/notifications/read-all', [\App\Http\Controllers\NotificationController::class, 'markAllAsRead'])->name('notifications.readAll');
});


// Public / LMS Routes (Protected by Auth where necessary inside controllers)
Route::get('/courses', [\App\Http\Controllers\Lms\CourseController::class, 'index'])->name('courses.index');
Route::get('/courses/{course:slug}', [\App\Http\Controllers\Lms\CourseController::class, 'show'])->name('courses.show');
Route::get('/courses/{course:slug}/lessons/{lesson}', [\App\Http\Controllers\Lms\LessonController::class, 'show'])->name('lessons.show');

// Public Blog Routes
Route::get('/blog', [\App\Http\Controllers\BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [\App\Http\Controllers\BlogController::class, 'show'])->name('blog.show');

// Public Testimonials Route
Route::get('/testimoni', function () {
    return Inertia::render('Testimonials/Index');
})->name('testimonials.index');

// Public Methods Route
Route::get('/metode', function () {
    return Inertia::render('Methods/Index');
})->name('methods.index');

// Public Therapist Routes
Route::get('/therapists', [\App\Http\Controllers\TherapistController::class, 'index'])->name('therapists.index');
Route::get('/therapists/{user}', [\App\Http\Controllers\TherapistController::class, 'show'])->name('therapists.show');

// Dynamic XML Sitemap
Route::get('/sitemap.xml', function () {
    $posts = \App\Models\BlogPost::where('is_published', true)->get();
    $courses = \App\Models\Course::where('is_published', true)->get();

    $xml = '<?xml version="1.0" encoding="UTF-8"?>';
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    // Static pages
    $xml .= '<url><loc>' . url('/') . '</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>';
    $xml .= '<url><loc>' . url('/blog') . '</loc><changefreq>daily</changefreq><priority>0.9</priority></url>';
    $xml .= '<url><loc>' . url('/courses') . '</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>';

    // Dynamic pages (Blog)
    foreach ($posts as $post) {
        $xml .= '<url><loc>' . url('/blog/' . $post->slug) . '</loc><lastmod>' . $post->updated_at->toAtomString() . '</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>';
    }

    // Dynamic pages (Courses)
    foreach ($courses as $course) {
        $xml .= '<url><loc>' . url('/courses/' . $course->slug) . '</loc><lastmod>' . $course->updated_at->toAtomString() . '</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>';
    }

    $xml .= '</urlset>';

    return response($xml)->header('Content-Type', 'text/xml');
});

require __DIR__ . '/auth.php';

Route::get('/setup-notifications', function () {
    try {
        \Illuminate\Support\Facades\Artisan::call('make:notifications-table');
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        return '✅ Notifications table created and migrated!';
    } catch (\Throwable $e) {
        return '❌ Error: ' . $e->getMessage();
    }
});

Route::get('/setup-schedules', function () {
    try {
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        return '✅ Schedules migration completed!';
    } catch (\Throwable $e) {
        return '❌ Error: ' . $e->getMessage();
    }
});

Route::get('/setup-dummy', function () {
    try {
        $therapist = \App\Models\User::firstOrCreate(
            ['email' => 'therapist@dummy.com'],
            ['name' => 'Dr. Dummy Therapist', 'password' => bcrypt('password'), 'phone' => '081234567890']
        );
        if (!$therapist->hasRole('therapist')) {
            $therapist->assignRole('therapist');
        }

        $patient = \App\Models\User::firstOrCreate(
            ['email' => 'patient@dummy.com'],
            ['name' => 'John Patient', 'password' => bcrypt('password'), 'phone' => '081234567891']
        );
        if (!$patient->hasRole('patient')) {
            $patient->assignRole('patient');
        }

        $schedule = \App\Models\Schedule::where('therapist_id', $therapist->id)->first();
        if (!$schedule) {
            $schedule = \App\Models\Schedule::create([
                'therapist_id' => $therapist->id,
                'date' => '2026-05-01',
                'start_time' => '10:00',
                'end_time' => '11:00',
                'status' => 'available',
                'quota' => 1
            ]);
        }

        $booking = \App\Models\Booking::where('schedule_id', $schedule->id)->first();
        if (!$booking) {
            \App\Models\Booking::create([
                'booking_code' => 'TEST-' . rand(1000, 9999),
                'schedule_id' => $schedule->id,
                'patient_id' => $patient->id,
                'status' => 'confirmed'
            ]);
        }

        return '✅ Created dummy users and booking.';
    } catch (\Throwable $e) {
        return 'EXCEPTION: ' . $e->getMessage();
    }
});

Route::get('/setup-log', function () {
    $logFile = storage_path('logs/laravel.log');
    if (!file_exists($logFile))
        return 'No log file found.';
    $content = file_get_contents($logFile);
    // Get last 5000 chars to find error messages
    $tail = substr($content, -5000);
    // Find error lines
    preg_match_all('/\[[\d\-\s:]+\]\s+\w+\.ERROR:.*/', $tail, $matches);
    if (!empty($matches[0])) {
        return '<pre>' . htmlspecialchars(implode("\n\n", array_slice($matches[0], -5))) . '</pre>';
    }
    return '<pre>' . htmlspecialchars($tail) . '</pre>';
});

Route::get('/setup-db-fix', function () {
    $output = [];
    $schema = \Illuminate\Support\Facades\Schema::class;

    // Check and add missing columns to users table
    $columns = [
        'phone' => "ALTER TABLE users ADD COLUMN phone VARCHAR(20) NULL AFTER email",
        'google_id' => "ALTER TABLE users ADD COLUMN google_id VARCHAR(255) NULL AFTER phone",
        'avatar' => "ALTER TABLE users ADD COLUMN avatar VARCHAR(255) NULL AFTER google_id",
        'recommended_package' => "ALTER TABLE users ADD COLUMN recommended_package VARCHAR(50) NULL",
        'ktp_photo' => "ALTER TABLE users ADD COLUMN ktp_photo VARCHAR(255) NULL",
        'emergency_contact_name' => "ALTER TABLE users ADD COLUMN emergency_contact_name VARCHAR(255) NULL",
        'emergency_contact_phone' => "ALTER TABLE users ADD COLUMN emergency_contact_phone VARCHAR(255) NULL",
        'emergency_contact_relation' => "ALTER TABLE users ADD COLUMN emergency_contact_relation VARCHAR(255) NULL",
        'agreement_signed' => "ALTER TABLE users ADD COLUMN agreement_signed TINYINT(1) NOT NULL DEFAULT 0",
        'agreement_signed_at' => "ALTER TABLE users ADD COLUMN agreement_signed_at TIMESTAMP NULL",
        'signature_data' => "ALTER TABLE users ADD COLUMN signature_data TEXT NULL",
    ];

    foreach ($columns as $col => $sql) {
        if (!$schema::hasColumn('users', $col)) {
            try {
                \Illuminate\Support\Facades\DB::statement($sql);
                $output[] = "✅ Added column: $col";
            } catch (\Throwable $e) {
                $output[] = "❌ Failed $col: " . $e->getMessage();
            }
        } else {
            $output[] = "⏭️ Column exists: $col";
        }
    }

    // Check bookings columns
    $bookingCols = [
        'package_type' => "ALTER TABLE bookings ADD COLUMN package_type VARCHAR(50) NULL",
        'therapist_id' => "ALTER TABLE bookings ADD COLUMN therapist_id BIGINT UNSIGNED NULL",
        'recording_link' => "ALTER TABLE bookings ADD COLUMN recording_link VARCHAR(255) NULL",
        'user_voucher_id' => "ALTER TABLE bookings ADD COLUMN user_voucher_id BIGINT UNSIGNED NULL",
    ];

    foreach ($bookingCols as $col => $sql) {
        if (!$schema::hasColumn('bookings', $col)) {
            try {
                \Illuminate\Support\Facades\DB::statement($sql);
                $output[] = "✅ Added bookings.$col";
            } catch (\Throwable $e) {
                $output[] = "❌ Failed bookings.$col: " . $e->getMessage();
            }
        } else {
            $output[] = "⏭️ Bookings column exists: $col";
        }
    }

    // Check schedules columns
    if ($schema::hasTable('schedules') && !$schema::hasColumn('schedules', 'type')) {
        try {
            \Illuminate\Support\Facades\DB::statement("ALTER TABLE schedules ADD COLUMN type VARCHAR(20) NOT NULL DEFAULT 'consultation'");
            $output[] = "✅ Added schedules.type";
        } catch (\Throwable $e) {
            $output[] = "❌ Failed schedules.type: " . $e->getMessage();
        }
    }

    // Ensure roles exist
    $roles = ['super_admin', 'admin', 'cs', 'therapist', 'patient'];
    foreach ($roles as $role) {
        \Spatie\Permission\Models\Role::firstOrCreate(['name' => $role, 'guard_name' => 'web']);
    }
    $output[] = "✅ All roles ensured";

    // Check tables
    $tables = ['vouchers', 'user_vouchers', 'screening_results'];
    foreach ($tables as $t) {
        $output[] = $schema::hasTable($t) ? "⏭️ Table exists: $t" : "⚠️ Table missing: $t";
    }

    return '<pre>' . implode("\n", $output) . '</pre>';
});

Route::get('/setup-super-admin', function () {
    try {
        \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'super_admin', 'guard_name' => 'web']);
        $user = \App\Models\User::firstOrCreate(
            ['email' => 'admin@indepth.co.id'],
            ['name' => 'Super Admin', 'password' => bcrypt('Anakanak12')]
        );
        $user->assignRole('super_admin');
        return '✅ Super Admin created: ' . $user->email;
    } catch (\Throwable $e) {
        return '❌ Error: ' . $e->getMessage();
    }
});

Route::get('/setup-migrate', function () {
    try {
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        return '✅ Migration completed! ' . \Illuminate\Support\Facades\Artisan::output();
    } catch (\Throwable $e) {
        return '❌ Error: ' . $e->getMessage();
    }
});

Route::get('/setup-clear-cache', function () {
    try {
        \Illuminate\Support\Facades\Artisan::call('config:clear');
        \Illuminate\Support\Facades\Artisan::call('cache:clear');
        \Illuminate\Support\Facades\Artisan::call('view:clear');
        \Illuminate\Support\Facades\Artisan::call('route:clear');
        return '✅ All caches cleared!';
    } catch (\Throwable $e) {
        return '❌ Error: ' . $e->getMessage();
    }
});

Route::get('/login-therapist', function () {
    $therapist = \App\Models\User::role('therapist')->first();
    if ($therapist) {
        \Illuminate\Support\Facades\Auth::login($therapist);
        return redirect()->route('schedules.index');
    }
    return '❌ No therapist found.';
});
