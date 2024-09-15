import SellerInput from "./SellerInput";

const BillingInput = ({ label, value, onChange }) => {
    return (
        <div>
            <label
                htmlFor={label}
                className="text-gray-700 text-xs font-medium"
            >
                {label}
            </label>
            <SellerInput
                id={label}
                type="text"
                className="border rounded p-2 w-full"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default BillingInput;
