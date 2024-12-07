<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Seller;
use App\Models\MonthlySalesReport;
use App\Http\Resources\CategoryResource;
use Carbon\Carbon;
use App\Models\Product;
use App\Models\Category;

use App\Models\User;

class HomeController extends Controller
{
    public function index()
    {
        if (Auth::user()->role === 'admin') {
            $sellerCount = Seller::count();
            $customerCount = User::count();
            $firstDayOfMonth = Carbon::now()->startOfMonth()->toDateString();
    
            // Fetch sales data with seller information
            $salesData = MonthlySalesReport::where('month_date', $firstDayOfMonth)
                ->select('seller_id', 'total_net_sales', 'total_contribution')
                ->with('seller:id,name,profile_image') // Fetch seller details
                ->get();
    
            return Inertia::render('Dashboard', [
                'sellerCount' => $sellerCount,
                'customerCount' => $customerCount,
                'salesData' => $salesData, // Send raw data
            ]);
        }
    
        return redirect('/customer');
    }
    
    
    public function guestPage(){
        $category = Category::where('is_active', 1)->paginate(7);
            
            $products = Product::with('images')
                ->whereHas('category', function ($query) {
                    $query->where('is_active', 1);
                })
                ->whereHas('seller', function ($query) {
                    $query->where('is_active', 1); 
                })
                ->orderBy('created_at', 'desc')
                ->paginate(6);
        
            return Inertia::render('LandingPage', [
                'category' => CategoryResource::collection($category),
                'products' => $products,
            ]);
    }
}
