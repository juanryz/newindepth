<?php

namespace App\Services;

use App\Models\InternalAiAgent;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class InternalAiChatService
{
    private ?string $apiKey;
    private string $model;

    public function __construct()
    {
        $this->apiKey = config('services.openai.key', env('OPENAI_API_KEY'));
        $this->model = config('services.openai.model', 'gpt-4o-mini');
    }

    public function chat(InternalAiAgent $agent, array $history): string
    {
        $systemPrompt = $this->buildSystemPrompt($agent);

        try {
            if (!$this->apiKey || $this->apiKey === 'sk-test-fakekey-only-for-demo') {
                return 'Halo! Saya adalah ' . $agent->name . '. Ada yang bisa saya bantu?';
            }

            $messages = [['role' => 'system', 'content' => $systemPrompt]];
            foreach ($history as $msg) {
                $messages[] = ['role' => $msg['role'], 'content' => $msg['content']];
            }

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type'  => 'application/json',
            ])->timeout(30)->post('https://api.openai.com/v1/chat/completions', [
                'model'       => $this->model,
                'messages'    => $messages,
                'max_tokens'  => 600,
                'temperature' => 0.7,
            ]);

            if ($response->successful()) {
                return $response->json('choices.0.message.content', 'Maaf, tidak ada respons dari AI.');
            }

            Log::error('InternalAI API error', ['status' => $response->status(), 'body' => $response->body()]);
            return 'Maaf, terjadi kesalahan. Silakan coba lagi.';
        } catch (\Throwable $e) {
            Log::error('InternalAI chat exception', ['error' => $e->getMessage()]);
            return 'Maaf, layanan AI sedang tidak tersedia. Silakan coba beberapa saat lagi.';
        }
    }

    private function buildSystemPrompt(InternalAiAgent $agent): string
    {
        $base = $agent->system_prompt
            ?? "Kamu adalah {$agent->name}, asisten AI internal Indepth. Jawab pertanyaan karyawan dengan akurat, ramah, dan profesional dalam Bahasa Indonesia.";

        $trainingInstructions = $agent->buildPrompt();

        return $base . $trainingInstructions;
    }
}
