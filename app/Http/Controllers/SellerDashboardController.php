<?php

namespace App\Http\Controllers;
use App\Models\Seller;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateSellerRequest;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Order;
use App\Models\DailySalesReport;
use Carbon\Carbon;
use App\Http\Resources\SellerResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class SellerDashboardController extends Controller
{
    public function dashboard() {
        $sellerId = Auth::id();
    
        $orders = Order::with(['orderItems' => function ($query) use ($sellerId) {
            $query->whereIn('product_id', function ($subQuery) use ($sellerId) {
                $subQuery->select('id')->from('products')->where('seller_id', $sellerId);
            });
        }])->get();
    
        return Inertia::render('SellerDashboard', [
            'productCount' => Product::where('seller_id', $sellerId)->count(),
            'orderCount' => $orders->count(),
            'orders' => $orders,
        ]);
    }
    
    
    public function salesReport()
    {
        $sellerId = Auth::id(); 
        $firstDayOfTheMonth = Carbon::now()->startOfMonth()->toDateString();
    
        $dailySalesReport = DailySalesReport::whereHas('seller', function ($query) use ($sellerId) {
            $query->where('seller_id', $sellerId);
        })
        ->whereDate('created_at', '>=', $firstDayOfTheMonth)
        ->with(['orderItems.product'])
        ->orderBy('updated_at', 'asc')
        ->get();
    
        $totalContribution = $dailySalesReport->sum('contribution');
    
        return Inertia::render('Seller/SalesReport', [
            'data' => $dailySalesReport,
            'totalContribution' => $totalContribution
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
            'seller' => new SellerResource($seller),
            'products' => $products,
        ]);
    }
    
    public function update(UpdateSellerRequest $request)
    {
        $seller = Auth::user();
    
        $data = $request->validated();
    
        if ($request->hasFile('profile_picture')) {
            $imagePath = $request->file('profile_picture')->store('profile_pictures', 'public');
            
            if ($seller->image_path) {
                Storage::disk('public')->delete($seller->image_path);
            }
    
            $data['image_path'] = $imagePath; 
        }
    
        $seller->update([
            'name' => $data['name'],
            'address' => $data['address'],
            'contact_number' => $data['contact_number'],
            'email' => $data['email'],
            'image_path' => $data['image_path'] ?? $seller->image_path,
        ]);
        return redirect()->route('seller.profile')->with('success', 'Seller updated successfully.');
    }
    
    
    
    

    public function destroy(Seller $seller)
{
    if ($seller->profile_picture) {
        Storage::disk('public')->delete($seller->profile_picture);
    }
    
    $seller->delete();

    return to_route('seller.index')->with('success', "Seller \"$seller->name\" Was Deleted");
}
public function logout(Request $request)
{
    Auth::guard('seller')->logout(); 

    $request->session()->invalidate(); 
    $request->session()->regenerateToken(); 

    return redirect()->route('seller.login'); 
}
}
