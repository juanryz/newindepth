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
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('agreement_signed')->default(false)->after('gender');
            $table->timestamp('agreement_signed_at')->nullable()->after('agreement_signed');
            $table->longText('digital_signature')->nullable()->after('agreement_signed_at');
            $table->json('agreement_data')->nullable()->after('digital_signature');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'agreement_signed',
                'agreement_signed_at',
                'digital_signature',
                'agreement_data'
            ]);
        });
    }
};
