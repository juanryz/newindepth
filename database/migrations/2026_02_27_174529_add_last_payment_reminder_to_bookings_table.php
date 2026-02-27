<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     * Adds last_reminder_label to track which reminder (1h or 2h) was last sent,
     * preventing double-sending when the scheduler runs multiple times.
     */
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Tracks which session reminder label was last sent ('1h' or '2h')
            $table->string('last_reminder_label', 10)->nullable()->after('last_reminder_sent_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn('last_reminder_label');
        });
    }
};
