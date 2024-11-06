import React from 'react';
import ReadOnly from './ReadOnly';

const ShippingInformation = ({ order }) => {
    return (
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
    );
};

export default ShippingInformation;
