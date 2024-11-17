<?php

namespace App\Http\Controllers;
use App\Models\DailySalesReport;
use App\Models\MonthlySalesReport;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
class CustomerOrderController extends Controller
{
    public function orders()
    {
        $orders = Order::with('orderItems.product.images', 'orderItems.product.seller')
            ->where('user_id', Auth::id())
            ->orderBy('updated_at', 'asc')
            ->get();
        return Inertia::render('Customer/Orders', [
            'orders' => $orders,
        ]);
    }
    public function cancelOrder(Request $request, $orderId)
    {
        $order = Order::where('id', $orderId)->where('user_id', Auth::id())->first();

        if ($order) {
            $order->orderItems()->delete();

            $order->delete();
            return redirect()->back()->with('success', 'Order has been canceled successfully.');
        }
        return redirect()->back()->with('error', 'Order not found or you do not have permission to cancel this order.');
    }


    public function completePayment()
    {

    }

    public function markAsReceived($id)
    {
        $order = Order::where('id', $id)->where('user_id', Auth::id())->with('orderItems')->first();
        try {
            DB::beginTransaction();
            if ($order) {
                foreach ($order->orderItems as $item) {
                    $item->received_date = Carbon::now();
                    $item->save();

                    $report = DailySalesReport::where('order_item_id', $item->id)->firstOrFail();
                    $report->update([
                        'status' => 'ready_to_pay'
                    ]);

                    $firstDayOfTheMonth = Carbon::now()->startOfMonth()->toDateString();

                    $monthlyReport = MonthlySalesReport::firstOrCreate(
                        [
                            'seller_id' => $report->seller_id,
                            'month_date' => $firstDayOfTheMonth,
                        ]
                        ,
                        [
                            'total_net_sales' => 0,
                            'total_contribution' => 0,
                        ]
                    );

                    $monthlyReport->increment('total_net_sales', $report->net_sales_amount);
                    $monthlyReport->increment('total_contribution', $report->contribution);
                }

                DB::commit();
                return back()->with('message', 'Order marked as received.');
            }

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['Order not found or access denied.']);

        }
    }

}
