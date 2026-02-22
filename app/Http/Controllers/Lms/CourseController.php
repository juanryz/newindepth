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
        } catch (\Throwable $e) {
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
        } catch (\Throwable $e) {
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
                'lessons' => function ($query) {
                    $query->select('id', 'course_id', 'title', 'order', 'type', 'is_preview');
                }
            ]);
        } catch (\Throwable $e) {
            Log::error('[CourseController] show load error: ' . $e->getMessage());
        }

        $isEnrolled = false;
        if (auth()->check()) {
            try {
                $isEnrolled = auth()->user()->courses()->where('course_id', $course->id)->exists();
            } catch (\Throwable $e) {
                Log::error('[CourseController] isEnrolled check error: ' . $e->getMessage());
            }
        }

        return Inertia::render('Lms/Courses/Show', [
            'course' => $course,
            'isEnrolled' => $isEnrolled,
        ]);
    }
}
