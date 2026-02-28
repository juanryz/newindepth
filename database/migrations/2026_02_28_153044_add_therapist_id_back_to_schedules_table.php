<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
            if (!Schema::hasColumn('schedules', 'therapist_id')) {
                $table->foreignId('therapist_id')->nullable()->after('id')->constrained('users')->cascadeOnDelete();
                $table->unique(['therapist_id', 'date', 'start_time']);
            }
        });
    }

    public function down(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
            if (Schema::hasColumn('schedules', 'therapist_id')) {
                $table->dropUnique(['therapist_id', 'date', 'start_time']);
                $table->dropForeign(['therapist_id']);
                $table->dropColumn('therapist_id');
            }
        });
    }
};
