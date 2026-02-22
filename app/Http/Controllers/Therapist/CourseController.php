<?php

namespace App\Http\Controllers\Therapist;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $query = Course::query();

        if (!$user->hasAnyRole(['admin', 'super_admin'])) {
            $query->where('instructor_id', $user->id);
        }

        $courses = $query->with(['instructor'])->withCount('lessons')
            ->latest()
            ->get();

        return Inertia::render('Therapist/Courses/Index', [
            'courses' => $courses,
        ]);
    }

    public function create()
    {
        return Inertia::render('Therapist/Courses/Form', [
            'course' => new Course(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'course_type' => 'required|in:online,offline',
            'online_platform' => 'required_if:course_type,online|nullable|string|max:255',
            'online_link' => 'required_if:course_type,online|nullable|url',
            'location' => 'required_if:course_type,offline|nullable|string|max:255',
            'thumbnail' => 'nullable|image|max:2048',
            'price' => 'required|numeric|min:0',
            'is_published' => 'boolean',
        ]);

        $data = $request->except('thumbnail');
        $data['slug'] = Str::slug($request->title) . '-' . Str::random(5);
        $data['is_published'] = $request->has('is_published') ? $request->is_published : false;
        $data['instructor_id'] = auth()->id();

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')->store('courses', 'public');
        }

        Course::create($data);

        return redirect()->route('therapist.courses.index')->with('success', 'Kelas berhasil dibuat.');
    }

    public function edit(Course $course)
    {
        if ($course->instructor_id !== auth()->id() && !auth()->user()->hasAnyRole(['admin', 'super_admin'])) {
            abort(403);
        }

        return Inertia::render('Therapist/Courses/Form', [
            'course' => $course,
        ]);
    }

    public function update(Request $request, Course $course)
    {
        if ($course->instructor_id !== auth()->id() && !auth()->user()->hasAnyRole(['admin', 'super_admin'])) {
            abort(403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'course_type' => 'required|in:online,offline',
            'online_platform' => 'required_if:course_type,online|nullable|string|max:255',
            'online_link' => 'required_if:course_type,online|nullable|url',
            'location' => 'required_if:course_type,offline|nullable|string|max:255',
            'thumbnail' => 'nullable|image|max:2048',
            'price' => 'required|numeric|min:0',
            'is_published' => 'boolean',
        ]);

        $data = $request->except('thumbnail');
        $data['slug'] = Str::slug($request->title) . '-' . Str::random(5);
        $data['is_published'] = $request->has('is_published') ? $request->is_published : false;

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')->store('courses', 'public');
        }

        $course->update($data);

        return redirect()->route('therapist.courses.index')->with('success', 'Kelas berhasil diperbarui.');
    }

    public function destroy(Course $course)
    {
        if ($course->instructor_id !== auth()->id() && !auth()->user()->hasAnyRole(['admin', 'super_admin'])) {
            abort(403);
        }

        $course->delete();
        return redirect()->route('therapist.courses.index')->with('success', 'Kelas berhasil dihapus.');
    }
}
