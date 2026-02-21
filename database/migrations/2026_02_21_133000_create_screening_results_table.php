<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('screening_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->json('step_data')->nullable();           // Semua jawaban 10 step
            $table->json('chat_history')->nullable();        // Riwayat AI chat (step 9 & 10)
            $table->string('severity_label')->nullable();    // Ringan/Sedang/Berat Akut/Berat Kronis/High Risk
            $table->enum('recommended_package', ['reguler', 'vip', 'reguler_pengembangan'])->nullable();
            $table->text('ai_summary')->nullable();          // Ringkasan dari AI
            $table->boolean('is_high_risk')->default(false); // Flag keyword krisis
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('screening_results');
    }
};
