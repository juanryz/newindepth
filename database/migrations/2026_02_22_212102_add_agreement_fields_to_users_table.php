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
            if (!Schema::hasColumn('users', 'agreement_signed')) {
                $table->boolean('agreement_signed')->default(false)->after('gender');
            }
            if (!Schema::hasColumn('users', 'agreement_signed_at')) {
                $table->timestamp('agreement_signed_at')->nullable()->after('agreement_signed');
            }
            if (!Schema::hasColumn('users', 'digital_signature')) {
                $table->longText('digital_signature')->nullable()->after('agreement_signed_at');
            }
            if (!Schema::hasColumn('users', 'agreement_data')) {
                $table->json('agreement_data')->nullable()->after('digital_signature');
            }
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
