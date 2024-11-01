// ToPay.jsx
import React from "react";
import { FaPesoSign } from "react-icons/fa6";
import logo from "../Illustrations/LOGO.png";

export default function ToPay({ orders = [] }) { // Default to an empty array
    return (
        <div className="px-1">
            <div>
                <div className="flex items-center space-x-3">
                    <h2 className="text-md flex font-semibold text-slate-800">
                        Orders To Pay
                    </h2>
                    <span className="px-3 py-1 text-slate-800 bg-slate-500 bg-opacity-30 backdrop-blur-md  text-sm font-medium rounded-md">
                        {orders.length} {/* This will now safely access length */}
                    </span>
                    {orders.length > 0 && <span> Order #{orders[0].id}</span>} {/* Access order number safely */}
                </div>
                <p className="text-slate-600 text-xs">
                    Review your orders and complete the payment process to secure your products.
                </p>
                <hr className="border-slate-300 my-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {orders.map((order) => (
                        <div key={order.id} className="col-span-2 h-28 flex items-center justify-between border border-slate-400 p-2 rounded-lg mt-2">
                            <img
                                src={logo}
                                alt=""
                                className="sm:size-20 size-10 object-cover rounded"
                            />
                            <div className="ml-4 text-md text-slate-800 font-medium">
                                <h3>{order.product_name}</h3> {/* Adjust based on your order structure */}
                                <span className="text-sm">Qty. {order.quantity}</span> {/* Adjust based on your order structure */}
                            </div>
                            <div>
                                <span className="flex items-center">
                                    <FaPesoSign className="mr-1" />
                                    {order.total_price} {/* Adjust based on your order structure */}
                                </span>
                            </div>
                        </div>
                    ))}
                    {/* Add subtotal, shipping fee, total price here based on your orders */}
                </div>
            </div>
        </div>
    );
}
