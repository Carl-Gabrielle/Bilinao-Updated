<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notifications extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'seller_id',
        'message',
        'link ',
        'status',
        'created_at',
        'updated_at'
    ];
    public function seller()
    {
        return $this->belongsTo(Seller::class, 'seller_id');
    }
}
