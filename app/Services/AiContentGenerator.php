<?php

namespace App\Services;

use App\Models\SeoSetting;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AiContentGenerator
{
    private string $apiKey;
    private string $model;

    public function __construct()
    {
        $this->apiKey = config('services.openai.key', env('OPENAI_API_KEY', ''));
        $this->model = config('services.openai.model', 'gpt-4o-mini');
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

    /**
     * Generate a full SEO-optimized article.
     */
    public function generateArticle(array $input): array
    {
        $primaryKeyword = $input['primary_keyword'] ?? '';
        $secondaryKeywords = $input['secondary_keywords'] ?? '';
        $tone = $input['tone'] ?? 'profesional dan informatif';
        $audience = $input['audience'] ?? 'masyarakat umum Indonesia';

        $rules = SeoSetting::getRules();
        $prompt = $this->buildPrompt($primaryKeyword, $secondaryKeywords, $tone, $audience, $rules);

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(180)->post('https://api.openai.com/v1/chat/completions', [
                        'model' => $this->model,
                        'messages' => [
                            ['role' => 'system', 'content' => $this->getSystemPrompt()],
                            ['role' => 'user', 'content' => $prompt]
                        ],
                        'temperature' => 0.7,
                        'max_tokens' => 8000,
                    ]);

            if ($response->successful()) {
                $content = $response->json('choices.0.message.content', '');
                $result = $this->parseGeneratedContent($content, $primaryKeyword);
                $result = $this->sanitizeForbiddenWords($result);
                $result = $this->processContentImages($result, $primaryKeyword);
                return $result;
            }

            Log::error('OpenAI API Error', ['status' => $response->status(), 'body' => $response->body()]);
            return ['error' => 'Gagal menghubungi AI. Status: ' . $response->status()];
        } catch (\Exception $e) {
            Log::error('AI Content Generation Error', ['message' => $e->getMessage()]);
            return ['error' => 'Terjadi kesalahan: ' . $e->getMessage()];
        }
    }

    /**
     * Generate only meta fields.
     */
    public function generateMeta(array $input): array
    {
        $title = $input['title'] ?? '';
        $keyword = $input['primary_keyword'] ?? '';
        $rules = SeoSetting::getRules();

        $titleMin = $rules['seo_title_min_length']['value'] ?? 55;
        $titleMax = $rules['seo_title_max_length']['value'] ?? 65;
        $metaMin = $rules['meta_desc_min_length']['value'] ?? 140;
        $metaMax = $rules['meta_desc_max_length']['value'] ?? 160;

        $prompt = <<<PROMPT
Berdasarkan judul "{$title}" dan keyword utama "{$keyword}", buatkan:
1. SEO TITLE: {$titleMin}-{$titleMax} karakter, keyword di awal
2. META DESCRIPTION: {$metaMin}-{$metaMax} karakter, mengandung keyword 1 kali
3. SLUG: 3-5 kata, hanya keyword utama

Format output JSON:
{"seo_title": "...", "meta_description": "...", "slug": "..."}
Hanya output JSON, tanpa penjelasan.
PROMPT;

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(30)->post('https://api.openai.com/v1/chat/completions', [
                        'model' => $this->model,
                        'messages' => [
                            ['role' => 'system', 'content' => 'Kamu adalah ahli SEO Indonesia. Output hanya JSON valid.'],
                            ['role' => 'user', 'content' => $prompt]
                        ],
                        'temperature' => 0.5,
                        'max_tokens' => 500,
                    ]);

            if ($response->successful()) {
                $content = $response->json('choices.0.message.content', '');
                $json = json_decode($content, true);
                if ($json)
                    return $json;
                if (preg_match('/```(?:json)?\s*(\{.*?\})\s*```/s', $content, $matches)) {
                    $json = json_decode($matches[1], true);
                    if ($json)
                        return $json;
                }
                return ['error' => 'Format respons AI tidak valid.'];
            }
            return ['error' => 'Gagal menghubungi AI. Status: ' . $response->status()];
        } catch (\Exception $e) {
            return ['error' => 'Terjadi kesalahan: ' . $e->getMessage()];
        }
    }

    /**
     * Generate article ideas based on keyword.
     */
    public function generateIdeas(array $input): array
    {
        $keyword = $input['primary_keyword'] ?? '';

        $prompt = <<<PROMPT
Kamu adalah content strategist ahli SEO Indonesia untuk website klinik hipnoterapi InDepth (indepth.co.id).

Berdasarkan keyword "{$keyword}", buatkan 8 ide artikel blog yang:
- Relevan dengan topik hipnoterapi, kesehatan mental, dan wellness
- Memiliki potensi traffic organik tinggi
- Cocok untuk website klinik hipnoterapi profesional
- Bervariasi dari informational, transactional, dan commercial intent

Untuk setiap ide, berikan:
1. Judul artikel SEO-friendly (55-65 karakter)
2. Target keyword utama
3. Estimasi search volume (rendah/sedang/tinggi)
4. Search intent (Informational/Transactional/Commercial/Navigational)
5. Deskripsi singkat (1-2 kalimat)

Format output JSON array:
[{"title":"...","keyword":"...","volume":"tinggi","intent":"Informational","description":"..."}]
Hanya output JSON array valid.
PROMPT;

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(30)->post('https://api.openai.com/v1/chat/completions', [
                        'model' => $this->model,
                        'messages' => [
                            ['role' => 'system', 'content' => 'Kamu adalah content strategist ahli SEO. Output hanya JSON array valid.'],
                            ['role' => 'user', 'content' => $prompt]
                        ],
                        'temperature' => 0.8,
                        'max_tokens' => 2000,
                    ]);

            if ($response->successful()) {
                $content = $response->json('choices.0.message.content', '');
                $json = json_decode($content, true);
                if ($json && is_array($json))
                    return ['ideas' => $json];
                if (preg_match('/```(?:json)?\s*(\[.*?\])\s*```/s', $content, $matches)) {
                    $json = json_decode($matches[1], true);
                    if ($json && is_array($json))
                        return ['ideas' => $json];
                }
                return ['error' => 'Format respons AI tidak valid.'];
            }
            return ['error' => 'Gagal menghubungi AI. Status: ' . $response->status()];
        } catch (\Exception $e) {
            return ['error' => 'Terjadi kesalahan: ' . $e->getMessage()];
        }
    }

    /**
     * Generate featured image using DALL-E API.
     */
    public function generateFeaturedImage(string $keyword, string $style = 'profesional'): array
    {
        $styleMap = [
            'profesional' => 'A professional, clean, modern',
            'hangat' => 'A warm, inviting, calming',
            'minimalis' => 'A minimalist, elegant, simple',
            'ilustrasi' => 'A digital illustration style',
            'fotografi' => 'A high-quality photography style',
        ];

        $styleDesc = $styleMap[$style] ?? $styleMap['profesional'];

        $prompt = "{$styleDesc} hero image for a blog article about \"{$keyword}\" on a mental wellness and hypnotherapy clinic website. "
            . "The image should be calming, professional, and suitable for a healthcare website. "
            . "Use soft, soothing colors like blues, greens, and warm tones. "
            . "No text or watermarks. High resolution, landscape orientation. "
            . "The mood should convey trust, healing, and professional care.";

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(60)->post('https://api.openai.com/v1/images/generations', [
                        'model' => 'dall-e-3',
                        'prompt' => $prompt,
                        'n' => 1,
                        'size' => '1792x1024',
                        'quality' => 'standard',
                    ]);

            if ($response->successful()) {
                $imageUrl = $response->json('data.0.url');

                if ($imageUrl) {
                    // Download and save to storage
                    $imageContent = Http::timeout(30)->get($imageUrl)->body();
                    $filename = 'blog/ai-' . Str::slug($keyword) . '-' . uniqid() . '.png';
                    Storage::disk('public')->put($filename, $imageContent);

                    return [
                        'success' => true,
                        'path' => $filename,
                        'url' => '/storage/' . $filename,
                    ];
                }

                return ['error' => 'URL gambar tidak ditemukan dalam respons.'];
            }

            $errorBody = $response->json();
            Log::error('DALL-E API Error', ['status' => $response->status(), 'body' => $errorBody]);
            return ['error' => 'Gagal mengenerate gambar. ' . ($errorBody['error']['message'] ?? 'Status: ' . $response->status())];
        } catch (\Exception $e) {
            Log::error('DALL-E Image Generation Error', ['message' => $e->getMessage()]);
            return ['error' => 'Terjadi kesalahan: ' . $e->getMessage()];
        }
    }

    /**
     * System prompt for content writer.
     */
    private function getSystemPrompt(): string
    {
        $forbiddenWords = $this->getForbiddenWords();
        $forbiddenList = implode(', ', $forbiddenWords);

        return <<<SYSTEM
Kamu adalah ahli SEO content writer Indonesia berpengalaman tinggi dengan standar Rank Math Pro, on-page SEO modern, dan AI Search Optimization (AEO).

ATURAN WAJIB:
1. Tulis artikel dalam Bahasa Indonesia berkualitas tinggi dan SEO-friendly
2. Artikel HARUS mencapai SEO Score minimal 90/100
3. JANGAN gunakan kata-kata terlarang: {$forbiddenList}
4. Gunakan bahasa profesional, empatik, dan berbasis evidence
5. JANGAN masukkan tag <img> - gunakan marker [GAMBAR: deskripsi alt text] sebagai penanda posisi gambar
6. Buat internal link: <a href="/blog/topik-terkait">anchor text</a>
7. Buat external link: <a href="https://sumber-terpercaya.com" target="_blank" rel="noopener">anchor text</a>
8. Setiap paragraf HARUS 2-4 kalimat
9. Setiap kalimat HARUS 12-20 kata
10. Gunakan HANYA tag HTML (h2, h3, p, ul, ol, li, strong, em, a). JANGAN gunakan Markdown.
SYSTEM;
    }

    /**
     * Build comprehensive prompt with dynamic SEO rules.
     */
    private function buildPrompt(string $keyword, string $secondaryKw, string $tone, string $audience, array $rules): string
    {
        $articleWords = $rules['article_ideal_words']['value'] ?? 2000;
        $h2Min = $rules['h2_min_count']['value'] ?? 5;
        $h2Max = $rules['h2_max_count']['value'] ?? 8;
        $h3Min = $rules['h3_min_count']['value'] ?? 3;
        $h3Max = $rules['h3_max_count']['value'] ?? 6;
        $kwDensityMin = $rules['keyword_density_min']['value'] ?? 1.0;
        $kwDensityMax = $rules['keyword_density_max']['value'] ?? 1.5;
        $kwMinOcc = $rules['keyword_min_occurrences']['value'] ?? 20;
        $kwMaxOcc = $rules['keyword_max_occurrences']['value'] ?? 30;
        $introMinWords = $rules['intro_min_words']['value'] ?? 80;
        $introMaxWords = $rules['intro_max_words']['value'] ?? 120;
        $introKwWithin = $rules['intro_keyword_within_words']['value'] ?? 50;
        $faqMin = $rules['faq_min_questions']['value'] ?? 4;
        $faqIdeal = $rules['faq_ideal_questions']['value'] ?? 5;
        $intLinkMin = $rules['internal_link_min']['value'] ?? 3;
        $intLinkIdeal = $rules['internal_link_ideal']['value'] ?? 5;
        $extLinkMin = $rules['external_link_min']['value'] ?? 1;
        $imageIdeal = $rules['image_ideal_count']['value'] ?? 3;
        $bulletMin = $rules['min_bullet_sections']['value'] ?? 2;
        $titleMin = $rules['seo_title_min_length']['value'] ?? 55;
        $titleMax = $rules['seo_title_max_length']['value'] ?? 65;
        $metaMin = $rules['meta_desc_min_length']['value'] ?? 140;
        $metaMax = $rules['meta_desc_max_length']['value'] ?? 160;
        $h1Min = $rules['h1_min_length']['value'] ?? 60;
        $h1Max = $rules['h1_max_length']['value'] ?? 80;
        $lsiMin = $rules['lsi_keyword_min']['value'] ?? 5;
        $lsiMax = $rules['lsi_keyword_max']['value'] ?? 10;
        $ctaText = $rules['default_cta_text']['value'] ?? 'Hubungi kami untuk informasi lebih lanjut.';

        $secondaryKwText = $secondaryKw
            ? "Secondary Keywords / LSI: {$secondaryKw}"
            : "Buat {$lsiMin}-{$lsiMax} variasi LSI keyword sendiri.";

        return <<<PROMPT
Buatkan artikel SEO tentang "{$keyword}" dengan target SEO Score 90+.

TARGET AUDIENCE: {$audience}
TONE: {$tone}
{$secondaryKwText}

== ATURAN SEO WAJIB (SEMUA HARUS DIPENUHI) ==

1. SEO TITLE (prefix "SEO_TITLE:"):
   - TEPAT {$titleMin}-{$titleMax} karakter
   - Keyword "{$keyword}" di awal judul

2. H1 (prefix "H1:"):
   - TEPAT {$h1Min}-{$h1Max} karakter
   - Mengandung keyword "{$keyword}"

3. META DESCRIPTION (prefix "META_DESC:"):
   - TEPAT {$metaMin}-{$metaMax} karakter
   - Keyword muncul 1 kali, mengandung CTA

4. SLUG (prefix "SLUG:"):
   - 3-5 kata, hanya keyword utama

5. KONTEN ARTIKEL (setelah "---CONTENT---"):
   - Panjang MINIMAL {$articleWords} kata
   - Paragraf pembuka: {$introMinWords}-{$introMaxWords} kata
   - Keyword "{$keyword}" di {$introKwWithin} kata pertama
   - {$h2Min}-{$h2Max} heading H2
   - {$h3Min}-{$h3Max} heading H3
   - Keyword density: {$kwDensityMin}%-{$kwDensityMax}% ({$kwMinOcc}-{$kwMaxOcc} kali)
   - Minimal {$bulletMin} section <ul> atau <ol>

6. GAMBAR (WAJIB {$imageIdeal} penanda gambar):
   - Gunakan marker [GAMBAR: deskripsi gambar tentang {$keyword}] di {$imageIdeal} posisi strategis
   - Letakkan setelah paragraf pembuka, di tengah artikel, dan sebelum kesimpulan
   - Deskripsi HARUS detail dan mengandung keyword

7. LINK (WAJIB):
   - {$intLinkIdeal} internal link: <a href="/blog/topik-terkait">anchor text</a>
   - {$extLinkMin}+ external link: <a href="https://sumber.com" target="_blank" rel="noopener">anchor</a>

8. FAQ SECTION (WAJIB):
   - {$faqIdeal} pertanyaan tentang {$keyword}
   - Format: <h2>Pertanyaan Umum</h2> lalu <h3>pertanyaan?</h3><p>jawaban</p>

9. KESIMPULAN:
   - H2 untuk kesimpulan
   - Keyword di paragraf terakhir
   - CTA: "{$ctaText}"

== FORMAT OUTPUT ==
SEO_TITLE: [judul seo]
H1: [judul artikel]
META_DESC: [meta description]
SLUG: [slug]
---CONTENT---
[konten HTML lengkap]

Gunakan HANYA tag HTML. JANGAN gunakan Markdown.
PROMPT;
    }

    /**
     * Parse generated content.
     */
    private function parseGeneratedContent(string $content, string $keyword): array
    {
        $result = [
            'seo_title' => '',
            'h1' => '',
            'meta_description' => '',
            'slug' => '',
            'body' => '',
            'primary_keyword' => $keyword,
        ];

        if (preg_match('/SEO_TITLE:\s*(.+)/i', $content, $m))
            $result['seo_title'] = trim($m[1]);
        if (preg_match('/^H1:\s*(.+)/mi', $content, $m))
            $result['h1'] = trim($m[1]);
        if (preg_match('/META_DESC:\s*(.+)/i', $content, $m))
            $result['meta_description'] = trim($m[1]);
        if (preg_match('/SLUG:\s*(.+)/i', $content, $m))
            $result['slug'] = trim($m[1]);

        if (preg_match('/---CONTENT---\s*(.+)/s', $content, $m)) {
            $result['body'] = trim($m[1]);
        } else {
            $lines = explode("\n", $content);
            $bodyStart = false;
            $bodyLines = [];
            foreach ($lines as $line) {
                if ($bodyStart) {
                    $bodyLines[] = $line;
                } elseif (preg_match('/^(SEO_TITLE|H1|META_DESC|SLUG):/i', $line)) {
                    continue;
                } elseif (trim($line) !== '' || !empty($bodyLines)) {
                    $bodyStart = true;
                    $bodyLines[] = $line;
                }
            }
            $result['body'] = trim(implode("\n", $bodyLines));
        }

        if (empty($result['seo_title']) && !empty($result['h1'])) {
            $result['seo_title'] = $result['h1'];
        }

        return $result;
    }

    /**
     * Process image markers [GAMBAR: desc] and replace with real images.
     * Uses Pexels API or falls back to Lorem Picsum.
     */
    private function processContentImages(array $result, string $keyword): array
    {
        if (empty($result['body']))
            return $result;

        $counter = 0;
        $result['body'] = preg_replace_callback(
            '/\[GAMBAR:\s*(.+?)\]/',
            function ($matches) use ($keyword, &$counter) {
                $counter++;
                $altText = trim($matches[1]);
                // Use picsum.photos with deterministic seed for consistent, working images
                $seed = Str::slug($keyword) . '-' . $counter;
                $imgUrl = "https://picsum.photos/seed/{$seed}/800/450";

                return '<figure style="margin: 24px 0; text-align: center;">'
                    . '<img src="' . $imgUrl . '" alt="' . htmlspecialchars($altText) . '" '
                    . 'width="800" height="450" loading="lazy" '
                    . 'style="width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />'
                    . '<figcaption style="font-size: 0.85em; color: #6b7280; margin-top: 8px; font-style: italic;">'
                    . htmlspecialchars($altText)
                    . '</figcaption>'
                    . '</figure>';
            },
            $result['body']
        );

        return $result;
    }

    /**
     * Sanitize forbidden words from output.
     */
    private function sanitizeForbiddenWords(array $result): array
    {
        $forbiddenWords = $this->getForbiddenWords();
        foreach (['body', 'seo_title', 'h1', 'meta_description'] as $field) {
            if (!empty($result[$field])) {
                foreach ($forbiddenWords as $word) {
                    $result[$field] = str_ireplace($word, '[dihapus]', $result[$field]);
                }
            }
        }
        return $result;
    }
}
