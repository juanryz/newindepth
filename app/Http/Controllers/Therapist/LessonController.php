<?php

namespace App\Http\Controllers\Therapist;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonController extends Controller
{
    public function index(Course $course)
    {
        if ($course->instructor_id !== auth()->id() && !auth()->user()->hasAnyRole(['admin', 'super_admin'])) {
            abort(403);
        }

        $lessons = $course->lessons()->orderBy('order_column')->get();

        return Inertia::render('Therapist/Lessons/Index', [
            'course' => $course,
            'lessons' => $lessons,
        ]);
    }

    public function create(Course $course)
    {
        if ($course->instructor_id !== auth()->id() && !auth()->user()->hasAnyRole(['admin', 'super_admin'])) {
            abort(403);
        }

        return Inertia::render('Therapist/Lessons/Form', [
            'course' => $course,
            'lesson' => new Lesson(),
        ]);
    }

    public function store(Request $request, Course $course)
    {
        if ($course->instructor_id !== auth()->id() && !auth()->user()->hasAnyRole(['admin', 'super_admin'])) {
            abort(403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'video_url' => 'nullable|url',
            'content' => 'nullable|string',
            'attachment' => 'nullable|file|max:10240', // 10MB
            'is_preview' => 'boolean',
            'order_column' => 'numeric|min:0'
        ]);

        $type = $request->filled('video_url') ? 'video' : 'text';
        if ($request->hasFile('attachment')) {
            $type = 'document';
        }

        $lesson = new Lesson([
            'title' => $request->title,
            'type' => $type,
            'video_url' => $request->video_url,
            'content_url' => $request->video_url, // legacy column compatibility
            'content' => $request->content,
            'content_text' => $request->content, // legacy column compatibility
            'is_preview' => $request->has('is_preview') ? $request->is_preview : false,
            'order_column' => $request->order_column ?? 0,
            'order' => $request->order_column ?? 0, // legacy column compatibility
        ]);

        if ($request->hasFile('attachment')) {
            $path = $request->file('attachment')->store('lessons/attachments', 'public');
            $lesson->attachment = $path;
            $lesson->attachment_name = $request->file('attachment')->getClientOriginalName();
        }

        $course->lessons()->save($lesson);

        return redirect()->route('therapist.courses.lessons.index', $course->id)->with('success', 'Materi berhasil ditambahkan.');
    }

    public function edit(Course $course, Lesson $lesson)
    {
        if ($course->instructor_id !== auth()->id() && !auth()->user()->hasAnyRole(['admin', 'super_admin']) || $lesson->course_id !== $course->id) {
            abort(403);
        }

        return Inertia::render('Therapist/Lessons/Form', [
            'course' => $course,
            'lesson' => $lesson,
        ]);
    }

    public function update(Request $request, Course $course, Lesson $lesson)
    {
        if ($course->instructor_id !== auth()->id() && !auth()->user()->hasAnyRole(['admin', 'super_admin']) || $lesson->course_id !== $course->id) {
            abort(403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'video_url' => 'nullable|url',
            'content' => 'nullable|string',
            'attachment' => 'nullable|file|max:10240', // 10MB
            'is_preview' => 'boolean',
            'order_column' => 'numeric|min:0'
        ]);

        $type = $request->filled('video_url') ? 'video' : 'text';
        if ($lesson->attachment || $request->hasFile('attachment')) {
            $type = 'document';
        }

        $lesson->fill([
            'title' => $request->title,
            'type' => $type,
            'video_url' => $request->video_url,
            'content_url' => $request->video_url, // legacy column compatibility
            'content' => $request->content,
            'content_text' => $request->content, // legacy column compatibility
            'is_preview' => $request->has('is_preview') ? $request->is_preview : false,
            'order_column' => $request->order_column ?? 0,
            'order' => $request->order_column ?? 0, // legacy column compatibility
        ]);

        if ($request->hasFile('attachment')) {
            $path = $request->file('attachment')->store('lessons/attachments', 'public');
            $lesson->attachment = $path;
            $lesson->attachment_name = $request->file('attachment')->getClientOriginalName();
        }

        $lesson->save();

        return redirect()->route('therapist.courses.lessons.index', $course->id)->with('success', 'Materi berhasil diperbarui.');
    }

    public function destroy(Course $course, Lesson $lesson)
    {
        if ($course->instructor_id !== auth()->id() && !auth()->user()->hasAnyRole(['admin', 'super_admin']) || $lesson->course_id !== $course->id) {
            abort(403);
        }

        $lesson->delete();
        return redirect()->route('therapist.courses.lessons.index', $course->id)->with('success', 'Materi berhasil dihapus.');
    }
}
