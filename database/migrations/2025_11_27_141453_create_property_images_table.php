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
        Schema::create('property_images', function (Blueprint $table) {
            $table->id();         
            $table->foreignId('property_id')
                  ->constrained('properties')
                  ->onDelete('cascade'); // Deletes images if property is deleted
            $table->string('image_path')->nullable(); // Path or URL to the image
            $table->string('alt_text')->nullable(); // Optional alt text for SEO
            $table->boolean('is_primary')->default(false); // Mark main display image
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('property_images');
    }
};
