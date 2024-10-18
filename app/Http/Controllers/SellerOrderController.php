<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Seller;
class SellerOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function orderDetails (){
        return Inertia::render('Seller/OrderDetails');
    }
    public function pendingOrders()
    {
        $sellerId = Auth::id(); 
    
        // Get the pending orders for the seller's products
        $pendingOrders = Order::where('remarks', 'pending')
            ->whereHas('orderItems', function ($query) use ($sellerId) {
                $query->whereIn('product_id', function ($subQuery) use ($sellerId) {
                    $subQuery->select('id')->from('products')->where('seller_id', $sellerId);
                });
            })
            ->with(['orderItems' => function ($query) use ($sellerId) {
                $query->whereIn('product_id', function ($subQuery) use ($sellerId) {
                    $subQuery->select('id')->from('products')->where('seller_id', $sellerId);
                });
            }])
            ->get();
    
        return Inertia::render('Seller/PendingOrders', [
            'pendingOrders' => $pendingOrders,
        ]);
    }
    
    
    public function processOrders (){
        $sellerId = Auth::id(); 
        $processOrders = Order::where('remarks', 'on process')
        ->whereHas('orderItems', function ($query) use ($sellerId) {
            $query->whereIn('product_id', function ($subQuery) use ($sellerId) {
                $subQuery->select('id')->from('products')->where('seller_id', $sellerId);
            });
        })
        ->with(['orderItems' => function ($query) use ($sellerId) {
            $query->whereIn('product_id', function ($subQuery) use ($sellerId) {
                $subQuery->select('id')->from('products')->where('seller_id', $sellerId);
            });
        }])
        ->get();
        return Inertia::render('Seller/ProcessOrders', [
            'processOrders' => $processOrders,
        ]);
    }
    public function shippedOrders (){
        return Inertia::render('Seller/ShippedOrders');
    }
    public function completedOrders (){
        return Inertia::render('Seller/CompletedOrders');
    }
  
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
