<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeneralAiChatService
{
    private ?string $apiKey;
    private string $model;
    private string $systemPrompt;

    public function __construct()
    {
        $this->apiKey = config('services.openai.key', env('OPENAI_API_KEY'));
        $this->model = config('services.openai.model', 'gpt-4o-mini');

        $this->systemPrompt = <<<PROMPT
Kamu adalah Asisten Virtual InDepth Mental Wellness Center. 
Tugasmu adalah menjawab pertanyaan calon pasien seputar layanan kami dengan ramah, informatif, dan profesional.

INFORMASI KLINIK:
- Nama: InDepth Mental Wellness Center.
- Lokasi: Semarang.
- Fokus: Klinik Hipnoterapi & Psikoterapi Premium yang bekerja pada sistem metodologi terstruktur untuk mengakses akar masalah, bukan sekadar meredakan gejala.

METODE KAMI:
1. InDepth Trance State: Hipnotik mendalam untuk mengakses lapisan bawah sadar & somatic mind. Fokus pada pelepasan trauma lama, identifikasi emosi tertahan, dan masalah psikosomatis.
2. Supreme Trance State: Pengembangan lanjutan dengan kedalaman maksimal namun klien tetap mempertahankan kesadaran tinggi & kendali penuh. Eksklusif hanya dilakukan oleh hipnoterapis senior.
3. InDepth Solution: Wawancara terstruktur dengan somatic mind dalam kondisi trance untuk menemukan syarat & waktu pemulihan tercepat versi tubuh klien sendiri.
4. Neuro Linguistic Programming (NLP): Restrukturisasi pola pikir untuk menghilangkan mental block & membangun kepercayaan diri.
5. Cognitive Behavioral Therapy (CBT): Mengubah pola pikir negatif & perilaku destruktif.

ATURAN MERESPONS:
- Gunakan Bahasa Indonesia yang hangat dan empatik.
- Jika user bertanya seputar metode atau informasi di atas, jelaskan dengan baik.
- Jika user bertanya di luar konteks website/layanan kesehatan mental kami (misal: berita politik, cuaca, tips memasak, gadget, dll), arahkan mereka untuk menghubungi WhatsApp kami di +62 822 2080 0034.
- KHUSUS JIKA PERTANYAAN DI LUAR KONTEKS: Kamu WAJIB menyertakan string "[REDIRECT_WHATSAPP]" di akhir jawabanmu agar sistem bisa menampilkan tombol WhatsApp.

BATASAN:
- JANGAN memberikan diagnosis medis atau resep obat.
- JANGAN menyarankan terapi fisik yang membahayakan.
- Respons maksimal 2-3 paragraf singkat.
PROMPT;
    }

    public function chat(array $history): array
    {
        try {
            if (!$this->apiKey) {
                return [
                    'reply' => 'Maaf, sistem chat sedang tidak tersedia. Silakan hubungi kami via WhatsApp di +62 822 2080 0034.',
                    'redirect_whatsapp' => true
                ];
            }

            $messages = [
                ['role' => 'system', 'content' => $this->systemPrompt],
                ...$history,
            ];

            $response = Http::withToken($this->apiKey)
                ->timeout(30)
                ->post('https://api.openai.com/v1/chat/completions', [
                    'model' => $this->model,
                    'messages' => $messages,
                    'max_tokens' => 500,
                    'temperature' => 0.7,
                ]);

            if ($response->failed()) {
                Log::error('OpenAI General AI Chat error', ['body' => $response->body()]);
                return [
                    'reply' => 'Terjadi kendala teknis. Silakan hubungi kami via WhatsApp di +62 822 2080 0034.',
                    'redirect_whatsapp' => true
                ];
            }

            $reply = $response->json('choices.0.message.content', '');
            $hasRedirect = str_contains($reply, '[REDIRECT_WHATSAPP]');

            // Clean the flag from the reply for the user
            $cleanReply = str_replace('[REDIRECT_WHATSAPP]', '', $reply);

            return [
                'reply' => trim($cleanReply),
                'redirect_whatsapp' => $hasRedirect
            ];
        } catch (\Throwable $e) {
            Log::error('OpenAI General AI Chat exception', ['error' => $e->getMessage()]);
            return [
                'reply' => 'Terjadi kesalahan sistem. Silakan hubungi kami via WhatsApp di +62 822 2080 0034.',
                'redirect_whatsapp' => true
            ];
        }
    }
}
