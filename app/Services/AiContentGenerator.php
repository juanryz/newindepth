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

    private function getForbiddenWords(): array
    {
        $rules = SeoSetting::getRules();
        $raw = $rules['forbidden_words']['value'] ?? '';
        if (empty($raw))
            return [];
        return array_map('trim', explode(',', $raw));
    }

    /**
     * Generate a full SEO-optimized article using multi-step approach.
     * Step 1: Generate outline
     * Step 2: Generate full article from outline
     */
    public function generateArticle(array $input): array
    {
        $primaryKeyword = $input['primary_keyword'] ?? '';
        $secondaryKeywords = $input['secondary_keywords'] ?? '';
        $tone = $input['tone'] ?? 'profesional dan informatif';
        $audience = $input['audience'] ?? 'masyarakat umum Indonesia';
        $rules = SeoSetting::getRules();

        try {
            // STEP 1: Generate outline first
            $outline = $this->generateOutline($primaryKeyword, $secondaryKeywords, $tone, $audience, $rules);
            if (isset($outline['error']))
                return $outline;

            // STEP 2: Generate full article from outline
            $result = $this->generateFullArticle($primaryKeyword, $secondaryKeywords, $tone, $audience, $rules, $outline);
            if (isset($result['error']))
                return $result;

            $result = $this->sanitizeForbiddenWords($result);
            $result = $this->processContentImages($result, $primaryKeyword);
            return $result;
        } catch (\Exception $e) {
            Log::error('AI Content Generation Error', ['message' => $e->getMessage()]);
            return ['error' => 'Terjadi kesalahan: ' . $e->getMessage()];
        }
    }

    /**
     * Step 1: Generate article outline.
     */
    private function generateOutline(string $keyword, string $secondary, string $tone, string $audience, array $rules): array
    {
        $h2Min = $rules['h2_min_count']['value'] ?? 5;
        $h2Max = $rules['h2_max_count']['value'] ?? 8;
        $faqIdeal = $rules['faq_ideal_questions']['value'] ?? 5;
        $intLinkIdeal = $rules['internal_link_ideal']['value'] ?? 5;

        $prompt = <<<PROMPT
Buatkan outline artikel SEO tentang "{$keyword}" untuk website klinik hipnoterapi InDepth (indepth.co.id).

ATURAN:
- {$h2Min}-{$h2Max} section H2 (TERMASUK 1 section FAQ dan 1 section Kesimpulan)
- Setiap H2 harus punya 2-4 sub-section H3
- Section FAQ WAJIB berisi {$faqIdeal} pertanyaan
- Sertakan {$intLinkIdeal} internal link placeholder (tulis: [INTERNAL_LINK: anchor text | /blog/topik-url])
- Tone: {$tone}, Target: {$audience}
- LSI keywords wajib disebutkan: {$secondary}

Format output JSON:
{{
  "seo_title": "judul SEO 55-65 karakter, keyword di awal",
  "h1": "judul H1 60-80 karakter",
  "meta_description": "meta description 140-160 karakter mengandung keyword dan CTA",
  "slug": "slug-3-5-kata",
  "sections": [
    {{
      "h2": "Judul Section",
      "h3s": ["Sub Judul 1", "Sub Judul 2"],
      "key_points": ["poin utama 1", "poin utama 2", "poin utama 3"],
      "word_target": 300
    }}
  ],
  "internal_links": [
    {{"anchor": "teks anchor", "url": "/blog/topik-terkait"}}
  ],
  "faq_questions": ["Pertanyaan 1?", "Pertanyaan 2?"]
}}

PENTING: meta_description HARUS 140-160 karakter. Hitung dengan teliti!
Hanya output JSON valid, tanpa penjelasan.
PROMPT;

        $response = $this->callOpenAI($prompt, 'Kamu adalah ahli SEO content strategist Indonesia. Output hanya JSON valid.', 2000, 0.7);
        if (isset($response['error']))
            return $response;

        $json = $this->parseJson($response['content']);
        if (!$json)
            return ['error' => 'Format outline tidak valid.'];
        return $json;
    }

    /**
     * Step 2: Generate full article from outline.
     */
    private function generateFullArticle(string $keyword, string $secondary, string $tone, string $audience, array $rules, array $outline): array
    {
        $articleWords = $rules['article_ideal_words']['value'] ?? 2000;
        $kwDensityMin = $rules['keyword_density_min']['value'] ?? 1.0;
        $kwDensityMax = $rules['keyword_density_max']['value'] ?? 1.5;
        $kwMinOcc = $rules['keyword_min_occurrences']['value'] ?? 20;
        $kwMaxOcc = $rules['keyword_max_occurrences']['value'] ?? 30;
        $introKwWithin = $rules['intro_keyword_within_words']['value'] ?? 50;
        $imageIdeal = $rules['image_ideal_count']['value'] ?? 3;
        $intLinkIdeal = $rules['internal_link_ideal']['value'] ?? 5;
        $extLinkMin = $rules['external_link_min']['value'] ?? 1;
        $extLinkIdeal = $rules['external_link_ideal']['value'] ?? 2;
        $ctaText = $rules['default_cta_text']['value'] ?? 'Hubungi kami untuk informasi lebih lanjut.';
        $forbiddenList = implode(', ', $this->getForbiddenWords());

        $sectionsJson = json_encode($outline['sections'] ?? [], JSON_UNESCAPED_UNICODE);
        $internalLinksJson = json_encode($outline['internal_links'] ?? [], JSON_UNESCAPED_UNICODE);
        $faqJson = json_encode($outline['faq_questions'] ?? [], JSON_UNESCAPED_UNICODE);

        $prompt = <<<PROMPT
Tulis artikel SEO LENGKAP berdasarkan outline berikut. Keyword utama: "{$keyword}".

== OUTLINE ==
Sections: {$sectionsJson}
Internal Links: {$internalLinksJson}
FAQ: {$faqJson}

== ATURAN WAJIB (SEMUA HARUS DIPENUHI UNTUK SKOR 90+) ==

1. JUMLAH KATA: Artikel HARUS MINIMAL {$articleWords} kata. INI WAJIB. Jangan kurang.
   - Setiap section H2 harus berisi MINIMAL 250-350 kata
   - Paragraf pembuka: 80-120 kata
   - HITUNG kata Anda. Jika kurang dari {$articleWords}, TAMBAH konten.

2. KEYWORD "{$keyword}":
   - WAJIB muncul di 50 kata pertama
   - Density: {$kwDensityMin}%-{$kwDensityMax}% = keyword muncul {$kwMinOcc}-{$kwMaxOcc} kali
   - Sebarkan keyword secara natural di setiap section
   - Keyword WAJIB di paragraf terakhir/kesimpulan

3. FORMAT HTML (JANGAN gunakan Markdown):
   - Heading: <h2>...</h2>, <h3>...</h3>
   - Paragraf: <p>...</p> (2-4 kalimat per paragraf, 12-20 kata per kalimat)
   - List: <ul><li>...</li></ul> atau <ol><li>...</li></ol>
   - Bold: <strong>...</strong>, Italic: <em>...</em>

4. GAMBAR - WAJIB {$imageIdeal} penanda gambar:
   - Gunakan marker [GAMBAR: deskripsi detail tentang {$keyword}]
   - Posisi: setelah intro, di tengah, sebelum kesimpulan
   - Deskripsi HARUS detail dan mengandung keyword

5. INTERNAL LINK - WAJIB {$intLinkIdeal} link:
   - Format: <a href="/blog/topik-terkait">anchor text relevan</a>
   - Gunakan link dari outline, sebarkan di seluruh artikel

6. EXTERNAL LINK - WAJIB {$extLinkIdeal} link:
   - Format: <a href="https://sumber-terpercaya.com" target="_blank" rel="noopener">sumber</a>
   - Gunakan sumber terpercaya: WHO, jurnal psikologi, universitas, dsb.

7. FAQ SECTION:
   - Format: <h2>Pertanyaan Umum tentang {$keyword}</h2>
   - Setiap FAQ: <h3>pertanyaan?</h3><p>jawaban 50-80 kata</p>

8. KESIMPULAN:
   - <h2>Kesimpulan</h2>
   - Keyword di paragraf terakhir
   - CTA: {$ctaText}

9. KATA TERLARANG (JANGAN gunakan): {$forbiddenList}

10. TONE: {$tone}, TARGET: {$audience}
    - Bahasa Indonesia berkualitas tinggi
    - Empatik dan evidence-based
    - Sertakan LSI keywords: {$secondary}

== OUTPUT ==
Tulis HANYA konten HTML artikel. Mulai langsung dari <p> paragraf pembuka.
JANGAN tulis SEO_TITLE, H1, META_DESC, atau penjelasan apapun.
JANGAN tulis kurang dari {$articleWords} kata!
PROMPT;

        $response = $this->callOpenAI($prompt, $this->getSystemPrompt(), 16000, 0.75);
        if (isset($response['error']))
            return $response;

        $body = trim($response['content']);
        // Clean up any markdown artifacts
        $body = preg_replace('/^```html?\s*/i', '', $body);
        $body = preg_replace('/\s*```\s*$/', '', $body);

        return [
            'seo_title' => $outline['seo_title'] ?? '',
            'h1' => $outline['h1'] ?? '',
            'meta_description' => $outline['meta_description'] ?? '',
            'slug' => $outline['slug'] ?? '',
            'body' => $body,
            'primary_keyword' => $keyword,
        ];
    }

    /**
     * Generate only meta fields.
     */
    public function generateMeta(array $input): array
    {
        $keyword = $input['primary_keyword'] ?? '';
        $rules = SeoSetting::getRules();
        $titleMin = $rules['seo_title_min_length']['value'] ?? 55;
        $titleMax = $rules['seo_title_max_length']['value'] ?? 65;
        $metaMin = $rules['meta_desc_min_length']['value'] ?? 140;
        $metaMax = $rules['meta_desc_max_length']['value'] ?? 160;

        $prompt = <<<PROMPT
Keyword utama: "{$keyword}"
Buatkan:
1. SEO TITLE: TEPAT {$titleMin}-{$titleMax} karakter, keyword di awal
2. META DESCRIPTION: TEPAT {$metaMin}-{$metaMax} karakter, keyword 1x, ada CTA
3. SLUG: 3-5 kata

HITUNG KARAKTER DENGAN TELITI.

Output JSON: {{"seo_title":"...","meta_description":"...","slug":"..."}}
PROMPT;

        $response = $this->callOpenAI($prompt, 'Ahli SEO Indonesia. Output hanya JSON valid.', 500, 0.5);
        if (isset($response['error']))
            return $response;
        $json = $this->parseJson($response['content']);
        return $json ?: ['error' => 'Format respons tidak valid.'];
    }

    /**
     * Generate article ideas.
     */
    public function generateIdeas(array $input): array
    {
        $keyword = $input['primary_keyword'] ?? '';
        $prompt = <<<PROMPT
Kamu content strategist untuk klinik hipnoterapi InDepth (indepth.co.id).
Berdasarkan keyword "{$keyword}", buatkan 8 ide artikel blog yang:
- Relevan dengan hipnoterapi, kesehatan mental, wellness
- Potensi traffic organik tinggi
- Bervariasi intent: informational, transactional, commercial

Format JSON array:
[{{"title":"judul 55-65 karakter","keyword":"keyword utama","volume":"tinggi/sedang/rendah","intent":"Informational/Transactional/Commercial","description":"1-2 kalimat"}}]
Hanya output JSON array.
PROMPT;

        $response = $this->callOpenAI($prompt, 'Content strategist ahli SEO. Output hanya JSON array.', 2000, 0.8);
        if (isset($response['error']))
            return $response;
        $json = $this->parseJson($response['content']);
        if ($json && is_array($json))
            return ['ideas' => $json];
        return ['error' => 'Format respons tidak valid.'];
    }

    /**
     * Generate featured image using DALL-E.
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
            . "Calming, professional, suitable for healthcare. Soft, soothing colors (blues, greens, warm tones). "
            . "No text or watermarks. High resolution, landscape. Convey trust, healing, professional care.";

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
                    $imageContent = Http::timeout(30)->get($imageUrl)->body();
                    $filename = 'blog/ai-' . Str::slug($keyword) . '-' . uniqid() . '.png';
                    Storage::disk('public')->put($filename, $imageContent);
                    return ['success' => true, 'path' => $filename, 'url' => '/storage/' . $filename];
                }
                return ['error' => 'URL gambar tidak ditemukan.'];
            }
            $err = $response->json('error.message', 'Status: ' . $response->status());
            return ['error' => 'Gagal generate gambar. ' . $err];
        } catch (\Exception $e) {
            return ['error' => 'Terjadi kesalahan: ' . $e->getMessage()];
        }
    }

    /**
     * Call OpenAI API.
     */
    private function callOpenAI(string $prompt, string $system, int $maxTokens = 4000, float $temp = 0.7): array
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type' => 'application/json',
        ])->timeout(240)->post('https://api.openai.com/v1/chat/completions', [
                    'model' => $this->model,
                    'messages' => [
                        ['role' => 'system', 'content' => $system],
                        ['role' => 'user', 'content' => $prompt],
                    ],
                    'temperature' => $temp,
                    'max_tokens' => $maxTokens,
                ]);

        if ($response->successful()) {
            return ['content' => $response->json('choices.0.message.content', '')];
        }

        Log::error('OpenAI API Error', ['status' => $response->status(), 'body' => $response->body()]);
        return ['error' => 'Gagal menghubungi AI. Status: ' . $response->status()];
    }

    private function getSystemPrompt(): string
    {
        $forbiddenList = implode(', ', $this->getForbiddenWords());
        return <<<SYSTEM
Kamu adalah ahli SEO content writer Indonesia berpengalaman tinggi. Standar: Rank Math Pro, on-page SEO modern, AEO.

ATURAN KETAT:
1. SELALU tulis dalam Bahasa Indonesia berkualitas tinggi
2. Artikel WAJIB MINIMAL 2000 kata. JANGAN PERNAH tulis kurang. Ini aturan paling penting.
3. JANGAN gunakan kata terlarang: {$forbiddenList}
4. Gunakan HANYA tag HTML. JANGAN gunakan Markdown.
5. JANGAN masukkan tag <img>. Gunakan marker [GAMBAR: deskripsi] saja.
6. Setiap paragraf 2-4 kalimat. Setiap kalimat 12-20 kata.
7. Bahasa profesional, empatik, evidence-based.
SYSTEM;
    }

    private function parseJson(string $content): ?array
    {
        $json = json_decode($content, true);
        if ($json)
            return $json;
        if (preg_match('/```(?:json)?\s*([\{\[].*?[\}\]])\s*```/s', $content, $m)) {
            $json = json_decode($m[1], true);
            if ($json)
                return $json;
        }
        if (preg_match('/([\{\[].*[\}\]])/s', $content, $m)) {
            $json = json_decode($m[1], true);
            if ($json)
                return $json;
        }
        return null;
    }

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
                $seed = Str::slug($keyword) . '-' . $counter;
                $imgUrl = "https://picsum.photos/seed/{$seed}/800/450";
                return '<figure style="margin: 24px 0; text-align: center;">'
                    . '<img src="' . $imgUrl . '" alt="' . htmlspecialchars($altText) . '" '
                    . 'width="800" height="450" loading="lazy" '
                    . 'style="width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />'
                    . '<figcaption style="font-size: 0.85em; color: #6b7280; margin-top: 8px; font-style: italic;">'
                    . htmlspecialchars($altText) . '</figcaption></figure>';
            },
            $result['body']
        );
        return $result;
    }

    private function sanitizeForbiddenWords(array $result): array
    {
        $fw = $this->getForbiddenWords();
        foreach (['body', 'seo_title', 'h1', 'meta_description'] as $field) {
            if (!empty($result[$field])) {
                foreach ($fw as $word) {
                    $result[$field] = str_ireplace($word, '[dihapus]', $result[$field]);
                }
            }
        }
        return $result;
    }
}
