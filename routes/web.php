<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SellerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSellerController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\SellerDashboardController;


Route::middleware('guest')->group(function () {
    Route::get('seller/login', [AuthenticatedSellerController::class, 'create'])
                ->name('seller.login');
    Route::post('seller/login', [AuthenticatedSellerController::class, 'store'])
                ->name('seller.authenticate');
});

// Public route for seller profile
Route::get('seller/{seller}/profile', [SellerDashboardController::class, 'publicProfile'])->name('seller.public.profile');

Route::middleware('auth:seller')->group(function () {
    Route::get('seller/dashboard', [SellerDashboardController::class, 'dashboard'])->name('seller.dashboard');
    Route::get('seller/products', [ProductController::class, 'showProductsBySeller'])->name('seller.products.index');
    Route::get('seller/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('seller/profile', [SellerDashboardController::class, 'profile'])->name('seller.profile');
    Route::resource('products', ProductController::class);
});

Route::inertia('/sellerLogin', 'SellerLogin')->name('seller.login');

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [HomeController::class, 'index'])->name('dashboard');
    
    Route::middleware('admin')->group(function () {
        
        Route::resource('category', CategoryController::class);
        Route::resource('seller', SellerController::class);
    });
    
    // CUSTOMER ROUTES 
    Route::middleware('customer')->group(function () {
        Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
        Route::resource('customer', CustomerController::class);
        Route::get('/customerProfile',[CustomerController::class,'profile'])->name('customer.customerProfile');
        Route::get('/customer/carts', [CartController::class, 'carts'])->name('customer.carts');
        Route::get('/products', [ProductController::class, 'products'])->name('products.list');
        Route::get('/product/{product}', [ProductController::class, 'show'])->name('product.show');
        Route::get('category/{category}/products', [ProductController::class, 'productsByCategory'])->name('category.products');
        Route::get('/about', [CustomerController::class, 'about'])->name('customer.about');
        Route::get('/categories', [CustomerController::class, 'categories'])->name('customer.categories');
        Route::get('/products', [CustomerController::class, 'products'])->name('customer.products');
        Route::get('/carts', [CartController::class, 'carts'])->name('customer.carts');
        Route::get('/orders', [CustomerController::class, 'orders'])->name('customer.orders');
        Route::get('/search', [ProductController::class, 'search'])->name('products.search');
        Route::get('/customerProfile/edit', [CustomerController::class, 'edit'])->name('customer.editProfile'); 
        Route::put('/customerProfile/{id}', [CustomerController::class, 'update'])->name('customer.updateProfile');
        Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');
        Route::get('/checkout', [CartController::class, 'checkout'])->name('cart.checkout');
        Route::put('/cart/{id}', [CartController::class, 'update'])->name('cart.update');
        Route::post('/buyNow', [CartController::class, 'buyNow'])->name('cart.buyNow');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
