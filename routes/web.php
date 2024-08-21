<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SellerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::redirect('/','/dashboard');

// Route::middleware(['auth','verified'])->group(function (){
//     Route::get('/dashboard', fn() =>  Inertia::render('Dashboard'))
//         ->name('dashboard');
//         Route::resource('category', CategoryController::class);
//         Route::resource('seller', SellerController::class);
// });
Route::redirect('/', '/dashboard');
Route::middleware(['auth', 'verified'])->group(function () {
    // Route for dashboard
    Route::get('/dashboard', function () {
        if (Auth::user()->role === 'admin') {
            return Inertia::render('Dashboard');
        }
        return Inertia::render('CustomerDashboard');
    })->name('dashboard');

    // Admin routes
    Route::middleware('admin')->group(function () {
        Route::resource('category', CategoryController::class);
        Route::resource('seller', SellerController::class);
    });

    // Customer routes
    Route::middleware('customer')->group(function () {
        // Define routes specific to customers here
        // For example:
        // Route::get('/orders', [OrderController::class, 'index'])->name('orders');
    });
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
