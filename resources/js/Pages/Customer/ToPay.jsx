import React from "react";
import { FaPesoSign } from "react-icons/fa6";
import { TbCreditCardPay } from "react-icons/tb";
import { IoStorefrontOutline } from "react-icons/io5";
import { LuTruck } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";
import ShippingDetails from "@/Components/ShippingDetails";
import { Link } from "@inertiajs/react";

export default function ToPay({ toPay }) {
    return (
        <div className="px-4 py-6 bg-white shadow-lg rounded-lg">
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800">Orders To Pay</h2>
                <span className="px-4 py-1 text-sm font-semibold text-red-800 bg-red-200 rounded-md bg-opacity-30">
                    {toPay.length}
                </span>
            </header>
            <hr className="my-4 border-slate-300" />
            {toPay.length === 0 ? (
                <p className="text-center text-slate-500">No orders to pay at this moment.</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto mt-6">
                    {toPay.map((order, index) => {
                        const subtotal = order.order_items.reduce((acc, item) => acc + item.price * item.qty, 0);
                        return (
                            <div key={index} className="p-4 rounded-2xl border border-slate-300 flex flex-col">
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={route("seller.public.profile", { seller: order.order_items[0]?.product.seller.id })}
                                    >
                                        <span className="text-xs inline-flex items-center text-slate-700 font-medium hover:text-slate-900 border bg-slate-200 shadow-inner px-2 py-0.5 rounded-full  transition-colors duration-200 ease-in-out">
                                            <IoStorefrontOutline className="mr-2" />
                                            <span>{order.order_items[0]?.product.seller.name || 'Unknown Seller'}</span>
                                            <MdKeyboardArrowRight />
                                        </span>
                                    </Link>
                                    <span className="bg-red-200  text-red-800 text-sm font-semibold px-3 py-0.5 rounded-full whitespace-nowrap">
                                        To Pay
                                    </span>
                                </div>
                                <div className="flex-grow mb-4">
                                    {order.order_items.map((item, itemIndex) => {
                                        const imagePath = item.product.images[0]?.image_path;
                                        const imageUrl = imagePath ? `/storage/${imagePath}` : '/path/to/default-image.jpg';
                                        return (
                                            <div key={itemIndex} >
                                                <div className="w-full h-auto flex items-center justify-between space-x-4 border text-xs text-primary p-2 border-slate-400 rounded-lg mt-3">
                                                    <div className="flex items-center space-x-4">
                                                        <div>
                                                            <TbCreditCardPay size={16} />
                                                        </div>
                                                        <p>Payment required to proceed with shipment</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between mt-3">
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
                                            </div>
                                        );
                                    })}
                                </div>
                                <ShippingDetails
                                    shippingFee={order.shipping_fee}
                                    subtotal={subtotal}
                                    total={order.amount}
                                />
                                <div className="flex items-center justify-end w-full mt-4 space-x-5">
                                    <Link
                                        preserveScroll
                                        href={route('orders.cancel', order.id)}
                                        method="post" className="px-4 py-2 text-sm text-primary border border-slate-400 rounded-md transition-colors duration-200 hover:bg-slate-100">
                                        Cancel Order
                                    </Link>
                                    <Link
                                        href={route('orders.complete', order.id)}
                                        method="post"
                                        className="px-4 py-2 text-sm text-white bg-primary rounded-md transition-colors duration-200 hover:bg-slate-900">
                                        Complete Payment
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
