<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Schedule;
use App\Models\Booking;
use App\Models\ScreeningResult;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class DummyPatientSeeder extends Seeder
{
    public function run(): void
    {
        // Find therapist to link bookings to
        $therapist = User::role('therapist')->first();

        if (!$therapist) {
            $this->command->warn('No therapist found! Creating one...');
            $therapist = User::create([
                'name' => 'Dr. Rina Puspita, M.Psi',
                'email' => 'drrina@newindepth.test',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'phone' => '081234567890',
                'specialization' => 'Cognitive Behavioral Therapy, Trauma & PTSD',
                'bio' => 'Psikolog klinis berpengalaman 8 tahun, fokus pada terapi berbasis bukti untuk kecemasan, depresi, dan trauma.',
                'age' => 35,
                'gender' => 'Perempuan',
                'status' => 'active',
                'referral_code' => Str::upper(Str::random(8)),
            ]);
            $therapist->assignRole('therapist');
        }

        $this->command->info("📋 Menggunakan terapis: {$therapist->name} (ID: {$therapist->id})");
        $this->command->newLine();

        // ─── Patient 1: Sudah punya riwayat lengkap ───
        $patient1 = $this->createPatient([
            'name' => 'Aulia Rahma Sari',
            'email' => 'aulia.rahma@patient.test',
            'phone' => '082111222333',
            'age' => 28,
            'gender' => 'Perempuan',
            'recommended_package' => 'vip',
            'emergency_contact_name' => 'Budi Santoso',
            'emergency_contact_phone' => '081900001111',
            'emergency_contact_relation' => 'Suami',
        ]);
        $this->command->info("  ✓ Pasien 1 dibuat: {$patient1->name}");

        $this->addScreeningResult($patient1, [
            'recommended_package' => 'vip',
            'severity_label' => 'Sedang',
            'is_high_risk' => false,
            'ai_summary' => "Berdasarkan hasil skrining, saudari Aulia menunjukkan tanda-tanda kecemasan tingkat sedang yang dipicu oleh tekanan pekerjaan dan peran ganda sebagai ibu rumah tangga. Pola pikir ruminasi dan kesulitan tidur menjadi keluhan utama.\n\nRekomendasi: Pendekatan CBT untuk restrukturisasi kognitif dan teknik relaksasi mindfulness sangat tepat untuk kondisi ini. Paket VIP dengan sesi reguler 2 minggu sekali direkomendasikan.",
            'admin_notes' => 'Pasien tampak kooperatif saat wawancara. Perlu perhatian ekstra soal work-life balance.',
        ]);

        // Sesi 1 - 45 hari lalu (selesai, Normal)
        $schedule1 = $this->createSchedule($therapist, Carbon::now()->subDays(45)->setTime(10, 0));
        $this->createBooking($patient1, $therapist, $schedule1, 'completed', [
            'package_type' => 'vip',
            'recording_link' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'therapist_notes' => "Sesi perdana. Pasien terbuka dan mau berbagi. Identifikasi kognitif disfungsional terkait perfeksionisme dan ketakutan gagal. Diberikan latihan journaling harian.\n\nRencana tindak lanjut: Ketakutan spesifik terkait karier perlu dieksplor lebih dalam di sesi berikutnya.",
            'patient_visible_notes' => 'Selamat telah menyelesaikan sesi pertama! Tetap lakukan jurnal harian 10 menit setiap pagi. Fokus pada 3 hal yang Anda syukuri.',
            'completion_outcome' => 'Normal',
            'started_at' => Carbon::now()->subDays(45)->setTime(10, 5),
        ]);

        // Sesi 2 - 21 hari lalu (selesai, Normal)
        $schedule2 = $this->createSchedule($therapist, Carbon::now()->subDays(21)->setTime(14, 0));
        $this->createBooking($patient1, $therapist, $schedule2, 'completed', [
            'package_type' => 'vip',
            'recording_link' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'therapist_notes' => "Sesi ke-2. Pasien melaporkan jurnal berjalan baik, kualitas tidur meningkat. Mulai intervensi CBT penuh untuk distorsi kognitif. Latihan behavioral activation diberikan.",
            'patient_visible_notes' => 'Progres yang bagus! Terus lanjutkan latihan pernapasan 4-7-8 setiap malam sebelum tidur.',
            'completion_outcome' => 'Normal',
            'started_at' => Carbon::now()->subDays(21)->setTime(14, 3),
        ]);

        // Sesi 3 - akan datang (7 hari lagi)
        $schedule3 = $this->createSchedule($therapist, Carbon::now()->addDays(7)->setTime(10, 0));
        $this->createBooking($patient1, $therapist, $schedule3, 'confirmed', [
            'package_type' => 'vip',
        ]);

        // ─── Patient 2: High-risk, 1 sesi selesai Abnormal ───
        $patient2 = $this->createPatient([
            'name' => 'Dian Prasetyo',
            'email' => 'dian.prasetyo@patient.test',
            'phone' => '085312345678',
            'age' => 22,
            'gender' => 'Laki-laki',
            'recommended_package' => 'hipnoterapi',
            'emergency_contact_name' => 'Sri Wahyuni',
            'emergency_contact_phone' => '081234509876',
            'emergency_contact_relation' => 'Ibu',
        ]);
        $this->command->info("  ✓ Pasien 2 dibuat: {$patient2->name}");

        $this->addScreeningResult($patient2, [
            'recommended_package' => 'hipnoterapi',
            'severity_label' => 'Berat Kronis',
            'is_high_risk' => true,
            'ai_summary' => "Saudara Dian menunjukkan skor PHQ-9 yang mengindikasikan depresi berat. Adanya pikiran pasif tentang kematian perlu mendapat perhatian serius dan segera.\n\nRekomendasi: Direkomendasikan sesi hipnoterapi intensif dengan frekuensi mingguan. Koordinasi dengan psikiater untuk evaluasi farmakoterapi perlu dipertimbangkan jika tidak ada perbaikan signifikan dalam 4 minggu pertama.",
            'admin_notes' => 'HIGH RISK ⚠️ - Sudah divalidasi oleh supervisor. Segera hubungi pasien untuk sesi pertama. Perlu monitoring sangat ketat antarsesi.',
        ]);

        // Sesi 1 - 10 hari lalu (selesai, Abnormal/Emergency)
        $schedule4 = $this->createSchedule($therapist, Carbon::now()->subDays(10)->setTime(9, 0));
        $this->createBooking($patient2, $therapist, $schedule4, 'completed', [
            'package_type' => 'vip',
            'recording_link' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'therapist_notes' => "PERHATIAN: Sesi pertama dengan pasien high-risk. Selama sesi pasien sempat mengalami emotional breakdown saat membahas relasi keluarga. Dilakukan stabilisasi emosi dengan grounding 5-4-3-2-1.\n\nKesimpulan: Kondisi stabil di akhir sesi. Safety plan sudah dibuat dan dikirim via email. Nomor darurat sudah diberikan. Perlu sesi follow-up lebih cepat dari jadwal.",
            'patient_visible_notes' => 'Anda sudah sangat berani hari ini. Ingat bahwa mencari bantuan adalah tanda kekuatan. Hubungi nomor darurat yang sudah kita buat jika merasa tidak aman.',
            'completion_outcome' => 'Abnormal/Emergency',
            'started_at' => Carbon::now()->subDays(10)->setTime(9, 10),
        ]);

        // Sesi 2 - akan datang (3 hari lagi)
        $schedule5 = $this->createSchedule($therapist, Carbon::now()->addDays(3)->setTime(9, 0));
        $this->createBooking($patient2, $therapist, $schedule5, 'confirmed', [
            'package_type' => 'vip',
        ]);

        // ─── Patient 3: Pasien baru, 1 sesi akan datang ───
        $patient3 = $this->createPatient([
            'name' => 'Mega Silitonga',
            'email' => 'mega.silitonga@patient.test',
            'phone' => '081398765432',
            'age' => 31,
            'gender' => 'Perempuan',
            'recommended_package' => 'premium',
            'emergency_contact_name' => 'Hendro Silitonga',
            'emergency_contact_phone' => '082109876543',
            'emergency_contact_relation' => 'Kakak',
        ]);
        $this->command->info("  ✓ Pasien 3 dibuat: {$patient3->name}");

        $this->addScreeningResult($patient3, [
            'recommended_package' => 'premium',
            'severity_label' => 'Ringan',
            'is_high_risk' => false,
            'ai_summary' => "Saudari Mega menunjukkan tanda kecemasan sosial ringan yang dipicu oleh perubahan lingkungan pekerjaan (pindah kota, bekerja dari rumah). Tidak ada indikator risiko signifikan.\n\nRekomendasi: Paket premium dengan sesi rutin bulanan cukup untuk membantu transisi dan pengembangan strategi coping yang sehat. Eksplorasi teknik mindfulness dan manajemen stres direkomendasikan.",
            'admin_notes' => null,
        ]);

        // Sesi 1 - akan datang (14 hari lagi)
        $schedule6 = $this->createSchedule($therapist, Carbon::now()->addDays(14)->setTime(13, 0));
        $this->createBooking($patient3, $therapist, $schedule6, 'confirmed', [
            'package_type' => 'reguler',
        ]);

        // ─── Summary ───
        $this->command->newLine();
        $this->command->info('✅ Seeder selesai! 3 pasien dummy berhasil dibuat.');
        $this->command->newLine();
        $this->command->table(
            ['Nama Pasien', 'Email', 'Password', 'Keterangan'],
            [
                [$patient1->name, $patient1->email, 'password', '2 sesi selesai (Normal) + 1 upcoming'],
                [$patient2->name, $patient2->email, 'password', '1 sesi selesai (HIGH RISK/Emergency) + 1 upcoming'],
                [$patient3->name, $patient3->email, 'password', 'Pasien baru — 1 sesi upcoming pertama'],
            ]
        );
    }

    private function createPatient(array $data): User
    {
        $patient = User::firstOrCreate(
            ['email' => $data['email']],
            array_merge($data, [
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'status' => 'active',
                'referral_code' => Str::upper(Str::random(8)),
                'agreement_signed' => true,
                'agreement_signed_at' => now()->subDays(rand(60, 90)),
                'agreement_data' => [
                    'understand_process' => true,
                    'honest_answers' => true,
                    'follow_protocol' => true,
                    'responsibility' => true,
                ],
                'screening_completed_at' => now()->subDays(rand(30, 60)),
                'ktp_photo' => null,
            ])
        );
        $patient->assignRole('patient');
        return $patient;
    }

    private function addScreeningResult(User $patient, array $data): ScreeningResult
    {
        return ScreeningResult::firstOrCreate(
            ['user_id' => $patient->id],
            array_merge($data, [
                'user_id' => $patient->id,
                'completed_at' => $patient->screening_completed_at,
            ])
        );
    }

    private function createSchedule(User $therapist, Carbon $dateTime): Schedule
    {
        // Avoid unique constraint collision by checking first
        $existing = Schedule::where('therapist_id', $therapist->id)
            ->where('date', $dateTime->toDateString())
            ->where('start_time', $dateTime->format('H:i:s'))
            ->first();

        if ($existing) {
            return $existing;
        }

        $schedule = Schedule::create([
            'therapist_id' => $therapist->id,
            'date' => $dateTime->toDateString(),
            'start_time' => $dateTime->format('H:i:s'),
            'end_time' => $dateTime->copy()->addHour()->format('H:i:s'),
            'quota' => 1,
            'booked_count' => 0,
        ]);

        return $schedule;
    }

    private function createBooking(User $patient, User $therapist, Schedule $schedule, string $status, array $extra = []): Booking
    {
        // Update booked_count on schedule
        $schedule->increment('booked_count');

        return Booking::create(array_merge([
            'booking_code' => 'BK-' . Str::upper(Str::random(8)),
            'patient_id' => $patient->id,
            'therapist_id' => $therapist->id,
            'schedule_id' => $schedule->id,
            'status' => $status,
            'package_type' => 'reguler',
        ], $extra));
    }
}
