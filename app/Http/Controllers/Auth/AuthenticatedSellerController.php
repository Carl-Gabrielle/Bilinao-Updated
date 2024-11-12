<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SellerLoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSellerController extends Controller
{
    /**
     * Display the login view for sellers.
     */
    public function create(): Response
    {
        return Inertia::render('SellerLogin', [
            'canResetPassword' => route('password.request') !== null,
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request for sellers.
     */
    public function store(SellerLoginRequest $request): RedirectResponse
    {
        $credentials = $request->only('username', 'password');
        
        if (auth()->guard('seller')->attempt($credentials)) {
            $seller = auth()->guard('seller')->user();
            
            if (!$seller->is_active) {
                auth()->guard('seller')->logout();
                
                return back()->withErrors([
                    'username' => 'Your account is inactive. Please contact support.',
                ])->onlyInput('username');
            }

            $request->session()->regenerate();

            return redirect()->intended(route('seller.dashboard', absolute: false));
        }

        return back()->withErrors([
            'username' => 'The provided credentials do not match our records.',
        ])->onlyInput('username');
    }

    /**
     * Destroy an authenticated session.
     */
    public function logout(Request $request)
    {
        Auth::guard('seller')->logout(); 

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('seller.login'); 
    }
}
