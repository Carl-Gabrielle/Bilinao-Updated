<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailySalesReport extends Model
{
    protected $table = 'daily_sales_report';
    protected $fillable = [
        'order_item_id',
        'net_sales_amount',
        'contribution',
        'status',
        'monthly_sales_report_id',
        'seller_id',
        'solds'
    ];

    use HasFactory;
}
