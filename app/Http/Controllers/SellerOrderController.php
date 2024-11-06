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
            ->where('remarks', 'paid')
            ->whereNull('processing_date');
        })
        ->orderBy('updated_at', 'desc') 
        ->paginate(8); 
    
        $firstProduct = $recentOrders->isNotEmpty() ? $recentOrders->first()->orderItems->first() : null;
    
        return Inertia::render('Seller/RecentOrders', [
            'success' => session('success'),
            'recentOrders' => $recentOrders,
            'firstProduct' => $firstProduct, 
        ]);
    }
    public function markOrderAsProcessing($orderId)
    {
        $order = Order::with('orderItems')->find($orderId);
        if (!$order) {
            return redirect()->route('seller.RecentOrders')->with('error', 'Order not found.');
        }
    
        foreach ($order->orderItems as $orderItem) {
            $orderItem->processing_date = now();
            $orderItem->save();
        }
    
        return redirect()->route('seller.OrderDetails', $orderId)
            ->with('success', 'Order item is now being processed');
    }
    
    public function handleOrderProcessing()
    {
        $sellerId = Auth::id(); 
    
        $processingOrders = Order::whereHas('orderItems', function ($query) use ($sellerId) {
            $query->whereIn('product_id', function ($subQuery) use ($sellerId) {
                $subQuery->select('id')->from('products')->where('seller_id', $sellerId);
            })
            ->whereNotNull('processing_date')
            ->whereNull('picked_date');
        })
        ->with(['orderItems.product.images'])
        ->orderBy('updated_at', 'desc') 
        ->paginate(8); 
    
        $firstProduct = $processingOrders->isNotEmpty() ? $processingOrders->first()->orderItems->first() : null;
    
        return Inertia::render('Seller/ProcessingOrders', [
            'success' => session('success'),
            'processingOrders' => $processingOrders,
            'firstProduct' => $firstProduct, 
        ]);
    }
    public function markOrderAsPicked($orderId){
        $order = Order::with('orderItems')->find($orderId);
        if (!$order) {
            return redirect()->route('seller.ProcessingOrders')->with('error', 'Order not found.');
        }
        foreach ($order->orderItems as $orderItem) {
            $orderItem->picked_date = now();
            $orderItem->save();
        }
    
        return redirect()->route('seller.OrderDetails', $orderId)
        ->with('success', 'Order item is now being processed');
    }
    
    public function toShipOrders (){
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
    
        return Inertia::render('Seller/ToShipOrders', [
            'success' => session('success'),
            'shippedOrders' => $shippedOrders,
            'firstProduct' => $firstProduct, 
        ]);
    }
    public function markOrderAsShipped(Request $request, $orderId)
    {
        $request->validate([
            'tracking_code' => 'required|numeric|digits:12',
        ]);
    
        $order = Order::with('orderItems')->find($orderId);
    
        if (!$order) {
            return redirect()->route('seller.toShipOrders')->with('error', 'Order not found.');
        }
    
        $order->tracking_code = $request->tracking_code;
        $order->save();
    
        foreach ($order->orderItems as $orderItem) {
            $orderItem->shipped_date = now();
            $orderItem->save();
        }
    
    
        Notifications::create([
            'user_id' => $order->user_id,
            'message' => 'Your order has been shipped!',
            'link' => 'customer.orders',
            'status' => 'unread',
        ]);
    
        return redirect()->route('seller.OrderDetails', $orderId)
            ->with('success', 'Order item has been successfully shipped out');
    }
    
public function arrivingOrders(){
    $sellerId = Auth::id(); 
    
        $arrivedOrders = Order::whereHas('orderItems', function ($query) use ($sellerId) {
            $query->whereIn('product_id', function ($subQuery) use ($sellerId) {
                $subQuery->select('id')->from('products')->where('seller_id', $sellerId);
            })
            ->whereNull('arrived_date') 
            ->whereNotNull('processing_date') 
            ->whereNotNull('picked_date') 
            ->whereNotNull('shipped_date');
        })
        ->with(['orderItems.product.images'])
        ->orderBy('updated_at', 'desc') 
        ->paginate(8); 
    
        $firstProduct = $arrivedOrders->isNotEmpty() ? $arrivedOrders->first()->orderItems->first() : null;
    
        return Inertia::render('Seller/ArrivingOrders', [
            'success' => session('success'),
            'arrivedOrders' => $arrivedOrders,
            'firstProduct' => $firstProduct, 
        ]);
}
public function markOrderAsArrived($orderId){
    $order = Order::with('orderItems')->find($orderId);
    if (!$order) {
        return redirect()->route('seller.arrivedOrders')->with('error', 'Order not found.');
    }
    foreach ($order->orderItems as $orderItem) {
        $orderItem->arrived_date = now();
        $orderItem->save();
    }

    // Notifications::create([
    //     'user_id' => $order->user_id,
    //     'message' => 'Your order has been arrived at local facility!',
    //     'link' => 'customer.orders',
    //     'status' => 'unread',
    // ]);
    return redirect()->route('seller.OrderDetails', $orderId)
    ->with('success', 'Order item has been successfully arrived');

}
    public function deliveryOrders(){
        $sellerId = Auth::id(); 
    
        $deliveryOrders = Order::whereHas('orderItems', function ($query) use ($sellerId) {
            $query->whereIn('product_id', function ($subQuery) use ($sellerId) {
                $subQuery->select('id')->from('products')->where('seller_id', $sellerId);
            })
            ->whereNotNull('arrived_date')
            ->whereNull('received_date');
        })
        ->with(['orderItems.product.images'])
        ->orderBy('updated_at', 'desc') 
        ->paginate(5); 
    
        $firstProduct = $deliveryOrders->isNotEmpty() ? $deliveryOrders->first()->orderItems->first() : null;
    
        return Inertia::render('Seller/OutForDelivery', [
            'success' => session('success'),
            'deliveryOrders' => $deliveryOrders,
            'firstProduct' => $firstProduct, 
        ]);
    }
    public function completedOrders (){
        $sellerId = Auth::id(); 
    
        $completedOrders = Order::whereHas('orderItems', function ($query) use ($sellerId) {
            $query->whereIn('product_id', function ($subQuery) use ($sellerId) {
                $subQuery->select('id')->from('products')->where('seller_id', $sellerId);
            })
            ->whereNotNull('received_date');
        })
        ->with(['orderItems.product.images'])
        ->orderBy('updated_at', 'desc') 
        ->paginate(5); 
    
        $firstProduct = $completedOrders->isNotEmpty() ? $completedOrders->first()->orderItems->first() : null;
    
        return Inertia::render('Seller/CompletedOrders', [
            'success' => session('success'),
            'completedOrders' => $completedOrders,
            'firstProduct' => $firstProduct, 
        ]);
    }
}
