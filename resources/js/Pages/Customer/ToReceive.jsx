// ToReceive.jsx
import React from "react";

const ToReceive = () => {
    return (
        <div>
            <h2 className="text-md font-semibold text-slate-800">
                Orders To Receive
            </h2>
            {/* Add order details here */}
            <p className="text-sm text-slate-600">
                No orders to receive at this moment.
            </p>
        </div>
    );
};

export default ToReceive;
