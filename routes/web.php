<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// AI Chat Routes
Route::post('/api/ai-chat', [App\Http\Controllers\AiChatController::class, 'chat'])->name('ai-chat');

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
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::get('/profile/documents', [ProfileController::class, 'documents'])->name('profile.documents');
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
    Route::middleware([\Spatie\Permission\Middleware\RoleMiddleware::class . ':patient'])->group(
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
            Route::get('/clinic/schedules/{schedule}', [\App\Http\Controllers\Admin\AdminScheduleController::class, 'show'])->name('schedules.show');
            Route::patch('/clinic/bookings/{booking}/details', [\App\Http\Controllers\Admin\AdminBookingController::class, 'updateDetails'])->name('bookings.update-details');

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
            Route::get('users/{user}/agreement', [\App\Http\Controllers\Admin\UserController::class, 'agreement'])->name('users.agreement');
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
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/my-courses', [\App\Http\Controllers\Lms\CourseController::class, 'myCourses'])->name('courses.my');
});

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

Route::get('/setup-sync-slots', function () {
    try {
        $schedules = \App\Models\Schedule::withCount([
            'bookings' => function ($query) {
                $query->where('status', 'confirmed');
            }
        ])->get();

        $updated = 0;
        foreach ($schedules as $schedule) {
            /** @var \App\Models\Schedule $schedule */
            $schedule->update([
                'booked_count' => $schedule->bookings_count,
                'status' => $schedule->bookings_count >= $schedule->quota ? 'full' : 'available'
            ]);
            $updated++;
        }

        return "✅ Synced $updated schedules with confirmed bookings count.";
    } catch (\Throwable $e) {
        return '❌ Error: ' . $e->getMessage();
    }
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

Route::get('/setup-phpinfo', function () {
    return phpinfo();
});

Route::get('/setup-log', function () {
    $logFile = storage_path('logs/laravel.log');
    if (!file_exists($logFile))
        return 'No log file found.';

    // Get last 100 lines
    $content = '';
    if (function_exists('shell_exec')) {
        $content = shell_exec("tail -n 100 " . escapeshellarg($logFile));
    }

    if (!$content) {
        $content = file_get_contents($logFile);
        $content = substr($content, -15000); // Last 15KB
    }

    return '<pre style="background: #1e1e1e; color: #d4d4d4; padding: 20px; border-radius: 8px; overflow-x: auto;">' . htmlspecialchars($content) . '</pre>';
});

Route::get('/setup-db-fix', function () {
    $output = [];
    $schema = \Illuminate\Support\Facades\Schema::class;

    // 1. Check and add missing columns to users table
    $columns = [
        'phone' => "ALTER TABLE users ADD COLUMN phone VARCHAR(20) NULL",
        'google_id' => "ALTER TABLE users ADD COLUMN google_id VARCHAR(255) NULL",
        'avatar' => "ALTER TABLE users ADD COLUMN avatar VARCHAR(255) NULL",
        'recommended_package' => "ALTER TABLE users ADD COLUMN recommended_package VARCHAR(50) NULL",
        'ktp_photo' => "ALTER TABLE users ADD COLUMN ktp_photo VARCHAR(255) NULL",
        'emergency_contact_name' => "ALTER TABLE users ADD COLUMN emergency_contact_name VARCHAR(255) NULL",
        'emergency_contact_phone' => "ALTER TABLE users ADD COLUMN emergency_contact_phone VARCHAR(255) NULL",
        'emergency_contact_relation' => "ALTER TABLE users ADD COLUMN emergency_contact_relation VARCHAR(255) NULL",
        'agreement_signed' => "ALTER TABLE users ADD COLUMN agreement_signed TINYINT(1) NOT NULL DEFAULT 0",
        'agreement_signed_at' => "ALTER TABLE users ADD COLUMN agreement_signed_at TIMESTAMP NULL",
        'digital_signature' => "ALTER TABLE users ADD COLUMN digital_signature LONGTEXT NULL",
        'signature_data' => "ALTER TABLE users ADD COLUMN signature_data TEXT NULL",
        'referral_code' => "ALTER TABLE users ADD COLUMN referral_code VARCHAR(255) NULL UNIQUE",
        'affiliate_ref' => "ALTER TABLE users ADD COLUMN affiliate_ref VARCHAR(255) NULL",
        'screening_completed_at' => "ALTER TABLE users ADD COLUMN screening_completed_at TIMESTAMP NULL",
        'screening_answers' => "ALTER TABLE users ADD COLUMN screening_answers JSON NULL",
        'age' => "ALTER TABLE users ADD COLUMN age INT NULL",
        'gender' => "ALTER TABLE users ADD COLUMN gender VARCHAR(20) NULL",
    ];

    foreach ($columns as $col => $sql) {
        if (!$schema::hasColumn('users', $col)) {
            try {
                \Illuminate\Support\Facades\DB::statement($sql);
                $output[] = "✅ Added user column: $col";
            } catch (\Throwable $e) {
                $output[] = "❌ Failed user column $col: " . $e->getMessage();
            }
        }
    }

    // 2. Ensure roles exist
    $roles = ['super_admin', 'admin', 'cs', 'therapist', 'patient'];
    foreach ($roles as $role) {
        \Spatie\Permission\Models\Role::firstOrCreate(['name' => $role, 'guard_name' => 'web']);
    }
    $output[] = "✅ All roles ensured";

    // 3. Transactions table (Required by others)
    if (!$schema::hasTable('transactions')) {
        try {
            \Illuminate\Support\Facades\DB::statement("CREATE TABLE transactions (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                user_id BIGINT UNSIGNED NOT NULL,
                transactionable_type VARCHAR(255) NOT NULL,
                transactionable_id BIGINT UNSIGNED NOT NULL,
                amount DECIMAL(15,2) NOT NULL,
                status VARCHAR(50) NOT NULL DEFAULT 'pending',
                payment_method VARCHAR(50) NULL,
                payment_proof VARCHAR(255) NULL,
                payment_proof_uploaded_at TIMESTAMP NULL,
                validated_at TIMESTAMP NULL,
                validated_by BIGINT UNSIGNED NULL,
                admin_notes TEXT NULL,
                created_at TIMESTAMP NULL,
                updated_at TIMESTAMP NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (validated_by) REFERENCES users(id) ON DELETE SET NULL
            )");
            $output[] = "✅ Created table: transactions";
        } catch (\Throwable $e) {
            $output[] = "❌ Failed transactions: " . $e->getMessage();
        }
    }

    // 4. Screening Results table
    if (!$schema::hasTable('screening_results')) {
        try {
            \Illuminate\Support\Facades\DB::statement("CREATE TABLE screening_results (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                user_id BIGINT UNSIGNED NOT NULL,
                step_data JSON NOT NULL,
                chat_history JSON NULL,
                severity_label VARCHAR(50) NULL,
                recommended_package VARCHAR(50) NULL,
                ai_summary TEXT NULL,
                is_high_risk TINYINT(1) NOT NULL DEFAULT 0,
                completed_at TIMESTAMP NULL,
                created_at TIMESTAMP NULL,
                updated_at TIMESTAMP NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )");
            $output[] = "✅ Created table: screening_results";
        } catch (\Throwable $e) {
            $output[] = "❌ Failed screening_results: " . $e->getMessage();
        }
    }

    // 5. Schedules table
    if (!$schema::hasTable('schedules')) {
        try {
            \Illuminate\Support\Facades\DB::statement("CREATE TABLE schedules (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                therapist_id BIGINT UNSIGNED NULL,
                date DATE NOT NULL,
                start_time TIME NOT NULL,
                end_time TIME NOT NULL,
                quota INT NOT NULL DEFAULT 1,
                booked_count INT NOT NULL DEFAULT 0,
                status VARCHAR(20) NOT NULL DEFAULT 'available',
                schedule_type VARCHAR(50) NOT NULL DEFAULT 'consultation',
                type VARCHAR(20) NULL,
                created_at TIMESTAMP NULL,
                updated_at TIMESTAMP NULL,
                FOREIGN KEY (therapist_id) REFERENCES users(id) ON DELETE SET NULL
            )");
            $output[] = "✅ Created table: schedules";
        } catch (\Throwable $e) {
            $output[] = "❌ Failed schedules: " . $e->getMessage();
        }
    } else {
        $schedCols = [
            'therapist_id' => "ALTER TABLE schedules ADD COLUMN therapist_id BIGINT UNSIGNED NULL",
            'schedule_type' => "ALTER TABLE schedules ADD COLUMN schedule_type VARCHAR(50) NOT NULL DEFAULT 'consultation'",
            'booked_count' => "ALTER TABLE schedules ADD COLUMN booked_count INT NOT NULL DEFAULT 0",
            'type' => "ALTER TABLE schedules ADD COLUMN type VARCHAR(20) NULL",
        ];
        foreach ($schedCols as $col => $sql) {
            if (!$schema::hasColumn('schedules', $col)) {
                try {
                    \Illuminate\Support\Facades\DB::statement($sql);
                    $output[] = "✅ Added schedules.$col";
                } catch (\Throwable $e) {
                    $output[] = "❌ Failed schedules.$col: " . $e->getMessage();
                }
            }
        }
    }

    // 6. Bookings table
    if (!$schema::hasTable('bookings')) {
        try {
            \Illuminate\Support\Facades\DB::statement("CREATE TABLE bookings (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                booking_code VARCHAR(255) UNIQUE NOT NULL,
                patient_id BIGINT UNSIGNED NOT NULL,
                schedule_id BIGINT UNSIGNED NULL,
                therapist_id BIGINT UNSIGNED NULL,
                screening_answers JSON NULL,
                status VARCHAR(50) NOT NULL DEFAULT 'pending',
                notes TEXT NULL,
                recording_link VARCHAR(255) NULL,
                package_type VARCHAR(50) NULL,
                user_voucher_id BIGINT UNSIGNED NULL,
                created_at TIMESTAMP NULL,
                updated_at TIMESTAMP NULL,
                FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (schedule_id) REFERENCES schedules(id) ON DELETE SET NULL,
                FOREIGN KEY (therapist_id) REFERENCES users(id) ON DELETE SET NULL
            )");
            $output[] = "✅ Created table: bookings";
        } catch (\Throwable $e) {
            $output[] = "❌ Failed bookings: " . $e->getMessage();
        }
    } else {
        $bookCols = [
            'package_type' => "ALTER TABLE bookings ADD COLUMN package_type VARCHAR(50) NULL",
            'therapist_id' => "ALTER TABLE bookings ADD COLUMN therapist_id BIGINT UNSIGNED NULL",
            'recording_link' => "ALTER TABLE bookings ADD COLUMN recording_link VARCHAR(255) NULL",
            'user_voucher_id' => "ALTER TABLE bookings ADD COLUMN user_voucher_id BIGINT UNSIGNED NULL",
            'therapist_notes' => "ALTER TABLE bookings ADD COLUMN therapist_notes TEXT NULL",
            'patient_visible_notes' => "ALTER TABLE bookings ADD COLUMN patient_visible_notes TEXT NULL",
        ];
        foreach ($bookCols as $col => $sql) {
            if (!$schema::hasColumn('bookings', $col)) {
                try {
                    \Illuminate\Support\Facades\DB::statement($sql);
                    $output[] = "✅ Added bookings.$col";
                } catch (\Throwable $e) {
                    $output[] = "❌ Failed bookings.$col: " . $e->getMessage();
                }
            }
        }
    }

    // 7. Commissions table
    if (!$schema::hasTable('commissions')) {
        try {
            \Illuminate\Support\Facades\DB::statement("CREATE TABLE commissions (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                affiliate_user_id BIGINT UNSIGNED NOT NULL,
                transaction_id BIGINT UNSIGNED NOT NULL,
                referred_user_id BIGINT UNSIGNED NOT NULL,
                transaction_amount DECIMAL(12,2) NOT NULL,
                commission_rate DECIMAL(5,2) NOT NULL,
                commission_amount DECIMAL(12,2) NOT NULL,
                status VARCHAR(50) NOT NULL DEFAULT 'pending',
                paid_at TIMESTAMP NULL,
                created_at TIMESTAMP NULL,
                updated_at TIMESTAMP NULL,
                FOREIGN KEY (affiliate_user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (referred_user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE
            )");
            $output[] = "✅ Created table: commissions";
        } catch (\Throwable $e) {
            $output[] = "❌ Failed commissions: " . $e->getMessage();
        }
    }

    // 8. Courses & Course User tables
    if (!$schema::hasTable('courses')) {
        try {
            \Illuminate\Support\Facades\DB::statement("CREATE TABLE courses (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) UNIQUE NOT NULL,
                description TEXT NOT NULL,
                thumbnail VARCHAR(255) NULL,
                price DECIMAL(12,2) DEFAULT 0,
                is_published TINYINT(1) DEFAULT 0,
                created_at TIMESTAMP NULL,
                updated_at TIMESTAMP NULL
            )");
            $output[] = "✅ Created table: courses";
        } catch (\Throwable $e) {
            $output[] = "❌ Failed courses: " . $e->getMessage();
        }
    }

    if (!$schema::hasTable('course_user')) {
        try {
            \Illuminate\Support\Facades\DB::statement("CREATE TABLE course_user (
                user_id BIGINT UNSIGNED NOT NULL,
                course_id BIGINT UNSIGNED NOT NULL,
                transaction_id BIGINT UNSIGNED NULL,
                enrolled_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, course_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
                FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE SET NULL
            )");
            $output[] = "✅ Created table: course_user";
        } catch (\Throwable $e) {
            $output[] = "❌ Failed course_user: " . $e->getMessage();
        }
    }

    return '<pre style="background: #1e1e1e; color: #d4d4d4; padding: 20px; border-radius: 8px; overflow-x: auto;">' . implode("\n", $output) . '</pre>';
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
