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
        Schema::create('petty_cash_proposals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('type', ['funding', 'spending']);
            $table->string('title');
            $table->text('description')->nullable();
            $table->decimal('amount', 15, 2);
            $table->enum('status', ['pending', 'approved', 'rejected', 'completed'])->default('pending');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->text('rejection_reason')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->string('transfer_proof')->nullable()->comment('For funding type, Santa Maria uploads this');
            $table->timestamps();
        });

        Schema::create('petty_cash_proofs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proposal_id')->constrained('petty_cash_proposals')->onDelete('cascade');
            $table->decimal('amount_spent', 15, 2);
            $table->string('description');
            $table->string('receipt_path');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('petty_cash_proofs');
        Schema::dropIfExists('petty_cash_proposals');
    }
};
