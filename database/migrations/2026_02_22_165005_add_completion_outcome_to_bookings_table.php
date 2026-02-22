<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration 
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('completion_outcome')->nullable()->after('status');
            $table->timestamp('started_at')->nullable()->after('completion_outcome');
            // Ensure recording_link exists if not already there (Controller uses it)
            if (!Schema::hasColumn('bookings', 'recording_link')) {
                $table->string('recording_link')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn(['completion_outcome', 'started_at']);
        });
    }
};
