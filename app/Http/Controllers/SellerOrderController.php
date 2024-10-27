<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;
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
    public function recentOrders()
    {
        $sellerId = Auth::id(); 
    
        $recentOrders = Order::whereHas('orderItems', function ($query) use ($sellerId) {
            $query->whereIn('product_id', function ($subQuery) use ($sellerId) {
                $subQuery->select('id')->from('products')->where('seller_id', $sellerId);
            })
            ->whereNull('processing_date');
        })
        ->with(['orderItems.product.images'])
        ->orderBy('updated_at', 'desc') 
        ->paginate(8); 
    
        $firstProduct = $recentOrders->isNotEmpty() ? $recentOrders->first()->orderItems->first() : null;
    
        return Inertia::render('Seller/RecentOrders', [
            'success' => session('success'),
            'recentOrders' => $recentOrders,
            'firstProduct' => $firstProduct, 
        ]);
    }
    public function proceedOrder($orderId)
{
    $order = OrderItem::find($orderId);

    if (!$order) {
        return redirect()->route('seller.RecentOrders')->with('error', 'Order not found.');
    }

    $order->processing_date = now();
    $order->save(); 

    return redirect()->route('seller.RecentOrders')->with('success', 'Order processing date has been updated.');
}
 public function pickedOrder($orderId){
    $order = OrderItem::find($orderId);
    if (!$order) {
        return redirect()->route('seller.processOrders')->with('error', 'Order not found.');
    }
    $order->picked_date = now();
    $order->save(); 
    return redirect()->route('seller.processOrders')->with('success', 'Order picked date has been updated.');
}

public function shippedOut(Request $request, $orderId)
{
    $request->validate([
        'tracking_code' => 'required|numeric|digits:12',
    ]);

    $orderItem = OrderItem::find($orderId);

    if (!$orderItem) {
        return redirect()->route('seller.processOrders')->with('error', 'Order not found.');
    }
    $order = $orderItem->order;
    if (!$order) {
        return redirect()->route('seller.processOrders')->with('error', 'Related order not found.');
    }
    $order->tracking_code = $request->tracking_code;
    $order->save();

    $orderItem->shipped_date = now();
    $orderItem->save();

    Notifications::create([
        'user_id' => $order->user_id,
        'message' => 'Your order has been shipped!',
        'link' => 'customer.orders',
        'status' => 'unread',
    ]);

    return redirect()->route('seller.shippedOrders')->with('success', 'Order tracking code updated successfully.');
}
public function arrivedOrder($orderId){
    $order = OrderItem::find($orderId);
    if (!$order) {
        return redirect()->route('seller.shippedOrders')->with('error', 'Order not found.');
    }
    $order->arrived_date = now();
    $order->save(); 
    Notifications::create([
        'user_id' => $order->user_id,
        'message' => 'Your order has been arrived at local facility!',
        'link' => 'customer.orders',
        'status' => 'unread',
    ]);
    return redirect()->route('seller.shippedOrders')->with('success', 'Order arrived date has been updated.');
}
public function arrivedOrders(){
    $sellerId = Auth::id(); 
    
        $arrivedOrders = Order::whereHas('orderItems', function ($query) use ($sellerId) {
            $query->whereIn('product_id', function ($subQuery) use ($sellerId) {
                $subQuery->select('id')->from('products')->where('seller_id', $sellerId);
            })
            ->whereNotNull('arrived_date');
        })
        ->with(['orderItems.product.images'])
        ->orderBy('updated_at', 'desc') 
        ->paginate(8); 
    
        $firstProduct = $arrivedOrders->isNotEmpty() ? $arrivedOrders->first()->orderItems->first() : null;
    
        return Inertia::render('Seller/ArrivedOrders', [
            'success' => session('success'),
            'arrivedOrders' => $arrivedOrders,
            'firstProduct' => $firstProduct, 
        ]);
}
    public function processOrders()
    {
        $sellerId = Auth::id(); 
    
        $processOrders = Order::whereHas('orderItems', function ($query) use ($sellerId) {
            $query->whereIn('product_id', function ($subQuery) use ($sellerId) {
                $subQuery->select('id')->from('products')->where('seller_id', $sellerId);
            })
            ->whereNotNull('processing_date')
            ->whereNull('picked_date');
        })
        ->with(['orderItems.product.images'])
        ->orderBy('updated_at', 'desc') 
        ->paginate(8); 
    
        $firstProduct = $processOrders->isNotEmpty() ? $processOrders->first()->orderItems->first() : null;
    
        return Inertia::render('Seller/ProcessOrders', [
            'success' => session('success'),
            'processOrders' => $processOrders,
            'firstProduct' => $firstProduct, 
        ]);
    }
    public function shippedOrders (){
        $sellerId = Auth::id(); 
    
        $shippedOrders = Order::whereHas('orderItems', function ($query) use ($sellerId) {
            $query->whereIn('product_id', function ($subQuery) use ($sellerId) {
                $subQuery->select('id')->from('products')->where('seller_id', $sellerId);
            })
            ->whereNotNull('picked_date')
            ->whereNull('shipped_date');
        })
        ->with(['orderItems.product.images'])
        ->orderBy('updated_at', 'desc') 
        ->paginate(8); 
    
        $firstProduct = $shippedOrders->isNotEmpty() ? $shippedOrders->first()->orderItems->first() : null;
    
        return Inertia::render('Seller/RecentOrders', [
            'success' => session('success'),
            'recentOrders' => $shippedOrders,
            'firstProduct' => $firstProduct, 
        ]);
    }

    public function completedOrders (){
        return Inertia::render('Seller/CompletedOrders');
    }
}
