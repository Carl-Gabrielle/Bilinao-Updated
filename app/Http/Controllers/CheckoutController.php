<?php

namespace App\Http\Controllers;
use App\Models\Cart;
use App\Models\DailySalesReport;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\Notifications;
use App\Models\OrderItem;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Luigel\Paymongo\Facades\Paymongo;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    public function completeOrders(Request $request)
    {
        $order = Order::where('user_id', Auth::id())
            ->where('transaction_id', $request->transac_id)
            ->with('orderItems.product.seller')
            ->firstOrFail();

        $checkout = Paymongo::checkout()->find($order->payment_src_id);

        if ($checkout->payments[0]['attributes']['status'] == 'paid') {
            $order->update([
                'remarks' => 'paid',
                'checkout_session_url' => ''
            ]);

            Notifications::create([
                'user_id' => Auth::id(),
                'message' => 'Your order has been placed successfully!',
                'link' => 'customer.orders',
                'status' => 'unread',
            ]);
        }

        if (!$order) {
            return redirect()->route('customer.products')->with('error', 'No orders found, explore our products.');
        }

        $orderItems = $order->orderItems;

        foreach ($order->orderItems as $data) {
            $contribution = $data->price * 0.04;
            DailySalesReport::firstOrCreate([
                'order_item_id' => $data->id,
                'net_sales_amount' => $data->price - $contribution,
                'contribution' => $contribution,
                'status' => 'unpaid'
            ]);
        }
        // dd(json_encode($order->orderItems, JSON_PRETTY_PRINT));

        return Inertia::render('Customer/CompleteOrders', [
            'order' => $order,
            'orderItems' => $orderItems,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            "shipping_address" => "required",
            "landmark" => "required",
        ]);
        try {
            DB::beginTransaction();
            // Create order

            // dd($request->all());
            $transac_id = 'Bilinao-' . uniqid();
            $order = Order::create([
                "user_id" => Auth::id(),
                "name" => $request->name,
                'email' => Auth::user()->email,
                'remarks' => 'to pay',
                'phone' => $request->phone_no,
                'shipping_address' => $request->shipping_address,
                'shipping_fee' => $request->shipping_fee,
                'landmark' => $request->landmark,
                'payment' => $request->payment_method,
                'amount' => $request->total_amount,
                'transaction_id' => $transac_id,
                'order_number' => 'ORDER-' . strtoupper(Str::random(10))
            ]);

            $line_items = [];
            // Loop through products and create order items
            if ($request->products == null) {
                dd('no product found');
            } else {
                foreach ($request->products as $item) {

                    $product = Product::find((int) $item['product_id']);

                    // Create order item
                    $orderItem = OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'product_name' => $product->name,
                        'type' => $product->category_id,
                        'price' => $product->price,
                        'qty' => $item['qty'],
                        'shipping_fee_individual' => $item['shipping'],
                        'total_price' => $product->price * (int) $item['qty'] + $item['shipping'],
                    ]);
                    $amountInCentavos = (int) ($product->price * (int) $item['qty']) * 100;

                    $line_items[] = [
                        'name' => $product->name,
                        'quantity' => (int) $item['qty'],
                        'amount' => $amountInCentavos,
                        'currency' => 'PHP',
                        'description' => 'Buying product for order id ' . $product->name,
                    ];

                    if ($item['cart_id']) {
                        $cart = Cart::find($item['cart_id']);
                        $cart->delete();
                    }
                }
            }
            $line_items[] = [
                'name' => 'Shipping Fee',
                'quantity' => 1,
                'amount' => (int) $request->shipping_fee * 100,
                'currency' => 'PHP',
                'description' => 'Total shipping fee for order',
            ];
            // dd($line_items);

            // dd($line_items);
            $checkout = Paymongo::checkout()->create([
                'cancel_url' => route('customer.orders'),
                'billing' => [
                    'name' => $request->name,
                    'email' => Auth::user()->email,
                    'phone' => $request->phone_no,
                ],
                'description' => $transac_id,
                'line_items' => $line_items,
                'payment_method_types' => [
                    $request->payment_method,
                ],
                'success_url' => route('customer.completeOrders', ['transac_id' => $transac_id]),
                'statement_descriptor' => 'Bilinao Inc.',
                'metadata' => [
                    'Key' => 'Value'
                ]
            ]);

            $order->update([
                'payment_src_id' => $checkout->id,
                'checkout_session_url' => $checkout->checkout_url
            ]);
            // Decrement the stock for each product in the order items
            // foreach ($request->products as $item) {
            //     $product = Product::find((int) $item['product_id']);
            //     $product->decrement('stock', (int) $item['qty']);
            // }
            //     // dd($checkout);
            DB::commit();

            return Inertia::location($checkout->checkout_url);
            // return Inertia::location($gcashSource->redirect['checkout_url']);
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e->getMessage());
            return back()->with("error", $e->getMessage());
        }
    }
}
