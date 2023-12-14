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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->text("description");
            $table->string("priority");
            $table->string("status");
            $table->foreignId('responsible_id')->nullable()->references('id')->on('users')->cascadeOnUpdate();
            $table->foreignId('creator_id')->nullable()->references('id')->on('users')->cascadeOnUpdate();
            $table->timestamps();
            $table->dateTimeTz('ending_at', $precision = 0)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
