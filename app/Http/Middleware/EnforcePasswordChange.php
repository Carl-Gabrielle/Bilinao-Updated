<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnforcePasswordChange
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        // Check if the seller is authenticated and needs to change password
        if (Auth::guard('seller')->check() && $request->session()->get('change_password')) {
            if (!$request->routeIs('seller.change_password') && !$request->routeIs('seller.change_password.submit')) {
                return redirect()->route('seller.change_password');
            }
        }

        return $next($request);
    }
}
