import React from 'react';
import { FaPesoSign } from 'react-icons/fa6';

const OrderItems = ({ order, orderItems }) => {
    const getOrderStatus = () => {
        const item = orderItems[0];
        if (item.processing_date === null) {
            return { status: "Pending", style: "bg-red-200 text-red-800" };
        }
        else if (item.picked_date === null) {
            return { status: "On Process", style: "bg-yellow-200 text-yellow-800" };
        }
        else if (item.shipped_date === null) {
            return { status: "To Ship", style: "bg-blue-200 text-blue-800" };
        }
        else if (item.arrived_date === null) {
            return { status: "Arriving", style: "bg-purple-200 text-purple-800" };
        }
        else if (item.received_date !== null) {
            return { status: "Received", style: "bg-green-200 text-green-800" };
        }
        else if (item.arrived_date !== null) {
            return { status: "Out for Delivery", style: "bg-orange-200 text-orange-800" };
        }
    };



    const orderStatus = getOrderStatus();

    return (
        <div>
            <h2 className="text-base font-semibold text-slate-800 flex items-center space-x-2 mb-4">
                <span>Order Status:</span>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${orderStatus.style}`}>
                    {orderStatus.status}
                </span>
            </h2>
            {orderItems.map((item) => (
                <div key={item.id} className="border p-2 rounded-md shadow-sm my-4">
                    <span className="text-[0.7em] text-slate-500">Order# {order.order_number}</span>
                    <div className="flex items-center space-x-6">
                        <img
                            src={`/storage/${item.product.images[0]?.image_path}`}
                            alt={item.product_name}
                            className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="text-xs text-gray-700 space-y-0.5">
                            <h3 className="font-semibold">{item.product_name}</h3>
                            <span className="inline-block bg-green-100 text-green-600 px-2 py-0.5 rounded">Qty. {item.qty}</span>
                            <span className="flex items-center">
                                Price: <FaPesoSign />
                                {parseFloat(item.price).toFixed(2) || 0.0}{" "}
                            </span>
                            <span className="flex items-center">
                                Shipping Fee: <FaPesoSign />
                                {parseFloat(item.shipping_fee_individual || 0).toFixed(2)}
                            </span>
                            <span className="flex items-center font-semibold">
                                Total: <FaPesoSign />
                                {(
                                    parseFloat(item.price) * item.qty +
                                    parseFloat(item.shipping_fee_individual || 0) * item.qty
                                ).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
            <div className="border-t border-gray-300 mt-4 pt-4">
                <div className="text-sm text-gray-700">
                    <div className="flex justify-between mt-2 font-semibold text-gray-900">
                        <span>Order Total:</span>
                        <span className="flex items-center">
                            <FaPesoSign />
                            {orderItems.reduce((total, item) =>
                                total + (
                                    (parseFloat(item.price) * item.qty) +
                                    (parseFloat(item.shipping_fee_individual || 0) * item.qty)
                                ), 0
                            ).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderItems;
