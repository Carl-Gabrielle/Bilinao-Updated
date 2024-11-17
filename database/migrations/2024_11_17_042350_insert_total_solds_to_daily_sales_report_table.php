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
        Schema::table('daily_sales_report', function (Blueprint $table) {
            $table->bigInteger('solds');
        });
        Schema::table('monthly_sales_reports', function (Blueprint $table) {
            $table->bigInteger('total_solds');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('daily_sales_report', function (Blueprint $table) {
            $table->dropColumn('solds');
        });
        Schema::table('monthly_sales_reports', function (Blueprint $table) {
            $table->dropColumn('total_solds');
        });
    }
};
