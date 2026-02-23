<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        try {
            $courses = Course::where('is_published', true)->get();
        }
        catch (\Throwable $e) {
            Log::error('[CourseController] index error: ' . $e->getMessage());
            $courses = collect([]);
        }

        return Inertia::render('Lms/Courses/Index', [
            'courses' => $courses->values(),
        ]);
    }

    public function myCourses()
    {
        try {
            $courses = auth()->user()->courses()
                ->where('is_published', true)
                ->get();
        }
        catch (\Throwable $e) {
            Log::error('[CourseController] myCourses error: ' . $e->getMessage());
            $courses = collect([]);
        }

        return Inertia::render('Patient/MyCourses', [
            'courses' => $courses->values(),
        ]);
    }

    public function show(Course $course)
    {
        if (!$course->is_published) {
            abort(404);
        }

        try {
            $course->load([
                'instructor',
                'lessons' => function ($query) {
                $query->select('id', 'course_id', 'title', 'order', 'type', 'is_preview')
                    ->orderBy('order');
            }
            ])->loadCount('users');

            // Ensure lessons is a sequential array for frontend .map()
            $course->setRelation('lessons', $course->lessons->values());
        }
        catch (\Throwable $e) {
            Log::error('[CourseController] show load error: ' . $e->getMessage());
        }

        $isEnrolled = false;
        if (auth()->check()) {
            try {
                $isEnrolled = auth()->user()->courses()->where('course_id', $course->id)->exists();
            }
            catch (\Throwable $e) {
                Log::error('[CourseController] isEnrolled check error: ' . $e->getMessage());
            }
        }

        // Security: Hide sensitive data if not enrolled
        if (!$isEnrolled) {
            $course->makeHidden(['online_link']);
        }

        return Inertia::render('Lms/Courses/Show', [
            'course' => $course,
            'isEnrolled' => $isEnrolled,
        ]);
    }

    public function enroll(Request $request, Course $course)
    {
        if (!$course->is_published) {
            abort(404);
        }

        $user = auth()->user();

        // Check if already enrolled
        if ($user->courses()->where('course_id', $course->id)->exists()) {
            return redirect()->route('courses.my')->with('info', 'Anda sudah terdaftar di kelas ini.');
        }

        if ((float)($course->price ?? 0) > 0) {
            // Course is paid, redirect to checkout
            // Currently not implemented, redirect back with error/info
            return redirect()->route('courses.show', $course->slug)->withErrors(['error' => 'Fitur pembelian kelas berbayar sedang dikembangkan. Silakan hubungi admin.']);
        }

        // Free course -> Enroll immediately
        try {
            $user->courses()->attach($course->id, [
                'enrolled_at' => now(),
            ]);
            return redirect()->route('courses.my')->with('success', 'Berhasil mendaftar ke kelas gratis ini!');
        }
        catch (\Throwable $e) {
            Log::error('[CourseController] enroll error: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan saat mencoba mendaftar.']);
        }
    }
}
