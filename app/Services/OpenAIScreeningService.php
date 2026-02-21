<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenAIScreeningService
{
    private string $apiKey;
    private string $model;
    private string $systemPrompt;

    // Keyword krisis yang memicu flag High Risk
    private array $crisisKeywords = [
        'bunuh diri',
        'mau mati',
        'ingin mati',
        'tidak mau hidup',
        'mengakhiri hidup',
        'bisikan',
        'bisik-bisik',
        'suara yang menyuruh',
        'putus asa',
        'tidak ada harapan',
        'hopeless',
        'self harm',
        'menyakiti diri',
        'melukai diri',
    ];

    public function __construct()
    {
        $this->apiKey = config('services.openai.key', env('OPENAI_API_KEY'));
        $this->model = config('services.openai.model', 'gpt-4o-mini');

        $this->systemPrompt = <<<PROMPT
Kamu adalah Asisten Klinis dari InDepth Mental Wellness Center.

Peranmu:
Peranmu:
- Mendampingi calon pasien dengan hangat, empatik, dan profesional
- Mendengarkan cerita calon pasien di tahap akhir skrining (Detail Masalah & Outcome)
- Memberikan respons empatik singkat (2–4 kalimat) yang membuat calon pasien merasa didengar
- TIDAK mendiagnosis, TIDAK memberikan saran terapi spesifik
- Jika mendeteksi risiko tinggi (bunuh diri, bisikan, putus asa), respons dengan tenang dan informasikan bahwa tim akan segera menghubungi

Gaya bahasa:
- Gunakan Bahasa Indonesia yang hangat dan formal
- Tidak terlalu kaku, tidak terlalu santai
- Selalu akhiri dengan kalimat validasi atau dorongan ringan

Penting: Respons maksimal 3–4 kalimat. Jangan bertanya terlalu banyak pertanyaan balik.
PROMPT;
    }

    /**
     * Kirim pesan ke OpenAI dan dapatkan respons.
     *
     * @param array $history Array of ['role' => 'user'|'assistant', 'content' => '...']
     * @param string|null $userMessage Pesan terbaru dari user (opsional jika sudah ada di history)
     * @return array ['reply' => string, 'is_high_risk' => bool]
     */
    public function chat(array $history, ?string $userMessage = null): array
    {
        try {
            $messages = [
                ['role' => 'system', 'content' => $this->systemPrompt],
                ...$history,
            ];

            if ($userMessage) {
                $messages[] = ['role' => 'user', 'content' => $userMessage];
            }

            $response = Http::withToken($this->apiKey)
                ->timeout(30)
                ->post('https://api.openai.com/v1/chat/completions', [
                    'model' => $this->model,
                    'messages' => $messages,
                    'max_tokens' => 200,
                    'temperature' => 0.7,
                ]);

            if ($response->failed()) {
                Log::error('OpenAI API error', ['body' => $response->body()]);
                return [
                    'reply' => 'Terima kasih sudah berbagi. Kami mendengar Anda dan akan membantu sebaik mungkin.',
                    'is_high_risk' => $this->detectCrisis($userMessage ?? ''),
                ];
            }

            $reply = $response->json('choices.0.message.content', '');

            return [
                'reply' => trim($reply),
                'is_high_risk' => $this->detectCrisis($userMessage ?? ''),
            ];
        } catch (\Throwable $e) {
            Log::error('OpenAI exception', ['error' => $e->getMessage()]);
            return [
                'reply' => 'Terima kasih sudah berbagi cerita Anda. Tim kami akan membantu sebaik mungkin.',
                'is_high_risk' => $this->detectCrisis($userMessage ?? ''),
            ];
        }
    }

    /**
     * Cek apakah teks mengandung keyword krisis.
     */
    public function detectCrisis(string $text): bool
    {
        $lower = mb_strtolower($text);
        foreach ($this->crisisKeywords as $keyword) {
            if (str_contains($lower, $keyword)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Generate ringkasan AI berdasarkan seluruh data screening.
     */
    public function generateSummary(array $stepData, array $chatHistory): string
    {
        try {
            $dataText = json_encode($stepData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

            $response = Http::withToken($this->apiKey)
                ->timeout(30)
                ->post('https://api.openai.com/v1/chat/completions', [
                    'model' => $this->model,
                    'messages' => [
                        [
                            'role' => 'system',
                            'content' => 'Kamu adalah asisten klinis. Buat ringkasan singkat dari data skrining calon pasien dalam Bahasa Indonesia yang profesional dan empatik. Fokus pada kondisi utama, tingkat keparahan, dan rekomendasi umum. JANGAN menyebut nama paket atau harga. Gunakan sebutan "Calon Pasien", bukan "Klien". Pastikan panjang teks MAKSIMAL 250 karakter.',
                        ],
                        [
                            'role' => 'user',
                            'content' => "Data skrining calon pasien:\n{$dataText}",
                        ],
                    ],
                    'max_tokens' => 300,
                    'temperature' => 0.5,
                ]);

            return $response->json('choices.0.message.content', 'Skrining berhasil diselesaikan.');
        } catch (\Throwable $e) {
            return 'Skrining berhasil diselesaikan. Tim kami akan menghubungi Anda segera.';
        }
    }
}
