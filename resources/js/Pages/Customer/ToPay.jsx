// ToPay.jsx
import React from "react";

const ToPay = () => {
    return (
        <div>
            <h2 className="text-md font-semibold text-slate-800">
                Orders To Pay
            </h2>
            {/* Add order details here */}
            <p className="text-sm text-slate-600">
                No orders to pay at this moment.
            </p>
        </div>
    );
};

export default ToPay;
