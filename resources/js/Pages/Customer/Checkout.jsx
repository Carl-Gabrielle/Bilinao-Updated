import React, { useState, useEffect } from "react";
import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { FaPesoSign } from "react-icons/fa6";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { FaCcPaypal, FaGooglePay } from "react-icons/fa";
import PaymentOption from "@/Components/PaymentOption";
import Banner from "@/Components/Banner";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import BillingInput from "@/Components/BillingInput";
import axios from "axios";
import Label from "@/Components/Label";
import ReadOnly from "@/Components/ReadOnly";

export default function Checkout({ auth, product }) {
    const { user } = auth;
    const { shipping_data } = usePage().props;

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

    // Map region codes to corresponding regions (Luzon, Visayas, Mindanao, Island)
    const regionMapping = {
        // Luzon Regions
        "0100000000": "luzon", // Region I (Ilocos Region)
        "0200000000": "luzon", // Region II (Cagayan Valley)
        "0300000000": "luzon", // Region III (Central Luzon)
        "0400000000": "luzon", // Region IV-A (CALABARZON)
        "0500000000": "luzon", // Region V (Bicol Region)
        1300000000: "luzon", // National Capital Region (NCR)
        1400000000: "luzon", // Cordillera Administrative Region (CAR)

        // Island Regions
        1700000000: "island", // MIMAROPA Region

        // Visayas Regions
        "0600000000": "visayas", // Region VI (Western Visayas)
        "0700000000": "visayas", // Region VII (Central Visayas)
        "0800000000": "visayas", // Region VIII (Eastern Visayas)

        // Mindanao Regions
        "0900000000": "mindanao", // Region IX (Zamboanga Peninsula)
        1000000000: "mindanao", // Region X (Northern Mindanao)
        1100000000: "mindanao", // Region XI (Davao Region)
        1200000000: "mindanao", // Region XII (SOCCSKSARGEN)
        1600000000: "mindanao", // Region XIII (Caraga)
        1900000000: "mindanao", // Bangsamoro Autonomous Region In Muslim Mindanao (BARMM)
    };

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const product_id = urlParams.get("product_id");
        const qty = urlParams.get("quantity");

        setProducts([{ product_id, qty }]);
    }, []);

    const { errors, post, data, setData } = useForm({
        payment_method: "Gcash",
        shipping_address: "",
        shipping_fee: "",
        amount: "",
        name: user.name,
        phone_no: user.phone_number,
        landmark: "",
        products: [],
    });

    useEffect(() => {
        if (products.length > 0) {
            setData(
                "products",
                products.map((item) => ({
                    product_id: item.product_id,
                    qty: item.qty,
                }))
            );
        }
    }, [products]);

    const [shippingFee, setShippingFee] = useState(0);

    const calculateShippingFee = (regionCode, weight) => {
        const shippingRegion = regionMapping[regionCode];

        // Find the corresponding weight range
        const matchingRange = shipping_data.find(
            (range) => weight >= range.weight_min && weight <= range.weight_max
        );

        if (matchingRange) {
            setShippingFee(matchingRange[shippingRegion]);
            setData("shipping_fee", shippingFee);
        } else {
            setShippingFee(0); // If no range found, default to 0
        }
    };
    useEffect(() => {
        if (selectedRegion) {
            calculateShippingFee(selectedRegion, product.weight);
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

    const [cartItems, setCartItems] = useState([product]); // Store the single product instead of multiple carts
    // Calculate total price based on product price and quantity
    const calculateTotal = () => {
        return cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
    };

    // State to hold the formatted total for display
    const [formattedTotal, setFormattedTotal] = useState("0.00");
    // State to hold the raw total for submission
    const [totalAmount, setTotalAmount] = useState(0);

    // Function to calculate total including shipping fee
    const total = (total_amount, shipping_fee) => {
        const sum = total_amount + shipping_fee;
        return parseFloat(sum.toFixed(2));
    };

    // Function to calculate and set formatted total
    const calculateAndSetFormattedTotal = () => {
        const productTotal = calculateTotal();
        const totalAmount = total(productTotal, shippingFee);

        // Set the raw total amount for submission
        setTotalAmount(totalAmount);

        // Format for display purposes
        const formatted = totalAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        setFormattedTotal(formatted);
    };

    // Recalculate when shipping fee changes
    useEffect(() => {
        calculateAndSetFormattedTotal();
    }, [shippingFee]);

    // Set data for backend submission using the raw total
    useEffect(() => {
        setData("amount", totalAmount);
    }, [totalAmount]);

    const [shippingAddress, setShippingAddress] = useState("");
    const [region, setRegion] = useState();
    const [province, setProvince] = useState();
    const [city, setCity] = useState();
    const [barangay, setBarangay] = useState();

    useEffect(() => {
        setShippingAddress(`${region}, ${province}, ${city}, ${barangay}`);
        setData("shipping_address", shippingAddress);
    }, [region, province, city, barangay]);

    const handlePaymentChange = (event) => {
        setData("payment_method", event.target.value);
    };

    const handleCheckout = () => {
        post(route("store.checkout", data));
    };

    const gcashBgClass =
        data.payment_method === "Gcash"
            ? "bg-blue-100 border-0 hover:bg-blue-100"
            : "";
    const paymayaBgClass =
        data.payment_method === "PayMaya"
            ? "bg-green-100 hover:bg-green-100  border-0"
            : "";

    useEffect(() => {
        setData("shipping_fee", shippingFee);
    }, [shippingFee]);

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
                                    value={billingDetails.landmark}
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
                                    {cartItems.map((cart) => (
                                        <div key={cart.id} className="flex">
                                            <div className="relative border">
                                                <img
                                                    src={`/storage/${cart.images[0].image_path}`}
                                                    alt={cart.name}
                                                    className="object-cover rounded sm:size-16 size-10"
                                                />
                                                <div className="absolute flex items-center justify-center rounded-full -top-3 text-slate-100 -right-3 size-5 bg-slate-700">
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
                                                <p className="flex items-center">
                                                    <FaPesoSign className="inline-block mr-1" />
                                                    {Number(
                                                        cart.price
                                                    ).toLocaleString("en-US", {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}{" "}
                                                    x {cart.quantity} =
                                                    <FaPesoSign className="inline-block mx-1" />
                                                    {calculateTotal().toLocaleString(
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
                                    <div className="flex justify-between pb-4 text-sm border-b">
                                        <span>Shipping</span>
                                        <span>
                                            <FaPesoSign className="inline-block" />
                                            {shippingFee}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>
                                            <FaPesoSign className="inline-block" />
                                            {formattedTotal}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 border border-t bg-slate-50 rounded-b-3xl">
                                    <button
                                        disabled={
                                            data.landmark === "" ||
                                            data.shipping_address == " "
                                        }
                                        onClick={() => handleCheckout()}
                                        className={`w-full px-8 py-4 tracking-wide rounded-full bg-amber-500 text-slate-50 ${
                                            data.landmark === "" ||
                                            data.shipping_address == " "
                                                ? "cursor-not-allowed"
                                                : "hover:bg-amber-600 duration-200"
                                        }`}
                                    >
                                        Place Order
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
                                        <PaymentOption
                                            name="GCash"
                                            value="Gcash"
                                            icon={{
                                                component: (
                                                    <FaGooglePay className="text-2xl text-white" />
                                                ),
                                                bgColor: "bg-blue-500",
                                                textColor: "text-blue-500",
                                            }}
                                            bgClass={gcashBgClass}
                                            paymentMethod={data.payment_method}
                                            onPaymentChange={
                                                handlePaymentChange
                                            }
                                        />
                                        {/* PayMaya Payment Option */}
                                        <PaymentOption
                                            name="PayMaya"
                                            value="PayMaya"
                                            icon={{
                                                component: (
                                                    <FaCcPaypal className="text-2xl text-white" />
                                                ),
                                                bgColor: "bg-green-500",
                                                textColor: "text-green-500",
                                            }}
                                            bgClass={paymayaBgClass}
                                            paymentMethod={data.payment_method}
                                            onPaymentChange={
                                                handlePaymentChange
                                            }
                                        />
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
