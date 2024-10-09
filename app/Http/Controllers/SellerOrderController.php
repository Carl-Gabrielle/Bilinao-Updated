<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function pendingOrders (){
        return Inertia::render('Seller/PendingOrders');
    }
    public function processOrders (){
        return Inertia::render('Seller/ProcessOrders');
    }
    public function shippedOrders (){
        return Inertia::render('Seller/ShippedOrders');
    }
    public function completedOrders (){
        return Inertia::render('Seller/CompletedOrders');
    }
    public function orderDetails (){
        return Inertia::render('Seller/OrderDetails');
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
