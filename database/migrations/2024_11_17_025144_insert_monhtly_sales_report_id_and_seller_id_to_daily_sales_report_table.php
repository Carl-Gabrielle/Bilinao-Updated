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
            $table->bigInteger('monthly_sales_report_id')->nullable();
            $table->bigInteger('seller_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('daily_sales_report', function (Blueprint $table) {
            $table->dropColumn('monthly_sales_report_id');
            $table->dropColumn('seller_id');
        });
    }
};
