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
    public function markOrderAsProcessing($orderId)
{
    $order = OrderItem::find($orderId);

    if (!$order) {
        return redirect()->route('seller.RecentOrders')->with('error', 'Order not found.');
    }

    $order->processing_date = now();
    $order->save(); 
    // Notifications::create([
    //     'user_id' => $order->user_id,
    //     'message' => 'Your order is being processed!',
    //     'link' => 'customer.orders',
    //     'status' => 'unread',
    // ]);
    return redirect()->route('seller.RecentOrders')->with('success',    'Order item is now being processed'  );
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
        $order = OrderItem::find($orderId);
        if (!$order) {
            return redirect()->route('seller.ProcessingOrders')->with('error', 'Order not found.');
        }
        $order->picked_date = now();
        $order->save(); 
        // Notifications::create([
        //     'user_id' => $order->user_id,
        //     'message' => 'Your order has been handed over to the courier for delivery!',
        //     'link' => 'customer.orders',
        //     'status' => 'unread',
        // ]);    
        return redirect()->route('seller.ProcessingOrders')->with('success',  'Order item has been marked as  picked up ');
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

    $orderItem = OrderItem::find($orderId);

    if (!$orderItem) {
        return redirect()->route('seller.toShipOrders')->with('error', 'Order not found.');
    }
    $order = $orderItem->order;
    if (!$order) {
        return redirect()->route('seller.toShipOrders')->with('error', 'Related order not found.');
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
    return redirect()->route('seller.toShipOrders')->with('success', 'Order item has been successfully shipped out');
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
    $order = OrderItem::find($orderId);
    if (!$order) {
        return redirect()->route('seller.arrivedOrders')->with('error', 'Order not found.');
    }
    $order->arrived_date = now();
    $order->save(); 
    // Notifications::create([
    //     'user_id' => $order->user_id,
    //     'message' => 'Your order has been arrived at local facility!',
    //     'link' => 'customer.orders',
    //     'status' => 'unread',
    // ]);
    return redirect()->route('seller.arrivingOrders')->with('success', 'Order item has successfully arrived');
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
        return Inertia::render('Seller/CompletedOrders');
    }
}
