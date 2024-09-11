import React, { useState, useEffect } from "react";
import { IoFilter } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaSort } from "react-icons/fa";

const FilterBar = ({ count, onFilterChange, onSortChange }) => {
    const [availabilityOpen, setAvailabilityOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    const handleAvailabilityClick = () => {
        setAvailabilityOpen(!availabilityOpen);
        setSortOpen(false);
    };

    const handleSortClick = () => {
        setSortOpen(!sortOpen);
        setAvailabilityOpen(false);
    };

    const handleFilterChange = (filterType, value) => {
        onFilterChange(filterType, value);
    };

    const handleSortChange = (sortOption) => {
        onSortChange(sortOption);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest(".relative")) {
            setAvailabilityOpen(false);
            setSortOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex justify-between items-center mb-10">
            <div className="flex gap-6 font-light">
                <span className="py-1 flex items-center">
                    <IoFilter className="mr-2" /> Filter:
                </span>
                <div className="relative">
                    <span
                        onClick={handleAvailabilityClick}
                        className="flex items-center hover:bg-gray-50 px-2 py-1 rounded-md cursor-pointer"
                    >
                        Availability
                        <MdOutlineKeyboardArrowDown className="ml-2" />
                    </span>
                    {availabilityOpen && (
                        <div className="z-10 absolute top-full -left-10 sm:left-0 mt-2 w-72 sm:w-96 bg-white rounded-2xl shadow-lg">
                            <div className="px-6 py-4">
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-gray-800 font-semibold">
                                        Filter by Availability
                                    </p>
                                    <p
                                        onClick={() =>
                                            handleFilterChange(
                                                "availability",
                                                null
                                            )
                                        }
                                        className="cursor-pointer text-gray-500 hover:text-gray-900"
                                    >
                                        Reset
                                    </p>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="instock"
                                            onChange={() =>
                                                handleFilterChange(
                                                    "availability",
                                                    "instock"
                                                )
                                            }
                                            className="cursor-pointer"
                                        />
                                        <label
                                            htmlFor="instock"
                                            className="cursor-pointer ml-2 text-gray-600"
                                        >
                                            In Stock
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="outstock"
                                            onChange={() =>
                                                handleFilterChange(
                                                    "availability",
                                                    "outstock"
                                                )
                                            }
                                            className="cursor-pointer"
                                        />
                                        <label
                                            htmlFor="outstock"
                                            className="cursor-pointer ml-2 text-gray-600"
                                        >
                                            Out of Stock
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex gap-6">
                <div className="relative hidden sm:block font-light">
                    <span
                        onClick={handleSortClick}
                        className="hover:bg-gray-50 px-3 py-1 rounded-lg cursor-pointer flex items-center"
                    >
                        <FaSort className="mr-2" />
                        Sort by:
                        <MdOutlineKeyboardArrowDown className="ml-2" />
                    </span>
                    {sortOpen && (
                        <div className="z-10 absolute top-full left-0 w-40 bg-white border border-gray-200 shadow-lg rounded-lg">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSortChange("price-asc");
                                }}
                                className="block px-4 py-3 hover:bg-gray-100"
                            >
                                Price: Low to High
                            </a>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSortChange("price-desc");
                                }}
                                className="block px-4 py-3 hover:bg-gray-100"
                            >
                                Price: High to Low
                            </a>
                        </div>
                    )}
                </div>
                <span className="py-1">
                    {count > 0
                        ? `${count} product${count !== 1 ? "s" : ""}`
                        : "0 products"}
                </span>
            </div>
        </div>
    );
};

export default FilterBar;
