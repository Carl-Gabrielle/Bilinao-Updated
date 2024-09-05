<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
class SellerDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('SellerDashboard');
    }
    public function  profile(){
        return Inertia::render('Seller/SellerProfile');
    }
}
