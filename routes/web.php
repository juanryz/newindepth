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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Patient Routes
    Route::middleware(\Spatie\Permission\Middleware\RoleMiddleware::class . ':patient')->group(function () {
        Route::get('/bookings/create', [\App\Http\Controllers\Clinic\BookingController::class, 'create'])->name('bookings.create');
        Route::post('/bookings', [\App\Http\Controllers\Clinic\BookingController::class, 'store'])->name('bookings.store');
        Route::get('/bookings/{booking}', [\App\Http\Controllers\Clinic\BookingController::class, 'show'])->name('bookings.show');

        // Payment routes
        Route::get('/payments/upload/{booking}', [\App\Http\Controllers\Clinic\PaymentController::class, 'create'])->name('payments.create');
        Route::post('/payments/{booking}', [\App\Http\Controllers\Clinic\PaymentController::class, 'store'])->name('payments.store');
    });

    // Therapist Routes
    Route::middleware(\Spatie\Permission\Middleware\RoleMiddleware::class . ':therapist')->group(function () {
        Route::get('/schedules', [\App\Http\Controllers\Clinic\ScheduleController::class, 'index'])->name('schedules.index');
        Route::post('/schedules', [\App\Http\Controllers\Clinic\ScheduleController::class, 'store'])->name('schedules.store');
        Route::delete('/schedules/{schedule}', [\App\Http\Controllers\Clinic\ScheduleController::class, 'destroy'])->name('schedules.destroy');
    });

    // CS / Admin Routes for Transaction Validation
    Route::middleware(\Spatie\Permission\Middleware\RoleMiddleware::class . ':cs|admin|super_admin')->prefix('admin')->name('admin.')->group(function () {
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
        Route::delete('/expenses', [\App\Http\Controllers\Admin\ExpenseController::class, 'destroy'])->name('expenses.destroy');

        // Admin E-Learning CMS
        Route::resource('courses', \App\Http\Controllers\Admin\CourseCMSController::class);
        Route::resource('courses.lessons', \App\Http\Controllers\Admin\LessonCMSController::class)->except(['show']);

        // Admin Schedule Management
        Route::get('/schedules', [\App\Http\Controllers\Admin\AdminScheduleController::class, 'index'])->name('schedules.index');
        Route::post('/schedules', [\App\Http\Controllers\Admin\AdminScheduleController::class, 'store'])->name('schedules.store');
        Route::delete('/schedules/{schedule}', [\App\Http\Controllers\Admin\AdminScheduleController::class, 'destroy'])->name('schedules.destroy');
    });

    // Super Admin Only Routes (User Management, Role Management)
    Route::middleware(\Spatie\Permission\Middleware\RoleMiddleware::class . ':super_admin')->prefix('admin')->name('admin.')->group(function () {
        Route::resource('users', \App\Http\Controllers\Admin\UserController::class);
        Route::resource('roles', \App\Http\Controllers\Admin\RoleController::class);
    });

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
