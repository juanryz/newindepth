<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonController extends Controller
{
    public function show(Course $course, Lesson $lesson)
    {
        if ($lesson->course_id !== $course->id) {
            abort(404);
        }

        $isEnrolled = false;
        if (auth()->check()) {
            $isEnrolled = auth()->user()->courses()->where('course_id', $course->id)->exists();
        }

        if (!$lesson->is_preview && !$isEnrolled) {
            return redirect()->route('courses.show', $course->slug)->withErrors(['error' => 'Anda harus membeli kelas ini terlebih dahulu untuk melihat materi ini.']);
        }

        $course->load(['lessons' => function ($query) {
            $query->orderBy('order_column');
        }]);
        $course->setRelation('lessons', $course->lessons->values());

        return Inertia::render('Lms/Lessons/Show', [
            'course' => $course,
            'lesson' => $lesson,
            'isEnrolled' => $isEnrolled,
        ]);
    }
}
