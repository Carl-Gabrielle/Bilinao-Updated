import SellerLayout from "@/Layouts/SellerLayout";
import { FaPesoSign } from "react-icons/fa6";
import { Head, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import SectionHeader from "@/Components/SectionHeader";
import ReadOnly from "@/Components/ReadOnly";
import SellerInput from "@/Components/SellerInput";

export default function OrderDetails({ auth, order, orderItems }) {
    const { user } = auth;
    const { data, setData, post, processing, errors, reset } = useForm({
        tracking_code: "",
    });

    const orderTotal =
        orderItems.reduce(
            (total, item) => total + (parseFloat(item.total_price) || 0),
            0
        ) + (parseFloat(order?.shipping_fee) || 0);
    const handleProcessOrder = () => {
        Inertia.post(`/seller/proceedOrder/${order.id}`, {
            onSuccess: () => { },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };
    const handleShippedOut = () => {
        if (data.tracking_code.length === 12) {
            Inertia.post(`/seller/shippedOut/${order.id}`, { tracking_code: data.tracking_code });
        } else {
            alert('Tracking code must be exactly 12 characters long.');
        }
    };
    const handleMarkAsPicked = () => {
        Inertia.post(`/seller/pickedOrder/${order.id}`, {
            onSuccess: () => { },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };
    const handleMarkAsArrived = () => {
        Inertia.post(`/seller/arrivedOrder/${order.id}`, {
            onSuccess: () => { },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };
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
                                <h2 className="text-md font-semibold text-gray-700">
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
                                <ReadOnly label="Customer Name" value={order?.name} />
                                <ReadOnly label="Phone Number" value={order?.phone} />
                                <ReadOnly label="Customer Address" value={order?.shipping_address} />
                                <ReadOnly label="Landmark" value={order?.landmark} />
                            </div>
                        </div>
                        {/* Order Information */}
                        <div className="bg-white shadow-sm rounded-3xl p-6">
                            <h2 className="text-base font-semibold text-slate-800 flex items-center space-x-2 mb-4">
                                <span>Order Status:</span>
                                {/* <span
                                    className={`px-3 py-1 text-sm font-medium rounded-md
        ${order.processing_date === null && "bg-red-100 text-red-600"}
        ${order.processing_date !== null && "bg-yellow-100 text-yellow-600"}
        ${order.remarks === "shipped" && "bg-blue-100 text-blue-600"}
        ${order.remarks === "completed" && "bg-green-100 text-green-600"}
        ${!["pending", "on process", "shipped", "completed"].includes(order.remarks) && "bg-gray-100 text-gray-600"}
    `}
                                >
                                    {order.processing_date === null ? "pending" : "on process"}
                                </span> */}
                                <span
                                    className={`px-3 py-1 text-sm font-medium rounded-md
        ${orderItems[0].processing_date === null ? "bg-red-200 text-red-800 text-medium font-semibold px-2 py-0.5 rounded-md" : "bg-yellow-200 text-yellow-800 text-medium font-semibold px-2 py-0.5 rounded-md"}
    `}
                                >
                                    {orderItems[0].processing_date === null ? "pending" : "on process"}
                                </span>

                            </h2>

                            {orderItems.map((item) => (
                                <div key={item.id} className="border p-2 rounded-md shadow-sm">
                                    <span className="text-[0.7em] text-slate-500">Order# {order.order_number}</span>
                                    <div className="flex items-center space-x-6">
                                        <img
                                            src={`/storage/${item.product.images[0]?.image_path}`}
                                            alt={item.product_name}
                                            className="w-20 h-20 rounded-lg object-cover"
                                        />
                                        <div className="text-xs text-gray-700 space-y-0.5">
                                            <h3 className="font-semibold">{item.product_name}</h3>
                                            <span className="inline-block bg-gray-200 text-slate-900 px-2 py-0.5 rounded">Qty. {item.qty}</span>
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
                                                {parseFloat(item.total_price).toFixed(2) || 0.0}{" "}
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
                                            <FaPesoSign /> {orderTotal.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {orderItems[0].processing_date === null ? (
                                // Processing button when the order is in "Pending" state
                                <button
                                    onClick={handleProcessOrder}
                                    className="bg-slate-800 rounded-md text-slate-50 px-4 py-2 whitespace-nowrap w-full mt-6"
                                >
                                    Process Order
                                </button>
                            ) : orderItems[0].picked_date === null ? (
                                // Mark as Picked button when the order is in "Processing" state
                                <button
                                    onClick={handleMarkAsPicked}
                                    className="bg-slate-800 rounded-md text-slate-50 px-4 py-2 whitespace-nowrap w-full mt-6"
                                >
                                    Mark as Picked
                                </button>
                            ) : orderItems[0].shipped_date === null ? (
                                // Shipped Out button when the order is in "Picked" state
                                <>
                                    <div className="flex items-center mt-5">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <SellerInput
                                                className="w-full"
                                                placeholder="Enter Tracking no."
                                                onChange={(e) => setData("tracking_code", e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleShippedOut();
                                                    }
                                                }}
                                            />
                                            <button
                                                onClick={handleShippedOut}
                                                className="bg-slate-800 rounded-md text-slate-50 px-4 whitespace-nowrap"
                                            >
                                                Shipped Out
                                            </button>
                                        </div>
                                    </div>
                                    <span className="text-xs">
                                        <span className="font-semibold">Note:</span> Each sale processed through PayMongo
                                        incurs a charge fee and an additional 4% fee to the organization.
                                    </span>
                                </>
                            ) : orderItems[0].arrived_date === null ? (
                                // Mark as Arrived button when the order is in "Shipped" state
                                <button
                                    onClick={handleMarkAsArrived}
                                    className="bg-slate-800 rounded-md text-slate-50 px-4 py-2 whitespace-nowrap w-full mt-6"
                                >
                                    Mark as Arrived
                                </button>
                            ) : orderItems[0].received_date === null ? (
                                // Mark as Delivered button when the order is in "Arrived" state
                                <button
                                    // onClick={handleMarkAsDelivered}
                                    className="bg-slate-800 rounded-md text-slate-50 px-4 py-2 whitespace-nowrap w-full mt-6"
                                >
                                    Mark as Delivered
                                </button>
                            ) : (
                                // Message when the order is fully completed
                                <div className="mt-6 text-green-600 font-semibold">
                                    Order Completed
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </SellerLayout>
    );
}
