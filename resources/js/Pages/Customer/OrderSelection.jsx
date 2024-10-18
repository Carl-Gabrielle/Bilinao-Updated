import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { FaPesoSign } from "react-icons/fa6";
import axios from "axios";
import CustomCheckbox from "@/Components/CustomCheckbox";

const OrderSelection = ({ carts }) => {
    const [selectedItems, setSelectedItems] = useState({});

    const handleChange = (cartId, productId) => {
        setSelectedItems((prev) => {
            const sellerCart = prev[cartId] || {};
            const isSelected = sellerCart[productId] || false;
            return {
                ...prev,
                [cartId]: {
                    ...sellerCart,
                    [productId]: !isSelected,
                },
            };
        });
    };

    const calculateTotal = (cartId) => {
        const items = carts.find((cart) => cart.id === cartId)?.items || [];
        return items.reduce((acc, item) => {
            if (selectedItems[cartId]?.[item.product.id]) {
                return acc + item.product.price * item.quantity;
            }
            return acc;
        }, 0);
    };

    const proceedToCheckout = (cartId) => {
        // Logic to proceed to checkout for the selected items of the cart
        // This could redirect to a checkout page with the selected items or open a modal, etc.
        const selectedProducts = Object.keys(selectedItems[cartId] || {})
            .filter((productId) => selectedItems[cartId][productId])
            .map((productId) => productId);

        if (selectedProducts.length > 0) {
            console.log("Proceeding to checkout for cart:", cartId);
            console.log("Selected products:", selectedProducts);
            // Here, you might redirect to a checkout page, or call an API, etc.
        } else {
            alert("Please select at least one product to proceed.");
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-1">
            <Head title="Order Selection" />
            <div className="container mx-auto mt-32">
                <h1 className="text-2xl font-bold text-center">
                    Select Products to Order
                </h1>
                {carts.map((cart) => (
                    <div
                        key={cart.id}
                        className="mt-10 p-4 border rounded-lg shadow-md"
                    >
                        <h2 className="text-xl font-semibold mb-4">
                            {cart.seller.name}
                        </h2>
                        <div className="space-y-4">
                            {cart.items.map((item) => (
                                <div
                                    key={item.product.id}
                                    className="flex items-center border border-gray-300 p-2 rounded"
                                >
                                    <CustomCheckbox
                                        isChecked={
                                            selectedItems[cart.id]?.[
                                                item.product.id
                                            ] || false
                                        }
                                        onChange={() =>
                                            handleChange(
                                                cart.id,
                                                item.product.id
                                            )
                                        }
                                    />
                                    <img
                                        src={`/storage/${item.product.images[0].image_path}`}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="ml-4 flex-1">
                                        <h3 className="font-semibold">
                                            {item.product.name}
                                        </h3>
                                        <p className="text-gray-600">
                                            <FaPesoSign />
                                            {Number(
                                                item.product.price
                                            ).toLocaleString("en-US", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4">
                            <span className="font-bold">
                                Total: <FaPesoSign />
                                {calculateTotal(cart.id).toLocaleString(
                                    "en-US",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }
                                )}
                            </span>
                            <button
                                onClick={() => proceedToCheckout(cart.id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderSelection;
