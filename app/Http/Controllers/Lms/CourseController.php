<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::where('is_published', true)->get();

        return Inertia::render('Lms/Courses/Index', [
            'courses' => $courses,
        ]);
    }

    public function show(Course $course)
    {
        if (!$course->is_published) {
            abort(404);
        }

        $course->load([
            'lessons' => function ($query) {
                $query->select('id', 'course_id', 'title', 'order', 'type', 'is_preview');
            }
        ]);

        $isEnrolled = false;
        if (auth()->check()) {
            $isEnrolled = auth()->user()->courses()->where('course_id', $course->id)->exists();
        }

        return Inertia::render('Lms/Courses/Show', [
            'course' => $course,
            'isEnrolled' => $isEnrolled,
        ]);
    }
}
