<?php

namespace App\Providers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;
use App\Models\Cart;
use App\Models\Wishlists;
use App\Models\Notifications;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
{
    Inertia::share([
        'auth' => function () {
            return [
                'user' => Auth::user(),
            ];
        },
        'cartCount' => function () {
            if (Auth::check()) {
                return Cart::where('user_id', Auth::id())->sum('quantity');
            }
            return 0;
        },
        'wishlistCount' => function () { 
            if (Auth::check()) {
                return Wishlists::where('user_id', Auth::id())->count();
            }
            return 0;
        },
        'notificationCount' => function () { 
            if (Auth::check()) {
                return Notifications::where('user_id', Auth::id())
                    ->where('status', 'unread') 
                    ->count();
            }
            return 0;
    },
    ]);
}

}
