<?php
namespace App\Mail;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SellerNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $order;
    public $products;

    /**
     * Create a new message instance.
     */
    public function __construct(Order $order, array $products)
    {
        $this->order = $order;
        $this->products = $products;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        $url = route('seller.notification', ['order' => $this->order->id]);

        return $this->subject('New Order Notification')
            ->html("
                <h1>New Order Received</h1>
                <p><strong>Order ID:</strong> {$this->order->order_number}</p>
                <p><strong>Total Amount:</strong> PHP {$this->order->amount}</p>
                <p><a href='{$url}'>View Order Details</a></p>
            ");
    }
}
