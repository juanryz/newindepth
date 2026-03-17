<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('seo_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('label');
            $table->text('description')->nullable();
            $table->string('group')->default('general'); // general, title, meta, content, structure, keyword, links, media, faq
            $table->string('type')->default('integer'); // integer, string, json, boolean, text
            $table->text('value');
            $table->text('default_value')->nullable();
            $table->string('unit')->nullable(); // karakter, kata, kali, persen, dll
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('seo_settings');
    }
};
