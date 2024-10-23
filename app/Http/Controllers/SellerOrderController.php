<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Seller;
use App\Models\Notifications;
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
            return redirect()->route('seller.RecentOrders')->with('error', 'Order not found.');
        }
        return Inertia::render('Seller/OrderDetails', [
            'order' => $order,
            'orderItems' => $order->orderItems, 
        ]);
    } 
    public function proceedOrder($orderId)
    {
        $order = Order::find($orderId);
    
        if (!$order) {
            return redirect()->route('seller.RecentOrders')->with('error', 'Order not found.');
        }
        $order->remarks = 'on process';
        $order->save();
        Notifications::create([
            'user_id' => $order->user_id, 
            'message' => 'Your order is being processed!',
            'link' => 'customer.orders', // Ensure this link points to the correct route
            'status' => 'unread',
        ]);
        return redirect()->route('seller.RecentOrders')->with('success', 'Order has been moved to on process.');
    }
    public function recentOrders()
    {
        $sellerId = Auth::id(); 
        $recentOrders = Order::where('remarks', 'paid')
            ->whereHas('orderItems', function ($query) use ($sellerId) {
                $query->whereIn('product_id', function ($subQuery) use ($sellerId) {
                    $subQuery->select('id')->from('products')->where('seller_id', $sellerId);
                });
            })
            ->with(['orderItems.product.images'])
            ->orderBy('updated_at', 'desc') 
            ->paginate(8); 
        $firstProduct = $recentOrders->isNotEmpty() ? $recentOrders->first()->orderItems->first() : null;
        $totalOrdersCount = Order::where('remarks', 'on process')
        ->whereHas('orderItems', function ($query) use ($sellerId) {
            $query->whereIn('product_id', function ($subQuery) use ($sellerId) {
                $subQuery->select('id')->from('products')->where('seller_id', $sellerId);
            });
        })
        ->count();
        return Inertia::render('Seller/RecentOrders', [
            'success' => session('success'),
            'recentOrders' => $recentOrders,
            'firstProduct' => $firstProduct, 
            'totalOrdersCount' => $totalOrdersCount,
        ]);
    }
    
    
    public function processOrders()
    {
        $sellerId = Auth::id(); 
    
        // Fetching process orders using the same approach as recentOrders
        $processOrders = Order::where('remarks', 'on process')
            ->whereHas('orderItems', function ($query) use ($sellerId) {
                $query->whereIn('product_id', function ($subQuery) use ($sellerId) {
                    $subQuery->select('id')->from('products')->where('seller_id', $sellerId);
                });
            })
            ->with(['orderItems.product.images'])
            ->orderBy('updated_at', 'desc')
            ->paginate(8); 
    
     
        $firstProduct = $processOrders->isNotEmpty() ? $processOrders->first()->orderItems->first() : null;

        $totalOrdersCount = Order::where('remarks', 'on process')
        ->whereHas('orderItems', function ($query) use ($sellerId) {
            $query->whereIn('product_id', function ($subQuery) use ($sellerId) {
                $subQuery->select('id')->from('products')->where('seller_id', $sellerId);
            });
        })
        ->count();
        return Inertia::render('Seller/ProcessOrders', [
            'processOrders' => $processOrders, 
            'firstProduct' => $firstProduct, 
            'totalOrdersCount' => $totalOrdersCount,
        ]);
    }
    
    
    public function shippedOrders (){
        return Inertia::render('Seller/ShippedOrders');
    }
    public function completedOrders (){
        return Inertia::render('Seller/CompletedOrders');
    }
}
