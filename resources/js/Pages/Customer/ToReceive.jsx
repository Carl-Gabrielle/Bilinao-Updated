import React from "react";

export default function ToReceive({ toReceiveData }) {

    console.log('to received data= ', toReceiveData)
    return (
        <div>
            <h2 className="font-semibold text-md text-slate-800">
                To Receive Orders
            </h2>
            {/* Add order details here */}
            <p className="text-sm text-slate-600">
                No to receive orders at this moment.
            </p>
        </div>
    );
}
