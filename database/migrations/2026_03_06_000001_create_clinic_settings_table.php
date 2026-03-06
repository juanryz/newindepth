<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('clinic_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('string'); // string|integer|boolean|json
            $table->string('label')->nullable();        // Human-readable label for dashboard
            $table->string('group')->default('general'); // general|schedule|session
            $table->timestamps();
        });

        // Seed defaults — these can all be changed from the admin dashboard
        DB::table('clinic_settings')->insert([
            // --- Jam operasional kalender ---
            [
                'key' => 'clinic_open_time',
                'value' => '08:00',
                'type' => 'string',
                'label' => 'Jam Buka Klinik (tampilan kalender)',
                'group' => 'schedule',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'clinic_close_time',
                'value' => '22:00',
                'type' => 'string',
                'label' => 'Jam Tutup Klinik (tampilan kalender)',
                'group' => 'schedule',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // --- Slot jadwal standar (JSON) ---
            [
                'key' => 'schedule_standard_slots',
                'value' => json_encode([
                    ['start' => '08:00:00', 'end' => '10:00:00', 'label' => 'Sesi 1'],
                    ['start' => '10:00:00', 'end' => '12:00:00', 'label' => 'Sesi 2'],
                    ['start' => '13:00:00', 'end' => '15:00:00', 'label' => 'Sesi 3'],
                    ['start' => '15:00:00', 'end' => '17:00:00', 'label' => 'Sesi 4'],
                    ['start' => '18:00:00', 'end' => '20:00:00', 'label' => 'Sesi 5'],
                ]),
                'type' => 'json',
                'label' => 'Slot Jadwal Standar (JSON)',
                'group' => 'schedule',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // --- Durasi sesi (menit) untuk auto-close ---
            [
                'key' => 'session_auto_close_minutes',
                'value' => '95',
                'type' => 'integer',
                'label' => 'Durasi Auto-Close Sesi (menit)',
                'group' => 'session',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('clinic_settings');
    }
};
