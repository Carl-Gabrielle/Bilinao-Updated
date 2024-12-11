<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
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
 
//     public function index()
// {
//     if (Auth::user()->role === 'admin') {
//         $sellerCount = Seller::count();
//         $customerCount = User::count();
//         $firstDayOfMonth = Carbon::now()->startOfMonth()->toDateString();
//         $salesData = MonthlySalesReport::where('month_date', $firstDayOfMonth)
//             ->select('seller_id', 'total_net_sales', 'total_contribution')
//             ->orderBy('total_net_sales', 'desc')
//             ->limit(5) 
//             ->with('seller') 
//             ->get();

//         return Inertia::render('Dashboard', [
//             'sellerCount' => $sellerCount,
//             'customerCount' => $customerCount,
//             'salesData' => $salesData,
//         ]);
//     }

//     return redirect('/customer');
// }

public function index()
{
    if (Auth::user()->role === 'admin') {
        $sellerCount = Seller::count();
        $customerCount = User::count();
        $firstDayOfMonth = Carbon::now()->startOfMonth()->toDateString();
        $salesData = MonthlySalesReport::where('month_date', $firstDayOfMonth)
            ->select('seller_id', 'total_net_sales', 'total_contribution')
            ->orderBy('total_net_sales', 'desc')
            ->limit(5)
            ->with('seller')
            ->get();

        // Fetch top products
        $topProducts = DB::table('order_items')
        ->join('products', 'order_items.product_id', '=', 'products.id')
        ->join('sellers', 'products.seller_id', '=', 'sellers.id')
        ->select(
            'products.name as product_name',
            'sellers.name as seller_name',
            DB::raw('SUM(order_items.qty) as total_sold')
        )
        ->groupBy('order_items.product_id', 'products.name', 'sellers.name')
        ->orderBy('total_sold', 'desc')
        ->limit(5)
        ->get();

        return Inertia::render('Dashboard', [
            'sellerCount' => $sellerCount,
            'customerCount' => $customerCount,
            'salesData' => $salesData,
            'topProducts' => $topProducts,
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
