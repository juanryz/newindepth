<?php

namespace App\Services;

use App\Models\SeoSetting;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiContentGenerator
{
    private string $apiKey;
    private string $model;

    // Kata terlarang — harus dihindari dalam output AI
    private const KATA_TERLARANG = [
        'menyembuhkan',
        'obat ajaib',
        'pasti sembuh',
        'dijamin sembuh',
        '100% sembuh',
        'tanpa efek samping',
        'terbukti klinis',
        'satu-satunya cara',
        'pengganti obat',
        'rahasia',
        'trik curang',
        'cara instan',
        'cuma Anda yang tahu',
        'viral',
        'bikin kaya',
        'gratis selamanya',
        'dijamin sukses',
        'tidak perlu usaha',
        'menurut AI',
        'chatGPT bilang',
        'berdasarkan model bahasa',
        'bunuh diri',
        'gila',
        'stress berat',
    ];

    public function __construct()
    {
        $this->apiKey = config('services.openai.key', env('OPENAI_API_KEY', ''));
        $this->model = config('services.openai.model', 'gpt-4o-mini');
    }

    /**
     * Generate a full SEO-optimized article from keywords.
     * Optimized for SEO Score 90+.
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
                            [
                                'role' => 'system',
                                'content' => $this->getSystemPrompt()
                            ],
                            [
                                'role' => 'user',
                                'content' => $prompt
                            ]
                        ],
                        'temperature' => 0.7,
                        'max_tokens' => 8000,
                    ]);

            if ($response->successful()) {
                $content = $response->json('choices.0.message.content', '');
                $result = $this->parseGeneratedContent($content, $primaryKeyword);
                $result = $this->sanitizeForbiddenWords($result);
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
     * Generate only meta fields (title, description, slug) from content.
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
3. SLUG: 3-5 kata, hanya keyword utama, tanpa kata tambahan

Format output JSON:
{
  "seo_title": "...",
  "meta_description": "...",
  "slug": "..."
}

Hanya output JSON, tanpa penjelasan tambahan.
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
     * Generate article ideas/suggestions based on keyword.
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
1. Judul artikel yang SEO-friendly (55-65 karakter)
2. Target keyword utama
3. Estimasi search volume (rendah/sedang/tinggi)
4. Search intent (Informational/Transactional/Commercial/Navigational)
5. Deskripsi singkat (1-2 kalimat)

Format output JSON array:
[
  {{
    "title": "...",
    "keyword": "...",
    "volume": "tinggi",
    "intent": "Informational",
    "description": "..."
  }}
]

Hanya output JSON array valid, tanpa penjelasan tambahan.
PROMPT;

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(30)->post('https://api.openai.com/v1/chat/completions', [
                        'model' => $this->model,
                        'messages' => [
                            ['role' => 'system', 'content' => 'Kamu adalah content strategist ahli SEO untuk klinik hipnoterapi. Output hanya JSON array valid.'],
                            ['role' => 'user', 'content' => $prompt]
                        ],
                        'temperature' => 0.8,
                        'max_tokens' => 2000,
                    ]);

            if ($response->successful()) {
                $content = $response->json('choices.0.message.content', '');

                // Try direct JSON parse
                $json = json_decode($content, true);
                if ($json && is_array($json))
                    return ['ideas' => $json];

                // Try extracting from markdown code block
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
     * System prompt for SEO content writer.
     */
    private function getSystemPrompt(): string
    {
        $forbiddenList = implode(', ', self::KATA_TERLARANG);

        return <<<SYSTEM
Kamu adalah ahli SEO content writer Indonesia yang berpengalaman tinggi dengan standar Rank Math Pro, on-page SEO modern, dan AI Search Optimization (AEO).

ATURAN WAJIB:
1. Tulis artikel dalam Bahasa Indonesia yang berkualitas tinggi dan SEO-friendly
2. Artikel HARUS mencapai SEO Score minimal 90/100
3. JANGAN gunakan kata-kata terlarang berikut: {$forbiddenList}
4. Gunakan bahasa yang profesional, empatik, dan berbasis evidence
5. Masukkan tag <img> dengan src placeholder (https://images.unsplash.com/photo-hipnoterapi?w=800) dan alt text yang mengandung keyword
6. Buat internal link menggunakan <a href="/blog/topik-terkait"> dan external link menggunakan <a href="https://sumber-terpercaya.com" target="_blank" rel="noopener">
7. Setiap paragraf HARUS 2-4 kalimat
8. Setiap kalimat HARUS 12-20 kata
9. Gunakan HANYA tag HTML (h2, h3, p, ul, ol, li, strong, em, a, img). JANGAN gunakan Markdown.
SYSTEM;
    }

    /**
     * Build a comprehensive prompt using dynamic SEO rules.
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
        $kwMinOccurrences = $rules['keyword_min_occurrences']['value'] ?? 20;
        $kwMaxOccurrences = $rules['keyword_max_occurrences']['value'] ?? 30;
        $introMinWords = $rules['intro_min_words']['value'] ?? 80;
        $introMaxWords = $rules['intro_max_words']['value'] ?? 120;
        $introKwWithin = $rules['intro_keyword_within_words']['value'] ?? 50;
        $faqMin = $rules['faq_min_questions']['value'] ?? 4;
        $faqIdeal = $rules['faq_ideal_questions']['value'] ?? 5;
        $internalLinkMin = $rules['internal_link_min']['value'] ?? 3;
        $internalLinkIdeal = $rules['internal_link_ideal']['value'] ?? 5;
        $externalLinkMin = $rules['external_link_min']['value'] ?? 1;
        $imageMin = $rules['image_min_count']['value'] ?? 2;
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

        $secondaryKwText = $secondaryKw ? "Secondary Keywords / LSI: {$secondaryKw}" : "Buat {$lsiMin}-{$lsiMax} variasi LSI keyword sendiri.";

        return <<<PROMPT
Buatkan artikel SEO tentang "{$keyword}" dengan target SEO Score 90+.

TARGET AUDIENCE: {$audience}
TONE: {$tone}
{$secondaryKwText}

== ATURAN SEO WAJIB (SEMUA HARUS DIPENUHI UNTUK SCORE 90+) ==

1. SEO TITLE (baris pertama dengan prefix "SEO_TITLE:"):
   - TEPAT {$titleMin}-{$titleMax} karakter (HITUNG DENGAN TELITI!)
   - Keyword "{$keyword}" HARUS di awal judul

2. H1 (baris kedua dengan prefix "H1:"):
   - TEPAT {$h1Min}-{$h1Max} karakter
   - Mengandung keyword "{$keyword}"

3. META DESCRIPTION (baris ketiga dengan prefix "META_DESC:"):
   - TEPAT {$metaMin}-{$metaMax} karakter
   - Keyword muncul 1 kali, mengandung CTA

4. SLUG (baris keempat dengan prefix "SLUG:"):
   - 3-5 kata, hanya keyword utama

5. KONTEN ARTIKEL (setelah "---CONTENT---"):
   - Panjang MINIMAL {$articleWords} kata (WAJIB!)
   - Paragraf pembuka: {$introMinWords}-{$introMaxWords} kata
   - Keyword "{$keyword}" HARUS muncul di {$introKwWithin} kata pertama
   - TEPAT {$h2Min}-{$h2Max} heading H2 (gunakan tag <h2>)
   - TEPAT {$h3Min}-{$h3Max} heading H3 (gunakan tag <h3>)
   - Keyword density: {$kwDensityMin}%-{$kwDensityMax}% ({$kwMinOccurrences}-{$kwMaxOccurrences} kali muncul)
   - Minimal {$bulletMin} section menggunakan <ul> atau <ol>
   - Setiap paragraf HARUS 2-4 kalimat dalam tag <p>
   - Setiap kalimat HARUS 12-20 kata

6. GAMBAR (WAJIB ADA {$imageIdeal} GAMBAR):
   - Masukkan {$imageIdeal} tag <img> di posisi yang relevan dalam artikel
   - Format: <img src="https://images.unsplash.com/photo-hipnoterapi-[nomor]?w=800&h=450&fit=crop" alt="[deskripsi dengan keyword {$keyword}]" width="800" height="450" loading="lazy" />
   - SETIAP gambar WAJIB punya alt text yang mengandung keyword
   - Letakkan gambar setelah paragraf pembuka, di tengah, dan sebelum kesimpulan

7. LINK (WAJIB):
   - {$internalLinkIdeal} internal link: <a href="/blog/topik-terkait-{$keyword}">anchor text</a>
   - {$externalLinkMin}+ external link: <a href="https://sumber-terpercaya.com" target="_blank" rel="noopener">anchor text</a>

8. FAQ SECTION (WAJIB):
   - TEPAT {$faqIdeal} pertanyaan tentang {$keyword}
   - Format: <h2>Pertanyaan Umum tentang [Topik]</h2> lalu <h3>pertanyaan?</h3><p>jawaban</p>

9. KESIMPULAN (WAJIB):
   - H2 untuk kesimpulan
   - Keyword muncul di paragraf terakhir
   - Sertakan CTA: "{$ctaText}"

== FORMAT OUTPUT WAJIB ==
SEO_TITLE: [judul seo]
H1: [judul artikel]
META_DESC: [meta description]
SLUG: [slug]
---CONTENT---
[konten HTML artikel lengkap]

PENTING: Gunakan HANYA tag HTML (h2, h3, p, ul, ol, li, strong, em, a, img). JANGAN gunakan Markdown. Output HARUS siap dimasukkan ke rich text editor.
PROMPT;
    }

    /**
     * Parse the AI-generated content into structured parts.
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

        if (preg_match('/SEO_TITLE:\s*(.+)/i', $content, $m)) {
            $result['seo_title'] = trim($m[1]);
        }
        if (preg_match('/^H1:\s*(.+)/mi', $content, $m)) {
            $result['h1'] = trim($m[1]);
        }
        if (preg_match('/META_DESC:\s*(.+)/i', $content, $m)) {
            $result['meta_description'] = trim($m[1]);
        }
        if (preg_match('/SLUG:\s*(.+)/i', $content, $m)) {
            $result['slug'] = trim($m[1]);
        }

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
                } elseif (trim($line) === '') {
                    if (!empty($bodyLines) || $bodyStart)
                        $bodyLines[] = $line;
                } else {
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
     * Remove or replace forbidden words from generated content.
     */
    private function sanitizeForbiddenWords(array $result): array
    {
        foreach (['body', 'seo_title', 'h1', 'meta_description'] as $field) {
            if (!empty($result[$field])) {
                foreach (self::KATA_TERLARANG as $word) {
                    $result[$field] = str_ireplace($word, '[dihapus]', $result[$field]);
                }
            }
        }
        return $result;
    }
}
