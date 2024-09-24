// ToShip.jsx
import React from "react";

const ToShip = () => {
    return (
        <div>
            <h2 className="text-md font-semibold text-slate-800">
                Orders To Ship
            </h2>
            {/* Add order details here */}
            <p className="text-sm text-slate-600">
                No orders to ship at this moment.
            </p>
        </div>
    );
};

export default ToShip;
