<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration 
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->string('course_type')->default('online')->after('description'); // online or offline
            $table->string('online_platform')->nullable()->after('course_type'); // zoom, gmeet, etc
            $table->string('location')->nullable()->after('online_platform'); // physical address
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn(['course_type', 'online_platform', 'location']);
        });
    }
};
