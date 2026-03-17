<?php

namespace App\Services;

use App\Models\SeoSetting;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

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
     * Generate a full SEO-optimized article from keywords.
     */
    public function generateArticle(array $input): array
    {
        $primaryKeyword = $input['primary_keyword'] ?? '';
        $secondaryKeywords = $input['secondary_keywords'] ?? '';
        $tone = $input['tone'] ?? 'profesional dan informatif';
        $audience = $input['audience'] ?? 'masyarakat umum Indonesia';

        // Fetch dynamic SEO rules from database
        $rules = SeoSetting::getRules();

        $prompt = $this->buildPrompt($primaryKeyword, $secondaryKeywords, $tone, $audience, $rules);

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(120)->post('https://api.openai.com/v1/chat/completions', [
                        'model' => $this->model,
                        'messages' => [
                            [
                                'role' => 'system',
                                'content' => 'Kamu adalah ahli SEO content writer Indonesia yang berpengalaman dengan standar Rank Math Pro, on-page SEO modern, dan AI Search Optimization (AEO). Tulis artikel dalam Bahasa Indonesia yang berkualitas tinggi dan SEO-friendly.'
                            ],
                            [
                                'role' => 'user',
                                'content' => $prompt
                            ]
                        ],
                        'temperature' => 0.7,
                        'max_tokens' => 4000,
                    ]);

            if ($response->successful()) {
                $content = $response->json('choices.0.message.content', '');
                return $this->parseGeneratedContent($content, $primaryKeyword);
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
        $body = $input['body'] ?? '';
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

                // Try to extract JSON from markdown code block
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
        $externalLinkMin = $rules['external_link_min']['value'] ?? 1;
        $imageMin = $rules['image_min_count']['value'] ?? 2;
        $bulletMin = $rules['min_bullet_sections']['value'] ?? 2;
        $sentenceMinWords = $rules['sentence_min_words']['value'] ?? 12;
        $sentenceMaxWords = $rules['sentence_max_words']['value'] ?? 20;
        $paraMinSentences = $rules['paragraph_min_sentences']['value'] ?? 2;
        $paraMaxSentences = $rules['paragraph_max_sentences']['value'] ?? 4;
        $ctaText = $rules['default_cta_text']['value'] ?? 'Hubungi kami untuk informasi lebih lanjut.';
        $titleMin = $rules['seo_title_min_length']['value'] ?? 55;
        $titleMax = $rules['seo_title_max_length']['value'] ?? 65;
        $metaMin = $rules['meta_desc_min_length']['value'] ?? 140;
        $metaMax = $rules['meta_desc_max_length']['value'] ?? 160;
        $h1Min = $rules['h1_min_length']['value'] ?? 60;
        $h1Max = $rules['h1_max_length']['value'] ?? 80;
        $lsiMin = $rules['lsi_keyword_min']['value'] ?? 5;
        $lsiMax = $rules['lsi_keyword_max']['value'] ?? 10;

        $secondaryKwText = $secondaryKw ? "Secondary Keywords / LSI: {$secondaryKw}" : "Buat {$lsiMin}-{$lsiMax} variasi LSI keyword sendiri.";

        return <<<PROMPT
Buatkan artikel SEO tentang "{$keyword}" dengan aturan berikut:

TARGET AUDIENCE: {$audience}
TONE: {$tone}

== STRUKTUR SEO WAJIB ==

1. SEO TITLE (baris pertama dengan prefix "SEO_TITLE:"):
   - Panjang {$titleMin}-{$titleMax} karakter
   - Keyword "{$keyword}" di awal judul

2. H1 (baris kedua dengan prefix "H1:"):
   - Panjang {$h1Min}-{$h1Max} karakter
   - Mengandung keyword

3. META DESCRIPTION (baris ketiga dengan prefix "META_DESC:"):
   - Panjang {$metaMin}-{$metaMax} karakter
   - Keyword muncul 1 kali

4. SLUG (baris keempat dengan prefix "SLUG:"):
   - 3-5 kata, hanya keyword utama

5. KONTEN ARTIKEL (setelah "---CONTENT---"):
   - Panjang minimal {$articleWords} kata
   - Paragraf pembuka: {$introMinWords}-{$introMaxWords} kata
   - Keyword muncul di {$introKwWithin} kata pertama
   - {$h2Min}-{$h2Max} heading H2
   - {$h3Min}-{$h3Max} heading H3
   - Keyword density: {$kwDensityMin}%-{$kwDensityMax}% ({$kwMinOccurrences}-{$kwMaxOccurrences} kali)
   - {$secondaryKwText}
   - Minimal {$bulletMin} section menggunakan list/bullet
   - Setiap paragraf: {$paraMinSentences}-{$paraMaxSentences} kalimat
   - Setiap kalimat: {$sentenceMinWords}-{$sentenceMaxWords} kata
   - Tandai lokasi gambar dengan [IMAGE: deskripsi alt text]
   - Minimal {$imageMin} posisi gambar
   - {$internalLinkMin}+ internal link (gunakan format [INTERNAL_LINK: anchor text | topik])
   - {$externalLinkMin}+ external link (gunakan format [EXTERNAL_LINK: anchor text | URL/sumber])

6. FAQ SECTION (dalam konten):
   - {$faqMin}-{$faqIdeal} pertanyaan
   - Format HTML yang benar (h2 untuk judul FAQ, lalu h3 untuk setiap pertanyaan)

7. KESIMPULAN:
   - Keyword wajib muncul di paragraf penutup
   - Sertakan CTA: "{$ctaText}"

== FORMAT OUTPUT ==
SEO_TITLE: [judul seo]
H1: [judul artikel]
META_DESC: [meta description]
SLUG: [slug]
---CONTENT---
[konten HTML artikel lengkap dengan h2, h3, p, ul, ol, dll]

Gunakan tag HTML untuk struktur (h2, h3, p, ul, ol, strong, em). Jangan gunakan Markdown.
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

        // Extract metadata lines
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

        // Extract body after ---CONTENT---
        if (preg_match('/---CONTENT---\s*(.+)/s', $content, $m)) {
            $result['body'] = trim($m[1]);
        } else {
            // Fallback: everything after the metadata lines
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

        // Use H1 as title if no separate title
        if (empty($result['seo_title']) && !empty($result['h1'])) {
            $result['seo_title'] = $result['h1'];
        }

        return $result;
    }
}
