<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_code')->unique();
            $table->foreignId('patient_id')->constrained('users');
            $table->foreignId('schedule_id')->constrained('schedules');
            $table->foreignId('screening_form_id')->nullable()->constrained('screening_forms');
            $table->json('screening_answers')->nullable();
            $table->enum('screening_result', ['eligible', 'ineligible', 'pending_review'])->default('pending_review');
            $table->enum('status', [
                'pending_screening',
                'pending_payment',
                'pending_validation',
                'confirmed',
                'completed',
                'cancelled',
            ])->default('pending_screening');
            $table->string('affiliate_ref_code')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
