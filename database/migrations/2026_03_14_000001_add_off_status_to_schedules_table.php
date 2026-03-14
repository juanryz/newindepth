<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     * Modifies the `status` column in schedules from ENUM to VARCHAR(20)
     * so that the 'off' value (untuk liburkan jadwal) is supported.
     */
    public function up(): void
    {
        // ENUM cannot be easily extended on all DB drivers.
        // Safest approach: change to VARCHAR which accepts any valid status string.
        DB::statement(
            "ALTER TABLE schedules MODIFY COLUMN status VARCHAR(20) NOT NULL DEFAULT 'available'"
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert back to original ENUM (this will strip 'off' values — use with caution)
        DB::statement(
            "ALTER TABLE schedules MODIFY COLUMN status ENUM('available', 'full', 'cancelled') NOT NULL DEFAULT 'available'"
        );
    }
};
