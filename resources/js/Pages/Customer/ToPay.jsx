// ToPay.jsx
import React from "react";
import { FaPesoSign } from "react-icons/fa6";
import logo from "../Illustrations/LOGO.png";
export default function ToPay({ toPay }) {

    console.log('to Pay data = ', toPay)
    return (
        <div className="px-1">
            <div>
                <div className="flex items-center space-x-3">
                    <h2 className="flex font-semibold text-md text-slate-800">
                        Orders To Pay
                    </h2>
                    <span className="px-3 py-1 text-sm font-medium rounded-md text-slate-800 bg-slate-500 bg-opacity-30 backdrop-blur-md">
                        1
                    </span>
                </div>
                <p className="text-xs text-slate-600">
                    Review your orders and complete the payment process to
                    secure your products.
                </p>
                <hr className="my-2 border-slate-300" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-center justify-between col-span-2 p-2 mt-2 border rounded-lg h-28 border-slate-400 ">
                        <img
                            src={logo}
                            alt=""
                            className="object-cover rounded sm:size-20 size-10 "
                        />
                        <div className="ml-4 font-medium text-md text-slate-800">
                            <h3> Vases for home decoration</h3>
                            <span className="text-sm">Qty.1 </span>
                        </div>
                        <div>
                            <span className="flex items-center">
                                <FaPesoSign className="mr-1" />
                                600
                            </span>
                        </div>
                    </div>
                    <div className="p-3 mt-2 border rounded-lg border-slate-400">
                        <div className="flex justify-between pb-2">
                            <span className="font-semibold">Subtotal</span>
                            <span>
                                {" "}
                                <FaPesoSign className="inline-block" />
                                600
                            </span>
                        </div>
                        <div className="flex justify-between pb-4 border-b border-slate-300 ">
                            <span>Shipping Fee</span>
                            <span>
                                {" "}
                                <FaPesoSign className="inline-block" />
                                325
                            </span>
                        </div>
                        <div className="flex justify-between pt-2 text-lg font-bold">
                            <span>Total</span>
                            <span>
                                {" "}
                                <FaPesoSign className="inline-block" />
                                600
                            </span>
                        </div>
                        <div className="flex items-center justify-end pt-5 space-x-3">
                            <button className="px-3 py-1 text-sm font-medium border rounded-md border-slate-400">
                                Cancel Order
                            </button>
                            <button className="px-3 py-1 text-sm font-medium rounded-md text-slate-50 bg-slate-800">
                                Complete Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
