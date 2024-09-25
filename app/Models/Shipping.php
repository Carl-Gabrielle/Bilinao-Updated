<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    use HasFactory;
    protected $table = 'shipping_rates';
    protected $fillable = ['weight_min', 'weight_max', 'luzon', 'visayas', 'mindanao', 'island'];
}
