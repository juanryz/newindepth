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

    private function countWords(string $html): int
    {
        $text = strip_tags($html);
        $text = preg_replace('/\s+/', ' ', trim($text));
        return count(array_filter(explode(' ', $text), fn($w) => mb_strlen($w) > 0));
    }

    /**
     * Generate a full SEO-optimized article using multi-step approach.
     */
    public function generateArticle(array $input): array
    {
        $primaryKeyword = $input['primary_keyword'] ?? '';
        $secondaryKeywords = $input['secondary_keywords'] ?? '';
        $tone = $input['tone'] ?? 'profesional dan informatif';
        $audience = $input['audience'] ?? 'masyarakat umum Indonesia';

        try {
            $rules = SeoSetting::getRules();
        } catch (\Exception $e) {
            $rules = [];
            Log::warning('Could not load SEO rules', ['error' => $e->getMessage()]);
        }

        try {
            // STEP 1: Generate outline
            $outline = $this->generateOutline($primaryKeyword, $secondaryKeywords, $tone, $audience, $rules);
            if (isset($outline['error']))
                return $outline;

            // Fix meta if too short
            try {
                $outline = $this->fixOutlineMeta($outline, $primaryKeyword, $rules);
            } catch (\Exception $e) {
                Log::warning('fixOutlineMeta failed', ['error' => $e->getMessage()]);
            }

            // STEP 2: Generate full article from outline
            $result = $this->generateFullArticle($primaryKeyword, $secondaryKeywords, $tone, $audience, $rules, $outline);
            if (isset($result['error']))
                return $result;

            // STEP 3: Check word count and extend if needed
            try {
                $wordCount = $this->countWords($result['body'] ?? '');
                $targetWords = $rules['article_ideal_words']['value'] ?? 2000;

                Log::info("AI Article Generated", ['words' => $wordCount, 'target' => $targetWords]);

                if ($wordCount < ($targetWords * 0.85)) {
                    $extension = $this->extendArticle($primaryKeyword, $secondaryKeywords, $result['body'], $wordCount, $targetWords, $rules);
                    if (!isset($extension['error']) && !empty($extension['content'])) {
                        $result['body'] .= $extension['content'];
                    }
                }
            } catch (\Exception $e) {
                Log::warning('Article extension failed', ['error' => $e->getMessage()]);
            }

            // STEP 4: Post-processing (each step is safe - won't crash if it fails)
            try {
                $result = $this->ensureLinks($result, $primaryKeyword, $rules);
            } catch (\Exception $e) {
                Log::warning('ensureLinks failed', ['error' => $e->getMessage()]);
            }
            try {
                $result = $this->ensureLists($result);
            } catch (\Exception $e) {
                Log::warning('ensureLists failed', ['error' => $e->getMessage()]);
            }
            try {
                $result = $this->sanitizeForbiddenWords($result);
            } catch (\Exception $e) {
                Log::warning('sanitizeForbiddenWords failed', ['error' => $e->getMessage()]);
            }
            try {
                $result = $this->processContentImages($result, $primaryKeyword);
            } catch (\Exception $e) {
                Log::warning('processContentImages failed', ['error' => $e->getMessage()]);
            }
            try {
                $result = $this->boostKeywordDensity($result, $primaryKeyword, $rules);
            } catch (\Exception $e) {
                Log::warning('boostKeywordDensity failed', ['error' => $e->getMessage()]);
            }

            return $result;
        } catch (\Exception $e) {
            Log::error('AI Content Generation Error', ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return ['error' => 'Terjadi kesalahan saat generate artikel: ' . $e->getMessage()];
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
        $titleMin = $rules['seo_title_min_length']['value'] ?? 55;
        $titleMax = $rules['seo_title_max_length']['value'] ?? 65;
        $metaMin = $rules['meta_desc_min_length']['value'] ?? 140;
        $metaMax = $rules['meta_desc_max_length']['value'] ?? 160;

        $prompt = <<<PROMPT
Buatkan outline artikel SEO tentang "{$keyword}" untuk website klinik hipnoterapi InDepth (indepth.co.id).

ATURAN KETAT:
1. {$h2Min}-{$h2Max} section H2 (TERMASUK FAQ dan Kesimpulan)
2. Setiap H2 punya 2-4 sub-section H3
3. FAQ WAJIB {$faqIdeal} pertanyaan
4. {$intLinkIdeal} internal link ke /blog/topik-relevan
5. Tone: {$tone}, Target: {$audience}
6. LSI keywords: {$secondary}

ATURAN META (SANGAT PENTING - HITUNG KARAKTER DENGAN TELITI):
- seo_title: HARUS TEPAT {$titleMin}-{$titleMax} karakter. Keyword "{$keyword}" di AWAL judul. HITUNG SEBELUM OUTPUT!
- meta_description: HARUS TEPAT {$metaMin}-{$metaMax} karakter. Mengandung keyword 1x dan call-to-action. HITUNG SEBELUM OUTPUT!
- h1: 60-80 karakter, keyword di dalamnya

PERHATIAN: Jika seo_title kurang dari {$titleMin} karakter TAMBAHKAN kata. Jika meta_description kurang dari {$metaMin} karakter TAMBAHKAN deskripsi.

Format JSON:
{
  "seo_title": "judul SEO {$titleMin}-{$titleMax} karakter TEPAT",
  "h1": "judul H1 60-80 karakter",
  "meta_description": "deskripsi {$metaMin}-{$metaMax} karakter TEPAT, keyword + CTA",
  "slug": "slug-3-5-kata",
  "sections": [
    {
      "h2": "Judul Section",
      "h3s": ["Sub 1", "Sub 2", "Sub 3"],
      "key_points": ["poin 1", "poin 2", "poin 3"],
      "word_target": 350
    }
  ],
  "internal_links": [
    {"anchor": "teks anchor", "url": "/blog/topik"}
  ],
  "external_links": [
    {"anchor": "sumber terpercaya", "url": "https://sumber.com/halaman"}
  ],
  "faq_questions": ["Pertanyaan 1?", "Pertanyaan 2?"]
}

PENTING - ANTI HALLUCINATION:
Jika topik "{$keyword}" TIDAK MASUK AKAL secara medis/psikologis (seperti: hipnoterapi untuk hewan/kucing peliharaan, menyembuhkan penyakit fisik seperti kanker/patah tulang, dll), KAMU WAJIB MENOLAKNYA dengan membalas format JSON berikut saja:
{"error": "Topik tidak valid atau tidak bisa disembuhkan secara ilmiah dengan hipnoterapi."}

Hanya output JSON valid. Tanpa penjelasan.
PROMPT;

        $response = $this->callOpenAI($prompt, 'Kamu ahli SEO content strategist Indonesia. Jaga integritas medis dan saintifik hipnoterapi. Output HANYA JSON valid tanpa penjelasan.', 3000, 0.7);
        if (isset($response['error']))
            return $response;

        $json = $this->parseJson($response['content']);
        if (!$json)
            return ['error' => 'Format outline tidak valid.'];

        if (isset($json['error']))
            return ['error' => $json['error']];

        return $json;
    }

    /**
     * Fix outline meta if lengths are wrong.
     */
    private function fixOutlineMeta(array $outline, string $keyword, array $rules): array
    {
        $titleMin = $rules['seo_title_min_length']['value'] ?? 55;
        $titleMax = $rules['seo_title_max_length']['value'] ?? 65;
        $metaMin = $rules['meta_desc_min_length']['value'] ?? 140;
        $metaMax = $rules['meta_desc_max_length']['value'] ?? 160;

        $titleLen = mb_strlen($outline['seo_title'] ?? '');
        $metaLen = mb_strlen($outline['meta_description'] ?? '');

        if ($titleLen < $titleMin || $titleLen > $titleMax || $metaLen < $metaMin || $metaLen > $metaMax) {
            $prompt = <<<PROMPT
Keyword: "{$keyword}"

Perbaiki berikut ini agar TEPAT sesuai jumlah karakter:
- seo_title saat ini: "{$outline['seo_title']}" ({$titleLen} karakter) → HARUS {$titleMin}-{$titleMax} karakter, keyword di awal
- meta_description saat ini: "{$outline['meta_description']}" ({$metaLen} karakter) → HARUS {$metaMin}-{$metaMax} karakter, keyword 1x + CTA

HITUNG KARAKTER SATU-SATU SEBELUM OUTPUT. Jika kurang tambahkan kata. Jika lebih potong.

Output JSON: {{"seo_title":"...","meta_description":"..."}}
PROMPT;

            $response = $this->callOpenAI($prompt, 'Ahli SEO. Hitung karakter dengan sangat teliti. Output hanya JSON.', 500, 0.3);
            if (!isset($response['error'])) {
                $json = $this->parseJson($response['content']);
                if ($json) {
                    if (!empty($json['seo_title']))
                        $outline['seo_title'] = $json['seo_title'];
                    if (!empty($json['meta_description']))
                        $outline['meta_description'] = $json['meta_description'];
                }
            }
        }

        return $outline;
    }

    /**
     * Step 2: Generate full article from outline.
     */
    private function generateFullArticle(string $keyword, string $secondary, string $tone, string $audience, array $rules, array $outline): array
    {
        $articleWords = $rules['article_ideal_words']['value'] ?? 2000;
        $kwMinOcc = $rules['keyword_min_occurrences']['value'] ?? 20;
        $kwMaxOcc = $rules['keyword_max_occurrences']['value'] ?? 30;
        $imageIdeal = $rules['image_ideal_count']['value'] ?? 3;
        $intLinkIdeal = $rules['internal_link_ideal']['value'] ?? 5;
        $extLinkIdeal = $rules['external_link_ideal']['value'] ?? 2;
        $ctaText = $rules['default_cta_text']['value'] ?? 'Hubungi kami untuk informasi lebih lanjut.';
        $forbiddenList = implode(', ', $this->getForbiddenWords());

        $sectionsJson = json_encode($outline['sections'] ?? [], JSON_UNESCAPED_UNICODE);
        $internalLinksJson = json_encode($outline['internal_links'] ?? [], JSON_UNESCAPED_UNICODE);
        $externalLinksJson = json_encode($outline['external_links'] ?? [], JSON_UNESCAPED_UNICODE);
        $faqJson = json_encode($outline['faq_questions'] ?? [], JSON_UNESCAPED_UNICODE);

        $sectionCount = count($outline['sections'] ?? []);
        $wordsPerSection = $sectionCount > 0 ? ceil($articleWords / $sectionCount) : 300;

        $prompt = <<<PROMPT
TUGAS: Tulis artikel SEO LENGKAP dalam Bahasa Indonesia. Keyword: "{$keyword}".

OUTLINE YANG HARUS DIIKUTI:
Sections: {$sectionsJson}
Internal Links: {$internalLinksJson}
External Links: {$externalLinksJson}
FAQ: {$faqJson}

=======================================
ATURAN #1 - JUMLAH KATA (PALING PENTING!)
=======================================
- Artikel WAJIB MINIMAL {$articleWords} kata. TIDAK BOLEH KURANG.
- Ada {$sectionCount} section. Setiap section tulis MINIMAL {$wordsPerSection} kata.
- Paragraf pembuka: 100-150 kata.
- Setiap H3 sub-section: minimal 100 kata.
- JANGAN BERHENTI sampai SEMUA section selesai ditulis lengkap.
- JANGAN tulis ringkas. Tulis DETAIL dan MENDALAM.
- TOTAL MINIMUM: {$articleWords} KATA. INI TIDAK BISA DITAWAR.

=======================================
ATURAN #2 - KEYWORD "{$keyword}"
=======================================
- Keyword WAJIB muncul {$kwMinOcc}-{$kwMaxOcc} kali di seluruh artikel
- WAJIB muncul di: 50 kata pertama, setiap section H2, setiap 200 kata, paragraf terakhir
- Sebarkan NATURAL, jangan menumpuk

=======================================
ATURAN #3 - FORMAT HTML
=======================================
- HANYA gunakan tag HTML: <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <a>
- JANGAN gunakan Markdown (# ## ** dll)
- Paragraf: 2-4 kalimat, 12-20 kata per kalimat
- WAJIB minimal 2 section <ul> atau <ol> dengan 3-5 <li> masing-masing

=======================================
ATURAN #4 - GAMBAR ({$imageIdeal} WAJIB)
=======================================
- Sisipkan {$imageIdeal} marker: [GAMBAR: deskripsi detail tentang {$keyword}]
- Posisi: setelah intro, di tengah artikel, sebelum kesimpulan

=======================================
ATURAN #5 - LINK
=======================================
- {$intLinkIdeal} INTERNAL LINK: <a href="/blog/topik">anchor text</a>
- Gunakan link dari outline, sebarkan merata
- {$extLinkIdeal} EXTERNAL LINK: <a href="https://sumber.com" target="_blank" rel="noopener">nama sumber</a>
- Sumber: WHO, jurnal psikologi, universitas, organisasi kesehatan

=======================================
ATURAN #6 - FAQ
=======================================
- <h2>Pertanyaan Umum tentang {$keyword}</h2>
- Setiap FAQ: <h3>pertanyaan?</h3><p>jawaban 60-100 kata</p>

=======================================
ATURAN #7 - KESIMPULAN
=======================================
- <h2>Kesimpulan</h2>
- 150-200 kata, keyword di paragraf terakhir
- CTA: {$ctaText}

=======================================
LARANGAN
=======================================
- JANGAN gunakan kata: {$forbiddenList}
- JANGAN tulis kurang dari {$articleWords} kata
- JANGAN skip section apapun dari outline

OUTPUT: Tulis HANYA konten HTML mulai dari <p> paragraf pembuka. Tanpa komentar, tanpa penjelasan.
Tone: {$tone}. Target audiens: {$audience}. LSI keywords: {$secondary}.
PROMPT;

        $response = $this->callOpenAI($prompt, $this->getSystemPrompt(), 16000, 0.75);
        if (isset($response['error']))
            return $response;

        $body = trim($response['content']);
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
     * Extend article if word count is too low.
     */
    private function extendArticle(string $keyword, string $secondary, string $currentBody, int $currentWords, int $targetWords, array $rules): array
    {
        $needed = $targetWords - $currentWords + 200; // extra buffer

        $prompt = <<<PROMPT
Artikel tentang "{$keyword}" saat ini baru {$currentWords} kata. Target MINIMAL {$targetWords} kata.
Kamu HARUS menambah {$needed} kata lagi.

Tambahkan konten BARU berupa:
1. Section H2 baru: "Studi Kasus dan Bukti Ilmiah {$keyword}" (minimal 300 kata)
   - Tulis 2-3 studi kasus / penelitian nyata
   - Sertakan statistik dan data
2. Section H2 baru: "Tips Praktis Sebelum Menjalani {$keyword}" (minimal 300 kata)
   - Minimal 5 tips dalam <ol><li>
   - Setiap tip dijelaskan 40-60 kata
3. Tambahkan 1 internal link: <a href="/blog/topik-relevan">anchor text</a>
4. Tambahkan 1 external link ke sumber terpercaya

ATURAN:
- HANYA HTML tags (<h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <a>)
- Keyword "{$keyword}" muncul minimal 8 kali di konten tambahan
- LSI keywords: {$secondary}
- Bahasa Indonesia berkualitas tinggi
- JANGAN ulangi konten yang sudah ada

OUTPUT: Tulis HANYA konten HTML tambahan. Tanpa komentar.
PROMPT;

        $response = $this->callOpenAI($prompt, 'Kamu SEO content writer Indonesia. Tulis konten tambahan dalam HTML. MINIMAL ' . $needed . ' kata.', 8000, 0.75);
        if (isset($response['error']))
            return $response;

        $content = trim($response['content']);
        $content = preg_replace('/^```html?\s*/i', '', $content);
        $content = preg_replace('/\s*```\s*$/', '', $content);

        return ['content' => $content];
    }

    /**
     * Ensure minimum internal and external links via post-processing.
     */
    private function ensureLinks(array $result, string $keyword, array $rules): array
    {
        if (empty($result['body']))
            return $result;

        $body = $result['body'];
        $intLinkMin = $rules['internal_link_min']['value'] ?? 3;
        $extLinkMin = $rules['external_link_min']['value'] ?? 1;

        // Count existing internal links
        preg_match_all('/<a\s+href="\/blog\/[^"]*"/', $body, $intMatches);
        $intCount = count($intMatches[0]);

        // Count existing external links
        preg_match_all('/<a\s+href="https?:\/\/[^"]*"/', $body, $extMatches);
        $extCount = count($extMatches[0]);

        $slug = Str::slug($keyword);

        // Add internal links if needed
        if ($intCount < $intLinkMin) {
            $internalLinks = [
                ['anchor' => 'manfaat hipnoterapi', 'url' => '/blog/manfaat-hipnoterapi'],
                ['anchor' => 'terapi kesehatan mental', 'url' => '/blog/terapi-kesehatan-mental'],
                ['anchor' => 'mengatasi kecemasan', 'url' => '/blog/mengatasi-kecemasan'],
                ['anchor' => 'teknik relaksasi', 'url' => '/blog/teknik-relaksasi'],
                ['anchor' => 'layanan terapi kami', 'url' => '/blog/layanan-terapi'],
            ];
            $toAdd = $intLinkMin - $intCount;
            $linkIdx = 0;

            // Insert links into paragraphs
            preg_match_all('/<\/p>/', $body, $pMatches, PREG_OFFSET_CAPTURE);
            $offsets = array_column($pMatches[0], 1);
            $step = max(1, intval(count($offsets) / ($toAdd + 1)));

            for ($i = 0; $i < $toAdd && $linkIdx < count($internalLinks); $i++) {
                $link = $internalLinks[$linkIdx++];
                $insertPos = $offsets[min($step * ($i + 1), count($offsets) - 1)] ?? null;
                if ($insertPos) {
                    $linkHtml = ' Baca juga: <a href="' . $link['url'] . '">' . $link['anchor'] . '</a>.';
                    $body = substr_replace($body, $linkHtml, $insertPos, 0);
                    // Recalculate offsets
                    preg_match_all('/<\/p>/', $body, $pMatches, PREG_OFFSET_CAPTURE);
                    $offsets = array_column($pMatches[0], 1);
                }
            }
        }

        // Add external links if needed
        if ($extCount < $extLinkMin) {
            $externalLinks = [
                ['anchor' => 'American Psychological Association', 'url' => 'https://www.apa.org/topics/hypnosis'],
                ['anchor' => 'World Health Organization', 'url' => 'https://www.who.int/health-topics/mental-health'],
            ];
            $toAdd = $extLinkMin - $extCount;

            // Find a good paragraph to insert
            preg_match_all('/<\/p>/', $body, $pMatches, PREG_OFFSET_CAPTURE);
            $offsets = array_column($pMatches[0], 1);
            $midPoint = intval(count($offsets) / 2);

            for ($i = 0; $i < $toAdd && $i < count($externalLinks); $i++) {
                $link = $externalLinks[$i];
                $pos = $offsets[$midPoint + $i] ?? end($offsets);
                if ($pos) {
                    $linkHtml = ' Menurut <a href="' . $link['url'] . '" target="_blank" rel="noopener">' . $link['anchor'] . '</a>, pendekatan ini telah terbukti efektif.';
                    $body = substr_replace($body, $linkHtml, $pos, 0);
                    preg_match_all('/<\/p>/', $body, $pMatches, PREG_OFFSET_CAPTURE);
                    $offsets = array_column($pMatches[0], 1);
                }
            }
        }

        $result['body'] = $body;
        return $result;
    }

    /**
     * Ensure at least 2 list sections exist.
     */
    private function ensureLists(array $result): array
    {
        if (empty($result['body']))
            return $result;

        $listCount = preg_match_all('/<[uo]l>/', $result['body']);

        if ($listCount < 2) {
            // Find the last </p> before closing and inject a list
            $body = $result['body'];
            $listHtml = '<ul><li><strong>Pendekatan terbukti:</strong> Metode yang didukung riset ilmiah dan praktik klinis.</li>'
                . '<li><strong>Proses aman:</strong> Dilakukan oleh profesional terlatih dan bersertifikat.</li>'
                . '<li><strong>Hasil terukur:</strong> Perubahan positif yang dapat dirasakan dalam beberapa sesi.</li>'
                . '<li><strong>Pendampingan pribadi:</strong> Setiap sesi disesuaikan dengan kebutuhan klien.</li></ul>';

            // Insert before the last H2 (Kesimpulan)
            $lastH2Pos = strrpos($body, '<h2>');
            if ($lastH2Pos !== false) {
                $body = substr_replace($body, $listHtml, $lastH2Pos, 0);
            } else {
                $body .= $listHtml;
            }
            $result['body'] = $body;
        }

        return $result;
    }

    /**
     * Boost keyword density if too low.
     */
    private function boostKeywordDensity(array $result, string $keyword, array $rules): array
    {
        if (empty($result['body']))
            return $result;

        $body = $result['body'];
        $text = strip_tags($body);
        $kwLower = mb_strtolower($keyword);
        $textLower = mb_strtolower($text);

        $kwCount = mb_substr_count($textLower, $kwLower);
        $minOcc = $rules['keyword_min_occurrences']['value'] ?? 20;

        if ($kwCount < $minOcc) {
            $needed = $minOcc - $kwCount;

            // Strategy: replace some generic words with keyword variations
            $replacements = [
                'metode ini' => "metode {$keyword} ini",
                'terapi ini' => "{$keyword}",
                'pendekatan ini' => "pendekatan {$keyword} ini",
                'proses ini' => "proses {$keyword} ini",
                'teknik ini' => "teknik {$keyword}",
            ];

            $replaced = 0;
            foreach ($replacements as $search => $replace) {
                if ($replaced >= $needed)
                    break;
                $pos = mb_stripos($body, $search);
                if ($pos !== false) {
                    // Only replace first occurrence of each
                    $body = mb_substr($body, 0, $pos) . $replace . mb_substr($body, $pos + mb_strlen($search));
                    $replaced++;
                }
            }

            // If still not enough, add keyword mentions in strong tags after some paragraphs
            if ($replaced < $needed) {
                $remaining = $needed - $replaced;
                $sentences = [
                    "<p><strong>{$keyword}</strong> merupakan salah satu pendekatan yang semakin populer dan diminati oleh masyarakat Indonesia.</p>",
                    "<p>Dengan memahami lebih dalam tentang <strong>{$keyword}</strong>, Anda dapat membuat keputusan yang tepat untuk kesehatan mental Anda.</p>",
                    "<p>Banyak studi menunjukkan bahwa <strong>{$keyword}</strong> memberikan dampak positif yang signifikan bagi kesejahteraan emosional.</p>",
                ];

                preg_match_all('/<\/h2>/', $body, $h2Matches, PREG_OFFSET_CAPTURE);
                $h2Offsets = array_column($h2Matches[0] ?? [], 1);

                for ($i = 0; $i < min($remaining, count($sentences)); $i++) {
                    if (isset($h2Offsets[$i + 1])) {
                        $insertAfter = $h2Offsets[$i + 1] + 5; // after </h2>
                        $body = substr_replace($body, $sentences[$i], $insertAfter, 0);
                        // Recalculate
                        preg_match_all('/<\/h2>/', $body, $h2Matches, PREG_OFFSET_CAPTURE);
                        $h2Offsets = array_column($h2Matches[0] ?? [], 1);
                    }
                }
            }

            $result['body'] = $body;
        }

        return $result;
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

HITUNG KARAKTER SATU PER SATU SEBELUM OUTPUT.

Output JSON: {{"seo_title":"...","meta_description":"...","slug":"..."}}
PROMPT;

        $response = $this->callOpenAI($prompt, 'Ahli SEO Indonesia. HITUNG KARAKTER DENGAN TELITI. Output hanya JSON valid.', 500, 0.5);
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
Berdasarkan topik "{$keyword}", buatkan 8 ide artikel blog yang:
- Relevan dengan hipnoterapi, kesehatan mental, wellness
- Potensi traffic organik tinggi
- Bervariasi intent: informational, transactional, commercial

PENTING untuk field "keyword":
- SETIAP ide HARUS punya keyword SEO yang BERBEDA dan UNIK (2-4 kata)
- JANGAN gunakan "{$keyword}" sebagai keyword untuk semua ide
- Contoh keyword yang BENAR: "hipnoterapi move on", "terapi trauma emosional", "cara sembuh dari kehilangan"
- Contoh keyword yang SALAH: mengulang "{$keyword}" untuk semua ide

Format JSON array (untuk ide valid):
[{{"title":"judul artikel 55-65 karakter","keyword":"keyword SEO unik 2-4 kata BERBEDA tiap ide","volume":"tinggi/sedang/rendah","intent":"Informational/Transactional/Commercial","description":"1-2 kalimat deskripsi artikel"}}]

PENTING - ANTI HALLUCINATION:
Jika topik "{$keyword}" TIDAK MASUK AKAL secara medis/psikologis (seperti: hipnoterapi untuk hewan/kucing peliharaan, benda mati, atau menyembuhkan penyakit fisik berat seperti patah tulang/kanker yang butuh dokter), KAMU WAJIB MENOLAKNYA.
Jika topik DITOLAK, balas dengan format JSON object ini SAJA (bukan array):
{{"error": "Topik tidak valid atau tidak didukung secara ilmiah untuk hipnoterapi."}}

Hanya output JSON valid. Tanpa penjelasan tambahan.
PROMPT;

        $response = $this->callOpenAI($prompt, 'Content strategist ahli SEO Indonesia. Jaga integritas medis dan saintifik. Output HANYA JSON.', 2000, 0.8);
        if (isset($response['error']))
            return $response;

        $json = $this->parseJson($response['content']);
        if (!$json)
            return ['error' => 'Format respons tidak valid.'];

        if (isset($json['error']))
            return ['error' => $json['error']];

        if (is_array($json))
            return ['ideas' => $json];

        return ['error' => 'Format respons tidak valid.'];
    }

    /**
     * Generate featured image using free image sources.
     * Uses Unsplash for high-quality photos, with picsum as fallback.
     */
    public function generateFeaturedImage(string $keyword, string $style = 'profesional'): array
    {
        // Map keyword to search terms for better image results
        $searchTerms = $this->getImageSearchTerms($keyword);

        try {
            // Strategy 1: Try Unsplash Source (free, no API key needed)
            $unsplashUrl = "https://source.unsplash.com/1600x900/?" . urlencode($searchTerms);

            $response = Http::timeout(15)->withOptions([
                'allow_redirects' => ['max' => 3, 'track_redirects' => true],
            ])->get($unsplashUrl);

            if ($response->successful() && strlen($response->body()) > 1000) {
                $filename = 'blog/featured-' . Str::slug($keyword) . '-' . uniqid() . '.jpg';
                Storage::disk('public')->put($filename, $response->body());

                return [
                    'success' => true,
                    'path' => $filename,
                    'url' => '/storage/' . $filename,
                    'source' => 'unsplash',
                ];
            }

            // Strategy 2: Picsum (always works, random high-quality photo)
            $seed = Str::slug($keyword) . '-' . time();
            $picsumUrl = "https://picsum.photos/seed/{$seed}/1600/900";

            $response = Http::timeout(15)->withOptions([
                'allow_redirects' => ['max' => 3],
            ])->get($picsumUrl);

            if ($response->successful() && strlen($response->body()) > 1000) {
                $filename = 'blog/featured-' . Str::slug($keyword) . '-' . uniqid() . '.jpg';
                Storage::disk('public')->put($filename, $response->body());

                return [
                    'success' => true,
                    'path' => $filename,
                    'url' => '/storage/' . $filename,
                    'source' => 'picsum',
                ];
            }

            // Strategy 3: Direct picsum URL (don't download, just use URL)
            $directUrl = "https://picsum.photos/seed/{$seed}/1600/900";
            return [
                'success' => true,
                'path' => '',
                'url' => $directUrl,
                'source' => 'picsum-direct',
            ];

        } catch (\Exception $e) {
            Log::warning('Image generation fallback', ['error' => $e->getMessage()]);

            // Ultimate fallback: always return a working URL
            $fallbackSeed = Str::slug($keyword) . '-fallback';
            return [
                'success' => true,
                'path' => '',
                'url' => "https://picsum.photos/seed/{$fallbackSeed}/1600/900",
                'source' => 'fallback',
            ];
        }
    }

    /**
     * Convert keyword to better search terms for image services.
     */
    private function getImageSearchTerms(string $keyword): string
    {
        $termMap = [
            'hipnoterapi' => 'meditation therapy calm peaceful',
            'terapi' => 'therapy mental health wellness',
            'kecemasan' => 'calm peaceful meditation mindfulness',
            'trauma' => 'healing therapy support recovery',
            'stress' => 'relaxation calm nature peaceful',
            'mental' => 'mental health wellness brain psychology',
            'relaksasi' => 'relaxation spa calm nature',
            'psikologi' => 'psychology therapy counseling',
            'depresi' => 'hope light peaceful recovery',
            'fobia' => 'courage confidence therapy',
        ];

        $keyword_lower = mb_strtolower($keyword);
        foreach ($termMap as $key => $terms) {
            if (str_contains($keyword_lower, $key)) {
                return $terms;
            }
        }

        return 'therapy wellness mental health calm';
    }

    /**
     * Call OpenAI API.
     */
    private function callOpenAI(string $prompt, string $system, int $maxTokens = 4000, float $temp = 0.7): array
    {
        // Sanitize inputs - remove problematic characters
        $prompt = $this->sanitizeForJson($prompt);
        $system = $this->sanitizeForJson($system);

        $payload = [
            'model' => $this->model,
            'messages' => [
                ['role' => 'system', 'content' => $system],
                ['role' => 'user', 'content' => $prompt],
            ],
            'temperature' => $temp,
            'max_tokens' => $maxTokens,
        ];

        // Explicitly encode JSON to catch encoding errors
        $jsonBody = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        if ($jsonBody === false) {
            Log::error('JSON Encode Error', ['error' => json_last_error_msg()]);
            return ['error' => 'Gagal memproses request: ' . json_last_error_msg()];
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
        ])->timeout(300)->withBody($jsonBody, 'application/json')
            ->post('https://api.openai.com/v1/chat/completions');

        if ($response->successful()) {
            $content = $response->json('choices.0.message.content', '');
            $finishReason = $response->json('choices.0.finish_reason', 'stop');
            $usage = $response->json('usage', []);

            Log::info('OpenAI Response', [
                'model' => $this->model,
                'finish_reason' => $finishReason,
                'prompt_tokens' => $usage['prompt_tokens'] ?? 0,
                'completion_tokens' => $usage['completion_tokens'] ?? 0,
            ]);

            return ['content' => $content];
        }

        $errorMsg = $response->json('error.message', 'Unknown error');
        Log::error('OpenAI API Error', ['status' => $response->status(), 'error' => $errorMsg]);
        return ['error' => 'Gagal menghubungi AI: ' . $errorMsg];
    }

    /**
     * Sanitize a string for safe JSON encoding.
     */
    private function sanitizeForJson(string $text): string
    {
        // Remove null bytes
        $text = str_replace("\0", '', $text);
        // Remove other control characters (except newline, tab, carriage return)
        $text = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $text);
        // Replace special Unicode box-drawing characters with simple alternatives
        $text = str_replace(['═', '║', '╔', '╗', '╚', '╝', '╠', '╣', '╦', '╩', '╬'], ['=', '|', '+', '+', '+', '+', '+', '+', '+', '+', '+'], $text);
        // Ensure valid UTF-8
        $text = mb_convert_encoding($text, 'UTF-8', 'UTF-8');
        return $text;
    }

    private function getSystemPrompt(): string
    {
        $forbiddenList = implode(', ', $this->getForbiddenWords());
        return <<<SYSTEM
Kamu adalah ahli SEO content writer Indonesia #1. Standar: Rank Math Pro, AEO, on-page SEO modern.

ATURAN MUTLAK YANG TIDAK BISA DILANGGAR:
1. Artikel WAJIB MINIMAL 2000 kata. Jika kurang, Anda GAGAL.
2. Keyword utama muncul 20-30 kali secara natural.
3. Bahasa Indonesia berkualitas tinggi, profesional, empatik, evidence-based.
4. HANYA gunakan tag HTML. JANGAN gunakan Markdown (# ** dll).
5. JANGAN masukkan tag <img>. Gunakan [GAMBAR: deskripsi] saja.
6. Setiap paragraf 2-4 kalimat. Setiap kalimat 12-20 kata.
7. JANGAN gunakan kata terlarang: {$forbiddenList}
8. Sertakan minimal 2 bullet/numbered list di artikel.
9. Tulis SEMUA section dari outline. JANGAN skip apapun.
10. Tulis MENDALAM dan DETAIL, bukan ringkas.
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
