<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('ai_training_instructions', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // 'do' or 'dont'
            $table->text('instruction');
            $table->string('category')->default('general'); // general, tone, content, seo, forbidden
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_training_instructions');
    }
};
