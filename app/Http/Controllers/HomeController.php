<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        if (Auth::user()->role === 'admin') {
            return Inertia::render('Dashboard');
        }

        return redirect('/customer');
    }
}
