<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            // Nominal koreksi: jika diisi, ini adalah nominal FINAL yang digunakan untuk laporan
            // Berguna untuk Cash yang sudah bayar tanpa angka unik
            $table->decimal('corrected_amount', 12, 2)->nullable()->after('amount');
            $table->string('correction_reason')->nullable()->after('corrected_amount');
            $table->unsignedBigInteger('corrected_by')->nullable()->after('correction_reason');
            $table->timestamp('corrected_at')->nullable()->after('corrected_by');
        });
    }

    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn(['corrected_amount', 'correction_reason', 'corrected_by', 'corrected_at']);
        });
    }
};
