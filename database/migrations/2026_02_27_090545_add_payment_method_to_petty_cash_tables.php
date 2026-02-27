<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('petty_cash_proposals', function (Blueprint $table) {
            $table->string('payment_method')->nullable()->after('amount')->comment('transfer or cash');
        });

        Schema::table('petty_cash_transactions', function (Blueprint $table) {
            $table->string('payment_method')->nullable()->after('amount')->comment('transfer or cash');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('petty_cash_proposals', function (Blueprint $table) {
            $table->dropColumn('payment_method');
        });

        Schema::table('petty_cash_transactions', function (Blueprint $table) {
            $table->dropColumn('payment_method');
        });
    }
};
