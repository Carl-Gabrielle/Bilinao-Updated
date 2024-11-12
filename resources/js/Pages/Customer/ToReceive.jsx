import React from "react";
import { FaPesoSign } from "react-icons/fa6";
import ShippingDetails from "@/Components/ShippingDetails";
import { IoStorefrontOutline } from "react-icons/io5";
import ShipmentDetailsToggle from "@/Components/ShipmentDetailsToggle";
import { LuTruck } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from '@inertiajs/react';

export default function ToReceive({ toReceiveData }) {
    return (
        <div className="px-4 py-6 bg-white shadow-lg rounded-lg">
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800">Delivered Orders </h2>
                <span className="px-4 py-1 text-sm font-semibold text-orange-800 bg-orange-200 rounded-md bg-opacity-30">
                    {toReceiveData.length}
                </span>
            </header>
            <hr className="my-2 border-slate-300" />
            {toReceiveData.length === 0 ? (
                <p className="text-center text-slate-500">No delivered orders to receive at this moment.</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto mt-6">
                    {toReceiveData.map((order, index) => {
                        const subtotal = order.order_items.reduce((acc, item) => acc + item.price * item.qty, 0);
                        return (
                            <div key={index} className="p-4 rounded-2xl border border-slate-300 flex flex-col">
                                <div className="flex sm:items-center justify-between sm:flex-row flex-col items-start">
                                    <Link
                                        href={route("seller.public.profile", { seller: order.order_items[0]?.product.seller.id })}
                                    >
                                        <span className="text-xs inline-flex items-center text-slate-700 font-medium hover:text-slate-900 border bg-slate-200 shadow-inner px-2 py-0.5 rounded-full  transition-colors duration-200 ease-in-out">
                                            <IoStorefrontOutline className="mr-2" />
                                            <span>{order.order_items[0]?.product.seller.name || 'Unknown Seller'}</span>
                                            <MdKeyboardArrowRight />
                                        </span>
                                    </Link>
                                    <span className="bg-orange-200 text-orange-800 text-sm font-semibold  px-3 py-0.5 rounded-full">
                                        Delivered
                                    </span>
                                </div>
                                <div className="flex-grow mb-4">
                                    {order.order_items.length > 0 && (
                                        <>
                                            {order.order_items.length > 0 && (
                                                <ShipmentDetailsToggle
                                                    processingDate={order.order_items[0].processing_date}
                                                    pickedDate={order.order_items[0].picked_date}
                                                    shippedDate={order.order_items[0].shipped_date}
                                                    arrivedDate={order.order_items[0].arrived_date}
                                                    receivedDate={order.order_items[0].received_date}
                                                    address={order.shipping_address}
                                                />
                                            )}
                                            {order.order_items.map((item, itemIndex) => {
                                                const imagePath = item.product.images[0]?.image_path;
                                                const imageUrl = imagePath ? `/storage/${imagePath}` : '/path/to/default-image.jpg';
                                                const shippedDate = new Date(item.arrived_date).toLocaleString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                });
                                                return (
                                                    <div key={itemIndex} >
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
                                        </>
                                    )}
                                </div>
                                <ShippingDetails
                                    shippingFee={order.shipping_fee}
                                    subtotal={subtotal}
                                    total={order.amount}
                                />
                                <div className="flex items-center justify-end w-full mt-4">
                                    <div className="flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto">
                                        <Link
                                            preserveScroll
                                            href={route('orders.complete', order.id)}
                                            method="post"
                                            className="px-4 py-2 text-sm text-white bg-primary rounded-md text-center transition-colors duration-200  w-full sm:w-auto mb-4 sm:mb-0"
                                        >
                                            Order Received
                                        </Link>
                                        <Link
                                            // href={route('orders.complete', order.id)}
                                            className="px-4 py-2 text-sm border border-slate-500 rounded-md text-center transition-colors duration-200  w-full sm:w-auto"
                                        >
                                            Track Order
                                        </Link>
                                    </div>
                                </div>
                                <div className="mt-4 text-xs text-slate-600">
                                    <p className="flex items-center space-x-2">
                                        <span className=" text-red-600 bg-red-100 px-3 py-1 rounded-lg border border-red-300 font-medium text-nowrap">
                                            Please note:
                                        </span>
                                        <span>
                                            If the "Order Received" button is not clicked within 2 days from the delivery date, the order will automatically be marked as "Received" and moved to the "Received Orders" section.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )
            }
        </div>
    );
}
