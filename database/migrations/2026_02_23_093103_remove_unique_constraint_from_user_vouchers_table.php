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
        Schema::table('user_vouchers', function (Blueprint $table) {
            // MySQL requires an index for foreign keys. 
            // Since the unique index was the only one covering user_id/voucher_id, 
            // we must add a regular index before dropping the unique one.
            $table->index('user_id');
            $table->index('voucher_id');

            $table->dropUnique('user_vouchers_user_id_voucher_id_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_vouchers', function (Blueprint $table) {
            $table->unique(['user_id', 'voucher_id']);

            $table->dropIndex(['user_id']);
            $table->dropIndex(['voucher_id']);
        });
    }
};
