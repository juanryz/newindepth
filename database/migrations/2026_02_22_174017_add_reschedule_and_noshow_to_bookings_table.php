<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration 
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->text('reschedule_reason')->nullable()->after('completion_outcome');
            $table->foreignId('rescheduled_by')->nullable()->constrained('users')->after('reschedule_reason');
            $table->timestamp('rescheduled_at')->nullable()->after('rescheduled_by');
            $table->foreignId('original_schedule_id')->nullable()->constrained('schedules')->after('rescheduled_at');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['rescheduled_by']);
            $table->dropForeign(['original_schedule_id']);
            $table->dropColumn(['reschedule_reason', 'rescheduled_by', 'rescheduled_at', 'original_schedule_id']);
        });
    }
};
