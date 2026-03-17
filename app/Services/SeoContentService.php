<?php

namespace App\Services;

use App\Models\SeoSetting;
use Illuminate\Support\Str;

class SeoContentService
{
    /**
     * Analyze a blog post and return an array of SEO scores and recommendations.
     * Uses dynamic settings from the database.
     */
    public function analyze(array $data)
    {
        $title = $data['title'] ?? '';
        $body = $data['body'] ?? '';
        $keyword = $data['primary_keyword'] ?? '';
        $metaDescription = $data['meta_description'] ?? '';

        // Load SEO rules from DB
        $rules = SeoSetting::getRules();

        $checks = [
            'title' => $this->checkTitle($title, $keyword, $rules),
            'meta' => $this->checkMeta($metaDescription, $keyword, $rules),
            'content' => $this->checkContent($body, $keyword, $rules),
            'structure' => $this->checkStructure($body, $rules),
            'links' => $this->checkLinks($body, $rules),
            'media' => $this->checkMedia($body, $rules),
        ];

        $totalScore = collect($checks)->flatten(1)->avg('score') ?? 0;

        return [
            'score' => round($totalScore),
            'checks' => $checks,
            'timestamp' => now()->toIso8601String(),
        ];
    }

    private function checkTitle($title, $keyword, $rules)
    {
        $results = [];
        $titleLower = Str::lower($title);
        $keywordLower = Str::lower($keyword);

        $titleMinLen = $rules['seo_title_min_length']['value'] ?? 55;
        $titleMaxLen = $rules['seo_title_max_length']['value'] ?? 65;
        $titleIdealMax = $rules['seo_title_ideal_max']['value'] ?? 60;
        $kwAtStart = $rules['seo_title_keyword_at_start']['value'] ?? true;

        // 1. Keyword in title
        $hasKeyword = $keyword && str_contains($titleLower, $keywordLower);
        $results[] = [
            'name' => 'Keyword in Title',
            'status' => $hasKeyword ? 'success' : 'warning',
            'score' => $hasKeyword ? 100 : 0,
            'message' => $hasKeyword ? 'Keyword utama ditemukan dalam judul.' : 'Judul harus mengandung keyword utama.',
        ];

        // 2. Title length
        $len = mb_strlen($title);
        $isIdeal = $len >= $titleMinLen && $len <= $titleIdealMax;
        $isOk = $len >= $titleMinLen && $len <= $titleMaxLen;
        $results[] = [
            'name' => 'Title Length',
            'status' => $isIdeal ? 'success' : ($isOk ? 'info' : 'warning'),
            'score' => $isIdeal ? 100 : ($isOk ? 70 : ($len > $titleMaxLen ? 30 : 40)),
            'message' => "Panjang judul ($len karakter). Ideal: {$titleMinLen}-{$titleIdealMax} karakter, maks {$titleMaxLen}.",
        ];

        // 3. Keyword at the beginning
        if ($kwAtStart) {
            $atStart = $keyword && str_starts_with($titleLower, $keywordLower);
            $results[] = [
                'name' => 'Keyword at Start',
                'status' => $atStart ? 'success' : 'info',
                'score' => $atStart ? 100 : 50,
                'message' => $atStart
                    ? 'Keyword di awal judul. Bagus untuk CTR!'
                    : 'Meletakkan keyword di awal judul dapat meningkatkan CTR.',
            ];
        }

        return $results;
    }

    private function checkMeta($description, $keyword, $rules)
    {
        $results = [];
        $descLower = Str::lower($description);
        $keywordLower = Str::lower($keyword);

        $metaMinLen = $rules['meta_desc_min_length']['value'] ?? 140;
        $metaMaxLen = $rules['meta_desc_max_length']['value'] ?? 160;
        $metaIdealMax = $rules['meta_desc_ideal_max']['value'] ?? 155;

        // 1. Meta length
        $len = mb_strlen($description);
        $isIdeal = $len >= $metaMinLen && $len <= $metaIdealMax;
        $isOk = $len >= $metaMinLen && $len <= $metaMaxLen;
        $results[] = [
            'name' => 'Meta Description Length',
            'status' => $isIdeal ? 'success' : ($isOk ? 'info' : 'warning'),
            'score' => $isIdeal ? 100 : ($isOk ? 70 : 30),
            'message' => "Panjang meta description ($len karakter). Ideal: {$metaMinLen}-{$metaIdealMax}, maks {$metaMaxLen}.",
        ];

        // 2. Keyword in meta
        $hasKeyword = $keyword && str_contains($descLower, $keywordLower);
        $results[] = [
            'name' => 'Keyword in Meta',
            'status' => $hasKeyword ? 'success' : 'warning',
            'score' => $hasKeyword ? 100 : 0,
            'message' => $hasKeyword ? 'Keyword ditemukan di meta description.' : 'Keyword utama harus ada di meta description.',
        ];

        return $results;
    }

