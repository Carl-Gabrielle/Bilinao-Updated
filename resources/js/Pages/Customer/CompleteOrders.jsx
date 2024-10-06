import React from "react";
import { Head, Link } from "@inertiajs/react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { TbArrowCurveRight } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import Banner from "@/Components/Banner";
import successImg from "../Illustrations/successImg.png";
import CustomerContainer from "@/Components/CustomerContainer";

export default function CompletedOrder({ auth }) {
    return (
        <CustomerLayout user={auth.user}>
            <Head title="Order Completed " />
            <div className="min-h-screen  pt-20 pb-1  ">
                <Banner title="Order Completed" />
                <CustomerContainer className="mt-32  ">
                    <h1>FRONTEND SAMPLE </h1>
                    <div className="flex items-center justify-center flex-col relative py-10">
                        <div className="w-72 relative flex flex-col items-center mb-5">
                            <img
                                src={successImg}
                                alt="Success Image"
                                className="size-16 animate-bounce"
                            />
                            <TbArrowCurveRight className="absolute bottom-0 left-20 rotate-45 size-5 text-slate-800" />
                            <TbArrowCurveRight className="absolute top-5 right-20 -rotate-90 size-5 text-slate-800" />
                            <FaStar className="absolute top-5 right-10 -rotate-90 size-5 text-slate-800" />
                            <FaStar className="absolute top-5 left-10 -rotate-45 size-5 text-slate-800" />
                        </div>
                        <h1 className="font-bold text-2xl mb-6 text-slate-800 tracking-widest text-center">
                            Thank you, for your purchase!
                        </h1>
                        <p className="text-sm tracking-wide text-center">
                            Your order has been successfully processed.
                        </p>
                        <p className="text-sm tracking-wide text-center">
                            Here are the details
                        </p>

                        <div className="mt-10 w-full px-4 sm:px-10 md:px-20 lg:px-40 xl:px-60">
                            <div className="bg-slate-800 rounded-t-2xl p-4">
                                <span className="text-slate-50">
                                    Order Summary
                                </span>
                            </div>
                            <div className="bg-slate-50 bg-opacity-60 backdrop-blur-lg text-sm rounded-b-2xl">
                                <div className="pt-5 px-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <p>Order Number</p>
                                        <p>#orderId</p>
                                    </div>
                                    <div className="flex justify-between items-start mb-4">
                                        <p>Date</p>
                                        <p>Oct. 21, 2024</p>
                                    </div>
                                    <div className="flex justify-between items-start mb-4">
                                        <p>Items Purchased</p>
                                        <p>2 Total items</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start mb-4 bg-slate-300 px-6 py-2">
                                    <p>Total</p>
                                    <p>&#8369; 450</p>
                                </div>
                                <div className="px-6 py-2 pb-4">
                                    <button className="py-2 w-full flex items-center justify-center rounded-full text-slate-50 font-semibold bg-slate-800">
                                        View Order Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
