import React from "react";
import { usePage } from "@inertiajs/inertia-react";

const SearchResults = () => {
    const { products, query } = usePage().props;

    return (
        <div>
            <h1>Search Results for "{query}"</h1>
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="border p-4 rounded-lg">
                            {product.images[0] && (
                                <img
                                    src={`/storage/${product.images[0].image_path}`}
                                    alt={product.name}
                                    className="w-full h-32 object-cover mb-4"
                                />
                            )}
                            <h3 className="text-lg font-semibold">
                                {product.name}
                            </h3>
                            <p className="text-gray-600">${product.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
