<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\SeoSetting;
use App\Services\AiContentGenerator;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BlogPostCMSController extends Controller
{
    public function __construct(
        protected \App\Services\SeoContentService $seoService,
        protected AiContentGenerator $aiGenerator,
    ) {
    }

    /**
     * Get forbidden words from database.
     */
    private function getForbiddenWords(): array
    {
        $rules = SeoSetting::getRules();
        $raw = $rules['forbidden_words']['value'] ?? '';
        if (empty($raw))
            return [];
        return array_map('trim', explode(',', $raw));
    }

    public function index()
    {
        $posts = BlogPost::with('author')->orderBy('created_at', 'desc')->paginate(15);
        return Inertia::render('Admin/Blog/Index', ['posts' => $posts]);
    }

    public function create()
    {
        return Inertia::render('Admin/Blog/Form', [
            'seoRules' => SeoSetting::getRules(),
            'forbiddenWords' => $this->getForbiddenWords(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'body' => 'required|string',
            'featured_image' => 'nullable|image|max:2048',
            'featured_image_path' => 'nullable|string|max:500',
            'primary_keyword' => 'nullable|string|max:255',
            'secondary_keywords' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'is_published' => 'nullable',
            'scheduled_at' => 'nullable|date|after:now',
        ]);

        $validated['is_published'] = $request->boolean('is_published');
        $validated['author_id'] = auth()->id();
        $validated['slug'] = Str::slug($validated['title']) . '-' . uniqid();

        // Handle image: uploaded file takes priority, then AI-generated path
        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('blog', 'public');
        } elseif (!empty($validated['featured_image_path'])) {
            $validated['featured_image'] = $validated['featured_image_path'];
        }
        unset($validated['featured_image_path']);

        // Auto-generate excerpt from body if empty
        if (empty($validated['excerpt']) && !empty($validated['body'])) {
            $plainText = strip_tags($validated['body']);
            $plainText = preg_replace('/\s+/', ' ', trim($plainText));
            $validated['excerpt'] = Str::limit($plainText, 250);
        }

        $analysis = $this->seoService->analyze($validated);
        $validated['seo_score'] = $analysis['score'];
        $validated['seo_analysis'] = $analysis['checks'];
        $validated['search_intent'] = $this->seoService->predictIntent($validated['primary_keyword'] ?? '');

        if (!empty($validated['scheduled_at']) && !$validated['is_published']) {
            // keep scheduled_at
        } elseif ($validated['is_published']) {
            $validated['published_at'] = now();
            $validated['scheduled_at'] = null;
        }

        BlogPost::create($validated);
        return redirect()->route('admin.blog.index')->with('success', 'Artikel berhasil dibuat.');
    }

    public function edit(BlogPost $blog)
    {
        return Inertia::render('Admin/Blog/Form', [
            'post' => $blog,
            'seoRules' => SeoSetting::getRules(),
            'forbiddenWords' => $this->getForbiddenWords(),
        ]);
    }

    public function update(Request $request, BlogPost $blog)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'body' => 'required|string',
            'featured_image' => 'nullable|image|max:2048',
            'featured_image_path' => 'nullable|string|max:500',
            'primary_keyword' => 'nullable|string|max:255',
            'secondary_keywords' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'is_published' => 'nullable',
            'scheduled_at' => 'nullable|date',
        ]);

        $validated['is_published'] = $request->boolean('is_published');

        // Handle image: uploaded file takes priority, then AI-generated path
        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('blog', 'public');
        } elseif (!empty($validated['featured_image_path'])) {
            $validated['featured_image'] = $validated['featured_image_path'];
        } else {
            unset($validated['featured_image']);
        }
        unset($validated['featured_image_path']);

        // Auto-generate excerpt from body if empty
        if (empty($validated['excerpt']) && !empty($validated['body'])) {
            $plainText = strip_tags($validated['body']);
            $plainText = preg_replace('/\s+/', ' ', trim($plainText));
            $validated['excerpt'] = Str::limit($plainText, 250);
        }

        $analysis = $this->seoService->analyze($validated);
        $validated['seo_score'] = $analysis['score'];
        $validated['seo_analysis'] = $analysis['checks'];
        $validated['search_intent'] = $this->seoService->predictIntent($validated['primary_keyword'] ?? '');

        if (!empty($validated['scheduled_at']) && !$validated['is_published']) {
            // keep
        } elseif ($validated['is_published'] && !$blog->is_published) {
            $validated['published_at'] = now();
            $validated['scheduled_at'] = null;
        } elseif (!$validated['is_published']) {
            $validated['published_at'] = null;
        }

        $blog->update($validated);
        return redirect()->route('admin.blog.index')->with('success', 'Artikel berhasil diperbarui.');
    }

    public function destroy(BlogPost $blog)
    {
        $blog->delete();
        return redirect()->route('admin.blog.index')->with('success', 'Artikel berhasil dihapus.');
    }

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

    public function generate(Request $request)
    {
        // Extend limits for AI generation (multiple API calls can take 2-3 minutes)
        set_time_limit(300);
        ini_set('memory_limit', '512M');

        $validated = $request->validate([
            'primary_keyword' => 'required|string|max:255',
            'secondary_keywords' => 'nullable|string|max:500',
            'tone' => 'nullable|string|max:100',
            'audience' => 'nullable|string|max:200',
            'type' => 'nullable|string|in:full,meta,ideas',
        ]);

        $type = $validated['type'] ?? 'full';

        try {
            if ($type === 'meta') {
                $result = $this->aiGenerator->generateMeta($validated);
            } elseif ($type === 'ideas') {
                $result = $this->aiGenerator->generateIdeas($validated);
            } else {
                $result = $this->aiGenerator->generateArticle($validated);
            }

            return response()->json($result);
        } catch (\Throwable $e) {
            \Log::error('AI Generate Error', [
                'type' => $type,
                'keyword' => $validated['primary_keyword'],
                'error' => $e->getMessage(),
                'file' => $e->getFile() . ':' . $e->getLine(),
            ]);

            return response()->json([
                'error' => 'Gagal generate: ' . $e->getMessage(),
            ], 200);
        }
    }

    /**
     * Generate featured image using DALL-E.
     */
    public function generateImage(Request $request)
    {
        $validated = $request->validate([
            'keyword' => 'required|string|max:255',
            'style' => 'nullable|string|max:100',
        ]);

        $result = $this->aiGenerator->generateFeaturedImage(
            $validated['keyword'],
            $validated['style'] ?? 'profesional'
        );

        return response()->json($result);
    }

    /**
     * Update forbidden words list from blog editor.
     */
    public function updateForbiddenWords(Request $request)
    {
        $validated = $request->validate([
            'words' => 'required|array',
            'words.*' => 'string|max:100',
        ]);

        $wordsString = implode(', ', array_map('trim', $validated['words']));

        $setting = SeoSetting::where('key', 'forbidden_words')->first();
        if ($setting) {
            $setting->update(['value' => $wordsString]);
        } else {
            SeoSetting::create([
                'key' => 'forbidden_words',
                'label' => 'Kata-Kata Terlarang',
                'description' => 'Kata-kata yang harus dihindari dalam artikel blog.',
                'group' => 'content',
                'type' => 'text',
                'value' => $wordsString,
                'default_value' => $wordsString,
                'sort_order' => 92,
            ]);
        }

        SeoSetting::clearCache();

        return response()->json([
            'success' => true,
            'words' => array_map('trim', $validated['words']),
        ]);
    }
}
