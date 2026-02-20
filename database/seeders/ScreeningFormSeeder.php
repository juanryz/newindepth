<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ScreeningFormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $questions = [
            [
                'id' => 'q1',
                'text' => 'Apakah Anda memiliki riwayat epilepsi atau gangguan kejang?',
                'type' => 'radio',
                'options' => ['Ya', 'Tidak'],
                'branching' => [
                    'Ya' => 'disqualify',
                    'Tidak' => 'q2',
                ]
            ],
            [
                'id' => 'q2',
                'text' => 'Apa tujuan utama hipnoterapi Anda?',
                'type' => 'checkbox',
                'options' => ['Mengatasi Stres', 'Berhenti Merokok', 'Fobia', 'Lainnya'],
                'branching' => []
            ]
        ];

        \App\Models\ScreeningForm::create([
            'name' => 'Skrining Awal Hipnoterapi',
            'questions' => $questions,
            'is_active' => true,
        ]);
    }
}
