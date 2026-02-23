<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $posts = BlogPost::with('author')
            ->where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->paginate(12);

        return Inertia::render('Blog/Index', [
            'posts' => $posts
        ]);
    }

    public function show(string $slug)
    {
        $query = BlogPost::with('author')->where('slug', $slug);

        // If guest or patient, only show published posts
        if (!auth()->check() || !auth()->user()->isStaff()) {
            $query->where('is_published', true);
        }

        $post = $query->firstOrFail();

        return Inertia::render('Blog/Show', [
            'post' => $post
        ]);
    }
}
