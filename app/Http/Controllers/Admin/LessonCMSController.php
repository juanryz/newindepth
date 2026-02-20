<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonCMSController extends Controller
{
    public function index(Course $course)
    {
        $lessons = $course->lessons()->orderBy('order_column')->get();

        return Inertia::render('Admin/Lessons/Index', [
            'course' => $course,
            'lessons' => $lessons,
        ]);
    }

    public function create(Course $course)
    {
        return Inertia::render('Admin/Lessons/Form', [
            'course' => $course,
            'lesson' => new Lesson(),
        ]);
    }

    public function store(Request $request, Course $course)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'video_url' => 'nullable|url',
            'content' => 'nullable|string',
            'is_preview' => 'boolean',
            'order_column' => 'numeric|min:0'
        ]);

        $type = $request->filled('video_url') ? 'video' : 'text';

        $lesson = new Lesson([
            'title' => $request->title,
            'type' => $type,
            'video_url' => $request->video_url,
            'content_url' => $request->video_url, // legacy column
            'content' => $request->content,
            'content_text' => $request->content, // legacy column
            'is_preview' => $request->has('is_preview') ? $request->is_preview : false,
            'order_column' => $request->order_column ?? 0,
            'order' => $request->order_column ?? 0, // legacy column
        ]);

        $course->lessons()->save($lesson);

        return redirect()->route('admin.courses.lessons.index', $course->id)->with('success', 'Materi berhasil ditambahkan.');
    }

    public function edit(Course $course, Lesson $lesson)
    {
        return Inertia::render('Admin/Lessons/Form', [
            'course' => $course,
            'lesson' => $lesson,
        ]);
    }

    public function update(Request $request, Course $course, Lesson $lesson)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'video_url' => 'nullable|url',
            'content' => 'nullable|string',
            'is_preview' => 'boolean',
            'order_column' => 'numeric|min:0'
        ]);

        $type = $request->filled('video_url') ? 'video' : 'text';

        $lesson->fill([
            'title' => $request->title,
            'type' => $type,
            'video_url' => $request->video_url,
            'content_url' => $request->video_url, // legacy column
            'content' => $request->content,
            'content_text' => $request->content, // legacy column
            'is_preview' => $request->has('is_preview') ? $request->is_preview : false,
            'order_column' => $request->order_column ?? 0,
            'order' => $request->order_column ?? 0, // legacy column
        ]);

        $lesson->save();

        return redirect()->route('admin.courses.lessons.index', $course->id)->with('success', 'Materi berhasil diperbarui.');
    }

    public function destroy(Course $course, Lesson $lesson)
    {
        $lesson->delete();
        return redirect()->route('admin.courses.lessons.index', $course->id)->with('success', 'Materi berhasil dihapus.');
    }
}
