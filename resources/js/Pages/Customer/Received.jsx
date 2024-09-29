// ToShip.jsx
import React from "react";
import { FaPesoSign } from "react-icons/fa6";
import logo from "../Illustrations/LOGO.png";

const Received = () => {
    return (
        <div className="px-1">
            {/* <h2 className="text-md font-semibold text-slate-800">
                Orders To Ship
            </h2>
            <p className="text-sm text-slate-600">
                No orders to ship at this moment.
            </p> */}
            <div>
                <div className="flex items-center space-x-3">
                    <h2 className="text-md flex font-semibold text-slate-800">
                        Delivered Orders
                    </h2>
                    <span className="px-3 py-1 text-slate-800 bg-slate-500 bg-opacity-30 backdrop-blur-md  text-sm font-medium rounded-md">
                        1
                    </span>
                </div>
                <p className=" text-slate-600  text-xs">
                    Your order has been successfully delivered. We hope you
                    enjoy your purchase!
                </p>
                <hr className="border-slate-300 my-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="col-span-2 h-28  flex items-center justify-between border border-slate-400 p-2 rounded-lg mt-2 ">
                        <img
                            src={logo}
                            alt=""
                            className="sm:size-20 size-10 object-cover rounded "
                        />
                        <div className=" ml-4 text-md text-slate-800  font-medium">
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
                    <div className="  border border-slate-400 p-3 rounded-lg mt-2">
                        <div className="flex  justify-between pb-2">
                            <span className="font-semibold">Subtotal</span>
                            <span>
                                {" "}
                                <FaPesoSign className="inline-block" />
                                600
                            </span>
                        </div>
                        <div className="flex  justify-between border-b pb-4 border-slate-300 ">
                            <span>Shipping Fee</span>
                            <span>
                                {" "}
                                <FaPesoSign className="inline-block" />
                                325
                            </span>
                        </div>
                        <div className="flex  justify-between pt-2 text-lg font-bold">
                            <span>Order Total</span>
                            <span>
                                {" "}
                                <FaPesoSign className="inline-block" />
                                600
                            </span>
                        </div>
                        <div className="pt-5 space-x-3 flex items-center justify-end">
                            <button className="px-3 py-1  rounded-md text-slate-50 bg-slate-800  text-sm font-medium">
                                Rate Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Received;
