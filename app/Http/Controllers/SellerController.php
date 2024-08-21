<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;

use App\Models\Seller;
use App\Http\Requests\StoreSellerRequest;
use App\Http\Requests\UpdateSellerRequest;
use App\Http\Resources\SellerResource;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SellerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Seller::query();
        $category = $query->paginate(10);
        return Inertia('Admin/Seller/SellerIndex',[
            'seller' => SellerResource::collection($category),
            'success'=>session('success'),
        ]);  
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia('Admin/Seller/SellerCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSellerRequest $request)
    {
        $year = date('y'); 
        $prefix = 'BN-';
        $randomNumber = str_pad(mt_rand(0, 9999), 4, '0', STR_PAD_LEFT); 
        $username = "{$year}-{$prefix}{$randomNumber}";
        $password = $username;
        $seller = Seller::create([
            'name' => $request->input('name'),
            'address' => $request->input('address'),
            'contact_number' => $request->input('contact_number'),
            'email' => $request->input('email'),
            'username' => $username,
            'password' => Hash::make($password),
        ]);
        // Redirect with a success message
        return redirect()->route('seller.index')->with('success', 'Seller created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Seller $seller)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Seller $seller)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSellerRequest $request, Seller $seller)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Seller $seller)
    {
        //
    }
}
