<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use App\Models\ScreeningResult;
use App\Services\OpenAIScreeningService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class ScreeningController extends Controller
{
    public function show(Request $request)
    {
        $user = auth()->user()->fresh();

        $screeningResult = \App\Models\ScreeningResult::where('user_id', $user->id)
            ->whereNotNull('completed_at')
            ->latest('completed_at')
            ->first();

        $activeBooking = \App\Models\Booking::where('patient_id', $user->id)
            ->whereIn('status', ['pending_payment', 'pending_validation', 'confirmed', 'in_progress'])
            ->exists();

        if ($activeBooking) {
            return redirect()->route('dashboard')->with('error', 'Selesaikan sesi aktif/pembayaran Anda terlebih dahulu sebelum melakukan skrining ulang.');
        }

        $showResults = false;
        if ($screeningResult && $screeningResult->completed_at) {
            if ($screeningResult->completed_at->diffInDays(now()) < 15) {
                $showResults = true;
            }
        }

        $prefill = [
            'nama' => (string) ($user->name ?? ''),
            'email' => (string) ($user->email ?? ''),
            'wa' => (string) ($user->phone ?? ''),
            'gender' => (string) ($user->gender ?? ''),
            'usia' => (string) ($user->age ?? ''),
        ];

        Log::info('Screening Prefill Data for User ' . $user->id, $prefill);

        return Inertia::render('Clinic/Screening', [
            'screeningResult' => $showResults ? $screeningResult : null,
            'prefill' => $prefill,
        ]);
    }

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

    public function store(Request $request)
    {
        $user = auth()->user()->fresh();

        $activeBooking = \App\Models\Booking::where('patient_id', $user->id)
            ->whereIn('status', ['pending_payment', 'pending_validation', 'confirmed', 'in_progress'])
            ->exists();

        if ($activeBooking) {
            return redirect()->route('dashboard')->with('error', 'Selesaikan sesi aktif/pembayaran Anda terlebih dahulu.');
        }

        $lastResult = \App\Models\ScreeningResult::where('user_id', $user->id)
            ->whereNotNull('completed_at')
            ->latest('completed_at')
            ->first();

        if ($lastResult && $lastResult->completed_at && $lastResult->completed_at->diffInDays(now()) < 15) {
            return redirect()->route('dashboard')->with('info', 'Anda sudah menyelesaikan skrining.');
        }

        $request->validate([
            'step_data' => 'required|array',
            'chat_history' => 'nullable|array',
        ]);

        $stepData = $request->input('step_data');
        $chatHistory = $request->input('chat_history', []);

        [$recommendedPackage, $severityLabel, $isHighRisk] = $this->runDecisionEngine($stepData, $chatHistory);

        $service = new OpenAIScreeningService();
        $aiSummary = $service->generateSummary($stepData, $chatHistory);

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

        $user->update([
            'name' => $stepData['nama'] ?? $user->name,
            'phone' => $stepData['wa'] ?? $user->phone,
            'age' => $stepData['usia'] ?? $user->age,
            'gender' => $stepData['gender'] ?? $user->gender,
            'screening_answers' => $stepData,
            'screening_completed_at' => now(),
            'recommended_package' => in_array($recommendedPackage, ['hipnoterapi', 'upgrade', 'vip']) ? $recommendedPackage : 'hipnoterapi',
        ]);

        return redirect()->route('dashboard')
            ->with('success', 'Skrining berhasil.');
    }

    private function runDecisionEngine(array $stepData, array $chatHistory): array
    {
        $masalahUtama = $stepData['masalah_utama'] ?? '';
        $skala = (int) ($stepData['skala'] ?? 0);
        $durasi = $stepData['durasi'] ?? '';
        $obesitasKg = $stepData['obesitas_kg'] ?? null;
        $chatText = $this->extractChatText($chatHistory);

        $isHighRisk = false;
        $isVip = false;

        $service = new OpenAIScreeningService();
        $allText = ($stepData['detail_masalah'] ?? '') . ' ' . ($stepData['outcome'] ?? '') . ' ' . $chatText;
        if ($service->detectCrisis($allText)) {
            $isHighRisk = true;
            $isVip = true;
        }

        if ($masalahUtama === 'Halusinasi / gangguan persepsi') {
            $isHighRisk = true;
            $isVip = true;
        }

        if ($skala >= 9 && in_array($durasi, ['1–3 tahun', '> 3 tahun', '> 3 tahun ke atas'])) {
            $isVip = true;
        }

        if ($obesitasKg === '> 20 kg') {
            $isVip = true;
        }

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

        if ($isVip || in_array($severityLabel, ['High Risk', 'Berat Kronis', 'Berat Akut'])) {
            $package = 'vip';
        } elseif (
            $masalahUtama === 'Pengembangan diri'
            && $skala <= 6
        ) {
            $package = 'upgrade';
        } else {
            $package = 'hipnoterapi';
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