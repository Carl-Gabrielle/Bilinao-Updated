<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Seller;
use App\Models\MonthlySalesReport;
use Carbon\Carbon;
use App\Models\User;

class HomeController extends Controller
{
    public function index()
    {
        if (Auth::user()->role === 'admin') {
            $sellerCount = Seller::count();
            $customerCount = User::count();
    
            // Fetch sales data
            $firstDayOfMonth = Carbon::now()->startOfMonth()->toDateString();
            $salesData = MonthlySalesReport::where('month_date', $firstDayOfMonth)
                ->select('seller_id', 'total_net_sales', 'total_contribution')
                ->with('seller')
                ->get();
    
                return Inertia::render('Dashboard', [
                    'sellerCount' => $sellerCount,
                    'customerCount' => $customerCount,
                    'salesData' => $salesData ?? []
                ]);
                
                
        }
    
        // Redirect to customer page for non-admin users
        return redirect('/customer');
    }
    
    public function guestPage(){
        return Inertia::render('Guest');
    }
}
