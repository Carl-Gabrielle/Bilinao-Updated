<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Seller;
use App\Models\User;

class HomeController extends Controller
{
    public function index()
    {
        if (Auth::user()->role === 'admin') {
            $sellerCount = Seller::count();
            $customerCount = User::count();
            return Inertia::render('Dashboard', [
                'sellerCount' => $sellerCount,
                'customerCount' => $customerCount
            ]);
        }

        // Redirect to customer page for non-admin users
        return redirect('/customer');
    }
}
