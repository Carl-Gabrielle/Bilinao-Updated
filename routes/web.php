<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SellerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSellerController;
use App\Http\Controllers\SellerDashboardController;


Route::middleware('guest')->group(function () {
    Route::get('seller/login', [AuthenticatedSellerController::class, 'create'])
                ->name('seller.login');
    Route::post('seller/login', [AuthenticatedSellerController::class, 'store'])
                ->name('seller.authenticate');
});


Route::middleware('auth:seller')->group(function () {
    Route::get('seller/dashboard', [SellerDashboardController::class, 'index'])->name('seller.dashboard');
    Route::get('seller/products', [ProductController::class, 'showProductsBySeller'])->name('seller.products.index');
    Route::get('seller/profile', [SellerDashboardController::class, 'profile'])->name('products.profile');
    Route::resource('products', ProductController::class);
});

Route::inertia('/sellerLogin', 'SellerLogin')->name('seller.login');

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
        Route::resource('customer', CustomerController::class);
        Route::get('/product/{product}', [ProductController::class, 'show'])->name('product.show');
        Route::get('category/{category}/products', [ProductController::class, 'productsByCategory'])->name('category.products');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
