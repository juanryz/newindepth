<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenAIScreeningService
{
    private ?string $apiKey;
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
Kamu adalah seorang konsultan kesehatan mental dari InDepth Mental Wellness Center. Namamu adalah Nadia.

Sifatmu:
- Hangat, sabar, dan seperti teman curhat yang bisa dipercaya — bukan robot
- Berbicara secara alami, menggunakan bahasa Indonesia sehari-hari yang santun namun tidak kaku
- Aktif mendengarkan: ulangi atau parafrasekan sedikit apa yang disampaikan pasien agar mereka merasa benar-benar didengar
- Sesekali boleh bertanya 1 pertanyaan tindak lanjut yang personal dan spesifik — jangan generik
- Jangan memberi diagnosis, jangan merekomendasikan obat, jangan terdengar seperti chatbot

Batasan:
- Jika ada tanda risiko tinggi (bunuh diri, menyakiti diri, bisikan), respons dengan sangat tenang dan empatik, lalu sampaikan bahwa tim InDepth akan segera menghubungi secara prioritas
- Respons maksimal 3-4 kalimat. Cukup singkat tapi bermakna

Ingat: Kamu bukan dokter dan bukan terapis — kamu adalah teman bicara awal yang membantu mereka merasa nyaman sebelum bertemu tim profesional InDepth.
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

            if (!$this->apiKey || $this->apiKey === 'sk-test-fakekey-only-for-demo') {
                $msg = strtolower($userMessage ?? '');
                $reply = 'Makasih ya udah mau cerita — butuh keberanian lho buat nulis hal seperti ini 😊 Tim InDepth siap menemani kamu lebih lanjut.';

                if (str_contains($msg, 'sedih') || str_contains($msg, 'bingung') || str_contains($msg, 'stres')) {
                    $reply = 'Duh, kedengarannya berat banget ya... Wajar banget kamu ngerasa kayak gitu. Boleh cerita lebih, biasanya situasi seperti apa yang paling sering bikin kamu ngerasa begini?';
                } elseif (str_contains($msg, 'trauma') || str_contains($msg, 'masa lalu')) {
                    $reply = 'Hal yang kamu alami di masa lalu itu nyata dan dampaknya pun nyata. Kamu nggak perlu menanggungnya sendiri — ini langkah yang tepat buat mulai proses pemulihannya.';
                } elseif (str_contains($msg, 'takut') || str_contains($msg, 'cemas')) {
                    $reply = 'Rasa takut dan cemas itu melelahkan banget, apalagi kalau sudah lama dirasakan. Kira-kira ada nggak situasi tertentu yang paling sering memicu perasaan itu?';
                } elseif (str_contains($msg, 'capek') || str_contains($msg, 'lelah') || str_contains($msg, 'burnout')) {
                    $reply = 'Kelelahan seperti ini — baik fisik maupun emosi — sering kali diabaikan padahal itu sinyal penting dari diri sendiri. Sudah berapa lama kamu merasakannya?';
                }

                return [
                    'reply' => $reply,
                    'is_high_risk' => $this->detectCrisis($userMessage ?? ''),
                ];
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

            if (!$this->apiKey) {
                return 'Skrining berhasil diselesaikan.';
            }

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
