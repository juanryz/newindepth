<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BlogPostCMSController extends Controller
{
    public function __construct(protected \App\Services\SeoContentService $seoService)
    {
    }

    public function index()
    {
        $posts = BlogPost::orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/Blog/Index', [
            'posts' => $posts
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Blog/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'body' => 'required|string',
            'featured_image' => 'nullable|image|max:2048',
            'primary_keyword' => 'nullable|string|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'is_published' => 'nullable',
        ]);

        $validated['is_published'] = $request->boolean('is_published');
        $validated['author_id'] = auth()->id();
        $validated['slug'] = Str::slug($validated['title']) . '-' . uniqid();

        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('blog', 'public');
        }

        // Run SEO Analysis
        $analysis = $this->seoService->analyze($validated);
        $validated['seo_score'] = $analysis['score'];
        $validated['seo_analysis'] = $analysis['checks'];
        $validated['search_intent'] = $this->seoService->predictIntent($validated['primary_keyword'] ?? '');

        // Properly set published_at if it's published for the first time
        if ($validated['is_published']) {
            $validated['published_at'] = now();
        }

        BlogPost::create($validated);

        return redirect()->route('admin.blog.index')->with('success', 'Artikel berhasil dibuat.');
    }

    public function edit(BlogPost $post)
    {
        return Inertia::render('Admin/Blog/Form', [
            'post' => $post
        ]);
    }

    public function update(Request $request, BlogPost $post)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'body' => 'required|string',
            'featured_image' => 'nullable|image|max:2048',
            'primary_keyword' => 'nullable|string|max:255',
            'secondary_keywords' => 'nullable|array',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'is_published' => 'nullable',
        ]);

        $validated['is_published'] = $request->boolean('is_published');

        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('blog', 'public');
        } else {
            unset($validated['featured_image']);
        }

        // Run SEO Analysis
        $analysis = $this->seoService->analyze($validated);
        $validated['seo_score'] = $analysis['score'];
        $validated['seo_analysis'] = $analysis['checks'];
        $validated['search_intent'] = $this->seoService->predictIntent($validated['primary_keyword'] ?? '');

        if ($validated['is_published'] && !$post->is_published) {
            $validated['published_at'] = now();
        } else if (!$validated['is_published']) {
            $validated['published_at'] = null;
        }

        $post->update($validated);

        return redirect()->route('admin.blog.index')->with('success', 'Artikel berhasil diperbarui.');
    }

    public function destroy(BlogPost $post)
    {
        $post->delete();
        return redirect()->route('admin.blog.index')->with('success', 'Artikel berhasil dihapus.');
    }

    /**
     * Real-time SEO analysis endpoint for the editor.
     */
    public function analyze(Request $request)
    {
        $analysis = $this->seoService->analyze($request->all());
        $intent = $this->seoService->predictIntent($request->primary_keyword ?? '');

        return response()->json([
            'score' => $analysis['score'],
            'checks' => $analysis['checks'],
            'intent' => $intent
        ]);
    }
}