    private function checkContent($body, $keyword, $rules)
    {
        $results = [];
        $plainText = strip_tags($body);
        $wordCount = str_word_count($plainText);
        $keywordLower = Str::lower($keyword);

        $articleMinWords = $rules['article_min_words']['value'] ?? 1800;
        $articleIdealWords = $rules['article_ideal_words']['value'] ?? 2000;
        $kwDensityMin = $rules['keyword_density_min']['value'] ?? 1.0;
        $kwDensityMax = $rules['keyword_density_max']['value'] ?? 1.5;
        $kwMinOccurrences = $rules['keyword_min_occurrences']['value'] ?? 20;
        $kwMaxOccurrences = $rules['keyword_max_occurrences']['value'] ?? 30;
        $introKwWithin = $rules['intro_keyword_within_words']['value'] ?? 50;

        // 1. Content Length
        $isLongEnough = $wordCount >= $articleMinWords;
        $isIdeal = $wordCount >= $articleIdealWords;
        $results[] = [
            'name' => 'Content Length',
            'status' => $isIdeal ? 'success' : ($isLongEnough ? 'info' : 'warning'),
            'score' => $isIdeal ? 100 : min(100, ($wordCount / $articleMinWords) * 100),
            'message' => "Artikel memiliki $wordCount kata. Target: {$articleIdealWords}+ kata (min {$articleMinWords}).",
        ];

        // 2. Keyword Density
        if ($keyword) {
            $count = substr_count(Str::lower($plainText), $keywordLower);
            $density = ($count / max(1, $wordCount)) * 100;
            $densityIdeal = $density >= $kwDensityMin && $density <= $kwDensityMax;
            $occurrenceIdeal = $count >= $kwMinOccurrences && $count <= $kwMaxOccurrences;
            $results[] = [
                'name' => 'Keyword Density',
                'status' => $densityIdeal ? 'success' : 'warning',
                'score' => $densityIdeal ? 100 : 50,
                'message' => sprintf(
                    'Keyword muncul %d kali (%.2f%%). Target: %d-%d kali (%s%%-%s%%).',
                    $count,
                    $density,
                    $kwMinOccurrences,
                    $kwMaxOccurrences,
                    $kwDensityMin,
                    $kwDensityMax
                ),
            ];

            // 3. Keyword in first N words
            $firstWords = implode(' ', array_slice(explode(' ', Str::lower($plainText)), 0, $introKwWithin));
            $kwInIntro = str_contains($firstWords, $keywordLower);
            $results[] = [
                'name' => 'Keyword in Intro',
                'status' => $kwInIntro ? 'success' : 'warning',
                'score' => $kwInIntro ? 100 : 0,
                'message' => $kwInIntro
                    ? "Keyword ditemukan di {$introKwWithin} kata pertama."
                    : "Keyword harus muncul di {$introKwWithin} kata pertama artikel.",
            ];
        }

        return $results;
    }

    private function checkStructure($body, $rules)
    {
        $results = [];

        $h2Min = $rules['h2_min_count']['value'] ?? 5;
        $h2Max = $rules['h2_max_count']['value'] ?? 8;
        $h3Min = $rules['h3_min_count']['value'] ?? 3;
        $h3Max = $rules['h3_max_count']['value'] ?? 6;
        $bulletMin = $rules['min_bullet_sections']['value'] ?? 2;

        // Count H2
        $h2Count = preg_match_all('/<h2[\s>]/i', $body);
        $h2Ideal = $h2Count >= $h2Min && $h2Count <= $h2Max;
        $results[] = [
            'name' => 'Headings H2',
            'status' => $h2Ideal ? 'success' : ($h2Count > 0 ? 'info' : 'warning'),
            'score' => $h2Ideal ? 100 : ($h2Count > 0 ? 60 : 0),
            'message' => "Ditemukan {$h2Count} H2. Target: {$h2Min}-{$h2Max} heading H2.",
        ];

        // Count H3
        $h3Count = preg_match_all('/<h3[\s>]/i', $body);
        $h3Ideal = $h3Count >= $h3Min && $h3Count <= $h3Max;
        $results[] = [
            'name' => 'Headings H3',
            'status' => $h3Ideal ? 'success' : ($h3Count > 0 ? 'info' : 'warning'),
            'score' => $h3Ideal ? 100 : ($h3Count > 0 ? 60 : 0),
            'message' => "Ditemukan {$h3Count} H3. Target: {$h3Min}-{$h3Max} heading H3.",
        ];

        // Check for Bullet / List sections
        $listCount = preg_match_all('/<(ul|ol)[\s>]/i', $body);
        $listIdeal = $listCount >= $bulletMin;
        $results[] = [
            'name' => 'List / Bullet Points',
            'status' => $listIdeal ? 'success' : 'warning',
            'score' => $listIdeal ? 100 : ($listCount > 0 ? 60 : 0),
            'message' => "Ditemukan {$listCount} section list. Min: {$bulletMin} section.",
        ];

        return $results;
    }

