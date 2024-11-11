import React from "react";
import { Head, Link } from "@inertiajs/react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { TbArrowCurveRight } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import Banner from "@/Components/Banner";
import successImg from "../Illustrations/successImg.png";
import CustomerContainer from "@/Components/CustomerContainer";

export default function CompletedOrder({ auth, order, orderItems }) {
    return (
        <CustomerLayout user={auth.user}>
            <Head title="Completed Orders" />
            <div className="min-h-screen pt-20 pb-10 bg-slate-300">
                <Banner title="Completed Orders" />
                <CustomerContainer>
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-72 relative flex flex-col items-center mb-5">
                            <img
                                src={successImg}
                                alt="Success Image"
                                className="size-20 mb-4"
                            />
                            <TbArrowCurveRight className="absolute bottom-0 left-20 rotate-45 text-primary" />
                            <TbArrowCurveRight className="absolute top-5 right-20 -rotate-90 text-primary" />
                            <FaStar className="absolute top-5 right-10 -rotate-90 text-primary" />
                            <FaStar className="absolute top-5 left-10 -rotate-45 text-primary" />
                            <FaStar className="absolute top-20 right-20 -rotate-90 text-primary" />
                            <FaStar className="absolute top-20 left-28 -rotate-90 text-primary" />
                        </div>
                        <h1 className=" text-2xl mb-2 text-primary text-center tracking-wide">
                            Thank you,{" "}
                            <span className="font-semibold">
                                {auth.user.name}
                            </span>{" "}
                            !
                        </h1>
                        <p className="text-md text-gray-700 text-center mb-2">
                            Your order has been successfully processed.
                        </p>
                        <p className="text-md text-gray-700 text-center mb-4">
                            Here are the details:
                        </p>
                    </div>

                    {/* Order details */}
                    <div className="mt-10 w-full px-4 sm:px-10 md:px-20 lg:px-40 xl:px-60">
                        <div className="bg-slate-800 rounded-t-2xl p-4 flex items-center justify-between text-sm px-6">
                            <span className="text-slate-50">Order Details</span>
                            <span className="text-slate-50">
                                Order #{order?.order_number}
                            </span>
                        </div>
                        <div className="bg-slate-50  bg-opacity-60 backdrop-blur-lg  rounded-b-xl shadow-md p-6">
                            <div className="mb-6">
                                <h2 className="text-sm sm:text-md font-bold text-gray-800 mb-2">
                                    Contact Information
                                </h2>
                                <p className="text-gray-500">{order?.phone}</p>
                            </div>
                            <div className="mb-6">
                                <h2 className="text-sm sm:text-md font-bold text-gray-800 mb-2">
                                    Payment Method
                                </h2>
                                <p className="text-gray-500">
                                    {order?.payment} -{" "}
                                    <span className="font-semibold text-gray-700">
                                        &#8369;{order?.amount}
                                    </span>
                                </p>
                            </div>
                            <div className="mb-6">
                                <h2 className="text-sm sm:text-md font-bold text-gray-800 mb-2">
                                    Billing Details
                                </h2>
                                <p className="text-gray-500">
                                    {order?.shipping_address}
                                </p>
                            </div>
                            <div className="mb-6">
                                <h2 className="text-sm sm:text-md font-bold text-gray-800 mb-2">
                                    Landmark
                                </h2>
                                <p className="text-gray-500">
                                    {order?.landmark}
                                </p>
                            </div>
                            {/* Display order items */}
                            <hr />
                            <div className="mt-6">
                                <h2 className="text-sm sm:text-md font-bold text-gray-800 mb-2">
                                    Order Items:
                                </h2>
                                {orderItems?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center  border border-gray-300 rounded-lg p-4 mb-2"
                                    >
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {item.product_name} (x{item.qty}
                                                )
                                            </p>
                                        </div>
                                        <p className="font-semibold text-gray-700">
                                            &#8369;{item.total_price}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-end mt-8">
                            <Link href={route("customer.products")}>
                                <button className="border text-sm border-primary  text-gray-800 font-semibold py-2 px-6 rounded-full shadow-md mr-4 w-full sm:w-auto ">
                                    Continue Shopping
                                </button>
                            </Link>
                            <Link href={route("customer.orders")}>
                                <button className="text-sm bg-primary text-white font-semibold py-2 px-6 rounded-full shadow-md  w-full sm:mt-0 mt-6">
                                    View Orders
                                </button>
                            </Link>
                        </div>
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
