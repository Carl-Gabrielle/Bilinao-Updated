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
    public function orderDetails($orderId)
    {
        
        $order = Order::where('id', $orderId)
                    ->with(['orderItems.product.images']) 
                    ->first();
        if (!$order) {
            return redirect()->route('seller.pendingOrders')->with('error', 'Order not found.');
        }
        return Inertia::render('Seller/OrderDetails', [
            'order' => $order,
            'orderItems' => $order->orderItems, 
        ]);
    } 
    public function pendingOrders()
    {
        $sellerId = Auth::id(); 
        $pendingOrders = Order::where('remarks', 'pending')
            ->whereHas('orderItems', function ($query) use ($sellerId) {
                $query->whereIn('product_id', function ($subQuery) use ($sellerId) {
                    $subQuery->select('id')->from('products')->where('seller_id', $sellerId);
                });
            })
            ->with(['orderItems.product.images'])
            ->orderBy('updated_at', 'desc') 
            ->paginate(8); 
    
        // Get the first product from the most updated order
        $firstProduct = $pendingOrders->isNotEmpty() ? $pendingOrders->first()->orderItems->first() : null;
    
        return Inertia::render('Seller/PendingOrders', [
            'pendingOrders' => $pendingOrders,
            'firstProduct' => $firstProduct, // Pass the first product to the view
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
