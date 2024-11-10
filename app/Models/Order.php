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
        'landmark',
        'remarks',
        'amount',
        'shipping_fee',
        'transaction_id',
        'order_number',
        'payment',
        'payment_src_id',
        'tracking_code',
        'checkout_session_url'
    ];
    use HasFactory;

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }

}
