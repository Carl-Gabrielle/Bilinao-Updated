<?php

namespace App\Http\Controllers;
use App\Models\Seller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class SellerDashboardController extends Controller
{
    public function dashboard()
    {
        $sellerId = Auth::id();
        
        $productCount = Product::where('seller_id', $sellerId)->count();
    
        return Inertia::render('SellerDashboard', [
            'productCount' => $productCount,
        ]);
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
