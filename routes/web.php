<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckoutController;
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
use App\Http\Controllers\CustomerOrderController;
use App\Http\Controllers\SellerDashboardController;
use App\Http\Controllers\SellerOrderController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\WishlistsController;

Route::middleware('guest')->group(function () {
    Route::get('seller/login', [AuthenticatedSellerController::class, 'create'])
        ->name('seller.login');
    Route::post('seller/login', [AuthenticatedSellerController::class, 'store'])
        ->name('seller.authenticate');
        Route::post('seller/logout', [AuthenticatedSellerController::class, 'logout'])->name('seller.logout');
});

// Public route for seller profile
Route::get('seller/{seller}/profile', [SellerDashboardController::class, 'publicProfile'])->name('seller.public.profile');
// SELLLER ROUTES
Route::middleware('auth:seller')->group(function () {
    Route::get('seller/dashboard', [SellerDashboardController::class, 'dashboard'])->name('seller.dashboard');
    Route::get('seller/products', [ProductController::class, 'showProductsBySeller'])->name('seller.products.index');
    Route::get('seller/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('seller/profile', [SellerDashboardController::class, 'profile'])->name('seller.profile');
    Route::get('seller/profileEdit', [SellerDashboardController::class, 'profileEdit'])->name('seller.profileEdit');
    Route::put('seller/storeProfile', [SellerDashboardController::class, 'update'])->name('seller.storeProfile');
    Route::resource('products', ProductController::class);
    Route::get('/pendingOrders', [SellerOrderController::class, 'pendingOrders'])->name('seller.pendingOrders');
    Route::get('/processOrders', [SellerOrderController::class, 'processOrders'])->name('seller.processOrders');
    Route::get('/shippedOrders', [SellerOrderController::class, 'shippedOrders'])->name('seller.shippedOrders');
    Route::get('/completedOrders', [SellerOrderController::class, 'completedOrders'])->name('seller.completedOrders');
    Route::get('/seller/order-details/{orderId}', [SellerOrderController::class, 'orderDetails'])->name('seller.OrderDetails');
});

Route::inertia('/sellerLogin', 'SellerLogin')->name('seller.login');

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [HomeController::class, 'index'])->name('dashboard');

    Route::middleware('admin')->group(function () {
        Route::get('/shipping', [ShippingController::class, 'index'])->name('shipping.index');
        Route::get('/shipping/{id}/edit', [ShippingController::class, 'edit'])->name('shipping.edit');
        Route::put('/shipping/{id}', [ShippingController::class, 'update'])->name('shipping.update');
        Route::resource('category', CategoryController::class);
        Route::resource('seller', SellerController::class);
    });

    // CUSTOMER ROUTES
    Route::middleware('customer')->group(function () {
        Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
        Route::resource('customer', CustomerController::class);
        Route::get('/customerProfile', [CustomerController::class, 'profile'])->name('customer.customerProfile');
        Route::get('/customerNotifications', [CustomerController::class, 'notifications'])->name('customer.notifications');
        Route::patch('/notifications/{id}/read', [CustomerController::class, 'markAsRead'])->name('notifications.markAsRead');
        Route::get('/review', [CustomerController::class, 'review'])->name('customer.review');
        Route::get('/products', [ProductController::class, 'products'])->name('products.list');
        Route::get('/product/{product}', [ProductController::class, 'show'])->name('product.show');
        Route::get('category/{category}/products', [ProductController::class, 'productsByCategory'])->name('category.products');
        Route::get('/about', [CustomerController::class, 'about'])->name('customer.about');
        Route::get('/categories', [CustomerController::class, 'categories'])->name('customer.categories');
        Route::get('/completeOrders', [CheckoutController::class, 'completeOrders'])->name('customer.completeOrders');
        Route::get('/products', [ProductController::class, 'products'])->name('customer.products');
        Route::get('/carts', [CartController::class, 'carts'])->name('customer.carts');
        Route::get('/orderSelection', [CartController::class, 'orderSelection'])->name('customer.orderSelection');
        // CUSTOMER  ORDERS  ROUTE 
        Route::get('/orders', [CustomerOrderController::class, 'orders'])->name('customer.orders');
        Route::get('/toPay', [CustomerOrderController::class, 'toPayOrders'])->name('order.toPay');
        Route::get('/toShip', [CustomerOrderController::class, 'toShipOrders'])->name('order.toShip');
        Route::get('/toReceive', [CustomerOrderController::class, 'toReceiveOrders'])->name('order.toReceive');
        Route::get('/received', [CustomerOrderController::class, 'receivedOrders'])->name('order.Received');

        Route::get('/search', [ProductController::class, 'search'])->name('products.search');
        Route::get('/customerProfile/edit', [CustomerController::class, 'edit'])->name('customer.editProfile');
        Route::put('/customerProfile/{id}', [CustomerController::class, 'update'])->name('customer.updateProfile');
        Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');
        Route::get('/checkout', [CartController::class, 'checkout'])->name('cart.checkout');
        Route::put('/cart/{id}', [CartController::class, 'update'])->name('cart.update');
        Route::get('/checkout-preview', [CartController::class, 'checkoutPreview'])->name('show.checkout');
        Route::get('/myWishlists', [WishlistsController::class, 'myWishlists'])->name('customer.myWishlists');
        Route::post('/checkout', [CheckoutController::class, 'store'])->name('store.checkout');
        Route::post('/wishlists', [WishlistsController::class, 'storeWishlists'])->name('customer.storeWishlists');
        Route::delete('/wishItem/{id}', [WishlistsController::class, 'destroy'])->name('wishItem.destroy');
        Route::get('/payment/success/{order}', [CheckoutController::class, 'success'])->name('checkout.success');
        Route::get('/payment/failed/{order}', [CheckoutController::class, 'failed'])->name('checkout.failed');

    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
