import React from "react";
import { HiCheck } from "react-icons/hi";

const CustomCheckbox = ({ isChecked, onChange }) => {
    return (
        <label className="flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={onChange}
                className="hidden" // Hide the default checkbox
            />
            <div
                className={`size-5 mr-2 flex items-center justify-center border-2 rounded-md transition-colors duration-200 ease-in-out ${
                    isChecked
                        ? "bg-green-500 border-green-500"
                        : "bg-white border-gray-400"
                }`}
            >
                {isChecked && <HiCheck className="w-4 h-4 text-white" />}
            </div>
        </label>
    );
};

export default CustomCheckbox;
