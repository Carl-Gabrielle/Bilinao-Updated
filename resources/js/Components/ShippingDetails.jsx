import React from "react";
import { FaPesoSign } from "react-icons/fa6";

export default function ShippingDetails({ shippingFee, subtotal, total }) {
    return (
        <>
            <div className=" mt-3 border rounded-lg  border-slate-400 ">
                <div className="p-3">
                    <div className="flex justify-between ">
                        <span>Shipping Fee</span>
                        <span>
                            <FaPesoSign className="inline-block" />
                            {shippingFee}
                        </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-300">
                        <span className="font-semibold">Subtotal</span>
                        <span>
                            <FaPesoSign className="inline-block" />
                            {subtotal}
                        </span>
                    </div>
                </div>
                <div className="flex justify-between pt-2 px-3 py-0.5 text-md font-bold bg-slate-100 rounded-b-lg">
                    <span>Total</span>
                    <span>
                        <FaPesoSign className="inline-block" />
                        {total}
                    </span>
                </div>
            </div>
        </>
    );
}
