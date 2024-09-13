<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function carts()
    {
        $carts = Cart::with('product')->where('user_id', Auth::id())->get();
        return Inertia::render('Customer/Carts', [
            'carts' => $carts,
        ]);
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
        // Ensure the user is authenticated
        if (!auth()->check()) {
            return redirect()->route('login')->with('error', 'You must be logged in to add items to the cart.');
        }
    
        // Validate incoming request
        $validatedData = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);
    
        $user = auth()->user();
        $product_id = $validatedData['product_id'];
        $quantity = $validatedData['quantity'];
    
        // Check if the product already exists in the cart
        $existingCart = Cart::where('user_id', $user->id)
                            ->where('product_id', $product_id)
                            ->first();
    
        if ($existingCart) {
            // Increment the quantity if the product already exists in the cart
            $existingCart->quantity += $quantity;
            $existingCart->save();
        } else {
            // Create a new cart entry if the product is not in the cart
            Cart::create([
                'user_id' => $user->id,
                'product_id' => $product_id,
                'quantity' => $quantity,
            ]);
        }
    
        // Redirect back with success message
        return redirect()->back()->with('success', 'Product added to cart successfully!');
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartRequest $request, Cart $cart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        //
    }
}
