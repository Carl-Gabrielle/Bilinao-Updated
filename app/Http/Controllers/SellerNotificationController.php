<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Inertia\Inertia;

class SellerNotificationController extends Controller
{
    public function show($orderId)
    {
        $order = Order::findOrFail($orderId);
        $products = OrderItem::where('order_id', $order->id)->get();

        return Inertia::render('Seller/SellerNotification', [
            'order' => $order,
            'products' => $products,
        ]);
    }
}
