<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('type')->default('promo_code'); // 'promo_code' | 'vip_reward'
            $table->string('description')->nullable();
            $table->unsignedBigInteger('discount_amount'); // in IDR
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('max_claims')->nullable(); // null = unlimited
            $table->timestamp('valid_from')->useCurrent();
            $table->timestamp('valid_until')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
