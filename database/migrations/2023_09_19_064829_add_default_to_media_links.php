<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDefaultToMediaLinks extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('twitter_link')->default('')->change();
            $table->string('instagram_link')->default('')->change();
            $table->string('facebook_link')->default('')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('twitter_link')->default(null)->change();
            $table->string('instagram_link')->default(null)->change();
            $table->string('facebook_link')->default(null)->change();
        });
    }
};
