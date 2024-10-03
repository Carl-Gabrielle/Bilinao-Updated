<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Cart;
use Illuminate\Http\Request;
use App\Models\Product;
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
    
    public function checkout(){
        $carts = Cart::with('product.images')->where('user_id', Auth::id())->get();
        return Inertia::render('Customer/Checkout', [
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
    // public function buyNow(Request $request)
    // {
    //     // Validate the incoming request data
    //     $validatedData = $request->validate([
    //         'product_id' => 'required|exists:products,id',
    //         'quantity' => 'required|integer|min:1',
    //     ]);
    
    //     // Get the authenticated user
    //     $user = Auth::user();
    //     $product_id = $validatedData['product_id'];
    //     $quantity = $validatedData['quantity'];
    
    //     // Find the product and get its details
    //     $product = Product::with('images')->find($product_id); // Assuming the product has images relation
    
    //     // Redirect to the checkout page with the product details
    //     return Inertia::render('Customer/Checkout', [
    //         'product' => $product,
    //         'quantity' => $quantity, // Pass the quantity for reference on the checkout page
    //     ]);
    // }
    public function buyNow(Request $request)
{
    $productId = $request->input('product_id');
    $quantity = $request->input('quantity');

    $product = Product::with('images')->find($productId);
    
    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }

    $productDetails = [
        'name' => $product->name,
        'price' => $product->price,
        'images' => $product->images, 
        'quantity' => $quantity,
    ];

    return Inertia::render('Customer/Checkout', [
        'product' => $productDetails,
    ]);
}

    
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);
    
        $user = auth()->user();
        $product_id = $validatedData['product_id'];
        $product = Product::find($product_id);
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
        return redirect()->back()->with('success', "  {$product->name} has been added to your cart!");
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
    public function update(Request $request, $id)
{
    $cartItem = Cart::findOrFail($id);
    $cartItem->quantity = $request->input('quantity');
    $cartItem->save();

    return response()->json(['message' => 'Cart updated successfully']);
}

    
    // Destroy the cart 
public function destroy($id)
{
    $cartItem = Cart::where('id', $id)->where('user_id', Auth::id())->first();

    if ($cartItem) {
        $cartItem->delete();
    }
    return Inertia::render('Customer/Carts');
}
}