<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     * Tambahkan 'reguler' ke enum recommended_package di screening_results dan users.
     * Sebelumnya enum hanya: ['hipnoterapi', 'vip', 'premium']
     * Sekarang: ['reguler', 'hipnoterapi', 'premium', 'vip']
     */
    public function up(): void
    {
        // Convert ke string dulu agar bisa ubah enum tanpa error
        Schema::table('screening_results', function (Blueprint $table) {
            $table->string('recommended_package')->nullable()->change();
        });
        Schema::table('users', function (Blueprint $table) {
            $table->string('recommended_package')->nullable()->change();
        });

        // Convert kembali ke enum dengan nilai 'reguler' ditambahkan
        Schema::table('screening_results', function (Blueprint $table) {
            $table->enum('recommended_package', ['reguler', 'hipnoterapi', 'premium', 'vip'])->nullable()->change();
        });
        Schema::table('users', function (Blueprint $table) {
            $table->enum('recommended_package', ['reguler', 'hipnoterapi', 'premium', 'vip'])->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Hapus data 'reguler' sebelum revert enum
        DB::table('screening_results')->where('recommended_package', 'reguler')->update(['recommended_package' => 'hipnoterapi']);
        DB::table('users')->where('recommended_package', 'reguler')->update(['recommended_package' => 'hipnoterapi']);

        Schema::table('screening_results', function (Blueprint $table) {
            $table->string('recommended_package')->nullable()->change();
        });
        Schema::table('users', function (Blueprint $table) {
            $table->string('recommended_package')->nullable()->change();
        });

        Schema::table('screening_results', function (Blueprint $table) {
            $table->enum('recommended_package', ['hipnoterapi', 'vip', 'premium'])->nullable()->change();
        });
        Schema::table('users', function (Blueprint $table) {
            $table->enum('recommended_package', ['hipnoterapi', 'vip', 'premium'])->nullable()->change();
        });
    }
};
