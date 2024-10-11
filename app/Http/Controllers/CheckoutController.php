<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            "shipping_address" => "required",
            "landmark" => "required",
        ]);
        
        try {
            DB::beginTransaction();
            
            // Create order
            $order = Order::create([
                "user_id" => Auth::id(),
                "name" => $request->name,
                'email' => Auth::user()->email,
                'remarks' => 'pending',
                'phone' => $request->phone_no,
                'shipping_address' => $request->shipping_address,
                'shipping_fee' => $request->shipping_fee,
                'landmark' => $request->landmark,
                'payment' => $request->payment_method,
                'amount' => $request->amount,
                'transaction_id' => 'testing transac id',
                'order_number' => 'order_number testing only to be generated'
            ]);

            // Loop through products and create order items
            foreach ($request->products as $item) {
                $product = Product::find((int) $item['product_id']);
                
                // Check if stock is available
                if ($product->stock < (int) $item['qty']) {
                    throw new \Exception("Not enough stock for product: {$product->name}");
                }

                // Create order item
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'type' => $product->category_id,
                    'price' => $product->price,
                    'qty' => $item['qty'],
                    'total_price' => $product->price * (int) $item['qty'],
                ]);

                // Decrement product stock
                $product->stock -= (int) $item['qty'];
                $product->save();
            }

            // Commit the transaction
            DB::commit();

            return redirect()->route('customer.completeOrders')->with('success', 'Order placed successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Checkout Error: ' . $e->getMessage());
            return back()->with("error", $e->getMessage());
        }
    }
}
