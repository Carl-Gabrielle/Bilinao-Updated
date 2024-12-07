import React from "react";
import { FaPesoSign } from "react-icons/fa6";
import ShippingDetails from "@/Components/ShippingDetails";
import { IoStorefrontOutline } from "react-icons/io5";
import ShipmentDetailsToggle from "@/Components/ShipmentDetailsToggle";
import { LuTruck } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from '@inertiajs/react';

export default function ToReceive({ receivedData }) {
    return (
        <div className="px-4 py-6 bg-white shadow-lg rounded-lg">
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800">Received Orders </h2>
                <span className="px-4 py-1 text-sm font-semibold text-green-800 bg-green-200 rounded-md bg-opacity-30">
                    {receivedData.length}
                </span>
            </header>
            <hr className="my-2 border-slate-300" />
            {receivedData.length === 0 ? (
                <p className="text-center text-slate-500">No received orders at this moment.</p>
            ) : (

                <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto mt-6">
                    {receivedData.map((order, index) => {
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
                                    <span className="bg-green-200 text-green-800 text-sm font-semibold  px-3 py-0.5 rounded-full">
                                        Received
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
                                                                className="object-cover rounded-md w-16 h-16 border border-slate-400"
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
                                                        <hr className="mt-2" />
                                                        <ShippingDetails
                                                            shippingFee={order.shipping_fee}
                                                            subtotal={subtotal}
                                                            total={order.amount}
                                                        />
                                                        <div className="flex items-center justify-end w-full mt-4 space-x-5">
                                                            <Link
                                                                href={route('customer.review', { orderItemId: item.id })}
                                                                className="px-4 py-2 text-sm text-white bg-primary rounded-md transition-colors duration-200 hover:bg-slate-900"
                                                            >
                                                                Review
                                                            </Link>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </>
                                    )}
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
