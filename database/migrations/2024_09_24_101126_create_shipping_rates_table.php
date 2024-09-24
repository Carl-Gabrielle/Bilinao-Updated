<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shipping_rates', function (Blueprint $table) {
            $table->id();
            $table->float('weight_min', 8, 2);
            $table->float('weight_max', 8,2);
            $table->float('luzon', 8,2);
            $table->float('manila', 8,2);
            $table->float('visayas', 8,2);
            $table->float('mindanao', 8,2);
            $table->float('island', 8,2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shipping_rates');
    }
};