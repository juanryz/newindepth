<?php

namespace App\Services;

use Illuminate\Support\Str;

class SeoContentService
{
    /**
     * Analyze a blog post and return an array of SEO scores and recommendations.
     */
    public function analyze(array $data)
    {
        $title = $data['title'] ?? '';
        $body = $data['body'] ?? '';
        $keyword = $data['primary_keyword'] ?? '';
        $metaDescription = $data['meta_description'] ?? '';

        $checks = [
            'title' => $this->checkTitle($title, $keyword),
            'meta' => $this->checkMeta($metaDescription, $keyword),
            'content' => $this->checkContent($body, $keyword),
            'structure' => $this->checkStructure($body),
        ];

        $totalScore = collect($checks)->flatten(1)->avg('score') ?? 0;

        return [
            'score' => round($totalScore),
            'checks' => $checks,
            'timestamp' => now()->toIso8601String(),
        ];
    }

    private function checkTitle($title, $keyword)
    {
        $results = [];
        $titleLower = Str::lower($title);
        $keywordLower = Str::lower($keyword);

        // 1. Keyword in title
        $hasKeyword = $keyword && str_contains($titleLower, $keywordLower);
        $results[] = [
            'name' => 'Keyword in Title',
            'status' => $hasKeyword ? 'success' : 'warning',
            'score' => $hasKeyword ? 100 : 0,
            'message' => $hasKeyword ? 'Keyword utama ditemukan dalam judul.' : 'Judul harus mengandung keyword utama.',
        ];

        // 2. Title length
        $len = strlen($title);
        $isIdeal = $len >= 50 && $len <= 60;
        $results[] = [
            'name' => 'Title Length',
            'status' => $isIdeal ? 'success' : 'warning',
            'score' => $isIdeal ? 100 : ($len > 60 ? 50 : 30),
            'message' => "Panjang judul ($len karakter). Idealnya 50-60 karakter.",
        ];

        // 3. Keyword at the beginning
        $atStart = $keyword && str_starts_with($titleLower, $keywordLower);
        $results[] = [
            'name' => 'Keyword at Start',
            'status' => $atStart ? 'success' : 'info',
            'score' => $atStart ? 100 : 50,
            'message' => 'Meletakkan keyword di awal judul dapat meningkatkan CTR.',
        ];

        return $results;
    }

    private function checkMeta($description, $keyword)
    {
        $results = [];
        $descLower = Str::lower($description);
        $keywordLower = Str::lower($keyword);

        // 1. Meta length
        $len = strlen($description);
        $isIdeal = $len >= 120 && $len <= 160;
        $results[] = [
            'name' => 'Meta Description Length',
            'status' => $isIdeal ? 'success' : 'warning',
            'score' => $isIdeal ? 100 : 40,
            'message' => "Panjang meta description ($len karakter). Idealnya 120-160 karakter.",
        ];

        // 2. Keyword in meta
        $hasKeyword = $keyword && str_contains($descLower, $keywordLower);
        $results[] = [
            'name' => 'Keyword in Meta',
            'status' => $hasKeyword ? 'success' : 'warning',
            'score' => $hasKeyword ? 100 : 0,
            'message' => $hasKeyword ? 'Keyword ditemukan di deskripsi.' : 'Keyword utama harus ada di deskripsi.',
        ];

        return $results;
    }

    private function checkContent($body, $keyword)
    {
        $results = [];
        $plainText = strip_tags($body);
        $wordCount = str_word_count($plainText);
        $keywordLower = Str::lower($keyword);

        // 1. Content Length
        $isLongEnough = $wordCount >= 600;
        $results[] = [
            'name' => 'Content Length',
            'status' => $isLongEnough ? 'success' : 'warning',
            'score' => min(100, ($wordCount / 600) * 100),
            'message' => "Artikel memiliki $wordCount kata. Target minimal 600 kata.",
        ];

        // 2. Keyword Density
        if ($keyword) {
            $count = substr_count(Str::lower($plainText), $keywordLower);
            $density = ($count / max(1, $wordCount)) * 100;
            $isIdeal = $density >= 0.8 && $density <= 1.5;
            $results[] = [
                'name' => 'Keyword Density',
                'status' => $isIdeal ? 'success' : 'warning',
                'score' => $isIdeal ? 100 : 50,
                'message' => sprintf('Kepadatan keyword %.2f%%. Rentang ideal adalah 0.8%% - 1.5%%.', $density),
            ];
        }

        return $results;
    }

    private function checkStructure($body)
    {
        $results = [];

        // Check for H2 and H3
        $hasH2 = str_contains($body, '<h2');
        $hasH3 = str_contains($body, '<h3');

        $results[] = [
            'name' => 'Subheadings (H2/H3)',
            'status' => $hasH2 ? 'success' : 'warning',
            'score' => $hasH2 ? 100 : 0,
            'message' => $hasH2 ? 'Gunakan subheading untuk struktur.' : 'Wajib gunakan minimal satu H2.',
        ];

        // Check for Images
        $hasImg = str_contains($body, '<img');
        $results[] = [
            'name' => 'Visual Content',
            'status' => $hasImg ? 'success' : 'info',
            'score' => $hasImg ? 100 : 50,
            'message' => $hasImg ? 'Terdapat gambar dalam artikel.' : 'Tambahkan gambar untuk meningkatkan readability.',
        ];

        return $results;
    }

    /**
     * Get search intent suggestion based on keyword.
     */
    public function predictIntent($keyword)
    {
        $transactionalWords = ['beli', 'order', 'harga', 'paket', 'biaya'];
        $informationalWords = ['apa itu', 'cara', 'mengapa', 'manfaat', 'tips'];

        $kwLower = Str::lower($keyword);

        foreach ($transactionalWords as $word) {
            if (str_contains($kwLower, $word))
                return 'Transactional';
        }

        foreach ($informationalWords as $word) {
            if (str_contains($kwLower, $word))
                return 'Informational';
        }

        return 'Commercial Investigation';
    }
}
