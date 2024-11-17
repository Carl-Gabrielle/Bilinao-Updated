<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonthlySalesReport extends Model
{
    use HasFactory;

    protected $table = 'monthly_sales_reports';
    protected $fillable = [
        'seller_id',
        'total_net_sales',
        'total_contribution',
        'month_date',
        'total_solds'
    ];

    public function seller()
    {
        return $this->belongsTo(Seller::class, 'seller_id');
    }
}
