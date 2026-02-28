<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $packages = [
            [
                'name' => 'Paket Hipnoterapi',
                'slug' => 'hipnoterapi',
                'description' => 'Terapi Hipnotis Klinis, Konsultasi Awal & Relaksasi Pikiran Bawah Sadar.',
                'base_price' => 2000000,
                'discount_percentage' => 50,
                'features' => json_encode(['Sesi 90 menit', 'Deep Hypnosis', 'Mind Programming']),
                'is_active' => true,
            ],
            [
                'name' => 'Paket Premium',
                'slug' => 'premium',
                'description' => 'Pemrograman Ulang Mindset, Peningkatan Percaya Diri & Teknik NLP Praktis.',
                'base_price' => 3000000,
                'discount_percentage' => 50,
                'features' => json_encode(['Ekstra Durasi', 'Materi Pendukung']),
                'is_active' => true,
            ],
            [
                'name' => 'Paket VIP (Intensive Care)',
                'slug' => 'vip',
                'description' => 'Prioritas Jadwal Utama, Terapi Kasus Kompleks & Pendampingan Eksklusif.',
                'base_price' => 8000000,
                'discount_percentage' => 50,
                'features' => json_encode(['Priority Booking', 'Exclusive Lounge', 'Personal Assistant']),
                'is_active' => true,
            ],
        ];

        foreach ($packages as $pkg) {
            Package::updateOrCreate(['slug' => $pkg['slug']], $pkg);
        }
    }
}
