<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     * Adds video_url and order_column to lessons table to match the LessonCMSController.
     */
    public function up(): void
    {
        Schema::table('lessons', function (Blueprint $table) {
            // Add video_url if it doesn't exist
            if (!Schema::hasColumn('lessons', 'video_url')) {
                $table->string('video_url')->nullable()->after('title');
            }

            // Add content column for lesson text body if missing
            if (!Schema::hasColumn('lessons', 'content')) {
                $table->text('content')->nullable()->after('video_url');
            }

            // Add order_column for sortable ordering if missing
            if (!Schema::hasColumn('lessons', 'order_column')) {
                $table->integer('order_column')->default(0)->after('content');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lessons', function (Blueprint $table) {
            $table->dropColumnIfExists('video_url');
            $table->dropColumnIfExists('content');
            $table->dropColumnIfExists('order_column');
        });
    }
};
