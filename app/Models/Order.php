<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'shipping_address',
        'remarks',
        'amount',
        'shipping_fee',
        'transaction_id',
        'order_number',
        'payment',
        'payment_src_id',
    ];
    use HasFactory;
}