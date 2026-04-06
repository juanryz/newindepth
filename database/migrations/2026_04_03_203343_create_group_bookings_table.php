<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('group_bookings', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique();
            $table->string('group_name');
            $table->string('institution_name')->nullable();
            $table->text('address')->nullable();
            $table->string('pic_name');
            $table->string('pic_phone')->nullable();
            $table->string('pic_email')->nullable();
            // Grup hanya bisa offline (anggota datang ke klinik)
            $table->enum('session_type', ['offline'])->default('offline');
            $table->string('payment_method', 50)->nullable();
            $table->enum('payment_status', ['pending', 'paid'])->default('pending');
            $table->decimal('total_amount', 15, 2)->default(0);
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->foreignId('schedule_id')->nullable()->constrained('schedules')->nullOnDelete();
            $table->string('package_type', 50)->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('group_bookings');
    }
};
