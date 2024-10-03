<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'product_name',
        'type',
        'qty',
        'price',
        'total_price',
        'processing_date',
        'picked_date',
        'shipped_date',
        'delivered_date'
    ];
    use HasFactory;
}
