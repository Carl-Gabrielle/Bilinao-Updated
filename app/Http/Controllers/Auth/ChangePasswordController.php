<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ChangePasswordController extends Controller
{
    /**
     * Display the change password view.
     */
    public function show(): Response
    {
        return Inertia::render('Seller/ChangePassword');
    }
    /**
     * Handle the password update request.
     */
    // public function update(Request $request)
    // {
    //     $request->validate([
    //         'password' => 'required|min:8|confirmed',
    //     ]);
    
    //     $seller = Auth::guard('seller')->user();
    //     $seller->password = Hash::make($request->password);
    //     $seller->save();
    
    //     // Remove 'change_password' session flag after updating the password
    //     $request->session()->forget('change_password');
    
    //     return redirect()->route('seller.dashboard')->with('status', 'Password changed successfully.');
    // }
    public function update(Request $request)
    {
        try {
            $request->validate([
                'password' => 'required|min:8|confirmed',
            ]);
    
            $seller = Auth::guard('seller')->user();
            $seller->password = Hash::make($request->password);
            $seller->save();
    
            $request->session()->forget('change_password');
    
            return redirect()->route('seller.dashboard')
                ->with('status', 'Password changed successfully.');
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->errors());
        } catch (\Exception $e) {
            \Log::error('Error updating password: ' . $e->getMessage());
            return redirect()->back()->withErrors(['general' => 'An unexpected error occurred. Please try again later.']);
        }
    }
    
    
}
