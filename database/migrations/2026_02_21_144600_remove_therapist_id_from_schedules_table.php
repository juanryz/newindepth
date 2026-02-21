<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
            $table->dropForeign(['therapist_id']);
            $table->dropUnique(['therapist_id', 'date', 'start_time']);
            $table->dropColumn('therapist_id');
        });
    }

    public function down(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
            $table->foreignId('therapist_id')->nullable()->constrained('users')->cascadeOnDelete();
        });
    }
};
