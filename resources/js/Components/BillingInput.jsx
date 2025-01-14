const BillingInput = ({ label, value, onChange }) => {
    return (
        <div>
            <label
                htmlFor={label}
                className="text-gray-700 text-xs font-medium"
            >
                {label}
            </label>
            <input
                id={label}
                type="number"
                className="w-full block border-0 border-slate-50 px-4 py-3 bg-slate-200 text-slate-600 text-sm rounded focus:ring-0  placeholder-slate-400  p-1"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default BillingInput;
