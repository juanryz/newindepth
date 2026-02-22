<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('recommended_package', ['hipnoterapi', 'vip', 'upgrade'])->nullable()->after('status');
            $table->json('screening_answers')->nullable()->after('recommended_package');
            $table->timestamp('screening_completed_at')->nullable()->after('screening_answers');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['recommended_package', 'screening_answers', 'screening_completed_at']);
        });
    }
};
