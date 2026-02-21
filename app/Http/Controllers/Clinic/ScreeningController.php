<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use App\Models\ScreeningResult;
use App\Services\OpenAIScreeningService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScreeningController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();

        // Jika sudah pernah skrining, redirect ke booking
        if ($user->hasCompletedScreening()) {
            return redirect()->route('bookings.create');
        }

        return Inertia::render('Clinic/Screening');
    }

    /**
     * Endpoint AJAX untuk AI Chat (Step 9 & 10)
     */
    public function chatMessage(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:2000',
            'history' => 'array',
        ]);

        $service = new OpenAIScreeningService();

        $result = $service->chat(
            history: $request->input('history', []),
            userMessage: $request->input('message'),
        );

        return response()->json($result);
    }

    /**
     * Submit screening lengkap (10 step)
     */
    public function store(Request $request)
    {
        $user = $request->user();

        if ($user->hasCompletedScreening()) {
            return redirect()->route('bookings.create')->with('info', 'Anda sudah menyelesaikan skrining.');
        }

        $request->validate([
            'step_data' => 'required|array',
            'chat_history' => 'nullable|array',
        ]);

        $stepData = $request->input('step_data');
        $chatHistory = $request->input('chat_history', []);

        // ── Decision Engine ──────────────────────────────────────────
        [$recommendedPackage, $severityLabel, $isHighRisk] = $this->runDecisionEngine($stepData, $chatHistory);

        // ── Generate AI Summary ───────────────────────────────────────
        $service = new OpenAIScreeningService();
        $aiSummary = $service->generateSummary($stepData, $chatHistory);

        // ── Simpan ke screening_results ───────────────────────────────
        ScreeningResult::create([
            'user_id' => $user->id,
            'step_data' => $stepData,
            'chat_history' => $chatHistory,
            'severity_label' => $severityLabel,
            'recommended_package' => $recommendedPackage,
            'ai_summary' => $aiSummary,
            'is_high_risk' => $isHighRisk,
            'completed_at' => now(),
        ]);

        // ── Update user table (backward compat) ───────────────────────
        $user->update([
            'screening_answers' => $stepData,
            'screening_completed_at' => now(),
            'recommended_package' => in_array($recommendedPackage, ['reguler', 'vip']) ? $recommendedPackage : 'reguler',
        ]);

        return redirect()->route('bookings.create')
            ->with('success', 'Skrining berhasil. Kami telah merekomendasikan program terbaik untuk Anda.');
    }

    // ─────────────────────────────────────────────────────────────────────
    // DECISION ENGINE
    // ─────────────────────────────────────────────────────────────────────
    private function runDecisionEngine(array $stepData, array $chatHistory): array
    {
        $masalahUtama = $stepData['masalah_utama'] ?? [];     // Step 2 array
        $skala = (int) ($stepData['skala'] ?? 0);      // Step 3 int
        $durasi = $stepData['durasi'] ?? '';             // Step 4 string
        $obesitasKg = $stepData['obesitas_kg'] ?? null;     // Step 5 string|null
        $chatText = $this->extractChatText($chatHistory);

        $isHighRisk = false;
        $isVip = false;

        // ── Deteksi Keyword Krisis ────────────────────────────────────
        $service = new OpenAIScreeningService();
        $allText = ($stepData['detail_masalah'] ?? '') . ' ' . ($stepData['outcome'] ?? '') . ' ' . $chatText;
        if ($service->detectCrisis($allText)) {
            $isHighRisk = true;
            $isVip = true;
        }

        // ── VIP Rules ─────────────────────────────────────────────────
        if (in_array('Halusinasi / gangguan persepsi', $masalahUtama)) {
            $isHighRisk = true;
            $isVip = true;
        }

        if ($skala >= 9 && in_array($durasi, ['1–3 tahun', '> 3 tahun', '> 3 tahun ke atas'])) {
            $isVip = true;
        }

        if ($obesitasKg === '> 20 kg') {
            $isVip = true;
        }

        // ── Severity Label ────────────────────────────────────────────
        $durasiKronis = in_array($durasi, ['1–3 tahun', '> 3 tahun', '> 3 tahun ke atas', '6–12 bulan']);

        if ($isHighRisk) {
            $severityLabel = 'High Risk';
        } elseif ($skala >= 7 && $durasiKronis) {
            $severityLabel = 'Berat Kronis';
        } elseif ($skala >= 7) {
            $severityLabel = 'Berat Akut';
        } elseif ($skala >= 4) {
            $severityLabel = 'Sedang';
        } else {
            $severityLabel = 'Ringan';
        }

        // ── Package Decision ──────────────────────────────────────────
        if ($isVip) {
            $package = 'vip';
        } elseif (
            count($masalahUtama) === 1
            && in_array('Pengembangan diri', $masalahUtama)
            && $skala <= 6
        ) {
            $package = 'reguler_pengembangan';
        } else {
            $package = 'reguler';
        }

        return [$package, $severityLabel, $isHighRisk];
    }

    private function extractChatText(array $chatHistory): string
    {
        return collect($chatHistory)
            ->where('role', 'user')
            ->pluck('content')
            ->implode(' ');
    }
}
