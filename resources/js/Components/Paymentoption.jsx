// PaymentOption.jsx
import { HiOutlineCheckCircle } from "react-icons/hi";
import { FaGooglePay, FaCcPaypal } from "react-icons/fa";

const PaymentOption = ({
    name,
    value,
    icon,
    bgClass,
    paymentMethod,
    onPaymentChange,
}) => {
    return (
        <label
            className={`flex items-center p-2 space-x-4 transition border cursor-pointer rounded-xl hover:bg-slate-100 ${bgClass}`}
        >
            <input
                type="radio"
                name="payment"
                value={value}
                className="hidden"
                checked={paymentMethod === value}
                onChange={onPaymentChange}
            />
            <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${icon.bgColor}`}
            >
                {icon.component}
            </div>
            <div className="flex-1 text-sm font-medium text-slate-700">
                {name}
            </div>
            <HiOutlineCheckCircle
                className={`text-xl ${
                    paymentMethod === value ? icon.textColor : "text-gray-300"
                }`}
            />
        </label>
    );
};

export default PaymentOption;
