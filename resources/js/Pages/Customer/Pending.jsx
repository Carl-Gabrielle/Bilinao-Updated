import React from "react";
import { FaPesoSign } from "react-icons/fa6";
import ShippingDetails from "@/Components/ShippingDetails";
import { Link } from '@inertiajs/react';

export default function Pending({ Pending }) {
    return (
        <div className="px-4 py-6 bg-white shadow-lg rounded-lg">
            {Pending.length > 0 ? (
                <>
                    <header className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-800">Orders Awaiting Shipment</h2>
                        <span className="px-4 py-1 text-sm font-semibold text-yellow-800 bg-yellow-200 rounded-md bg-opacity-30">
                            {Pending.length}
                        </span>
                    </header>
                    <p className="text-sm text-slate-600 mb-4">
                        Your order is being prepared and will be shipped soon.
                    </p>
                    <hr className="my-2 border-slate-300" />
                </>
            ) : (
                <p className="text-center  text-slate-500">No pending orders at this moment.</p>
            )}
            {Pending.length > 0 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {Pending.map((order, index) => {
                        const subtotal = order.order_items.reduce((acc, item) => acc + item.price * item.qty, 0);
                        return (
                            <div key={index} className="p-4 rounded-2xl border border-slate-300 flex flex-col">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-500 bg-slate-100 px-4 py-0.5 rounded-2xl">
                                        Order Number: <span>{order.order_number}</span>
                                    </span>
                                </div>
                                <div className="flex-grow mb-4">
                                    {order.order_items.map((item, itemIndex) => {
                                        const imagePath = item.product.images[0]?.image_path;
                                        const imageUrl = imagePath ? `/storage/${imagePath}` : '/path/to/default-image.jpg';
                                        return (
                                            <div key={itemIndex} className="flex items-center justify-between mt-3">
                                                <img
                                                    src={imageUrl}
                                                    alt={item.product.name}
                                                    className="object-cover rounded-md w-24 h-24 border-2 border-slate-500"
                                                />
                                                <div className="ml-4 flex-grow">
                                                    <h3 className="font-semibold text-sm text-primary">{item.product.name}</h3>
                                                    <span className="text-sm text-slate-600">Qty. {item.qty}</span>
                                                </div>
                                                <div className="text-sm text-slate-800 flex items-center">
                                                    <FaPesoSign className="mr-1 text-sm" />
                                                    {item.price}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <ShippingDetails
                                    shippingFee={order.shipping_fee}
                                    subtotal={subtotal}
                                    total={order.amount}
                                />

                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
