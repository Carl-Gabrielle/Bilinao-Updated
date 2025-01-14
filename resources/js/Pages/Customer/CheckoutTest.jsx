import React, { useState, useEffect } from "react";
import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { FaPesoSign } from "react-icons/fa6";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { FaCcPaypal, FaGooglePay } from "react-icons/fa";
import Banner from "@/Components/Banner";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import BillingInput from "@/Components/BillingInput";
import axios from "axios";
import Label from "@/Components/Label";
import ReadOnly from "@/Components/ReadOnly";

export default function Checkout({ auth }) {
    const { user } = auth;

    const [billingDetails, setBillingDetails] = useState({
        address: user.address || "",
    });
    const [shippingFees, setShippingFees] = useState([]);
    const [regions, setRegions] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [citiesMunicipalities, setCitiesMunicipalities] = useState([]);
    const [barangays, setBarangays] = useState([]);

    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCityMunicipality, setSelectedCityMunicipality] =
        useState("");
    const [selectedBarangay, setSelectedBarangay] = useState("");
    const { product } = usePage().props;
    const { shipping_data } = usePage().props;

    const regionMapping = {
        "0100000000": "luzon",
        "0200000000": "luzon",
        "0300000000": "luzon",
        "0400000000": "luzon",
        "0500000000": "luzon",
        1400000000: "luzon",
        1700000000: "island",
        "0600000000": "visayas",
        "0700000000": "visayas",
        "0800000000": "visayas",
        "0900000000": "mindanao",
        1000000000: "mindanao",
        1100000000: "mindanao",
        1200000000: "mindanao",
        1600000000: "mindanao",
        1900000000: "mindanao",
    };

    // API FOR GETTING THE USER ADDRESS
    useEffect(() => {
        axios
            .get("https://psgc.cloud/api/regions")
            .then((res) => setRegions(res.data))
            .catch((err) => console.log("Error fetching regions:", err));
    }, []);

    useEffect(() => {
        if (selectedRegion) {
            const fees = product.map((item) => {
                const totalWeight = item.buying_quantity * item.product.weight;
                console.log("totalWeight", totalWeight);
                return calculateShippingFee(selectedRegion, totalWeight);
            });
            setShippingFees(fees);
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
        const totalFee = shippingFees.reduce((acc, fee) => acc + fee, 0);
        setData((prevData) => ({
            ...prevData,
            shipping_fee: totalFee,
            initial_sf: shippingFees,
            total_amount: data.subtotal + totalFee,
            products: product.map((item, index) => ({
                product_id: item.product.id,
                qty: item.buying_quantity,
                cart_id: item.cart_id ?? null,
                shipping: shippingFees[index],
            })),
        }));
    }, [shippingFees]);

    console.log(product);
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

    const subtotals = product.map(
        (item) => item.buying_quantity * item.product.price
    );
    const totalSubtotal = subtotals.reduce(
        (total, subtotal) => total + subtotal,
        0
    );
    const [status, setStatus] = useState();

    const { data, errors, setData, post, processing } = useForm({
        payment_method: "Gcash",
        name: user.name,
        shipping_address: "",
        phone_no: user.phone_number,
        landmark: "",
        shipping_fee: 0,
        subtotal: totalSubtotal,
        total_amount: 0,
        is_from_cart: status,
        products: [],
        initial_sf: [],
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const isFromCart = urlParams.get("from_cart") || "false"; // Check against the string '1'
        setStatus(isFromCart); // Set the value
    }, []);

    useEffect(() => {
        setData("is_from_cart", status);
    }, [status]);

    const handleCheckoutButton = (e) => {
        e.preventDefault();
        console.log("submitted data => ", data);
        post(route("store.checkout"));
    };

    const handlePaymentChange = (method) => {
        setData("payment_method", method);
    };

    const calculateShippingFee = (regionCode, weight) => {
        const shippingRegion = regionMapping[regionCode];
        const matchingRange = shipping_data.find(
            (range) => weight >= range.weight_min && weight <= range.weight_max
        );
        if (matchingRange) {
            return matchingRange[shippingRegion];
        } else {
            alert("Shipping not found!");
            setData("shipping_fee", 0);
        }
    };

    const [region, setRegion] = useState();
    const [province, setProvince] = useState();
    const [city, setCity] = useState();
    const [barangay, setBarangay] = useState();

    useEffect(() => {
        const address =
            region + ", " + province + ", " + city + ", " + barangay;
        setData("shipping_address", address);
    }, [barangay]);

    // Calculate total price based on product price and quantity
    const calculateTotal = (price, qty) => {
        const newSubtotal = price * qty;
        return newSubtotal;
    };

    return (
        <CustomerLayout user={auth.user}>
            <Head title="Checkout" />
            <div className="min-h-screen pt-20 pb-1 ">
                <Banner title="Shopping Cart" suffix="/Checkout" />
                <CustomerContainer>
                    <div className="flex items-center space-x-3">
                        <hr className="mb-6 border w-28 border-slate-800" />
                        <h1 className="mb-6 text-3xl font-bold tracking-widest uppercase text-slate-800">
                            Product Checkout
                        </h1>
                    </div>
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 ">
                        {/* Billing Information */}
                        <div className="col-span-2 p-8 space-y-6 shadow-lg bg-slate-50 rounded-3xl">
                            <h2 className="font-semibold text-md ">
                                <h1>Contact and Shipping Information</h1>
                            </h2>
                            <ReadOnly label="Full Name" value={user.name} />
                            <ReadOnly
                                label="Phone Number"
                                value={user.phone_number}
                            />
                            <hr />
                            <h2 className="font-semibold text-md ">
                                <h1>Billing Details</h1>
                            </h2>
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                {/* Region Dropdown */}
                                <div>
                                    <label className="block mb-1 text-xs font-medium text-gray-700">
                                        Region
                                    </label>
                                    <select
                                        value={selectedRegion}
                                        onChange={(e) => {
                                            setSelectedRegion(e.target.value);
                                            setRegion(
                                                regions.find(
                                                    (region) =>
                                                        region.code ===
                                                        e.target.value
                                                )?.name
                                            );
                                        }}
                                        className="w-full px-4 py-3 text-sm bg-transparent border border-gray-500 rounded-md scroll-bar custom-dropdown text-slate-600 focus:outline-none focus:ring-0 focus:border-slate-800 focus:border hover:border-gray-900"
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
                                    <label className="block mb-1 text-xs font-medium text-gray-700">
                                        Province
                                    </label>
                                    <select
                                        value={selectedProvince}
                                        onChange={(e) => {
                                            setSelectedProvince(e.target.value);
                                            setProvince(
                                                provinces.find(
                                                    (province) =>
                                                        province.code ===
                                                        e.target.value
                                                )?.name
                                            );
                                        }}
                                        className="w-full px-4 py-3 text-sm bg-transparent border border-gray-500 rounded-md scroll-bar text-slate-600 focus:outline-none focus:ring-0 focus:border-slate-800 focus:border hover:border-gray-900"
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
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                {/* City/Municipality Dropdown */}
                                <div>
                                    <label className="block mb-1 text-xs font-medium text-gray-700">
                                        City/Municipality
                                    </label>
                                    <select
                                        value={selectedCityMunicipality}
                                        onChange={(e) => {
                                            setSelectedCityMunicipality(
                                                e.target.value
                                            );
                                            setCity(
                                                citiesMunicipalities.find(
                                                    (city) =>
                                                        city.code ===
                                                        e.target.value
                                                )?.name
                                            );
                                        }}
                                        className="w-full px-4 py-3 text-sm bg-transparent border border-gray-500 rounded-md scroll-bar text-slate-600 focus:outline-none focus:ring-0 focus:border-slate-800 focus:border hover:border-gray-900"
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
                                    <label className="block mb-1 text-xs font-medium text-gray-700">
                                        Barangay
                                    </label>
                                    <select
                                        value={selectedBarangay}
                                        onChange={(e) => {
                                            setSelectedBarangay(e.target.value);
                                            setBarangay(
                                                barangays.find(
                                                    (brgy) =>
                                                        brgy.code ===
                                                        e.target.value
                                                )?.name
                                            );
                                        }}
                                        className="w-full px-4 py-3 text-sm bg-transparent border border-gray-500 rounded-md scroll-bar text-slate-600 focus:outline-none focus:ring-0 focus:border-slate-800 focus:border hover:border-gray-900"
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
                            <h2 className="font-semibold text-md ">
                                <h1>Nearby Landmark</h1>
                            </h2>
                            {/* Landmark Text Area */}
                            <div>
                                <label className="block mb-1 text-xs font-medium text-gray-700">
                                    Landmark
                                </label>
                                <textarea
                                    id="landmark"
                                    onChange={(e) =>
                                        setData("landmark", e.target.value)
                                    }
                                    placeholder="ex. Alabama St. in front of  John Doe Shop."
                                    className="w-full h-32 px-4 py-3 bg-transparent border border-gray-500 rounded-md placeholder:text-sm placeholder:text-slate-600 focus:outline-none focus:ring-0 focus:border-slate-800 focus:border hover:border-gray-900"
                                />
                                <label className="text-xs font-medium text-gray-700">
                                    Please enter a landmark near your home
                                </label>
                            </div>
                        </div>
                        <div className="grid grid-rows-2 gap-10 xl:gap-20">
                            {/* Order Summary */}
                            <div className="w-full shadow-lg lg:w-96 lg:h-72 bg-slate-50 rounded-3xl">
                                <div className="px-6 py-4 text-white bg-gray-800 rounded-t-3xl">
                                    <h3 className="text-xs tracking-wider uppercase">
                                        Order Summary
                                    </h3>
                                </div>
                                <div className="p-6 space-y-4 overflow-y-auto bg-slate-50 h-72 scroll-bar">
                                    <h1 className="font-medium">Your Order</h1>
                                    {product.map((item) => (
                                        <div key={item.id} className="flex">
                                            <div className="relative border">
                                                <img
                                                    src={`/storage/${item.product.images[0].image_path}`}
                                                    alt={item.product.name}
                                                    className="object-cover rounded sm:size-16 size-10"
                                                />
                                                <div className="absolute flex items-center justify-center rounded-full -top-3 text-slate-100 -right-3 size-5 bg-slate-700">
                                                    <span className="text-xs">
                                                        {item.buying_quantity}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-1 ml-4 text-xs text-slate-800">
                                                <h3 className="font-semibold">
                                                    {item.product.name}
                                                </h3>
                                                <p className="flex items-center">
                                                    <FaPesoSign className="inline-block mr-1" />
                                                    {Number(
                                                        item.product.price
                                                    ).toLocaleString("en-US", {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </p>
                                                <p className="flex items-center">
                                                    <FaPesoSign className="inline-block mr-1" />
                                                    {Number(
                                                        item.product.price
                                                    ).toLocaleString("en-US", {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}{" "}
                                                    x {item.buying_quantity} =
                                                    <FaPesoSign className="inline-block mx-1" />
                                                    {calculateTotal(
                                                        item.product.price,
                                                        item.buying_quantity
                                                    ).toLocaleString(
                                                        undefined,
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        }
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex justify-between pt-4 text-sm border-t">
                                        <span className="font-semibold">
                                            Subtotal
                                        </span>
                                        <span>
                                            {" "}
                                            <FaPesoSign className="inline-block" />
                                            {new Intl.NumberFormat("en-US", {
                                                style: "decimal",
                                                minimumFractionDigits: 2,
                                            }).format(data.subtotal)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pb-4 text-sm border-b">
                                        <span>Shipping</span>
                                        <span>
                                            {" "}
                                            <FaPesoSign className="inline-block" />
                                            {data.shipping_fee}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>
                                            {" "}
                                            <FaPesoSign className="inline-block" />
                                            {new Intl.NumberFormat("en-US", {
                                                style: "decimal",
                                                minimumFractionDigits: 2,
                                            }).format(data.total_amount)}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 border border-t bg-slate-50 rounded-b-3xl">
                                    <button
                                        disabled={
                                            region == null ||
                                            province == null ||
                                            city == null ||
                                            barangay == null ||
                                            data.landmark == null
                                        }
                                        onClick={handleCheckoutButton}
                                        className={`w-full bg-amber-500 text-slate-50 rounded-full tracking-wide px-8 py-4
                                        ${
                                            region == null ||
                                            province == null ||
                                            city == null ||
                                            barangay == null ||
                                            landmark == null
                                                ? "cursor-not-allowed"
                                                : " hover:bg-amber-600 duration-200 ease-in-out"
                                        }`}
                                    >
                                        {[
                                            processing
                                                ? "Placing order..."
                                                : "Place Order",
                                        ]}
                                    </button>
                                </div>
                            </div>
                            <div className="w-full lg:mt-10">
                                <div className="p-6 space-y-4 overflow-y-auto bg-slate-50 lg:w-96 lg:h-72 rounded-3xl h-72">
                                    <div className="font-semibold text-gray-700 text-md">
                                        <h1>How would you like to pay?</h1>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        {/* GCash Payment Option */}
                                        <label
                                            className={`flex items-center space-x-4 p-2 border rounded-xl cursor-pointer transition ${
                                                data.payment_method === "GCash"
                                                    ? "bg-blue-100 border-0 hover:bg-blue-100"
                                                    : "hover:bg-slate-100"
                                            }`}
                                            onClick={() =>
                                                handlePaymentChange("GCash")
                                            }
                                        >
                                            <input
                                                type="radio"
                                                name="payment"
                                                className="hidden"
                                            />
                                            <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
                                                <FaGooglePay className="text-2xl text-white" />
                                            </div>
                                            <div className="flex-1 text-sm font-medium text-slate-700">
                                                GCash
                                            </div>
                                            <HiOutlineCheckCircle
                                                className={`text-gray-300 text-xl ${
                                                    data.payment_method ===
                                                    "GCash"
                                                        ? "text-blue-700"
                                                        : "text-gray-300"
                                                }`}
                                            />
                                        </label>
                                        {/* PayMaya Payment Option */}
                                        <label
                                            className={`flex items-center space-x-4 p-2 border rounded-xl cursor-pointer transition ${
                                                data.payment_method ===
                                                "PayMaya"
                                                    ? "bg-green-100 border-0 hover:bg-green-100"
                                                    : "hover:bg-slate-100"
                                            }`}
                                            onClick={() =>
                                                handlePaymentChange("PayMaya")
                                            }
                                        >
                                            <input
                                                type="radio"
                                                name="payment"
                                                className="hidden"
                                            />
                                            <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full">
                                                <FaCcPaypal className="text-2xl text-white" />
                                            </div>
                                            <div className="flex-1 text-sm font-medium text-slate-700">
                                                PayMaya
                                            </div>
                                            <HiOutlineCheckCircle
                                                className={`text-gray-300 text-xl ${
                                                    data.payment_method ===
                                                    "PayMaya"
                                                        ? "text-green-700"
                                                        : "text-gray-300"
                                                }`}
                                            />
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
