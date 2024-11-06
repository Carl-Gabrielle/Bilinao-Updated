<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;
class CustomerOrderController extends Controller
{
    public function orders()
    {
        $orders = Order::with('orderItems.product.images','orderItems.product.seller')
            ->where('user_id', Auth::id())
            ->orderBy('updated_at', 'asc')
            ->get();
        return Inertia::render('Customer/Orders', [
            'orders' => $orders,
        ]);
    }
    public function cancelOrder(){

    }

    public function completePayment(){
        
    }

}
