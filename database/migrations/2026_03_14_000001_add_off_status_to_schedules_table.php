<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     * Modifies the `status` column in schedules from ENUM to VARCHAR(20)
     * so that the 'off' value (untuk liburkan jadwal) is supported.
     */
    public function up(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
            $table->string('status', 20)->default('available')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
            // Depending on the driver, enum change might not be perfectly reversible on SQLite.
            // But this will work as a standard Laravel rollback
            $table->enum('status', ['available', 'full', 'cancelled'])->default('available')->change();
        });
    }
};
