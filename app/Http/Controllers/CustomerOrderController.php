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
        $orders = Order::with('orderItems')
            ->where('user_id', Auth::id())
            ->get();


        return Inertia::render('Customer/Orders', [
            'orders' => $orders,
        ]);
    }

    // public  function  toPayOrders(){
//     return Inertia::render('Customer/ToPay');
// }
// public  function  toShipOrders(){
//     return Inertia::render('Customer/ToShip');
// }
// public  function  toReceiveOrders(){
//     return Inertia::render('Customer/ToReceive');
// }
// public  function receivedOrders(){
//     return Inertia::render('Customer/Received');
// }



}
