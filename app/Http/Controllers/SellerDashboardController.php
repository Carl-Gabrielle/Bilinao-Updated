<?php

namespace App\Http\Controllers;
use App\Models\Seller;
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
    public function publicProfile(Seller $seller)
    {
        $products = $seller->products()->with('images')->get();
    
        return Inertia::render('Seller/PublicProfile', [
            'seller' => $seller,
            'products' => $products
        ]);
    }
    

}
