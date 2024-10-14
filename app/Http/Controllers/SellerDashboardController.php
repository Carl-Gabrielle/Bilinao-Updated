<?php

namespace App\Http\Controllers;
use App\Models\Seller;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateSellerRequest;
use Inertia\Inertia;
use App\Models\Product;
use App\Http\Resources\SellerResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class SellerDashboardController extends Controller
{
    public function dashboard()
    {
        $sellerId = Auth::id();
        
        $productCount = Product::where('seller_id', $sellerId)->count();
    
        return Inertia::render('SellerDashboard', [
            'productCount' => $productCount,
        ]);
    }
    public function  profile(){
        return Inertia::render('Seller/SellerProfile');
    }


    public function profileEdit()
    {
        $seller = Auth::user();
        return Inertia::render('Seller/SellerProfileEdit', [
            'seller' => new SellerResource($seller),
        ]);
    }

    
    public function publicProfile(Seller $seller)
    {
        $products = $seller->products()->with('images')->get();
    
        return Inertia::render('Seller/PublicProfile', [
            'seller' => $seller,
            'products' => $products
        ]);
    }
    public function update(UpdateSellerRequest $request, Seller $seller)
    {
        $data = $request->validated();
    
        // Check if a profile picture has been uploaded
        if ($request->hasFile('profile_picture')) {
            // Store the new image and delete the old one if it exists
            $imagePath = $request->file('profile_picture')->store('profile_pictures', 'public');
    
            // If the seller has an old image, delete it
            if ($seller->profile_picture) {
                Storage::disk('public')->delete($seller->profile_picture);
            }
    
            $data['profile_picture'] = $imagePath;
        }
    
        // Update seller's information
        $seller->update([
            'name' => $data['name'],
            'address' => $data['address'],
            'contact_number' => $data['contact_number'],
            'email' => $data['email'],
            'profile_picture' => $data['profile_picture'] ?? $seller->profile_picture,
        ]);
    
        return redirect()->route('seller.profile')->with('success', 'Seller updated successfully.');
    }
    public function destroy(Seller $seller)
{
    // Delete the seller record and profile picture if exists
    if ($seller->profile_picture) {
        Storage::disk('public')->delete($seller->profile_picture);
    }
    
    $seller->delete();

    return to_route('seller.index')->with('success', "Seller \"$seller->name\" Was Deleted");
}
public function logout(Request $request)
{
    Auth::guard('seller')->logout(); // Logs out the seller

    $request->session()->invalidate(); // Invalidate the session
    $request->session()->regenerateToken(); // Regenerate the CSRF token

    return redirect()->route('seller.login'); // Redirect to seller login or other page
}
}
