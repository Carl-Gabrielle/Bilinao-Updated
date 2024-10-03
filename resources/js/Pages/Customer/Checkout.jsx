import React, { useState, useEffect } from "react";
import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { FaPesoSign } from "react-icons/fa6";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { FaCcPaypal, FaGooglePay } from "react-icons/fa";
import Banner from "@/Components/Banner";
import { Head, Link } from "@inertiajs/react";
import BillingInput from "@/Components/BillingInput";
import axios from "axios";
import Label from "@/Components/Label";
import ReadOnly from "@/Components/ReadOnly";

<<<<<<< HEAD
export default function Checkout({ auth, carts, product }) {
=======
export default function Checkout({ auth, product }) {
>>>>>>> 2669f969f83ca7e392cc618288e4a46529d59097
    const { user } = auth;
    const [cartItems, setCartItems] = useState(carts || []);
    const [productItems, setProductItems] = useState(product ? [product] : []);

    const calculateTotal = () => {
        const items = cartItems.length > 0 ? cartItems : productItems;
        return items.reduce(
            (acc, item) =>
                acc + item.product?.price * item.quantity ||
                item.price * item.quantity,
            0
        );
    };

    // Render based on whether it's from cart or product
    const itemsToRender = cartItems.length > 0 ? cartItems : productItems;
    const [billingDetails, setBillingDetails] = useState({
        address: user.address || "",
    });

    const [regions, setRegions] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [citiesMunicipalities, setCitiesMunicipalities] = useState([]);
    const [barangays, setBarangays] = useState([]);

    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCityMunicipality, setSelectedCityMunicipality] =
        useState("");
    const [selectedBarangay, setSelectedBarangay] = useState("");

    useEffect(() => {
        axios
            .get("https://psgc.cloud/api/regions")
            .then((res) => setRegions(res.data))
            .catch((err) => console.log("Error fetching regions:", err));
    }, []);

    useEffect(() => {
        if (selectedRegion) {
            axios
                .get(
                    `https://psgc.cloud/api/regions/${selectedRegion}/provinces`
                )
                .then((res) => setProvinces(res.data))
                .catch((err) => console.log("Error fetching provinces:", err));
        } else {
            setProvinces([]);
        }
    }, [selectedRegion]);

    useEffect(() => {
        if (selectedProvince) {
            axios
                .get(
                    `https://psgc.cloud/api/provinces/${selectedProvince}/cities-municipalities`
                )
                .then((res) => setCitiesMunicipalities(res.data))
                .catch((err) =>
                    console.log("Error fetching cities/municipalities:", err)
                );
        } else {
            setCitiesMunicipalities([]);
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedCityMunicipality) {
            axios
                .get(
                    `https://psgc.cloud/api/cities-municipalities/${selectedCityMunicipality}/barangays`
                )
                .then((res) => setBarangays(res.data))
                .catch((err) => console.log("Error fetching barangays:", err));
        } else {
            setBarangays([]);
        }
    }, [selectedCityMunicipality]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setBillingDetails({
            ...billingDetails,
            [id]: value,
        });
    };

<<<<<<< HEAD
=======
    const [cartItems, setCartItems] = useState([product]); // Store the single product instead of multiple carts

    // Calculate total price based on product price and quantity
    const calculateTotal = () => {
        return cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
    };

>>>>>>> 2669f969f83ca7e392cc618288e4a46529d59097
    return (
        <CustomerLayout user={auth.user}>
            <Head title="Checkout" />
            <div className="min-h-screen  pt-20 pb-1 ">
                <Banner title="Shopping Cart" suffix="/Checkout" />
                <CustomerContainer>
                    <div className="flex items-center space-x-3">
                        <hr className="w-28 border border-slate-800 mb-6" />
                        <h1 className="font-bold text-3xl mb-6 text-slate-800 uppercase tracking-widest">
                            Product Checkout
                        </h1>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 ">
                        {/* Billing Information */}
                        <div className="col-span-2 space-y-6 bg-slate-50 p-8 rounded-3xl shadow-lg">
                            <h2 className="text-md font-semibold ">
                                <h1>Contact and Shipping Information</h1>
                            </h2>
                            <ReadOnly label="Full Name" value={user.name} />
                            <ReadOnly
                                label="Phone Number"
                                value={user.phone_number}
                            />
                            <hr />
                            <h2 className="text-md font-semibold ">
                                <h1>Billing Details</h1>
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* Region Dropdown */}
                                <div>
                                    <label className="block text-gray-700 text-xs font-medium mb-1">
                                        Region
                                    </label>
                                    <select
                                        value={selectedRegion}
                                        onChange={(e) =>
                                            setSelectedRegion(e.target.value)
                                        }
                                        className="scroll-bar text-sm custom-dropdown text-slate-600 focus:outline-none focus:ring-0 border focus:border-slate-800 focus:border hover:border-gray-900 py-3 px-4 w-full rounded-md border-gray-500 bg-transparent"
                                    >
                                        <option
                                            value=""
                                            className="bg-slate-100"
                                        >
                                            Select Region
                                        </option>
                                        {regions.map((region) => (
                                            <option
                                                key={region.code}
                                                value={region.code}
                                                className="bg-slate-100 text-md "
                                            >
                                                {region.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Province Dropdown */}
                                <div>
                                    <label className="block text-gray-700 text-xs font-medium mb-1">
                                        Province
                                    </label>
                                    <select
                                        value={selectedProvince}
                                        onChange={(e) =>
                                            setSelectedProvince(e.target.value)
                                        }
                                        className="scroll-bar text-sm text-slate-600 focus:outline-none focus:ring-0 border focus:border-slate-800 focus:border hover:border-gray-900 py-3 px-4 w-full rounded-md border-gray-500 bg-transparent"
                                    >
                                        <option
                                            value=""
                                            className="bg-slate-100"
                                        >
                                            Select Province
                                        </option>
                                        {provinces.map((province) => (
                                            <option
                                                key={province.code}
                                                value={province.code}
                                                className="bg-slate-100 text-md "
                                            >
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* City/Municipality Dropdown */}
                                <div>
                                    <label className="block text-gray-700 text-xs font-medium mb-1">
                                        City/Municipality
                                    </label>
                                    <select
                                        value={selectedCityMunicipality}
                                        onChange={(e) =>
                                            setSelectedCityMunicipality(
                                                e.target.value
                                            )
                                        }
                                        className="scroll-bar text-sm text-slate-600 focus:outline-none focus:ring-0 border focus:border-slate-800 focus:border hover:border-gray-900 py-3 px-4 w-full rounded-md border-gray-500 bg-transparent"
                                    >
                                        <option
                                            value=""
                                            className="bg-slate-100"
                                        >
                                            Select City/Municipality
                                        </option>
                                        {citiesMunicipalities.map(
                                            (cityMunicipality) => (
                                                <option
                                                    key={cityMunicipality.code}
                                                    value={
                                                        cityMunicipality.code
                                                    }
                                                    className="bg-slate-100 text-md "
                                                >
                                                    {cityMunicipality.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                                {/* Barangay Dropdown */}
                                <div>
                                    <label className="block text-gray-700 text-xs font-medium mb-1">
                                        Barangay
                                    </label>
                                    <select
                                        value={selectedBarangay}
                                        onChange={(e) =>
                                            setSelectedBarangay(e.target.value)
                                        }
                                        className="scroll-bar text-sm text-slate-600 focus:outline-none focus:ring-0 border focus:border-slate-800 focus:border hover:border-gray-900 py-3 px-4 w-full rounded-md border-gray-500 bg-transparent"
                                    >
                                        <option
                                            value=""
                                            className="bg-slate-100"
                                        >
                                            Select Barangay
                                        </option>
                                        {barangays.map((barangay) => (
                                            <option
                                                key={barangay.code}
                                                value={barangay.code}
                                                className="bg-slate-100 text-md"
                                            >
                                                {barangay.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <hr />
                            <h2 className="text-md font-semibold ">
                                <h1>Nearby Landmark</h1>
                            </h2>
                            {/* Landmark Text Area */}
                            <div>
                                <label className="block text-gray-700 text-xs font-medium mb-1">
                                    Landmark
                                </label>
                                <textarea
                                    id="landmark"
                                    value={billingDetails.landmark}
                                    onChange={handleInputChange}
                                    placeholder="ex. Alabama St. in front of  John Doe Shop."
                                    className="placeholder:text-sm placeholder:text-slate-600 focus:outline-none focus:ring-0 border focus:border-slate-800 focus:border hover:border-gray-900 py-3 px-4 w-full rounded-md border-gray-500 bg-transparent h-32"
                                />
                                <label className="text-gray-700 text-xs font-medium">
                                    Please enter a landmark near your home
                                </label>
                            </div>
                        </div>
                        <div className="grid grid-rows-2   gap-10 xl:gap-20">
                            {/* Order Summary */}
                            <div className="w-full lg:w-96 lg:h-72 bg-slate-50 rounded-3xl shadow-lg">
                                <div className="bg-gray-800 text-white rounded-t-3xl px-6 py-4">
                                    <h3 className="uppercase text-xs tracking-wider">
                                        Order Summary
                                    </h3>
                                </div>
                                <div className="bg-slate-50 p-6 space-y-4 h-72 overflow-y-auto scroll-bar">
                                    <h1 className="font-medium">Your Order</h1>
<<<<<<< HEAD

                                    <div>
                                        {itemsToRender.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex mt-3"
                                            >
                                                <div className="relative">
                                                    <img
                                                        src={`/storage/${
                                                            item.product
                                                                ? item.product
                                                                      .images[0]
                                                                      .image_path
                                                                : item.images[0]
                                                                      .image_path
                                                        }`}
                                                        alt={
                                                            item.product
                                                                ? item.product
                                                                      .name
                                                                : item.name
                                                        }
                                                        className="sm:size-16 size-10 object-cover rounded"
                                                    />
                                                    <div className="absolute -top-3 flex text-slate-100 items-center justify-center -right-3 size-5 bg-slate-700 rounded-full">
                                                        <span className="text-xs">
                                                            {item.quantity}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-1 ml-4 text-xs text-slate-800">
                                                    <h3 className="font-semibold">
                                                        {item.product
                                                            ? item.product.name
                                                            : item.name}
                                                    </h3>
                                                    <p className="flex items-center">
                                                        <FaPesoSign className="inline-block mr-1" />
                                                        {Number(
                                                            item.product
                                                                ? item.product
                                                                      .price
                                                                : item.price
                                                        ).toLocaleString(
                                                            "en-US",
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            }
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
=======
                                    {cartItems.map((cart) => (
                                        <div key={cart.id} className="flex">
                                            <div className="relative border">
                                                <img
                                                    src={`/storage/${cart.images[0].image_path}`}
                                                    alt={cart.name}
                                                    className="sm:size-16 size-10 object-cover rounded"
                                                />
                                                <div className="absolute -top-3 flex text-slate-100 items-center justify-center -right-3 size-5 bg-slate-700 rounded-full">
                                                    <span className="text-xs">
                                                        {cart.quantity}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-1 ml-4 text-xs text-slate-800">
                                                <h3 className="font-semibold">
                                                    {cart.name}
                                                </h3>
                                                <p className="flex items-center">
                                                    <FaPesoSign className="inline-block mr-1" />
                                                    {Number(
                                                        cart.price
                                                    ).toLocaleString("en-US", {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

>>>>>>> 2669f969f83ca7e392cc618288e4a46529d59097
                                    <div className="flex justify-between text-sm border-t pt-4">
                                        <span className="font-semibold">
                                            Subtotal
                                        </span>
                                        <span>
                                            <FaPesoSign className="inline-block" />
                                            {calculateTotal().toLocaleString(
                                                undefined,
                                                {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                }
                                            )}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm border-b pb-4">
                                        <span>Shipping</span>
                                        <span>
                                            <FaPesoSign className="inline-block" />
                                            80
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>
                                            <FaPesoSign className="inline-block" />
                                            {calculateTotal() +
                                                (80) // Adding shipping to total
                                                    .toLocaleString(undefined, {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 bg-slate-50 border-t border rounded-b-3xl">
                                    <Link
                                        href={route("customer.completeOrders")}
                                    >
                                        <button className="w-full bg-amber-500 text-slate-50 rounded-full tracking-wide px-8 py-4">
                                            Place Order
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="w-full  lg:mt-10">
                                <div className="bg-slate-50 p-6 lg:w-96 lg:h-72 rounded-3xl space-y-4 h-72 overflow-y-auto">
                                    <div className="text-md font-semibold text-gray-700">
                                        <h1>How would you like to pay?</h1>
                                    </div>

                                    <div className="space-y-4 mt-4">
                                        {/* GCash Payment Option */}
                                        <label className="flex items-center space-x-4 p-2  border rounded-xl  cursor-pointer hover:bg-slate-100 transition">
                                            <input
                                                type="radio"
                                                name="payment"
                                                className="hidden"
                                            />
                                            <div className="w-10 h-10 bg-blue-500 flex items-center justify-center rounded-full">
                                                <FaGooglePay className="text-white text-2xl" />{" "}
                                                {/* Placeholder for GCash Icon */}
                                            </div>
                                            <div className="flex-1 text-slate-700 font-medium text-sm">
                                                GCash
                                            </div>
                                            <HiOutlineCheckCircle className="text-gray-300 text-xl" />
                                        </label>
                                        {/* PayMaya Payment Option */}
                                        <label className="flex items-center space-x-4 p-2  border rounded-xl  cursor-pointer  hover:bg-slate-100  transition">
                                            <input
                                                type="radio"
                                                name="payment"
                                                className="hidden"
                                            />
                                            <div className="w-10 h-10 bg-green-500 flex items-center justify-center rounded-full">
                                                <FaCcPaypal className="text-white text-2xl" />{" "}
                                                {/* Placeholder for PayMaya Icon */}
                                            </div>
                                            <div className="flex-1 text-slate-700 font-medium text-sm">
                                                PayMaya
                                            </div>
                                            <HiOutlineCheckCircle className="text-gray-300 text-xl" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
