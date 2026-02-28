<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Convert to string
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('package_type')->nullable()->change();
        });
        Schema::table('screening_results', function (Blueprint $table) {
            $table->string('recommended_package')->nullable()->change();
        });
        Schema::table('users', function (Blueprint $table) {
            $table->string('recommended_package')->nullable()->change();
        });

        // 2. Update data
        DB::table('bookings')->where('package_type', 'upgrade')->update(['package_type' => 'premium']);
        DB::table('screening_results')->where('recommended_package', 'upgrade')->update(['recommended_package' => 'premium']);
        DB::table('users')->where('recommended_package', 'upgrade')->update(['recommended_package' => 'premium']);

        // 3. Convert back to enum
        Schema::table('bookings', function (Blueprint $table) {
            $table->enum('package_type', ['reguler', 'hipnoterapi', 'premium', 'vip'])->nullable()->change();
        });
        Schema::table('screening_results', function (Blueprint $table) {
            $table->enum('recommended_package', ['hipnoterapi', 'vip', 'premium'])->nullable()->change();
        });
        Schema::table('users', function (Blueprint $table) {
            $table->enum('recommended_package', ['hipnoterapi', 'vip', 'premium'])->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('package_type')->nullable()->change();
        });
        Schema::table('screening_results', function (Blueprint $table) {
            $table->string('recommended_package')->nullable()->change();
        });
        Schema::table('users', function (Blueprint $table) {
            $table->string('recommended_package')->nullable()->change();
        });

        DB::table('bookings')->where('package_type', 'premium')->update(['package_type' => 'upgrade']);
        DB::table('screening_results')->where('recommended_package', 'premium')->update(['recommended_package' => 'upgrade']);
        DB::table('users')->where('recommended_package', 'premium')->update(['recommended_package' => 'upgrade']);

        Schema::table('bookings', function (Blueprint $table) {
            $table->enum('package_type', ['reguler', 'hipnoterapi', 'upgrade', 'vip'])->nullable()->change();
        });
        Schema::table('screening_results', function (Blueprint $table) {
            $table->enum('recommended_package', ['hipnoterapi', 'vip', 'upgrade'])->nullable()->change();
        });
        Schema::table('users', function (Blueprint $table) {
            $table->enum('recommended_package', ['hipnoterapi', 'vip', 'upgrade'])->nullable()->change();
        });
    }
};
