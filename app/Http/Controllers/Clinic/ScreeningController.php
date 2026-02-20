<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScreeningController extends Controller
{
    private $questions = [
        [
            'id' => 'q1',
            'text' => 'Berapa lama Anda telah mengalami keluhan atau masalah ini?',
            'options' => [
                'Kurang dari 1 bulan' => 1,
                '1 - 6 bulan' => 2,
                'Lebih dari 6 bulan (Kronis)' => 5, // Kronis -> VIP
            ],
        ],
        [
            'id' => 'q2',
            'text' => 'Seberapa besar masalah ini mengganggu aktivitas sehari-hari Anda?',
            'options' => [
                'Sedikit mengganggu' => 1,
                'Cukup mengganggu' => 2,
                'Sangat mengganggu (Tidak bisa beraktivitas normal)' => 4,
            ],
        ],
        [
            'id' => 'q3',
            'text' => 'Apakah Anda pernah menjalani terapi psikologis atau pengobatan psikiatri sebelumnya untuk masalah yang sama?',
            'options' => [
                'Belum pernah' => 1,
                'Pernah, tapi tidak tuntas' => 3,
                'Pernah dan tuntas, tapi kambuh lagi' => 4, // Kambuh -> VIP
            ],
        ],
        [
            'id' => 'q4',
            'text' => 'Centang gejala yang paling sering Anda alami (bisa lebih dari satu):',
            'options' => [
                'Sulit tidur / Insomnia' => 1,
                'Cemas berlebihan / Overthinking' => 1,
                'Trauma masa lalu yang terus teringat' => 3,
                'Fobia spesifik memengaruhi karir/' => 2,
                'Depresi berat / Kehilangan minat hidup' => 5, // Severe -> VIP
                'Serangan panik (Panic attack)' => 4,
            ],
        ]
    ];

    public function show(Request $request)
    {
        $user = $request->user();

        // If already screened, redirect to booking
        if ($user->hasCompletedScreening()) {
            return redirect()->route('bookings.create');
        }

        return Inertia::render('Clinic/Screening', [
            'questions' => $this->questions,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        // Prevent resubmission
        if ($user->hasCompletedScreening()) {
            return redirect()->route('bookings.create')->with('info', 'Anda sudah menyelesaikan skrining.');
        }

        $validated = $request->validate([
            'answers' => 'required|array',
        ]);

        $answers = $validated['answers'];
        $totalScore = 0;

        // Calculate score
        foreach ($this->questions as $q) {
            $answer = $answers[$q['id']] ?? null;

            if ($answer) {
                if (is_array($answer)) {
                    // Checkbox
                    foreach ($answer as $selected) {
                        $totalScore += $q['options'][$selected] ?? 0;
                    }
                } else {
                    // Radio
                    $totalScore += $q['options'][$answer] ?? 0;
                }
            }
        }

        // Logic: Score >= 10 OR specifically selected kronis/severe symptoms -> VIP
        $isVip = false;

        // Auto VIP conditions from specific answers
        $q1Ans = $answers['q1'] ?? '';
        $q3Ans = $answers['q3'] ?? '';
        $q4Ans = $answers['q4'] ?? [];

        if ($q1Ans === 'Lebih dari 6 bulan (Kronis)')
            $isVip = true;
        if ($q3Ans === 'Pernah dan tuntas, tapi kambuh lagi')
            $isVip = true;
        if (is_array($q4Ans) && in_array('Depresi berat / Kehilangan minat hidup', $q4Ans))
            $isVip = true;
        if (is_array($q4Ans) && in_array('Serangan panik (Panic attack)', $q4Ans))
            $isVip = true;

        if ($totalScore >= 10) {
            $isVip = true;
        }

        $recommendedPackage = $isVip ? 'vip' : 'reguler';

        $user->update([
            'screening_answers' => $answers,
            'screening_completed_at' => now(),
            'recommended_package' => $recommendedPackage,
        ]);

        return redirect()->route('bookings.create')->with('success', 'Skrining berhasil. Kami telah merekomendasikan paket terbaik untuk Anda.');
    }
}
