<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('group_bookings', function (Blueprint $table) {
            // Tambah: akun login grup + kontak grup
            $table->foreignId('user_id')->nullable()->after('id')->constrained('users')->nullOnDelete();
            $table->string('email')->nullable()->after('group_name');
            $table->string('phone', 20)->nullable()->after('email');

            // Hapus: kolom PIC (diganti dengan data grup langsung)
            $table->dropColumn(['pic_name', 'pic_phone', 'pic_email', 'institution_name']);

            // Hapus: kolom pembayaran level grup (invoice per anggota, bukan per grup)
            $table->dropColumn(['payment_method', 'payment_status', 'total_amount', 'paid_at']);
        });
    }

    public function down(): void
    {
        Schema::table('group_bookings', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn(['user_id', 'email', 'phone']);

            $table->string('institution_name')->nullable();
            $table->string('pic_name')->default('');
            $table->string('pic_phone')->nullable();
            $table->string('pic_email')->nullable();
            $table->string('payment_method', 50)->nullable();
            $table->enum('payment_status', ['pending', 'paid'])->default('pending');
            $table->decimal('total_amount', 15, 2)->default(0);
            $table->timestamp('paid_at')->nullable();
        });
    }
};
