<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration 
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // SQLite trick: to update CHECK constraint, we often need to recreate the table.
        // Laravel's Schema::table(... change()) handles this in modern versions.

        Schema::table('users', function (Blueprint $table) {
            $table->string('recommended_package')->nullable()->change();
        });

        Schema::table('screening_results', function (Blueprint $table) {
            $table->string('recommended_package')->nullable()->change();
        });

        // Re-apply as enum to get the new CHECK constraint
        Schema::table('users', function (Blueprint $table) {
            $table->enum('recommended_package', ['hipnoterapi', 'vip', 'upgrade'])->nullable()->change();
        });

        Schema::table('screening_results', function (Blueprint $table) {
            $table->enum('recommended_package', ['hipnoterapi', 'vip', 'upgrade'])->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('recommended_package', ['reguler', 'vip'])->nullable()->change();
        });

        Schema::table('screening_results', function (Blueprint $table) {
            $table->enum('recommended_package', ['reguler', 'vip', 'reguler_pengembangan'])->nullable()->change();
        });
    }
};
