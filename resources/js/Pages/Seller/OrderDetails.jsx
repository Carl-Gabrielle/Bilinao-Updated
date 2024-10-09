import SellerLayout from "@/Layouts/SellerLayout";
import { FaPesoSign } from "react-icons/fa6";
import { Head, usePage } from "@inertiajs/react";
import SectionHeader from "@/Components/SectionHeader";
import ReadOnly from "@/Components/ReadOnly";
import SellerInput from "@/Components/SellerInput";

export default function OrderDetails({ auth }) {
    const { props } = usePage();
    const user = props.auth.user;

    // FAKE PRODUCT DATA
    const products = [
        {
            id: 1,
            name: "Decorative Vase",
            description: "Handmade ceramic vase",
            price: 45.99,
            quantity: 2,
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            name: "Tie Dye Shirt",
            description: "Colorful tie dye shirt made from organic cotton",
            price: 29.99,
            quantity: 1,
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            name: "Tie Dye Shirt",
            description: "Colorful tie dye shirt made from organic cotton",
            price: 29.99,
            quantity: 1,
            imageUrl: "https://via.placeholder.com/150",
        },
    ];
    // FAKE ORDER SUMMARY
    const orderSummary = {
        shipping: 10.0,
        total: 139.27,
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
                        <div className="bg-slate-50 shadow-sm rounded-lg p-6 h-auto">
                            <h2 className="text-md font-semibold text-gray-700 mb-4">
                                Shipping Information
                            </h2>
                            <div className="space-y-4">
                                <ReadOnly
                                    label="Customer Name"
                                    value={user.name}
                                />
                                <ReadOnly
                                    label="Phone Number"
                                    value={user.contact_number}
                                />
                                <ReadOnly
                                    label="Customer Address"
                                    value={user.address}
                                />
                                <ReadOnly
                                    label="Landmark"
                                    value={user.landmark}
                                />
                            </div>
                        </div>

                        {/* Order Information */}
                        <div className="bg-white shadow-sm rounded-lg p-6 ">
                            <h2 className="text-md font-semibold text-yellow-500 mb-4">
                                Order Status: On Process
                            </h2>
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center space-x-6 mb-6"
                                >
                                    <img
                                        src={product.imageUrl}
                                        alt="Product Image"
                                        className="w-24 h-24 rounded-lg object-cover border border-gray-300"
                                    />
                                    <div className="text-sm text-gray-700">
                                        <h3 className="font-semibold">
                                            {product.name}
                                        </h3>
                                        <span className="block">
                                            Qty. {product.quantity}
                                        </span>
                                        <span className="flex items-center">
                                            <FaPesoSign /> Price:{" "}
                                            {product.price.toFixed(2)}
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
                                            {orderSummary.shipping.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between mt-2 font-semibold text-gray-900">
                                        <span>Order Total:</span>
                                        <span className="flex items-center">
                                            <FaPesoSign />{" "}
                                            {orderSummary.total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-5">
                        <div className=" w-full sm:w-1/2 flex flex-col sm:flex-row gap-4">
                            <SellerInput className="w-full" />
                            <button className="w-full sm:w-1/2 bg-slate-800 rounded-md text-slate-50 py-2 px-4">
                                Shipped Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </SellerLayout>
    );
}
