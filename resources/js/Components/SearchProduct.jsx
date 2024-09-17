import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { Inertia } from "@inertiajs/inertia";
import SearchInput from "./SearchInput";

const SearchProduct = () => {
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!query) return;

        setError(null);
        try {
            Inertia.get(
                "/search",
                { query },
                {
                    onError: (errors) => {
                        setError(
                            "An error occurred while searching. Please try again."
                        );
                    },
                }
            );
        } catch (err) {
            setError("An error occurred while searching. Please try again.");
        }
    };

    return (
        <div className="relative flex items-center justify-center  ">
            <form onSubmit={handleSearch} className="flex items-center">
                <SearchInput
                    type="text"
                    placeholder="Search products..."
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    className="placeholder-slate-800"
                />
                <button
                    type="submit"
                    className="hidden lg:block bg-slate-800 text-white px-3 py-3 rounded-full ml-2"
                >
                    <IoMdSearch />
                </button>
            </form>

            {error && <div className="mt-2 text-red-500">{error}</div>}
        </div>
    );
};

export default SearchProduct;
