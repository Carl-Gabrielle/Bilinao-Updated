import SellerLayout from "@/Layouts/SellerLayout";
import { FaPesoSign } from "react-icons/fa6";
import { Head } from "@inertiajs/react";
import SectionHeader from "@/Components/SectionHeader";
import ReadOnly from "@/Components/ReadOnly";
import SellerInput from "@/Components/SellerInput";

export default function OrderDetails({ auth, order, orderItems }) {
    const { user } = auth;
    // Calculate order total safely
    const orderTotal =
        orderItems.reduce(
            (total, item) => total + (parseFloat(item.total_price) || 0),
            0
        ) + (parseFloat(order?.shipping_fee) || 0);

    return (
        <SellerLayout user={user}>
            <Head title="Order Details" />
            <div className="container mx-auto px-4 py-8">
                <div className="px-6 py-8">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                        Order Details
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Shipping Information */}
                        <div className="bg-slate-50 shadow-sm rounded-3xl p-6 h-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-md font-semibold text-gray-700 ">
                                    Shipping Information
                                </h2>
                                <span className="text-sm font-semibold text-gray-700">
                                    Date:{" "}
                                    {new Date(order.created_at)
                                        .toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })
                                        .replace(
                                            /(\w+)\s(\d+),\s*(\d+)/,
                                            "$1. $2, $3"
                                        )}
                                </span>
                            </div>
                            <div className="space-y-4">
                                <ReadOnly
                                    label="Customer Name"
                                    value={order?.name}
                                />
                                <ReadOnly
                                    label="Phone Number"
                                    value={order?.phone}
                                />
                                <ReadOnly
                                    label="Customer Address"
                                    value={order?.shipping_address}
                                />
                                <ReadOnly
                                    label="Landmark"
                                    value={order?.landmark}
                                />
                            </div>
                        </div>
                        {/* Order Information */}
                        <div className="bg-white shadow-sm rounded-3xl  p-6">
                            <h2 className="text-sm font-semibold text-slate-800 mb-4">
                                Order Status:
                                {order.remarks === "pending" && (
                                    <span className="bg-red-200 text-red-800 text-medium font-semibold px-2 py-0.5 rounded-md">
                                        {order.remarks || "Unknown"}
                                    </span>
                                )}
                                {order.remarks === "on process" && (
                                    <span className="bg-yellow-200 text-yellow-800 text-medium font-semibold px-2 py-0.5 rounded-md">
                                        {order.remarks || "Unknown"}
                                    </span>
                                )}
                                {order.remarks === "shipped" && (
                                    <span className="bg-blue-200 text-blue-800 text-medium font-semibold px-2 py-0.5 rounded-md whitespace-nowrap">
                                        shipped out
                                    </span>
                                )}
                                {order.remarks === "completed" && (
                                    <span className="bg-green-200 text-green-800 text-medium font-semibold px-2 py-0.5 rounded-md">
                                        completed
                                    </span>
                                )}
                                {![
                                    "pending",
                                    "on process",
                                    "shipped",
                                    "completed",
                                ].includes(order.remarks) && (
                                    <span className="bg-gray-200 text-gray-800 text-medium font-semibold px-2 py-0.5 rounded-md">
                                        {order.remarks || "Unknown"}
                                    </span>
                                )}
                            </h2>

                            {orderItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center space-x-6 mb-6"
                                >
                                    <img
                                        src={`/storage/${item.product.images[0]?.image_path}`}
                                        alt={item.product_name}
                                        className="w-20 h-20 rounded-lg object-cover border border-gray-300"
                                    />
                                    <div className="text-sm text-gray-700 ">
                                        <h3 className="font-semibold ">
                                            {item.product_name}
                                        </h3>
                                        <span className="block">
                                            Qty. {item.qty}
                                        </span>
                                        <span className="flex items-center">
                                            <FaPesoSign /> Price:{" "}
                                            {parseFloat(item.price).toFixed(
                                                2
                                            ) || 0.0}
                                        </span>
                                        <span className="flex items-center">
                                            <FaPesoSign /> Total:{" "}
                                            {parseFloat(
                                                item.total_price
                                            ).toFixed(2) || 0.0}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div className="border-t border-gray-300 mt-4 pt-4">
                                <div className="text-sm text-gray-700">
                                    <div className="flex justify-between">
                                        <span>Shipping Fee:</span>
                                        <span className="flex items-center">
                                            <FaPesoSign />{" "}
                                            {parseFloat(
                                                order?.shipping_fee || 0
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between mt-2 font-semibold text-gray-900">
                                        <span>Order Total:</span>
                                        <span className="flex items-center">
                                            <FaPesoSign />{" "}
                                            {orderTotal.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center mt-5 ">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <SellerInput
                                        className="w-full"
                                        placeholder="Enter Shipping  Code"
                                    />
                                    <button className=" bg-slate-800 rounded-md text-slate-50  px-4 whitespace-nowrap">
                                        Shipped Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SellerLayout>
    );
}
