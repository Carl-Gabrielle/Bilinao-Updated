<?php

namespace App\Http\Controllers;

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
                "user_id" => Auth()->id(),
                "name" => $request->name,
                'email' => Auth()->user()->email,
                'remarks' => 'pending',
                'phone' => $request->phone_no,
                'shipping_address' => $request->shipping_address,
                'shipping_fee' => $request->shipping_fee,
                'landmark' => $request->landmark,
                'payment' => $request->payment_method,
                'amount' => $request->amount,
                'transaction_id' => 'testing transac id',
                'order_number' => 'order_number testing only to be  generated'
            ]);
            // Loop through products and create order items
            foreach ($request->products as $item) {
                $product = Product::find((int) $item['product_id']);
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'type' => $product->category_id,
                    'price' => $product->price,
                    'qty' => $item['qty'],
                    'total_price' => $product->price * (int) $item['qty'],
                ]);
            }
            // Commit the transaction
            DB::commit();

            return redirect()->route('customer.completeOrders');

        } catch (\Exception $e) {
            DB::rollBack();
            dd($e->getMessage());
            return back()->with("error", $e->getMessage());
        }
    }

}
