<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('internal_ai_agents', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->text('system_prompt')->nullable();
            $table->string('avatar_color')->default('indigo'); // indigo, emerald, rose, amber, violet, sky
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('internal_ai_instructions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('agent_id')->constrained('internal_ai_agents')->cascadeOnDelete();
            $table->string('type'); // 'do' or 'dont'
            $table->text('instruction');
            $table->string('category')->default('general'); // general, tone, content, forbidden
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('internal_ai_instructions');
        Schema::dropIfExists('internal_ai_agents');
    }
};
