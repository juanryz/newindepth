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
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->string('primary_keyword')->nullable()->after('slug');
            $table->text('secondary_keywords')->nullable()->after('primary_keyword');
            $table->integer('seo_score')->default(0)->after('meta_keywords');
            $table->json('seo_analysis')->nullable()->after('seo_score');
            $table->json('ai_outline')->nullable()->after('seo_analysis');
            $table->json('ai_metadata')->nullable()->after('ai_outline');
            $table->string('search_intent')->nullable()->after('ai_metadata');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropColumn([
                'primary_keyword',
                'secondary_keywords',
                'seo_score',
                'seo_analysis',
                'ai_outline',
                'ai_metadata',
                'search_intent'
            ]);
        });
    }
};
