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
    Route::middleware('role:patient')->group(function () {
        Route::get('/bookings/create', [\App\Http\Controllers\Clinic\BookingController::class, 'create'])->name('bookings.create');
        Route::post('/bookings', [\App\Http\Controllers\Clinic\BookingController::class, 'store'])->name('bookings.store');
        Route::get('/bookings/{booking}', [\App\Http\Controllers\Clinic\BookingController::class, 'show'])->name('bookings.show');

        // Payment routes
        Route::get('/payments/upload/{booking}', [\App\Http\Controllers\Clinic\PaymentController::class, 'create'])->name('payments.create');
        Route::post('/payments/{booking}', [\App\Http\Controllers\Clinic\PaymentController::class, 'store'])->name('payments.store');
    });

    // Therapist Routes
    Route::middleware('role:therapist')->group(function () {
        Route::get('/schedules', [\App\Http\Controllers\Clinic\ScheduleController::class, 'index'])->name('schedules.index');
        Route::post('/schedules', [\App\Http\Controllers\Clinic\ScheduleController::class, 'store'])->name('schedules.store');
        Route::delete('/schedules/{schedule}', [\App\Http\Controllers\Clinic\ScheduleController::class, 'destroy'])->name('schedules.destroy');
    });

    // CS / Admin Routes for Transaction Validation
    Route::middleware('role:cs|admin|super_admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/transactions', [\App\Http\Controllers\Admin\TransactionValidationController::class, 'index'])->name('transactions.index');
        Route::post('/transactions/{transaction}/validate', [\App\Http\Controllers\Admin\TransactionValidationController::class, 'validatePayment'])->name('transactions.validate');
        Route::post('/transactions/{transaction}/reject', [\App\Http\Controllers\Admin\TransactionValidationController::class, 'rejectPayment'])->name('transactions.reject');

        // Blog CMS
        Route::resource('blog', \App\Http\Controllers\Admin\BlogPostCMSController::class);

        // Reports & Expenses
        Route::get('/reports', [\App\Http\Controllers\Admin\ClinicReportController::class, 'index'])->name('reports.index');
        Route::get('/expenses', [\App\Http\Controllers\Admin\ExpenseController::class, 'index'])->name('expenses.index');
        Route::post('/expenses', [\App\Http\Controllers\Admin\ExpenseController::class, 'store'])->name('expenses.store');
        Route::delete('/expenses/{expense}', [\App\Http\Controllers\Admin\ExpenseController::class, 'destroy'])->name('expenses.destroy');
    });

    // Affiliate Dashboard
    Route::get('/affiliate/dashboard', [\App\Http\Controllers\Affiliate\CommissionController::class, 'index'])->name('affiliate.dashboard');
});

// Public / LMS Routes (Protected by Auth where necessary inside controllers)
Route::get('/courses', [\App\Http\Controllers\Lms\CourseController::class, 'index'])->name('courses.index');
Route::get('/courses/{course:slug}', [\App\Http\Controllers\Lms\CourseController::class, 'show'])->name('courses.show');
Route::get('/courses/{course:slug}/lessons/{lesson}', [\App\Http\Controllers\Lms\LessonController::class, 'show'])->name('lessons.show');

// Public Blog Routes
Route::get('/blog', [\App\Http\Controllers\BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [\App\Http\Controllers\BlogController::class, 'show'])->name('blog.show');

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
