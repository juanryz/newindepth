<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. bookings: tag booking sebagai bagian dari grup tertentu
        Schema::table('bookings', function (Blueprint $table) {
            $table->unsignedBigInteger('group_booking_id')->nullable()->after('patient_id');
            $table->foreign('group_booking_id')->references('id')->on('group_bookings')->nullOnDelete();
        });

        // 2. group_bookings: satu link video untuk sesi grup
        Schema::table('group_bookings', function (Blueprint $table) {
            $table->string('video_link')->nullable()->after('schedule_id');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['group_booking_id']);
            $table->dropColumn('group_booking_id');
        });

        Schema::table('group_bookings', function (Blueprint $table) {
            $table->dropColumn('video_link');
        });
    }
};
