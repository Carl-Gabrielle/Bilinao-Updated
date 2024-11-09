<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SalesReportController extends Controller
{
    public function salesReport (){
        return Inertia('Admin/Sales/SalesReport');
    }
    public function salesReportIndividual (){
        return Inertia('Admin/Sales/SellerIndividualSales');
    }


}
