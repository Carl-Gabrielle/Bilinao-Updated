const ReadOnly = ({ label, value, onChange }) => {
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
                type="text"
                readOnly
                className="w-full block border-0 border-slate-50 px-4 py-3 bg-slate-100 text-slate-600 text-sm rounded-2xl focus:ring-0  placeholder-slate-400  p-1"
                value={value}
            />
        </div>
    );
};

export default ReadOnly;
