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
                <CustomerContainer>
                    <h1>FRONTEND SAMPLE </h1>
                    <div className="flex items-center justify-center flex-col ">
                        <div className="w-72 relative flex flex-col items-center mb-5">
                            <img
                                src={successImg}
                                alt="Success Image"
                                className="size-16 "
                            />
                            <TbArrowCurveRight className="absolute bottom-0 left-20 rotate-45 size-5 text-primary" />
                            <TbArrowCurveRight className="absolute top-5 right-20 -rotate-90 size-5 text-primary" />
                            <FaStar className="absolute top-5 right-10 -rotate-90 size-5 text-primary" />
                            <FaStar className="absolute top-5 left-10 -rotate-45 size-5 text-primary" />
                        </div>
                        <h1 className="font-bold text-2xl mb-6 text-primary tracking-widest text-center">
                            Thank you, for your purchase!
                        </h1>
                        <p className="text-sm tracking-wide text-center">
                            Your order has been successfully processed.
                        </p>
                        <p className="text-sm tracking-wide text-center">
                            Here are the details
                        </p>
                        <div className="mt-10 w-full px-4 sm:px-10 md:px-20 lg:px-40 xl:px-60">
                            <div className="bg-slate-800 rounded-t-2xl p-4 flex items-center justify-between text-sm px-6">
                                <span className="text-slate-50">
                                    Order Details
                                </span>
                                <span className="text-slate-50">
                                    Order #1132
                                </span>
                            </div>
                            <div className="bg-white bg-opacity-70 backdrop-blur-lg text-sm rounded-b-xl shadow-md">
                                <div className="py-5 px-6">
                                    <div className="flex justify-between items-start text-base font-semibold text-gray-800">
                                        <p>Contact Information</p>
                                        <p>Payment Method</p>
                                    </div>
                                    <div className="flex justify-between items-start mb-4 text-gray-500 text-sm">
                                        <p>09661345617</p>
                                        <p className="text-right">
                                            GCash (OP) -{" "}
                                            <span className="font-semibold text-gray-700">
                                                &#8369;954
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-start text-base font-semibold text-gray-800">
                                        <p>Billing Details</p>
                                        <p>Landmark</p>
                                    </div>
                                    <div className="flex justify-between items-start text-gray-500 text-sm">
                                        <p className="flex-1">
                                            Region 1, Pangasinan, City of
                                            Alaminos, Poblacion
                                        </p>
                                        <p className="flex-1 text-right break-words">
                                            Near 7/11 Nepo Mall, at the corner
                                            of a street near the marketplace...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