    private function checkLinks($body, $rules)
    {
        $results = [];

        $internalMin = $rules['internal_link_min']['value'] ?? 3;
        $internalIdeal = $rules['internal_link_ideal']['value'] ?? 5;
        $externalMin = $rules['external_link_min']['value'] ?? 1;
        $externalIdeal = $rules['external_link_ideal']['value'] ?? 2;

        // Count links
        preg_match_all('/<a\s+[^>]*href=["\']([^"\']+)["\'][^>]*>/i', $body, $matches);
        $links = $matches[1] ?? [];

        $siteUrl = config('app.url', 'indepth.co.id');
        $internalCount = 0;
        $externalCount = 0;
        foreach ($links as $link) {
            if (str_contains($link, $siteUrl) || str_starts_with($link, '/') || str_starts_with($link, '#')) {
                $internalCount++;
            } else {
                $externalCount++;
            }
        }

        $results[] = [
            'name' => 'Internal Links',
            'status' => $internalCount >= $internalMin ? 'success' : 'warning',
            'score' => $internalCount >= $internalIdeal ? 100 : ($internalCount >= $internalMin ? 75 : max(0, $internalCount * 20)),
            'message' => "Ditemukan {$internalCount} internal link. Target: min {$internalMin}, ideal {$internalIdeal}.",
        ];

        $results[] = [
            'name' => 'External Links',
            'status' => $externalCount >= $externalMin ? 'success' : 'warning',
            'score' => $externalCount >= $externalIdeal ? 100 : ($externalCount >= $externalMin ? 75 : 0),
            'message' => "Ditemukan {$externalCount} external link. Target: min {$externalMin}, ideal {$externalIdeal}.",
        ];

        return $results;
    }

    private function checkMedia($body, $rules)
    {
        $results = [];

        $imageMin = $rules['image_min_count']['value'] ?? 2;
        $imageIdeal = $rules['image_ideal_count']['value'] ?? 3;
        $requireAlt = $rules['image_require_alt']['value'] ?? true;

        // Count images
        preg_match_all('/<img\s+[^>]*>/i', $body, $imgMatches);
        $imgCount = count($imgMatches[0] ?? []);

        $results[] = [
            'name' => 'Images',
            'status' => $imgCount >= $imageMin ? 'success' : ($imgCount > 0 ? 'info' : 'warning'),
            'score' => $imgCount >= $imageIdeal ? 100 : ($imgCount >= $imageMin ? 75 : max(0, $imgCount * 25)),
            'message' => "Ditemukan {$imgCount} gambar. Target: min {$imageMin}, ideal {$imageIdeal}.",
        ];

        // Check alt text
        if ($requireAlt && $imgCount > 0) {
            $withoutAlt = 0;
            foreach ($imgMatches[0] as $img) {
                if (!preg_match('/alt=["\'][^"\']+["\']/i', $img)) {
                    $withoutAlt++;
                }
            }
            $results[] = [
                'name' => 'Image Alt Text',
                'status' => $withoutAlt === 0 ? 'success' : 'warning',
                'score' => $withoutAlt === 0 ? 100 : max(0, 100 - ($withoutAlt * 30)),
                'message' => $withoutAlt === 0
                    ? 'Semua gambar memiliki alt text.'
                    : "{$withoutAlt} gambar tanpa alt text. Semua gambar wajib punya alt text.",
            ];
        }

        return $results;
    }

    /**
     * Get search intent suggestion based on keyword.
     */
    public function predictIntent($keyword)
    {
        $transactionalWords = ['beli', 'order', 'harga', 'paket', 'biaya', 'daftar', 'booking', 'pesan'];
        $informationalWords = ['apa itu', 'cara', 'mengapa', 'manfaat', 'tips', 'panduan', 'definisi', 'pengertian'];
        $navigationalWords = ['alamat', 'kontak', 'lokasi', 'website', 'jadwal'];

        $kwLower = Str::lower($keyword);

        foreach ($transactionalWords as $word) {
            if (str_contains($kwLower, $word))
                return 'Transactional';
        }

        foreach ($informationalWords as $word) {
            if (str_contains($kwLower, $word))
                return 'Informational';
        }

        foreach ($navigationalWords as $word) {
            if (str_contains($kwLower, $word))
                return 'Navigational';
        }

        return 'Commercial Investigation';
    }
}
