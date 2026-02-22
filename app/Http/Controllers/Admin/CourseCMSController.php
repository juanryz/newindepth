<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CourseCMSController extends Controller
{
    public function index()
    {
        $courses = Course::with(['instructor'])->withCount('lessons')->latest()->get();

        return Inertia::render('Admin/Courses/Index', [
            'courses' => $courses,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Courses/Form', [
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
        $data['slug'] = Str::slug($request->title);
        $data['is_published'] = $request->has('is_published') ? $request->is_published : false;

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')->store('courses', 'public');
        }

        Course::create($data);

        return redirect()->route('admin.courses.index')->with('success', 'Kelas berhasil dibuat.');
    }

    public function edit(Course $course)
    {
        return Inertia::render('Admin/Courses/Form', [
            'course' => $course,
        ]);
    }

    public function update(Request $request, Course $course)
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
        $data['slug'] = Str::slug($request->title);
        $data['is_published'] = $request->has('is_published') ? $request->is_published : false;

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')->store('courses', 'public');
        }

        $course->update($data);

        return redirect()->route('admin.courses.index')->with('success', 'Kelas berhasil diperbarui.');
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->route('admin.courses.index')->with('success', 'Kelas berhasil dihapus.');
    }
}
