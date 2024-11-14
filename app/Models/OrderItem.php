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
        'delivered_date',
        'created_at',
        'updated_at',
        'shipping_fee_individual'
    ];
    use HasFactory;

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
