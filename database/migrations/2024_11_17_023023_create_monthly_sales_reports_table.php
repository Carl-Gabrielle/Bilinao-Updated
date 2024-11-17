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
        Schema::create('monthly_sales_reports', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('seller_id');
            $table->bigInteger('total_net_sales');
            $table->bigInteger('total_contribution');
            $table->date('month_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monthly_sales_reports');
    }
};
