<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CustomerOrderController extends Controller
{
    public  function orders(){
        return Inertia::render('Customer/Orders');
    }
    public  function  pendingOrders(){
        return Inertia::render('Customer/Pending');
}
public  function  toPayOrders(){
    return Inertia::render('Customer/ToPay');
}
public  function  toShipOrders(){
    return Inertia::render('Customer/ToShip');
}
public  function  toReceiveOrders(){
    return Inertia::render('Customer/ToReceive');
}
public  function receivedOrders(){
    return Inertia::render('Customer/Received');
}
}