import SellerLayout from "@/Layouts/SellerLayout";
import { FaPesoSign } from "react-icons/fa6";
import OrderItems from "@/Components/OrderItems";
import { Head, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import SectionHeader from "@/Components/SectionHeader";
import SellerInput from "@/Components/SellerInput";
import ShippingInformation from "@/Components/ShippingInformation";

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

    const markOrderAsProcessing = () => {
        Inertia.post(`/seller/markOrderAsProcessing/${order.id}`, {
            onSuccess: () => { },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    const handleShippedOut = () => {
        if (data.tracking_code.length === 12) {
            Inertia.post(`/seller/markOrderAsShipped/${order.id}`, { tracking_code: data.tracking_code });
        } else {
            alert('Tracking code must be exactly 12 characters long.');
        }
    };

    const handleMarkAsPicked = () => {
        Inertia.post(`/seller/markOrderAsPicked/${order.id}`, {
            onSuccess: () => { },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    const handleMarkAsArrived = () => {
        Inertia.post(`/seller/markOrderAsArrived/${order.id}`, {
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
                        {/* SHIPPING INFORMATION */}
                        <ShippingInformation order={order} />
                        <div className="bg-white shadow-sm rounded-3xl p-6">
                            {/* ORDER INFORMATION */}
                            <OrderItems order={order} orderItems={orderItems} />

                            {/* PROCESS ORDER BUTTON */}
                            {orderItems[0].processing_date === null ? (
                                <button
                                    onClick={markOrderAsProcessing}
                                    className="bg-slate-800 rounded-2xl text-slate-50 px-4 py-2 whitespace-nowrap w-full mt-6"
                                    disabled={processing}
                                >
                                    Process Order
                                </button>
                            ) : orderItems[0].picked_date === null ? (
                                <button
                                    onClick={handleMarkAsPicked}
                                    className="bg-slate-800 rounded-2xl text-slate-50 px-4 py-2 whitespace-nowrap w-full mt-6"
                                    disabled={processing}
                                >
                                    Mark as Picked
                                </button>
                            ) : orderItems[0].shipped_date === null ? (
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
                                                className="bg-slate-800 rounded-2xl text-slate-50 px-4 whitespace-nowrap"
                                                disabled={processing}
                                            >
                                                Ship Out
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : orderItems[0].arrived_date === null ? (
                                <button
                                    onClick={handleMarkAsArrived}
                                    className="bg-slate-800 rounded-2xl text-slate-50 px-4 py-2 whitespace-nowrap w-full mt-6"
                                    disabled={processing}
                                >
                                    Mark as Arrived
                                </button>
                            ) : orderItems[0].arrived !== null ? (
                                <div className="border border-primary rounded-2xl text-primary px-4 py-2 whitespace-nowrap w-full mt-6 text-center cursor-default">
                                    Out for Customer Delivery
                                </div>
                            ) : orderItems[0].received_date !== null ? (
                                <div className="border border-green-500 rounded-2xl text-green-500 px-4 py-2 whitespace-nowrap w-full mt-6 text-center cursor-default">
                                    Order Completed
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </SellerLayout>
    );
}
