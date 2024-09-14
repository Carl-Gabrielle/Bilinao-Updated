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
        $carts = Cart::with('product.images')->where('user_id', Auth::id())->get();
    
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
        $validatedData = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);
    
        $user = auth()->user();
        $product_id = $validatedData['product_id'];
        $quantity = $validatedData['quantity'];
    
        $existingCart = Cart::where('user_id', $user->id)
                            ->where('product_id', $product_id)
                            ->first();
    
        if ($existingCart) {
            $existingCart->quantity += $quantity;
            $existingCart->save();
        } else {
            Cart::create([
                'user_id' => $user->id,
                'product_id' => $product_id,
                'quantity' => $quantity,
            ]);
        }
        return redirect()->back()->with('success', 'Product added to cart successfully!');
    }
    
    public function updateQuantity(Request $request, $id)
    {
        $validatedData = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);
    
        $user = auth()->user();
        $quantity = $validatedData['quantity'];
    
        $cart = Cart::where('user_id', $user->id)
                    ->where('product_id', $id)
                    ->first();
    
        if ($cart) {
            $cart->quantity = $quantity;
            $cart->save();
        } else {
            return redirect()->back()->with('error', 'Cart item not found.');
        }
    
        return redirect()->back()->with('success', 'Cart quantity updated successfully!');
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
    // Destroy the cart 
    public function destroy($id)
    {
        $cartItem = Cart::where('user_id', Auth::id())->where('product_id', $id)->first();
    
        if ($cartItem) {
            $cartItem->delete();
        }
    
        $carts = Cart::with('product.images')->where('user_id', Auth::id())->get();
    
        return Inertia::render('Customer/Carts', [
            'carts' => $carts,
            'success' => 'Item removed from cart.',
        ]);
    }
}