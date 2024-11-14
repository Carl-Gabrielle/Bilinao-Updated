
{/* <div className="max-w-2xl mx-auto  bg-slate-50 bg-opacity-60 backdrop-blur-lg rounded-2xl shadow-xl p-5 ">
<div className="flex items-center mb-4">
    <div className="bg-slate-100 mr-2 p-2 rounded-md inline-block">
        <FaRegUser />
    </div>
    <h1 className="text-xl  tracking-wide text-primary  ">Security</h1>
</div>
<div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
        Current Password
    </label>
    <CustomerInput
        type="text"
        value={data.current_password}
        placeholder="Enter your current password"
        onChange={(e) => setData('current_password', e.target.value)}
    />
</div>
<div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
        New Password
    </label>
    <CustomerInput
        type="text"
        value={data.password}
        placeholder="Enter your new password"
        onChange={(e) => setData('password', e.target.value)}
    />
</div>
<div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
        Confirm Password
    </label>
    <CustomerInput
        type="text"
        value={data.confirm_password}
        placeholder="Confirm new password"
        onChange={(e) => setData('confirm_password', e.target.value)}
    />
</div>
<button
    type="submit"
    className="px-5 py-2 bg-slate-800 text-white rounded-2xl text-center w-full"
>
    {processing
        ? "Updating Password..."
        : "Update Password"}
</button>
</div> */}

// current_password: '',
//     password: '',
//         password_confirmation: '',

<form onSubmit={handleSubmit} encType="multipart/form-data">
    <div className="relative flex items-center justify-center ">
        <label htmlFor="profile-picture" className="cursor-pointer">
            <img
                src={imageSrc}
                alt="Profile Image"
                className="w-32 h-32 mt-4 rounded-full border-4 border-primary overflow-hidden flex justify-center items-center text-gray-500 bg-gray-200 shadow-lg object-cover"
            />
            {/* Camera icon positioned inside the image */}
            <div className="absolute bottom-1 right-64 sm:block hidden  text-white bg-primary p-1 rounded-full">
                <IoCameraOutline />
            </div>
        </label>
        <input
            id="profile-picture"
            type="file"
            className="hidden" // Hide the input
            onChange={handleImageChange}
            accept="image/*"
        />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 mt-4">
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
                Name
            </label>
            <CustomerInput
                type="text"
                value={user.name}
                onChange={(e) =>
                    setData("name", e.target.value)
                }
            />
            {errors.name && (
                <div className="text-red-600">
                    {errors.name}
                </div>
            )}
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
                Contact Number
            </label>
            <CustomerInput
                type="text"
                value={user.phone_number}
                onChange={(e) =>
                    setData("phone_number", e.target.value)
                }
            />
            {errors.contact_number && (
                <div className="text-red-600">
                    {errors.phone_number}
                </div>
            )}
        </div>
    </div>
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
            Email
        </label>
        <input
            type="text"
            value={user.email}
            readOnly
            className="focus:outline-none focus:ring-0 border  focus:border-primary focus:border   py-2 px-4 w-full rounded-2xl  border-gray-500 bg-slate-300"
        />
        <label className="block text-sm  text-gray-700">
            Email cannot be changed
        </label>
    </div>
    <button
        type="submit"
        className="px-5 py-2 bg-slate-800 text-white rounded-2xl text-center w-full"
    >
        {processing
            ? "Updating Profile..."
            : "Update Profile"}
    </button>
</form>
import Banner from "@/Components/Banner";
import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { LuSettings2 } from "react-icons/lu";
import { IoCameraOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import LoadingSpinner from "@/Components/LoadingSkeletal";
import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { FaUserCircle } from "react-icons/fa";
import CustomerInput from "@/Components/InformationInput";
import { Head, Link } from "@inertiajs/react";

export default function ProfileIndex({ auth }) {
    const { user } = auth;
    const [imageSrc, setImageSrc] = useState('/images/default-profile.png');
    const [imageFile, setImageFile] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a URL for the selected file
            const url = URL.createObjectURL(file);
            setImageSrc(url);
            setImageFile(file);
        }
    };
    const { data, setData, post, processing, errors, reset, progress } =
        useForm({
            name: user.name || "",
            phone_number: user.phone_number || "",
            email: user.email || "",
            profile_photo_path: user.profile_photo_path || "",
            _method: "PUT",
        });
    function handleSubmit(e) {
        e.preventDefault();

        // Submit form data using multipart/form-data
        post(route("customer.updateProfile"), {
            forceFormData: true,
            onSuccess: () => {
                // Redirect to profile page after successful update
                window.location.href = route("customer.customerProfile");
            },
        });
    }
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <CustomerLayout user={auth.user}>
                <Head title="My Account" />
                <LoadingSpinner />
            </CustomerLayout>
        );
    }
    return (
        <CustomerLayout user={user}>
            <Head title="My Account" />
            <div className="min-h-screen  pt-20 pb-12">
                <Banner title="My Account" />
                <CustomerContainer>
                    <div className=" mb-10 max-w-2xl mx-auto leading-8">
                        <div className="flex items-center">
                            <div className="bg-slate-200 mr-2 p-2 rounded-md">
                                <LuSettings2 />
                            </div>
                            <h1 className="text-2xl  tracking-wide text-primary ">Account Settings</h1>
                        </div>
                        <p className="text-primary">Manage your account settings and preferences</p>
                    </div>
                    <div className="max-w-2xl mx-auto  bg-slate-50 bg-opacity-60 backdrop-blur-lg rounded-2xl shadow-xl p-5  mb-6">
                        <div className="flex items-center">
                            <div className="bg-slate-100 mr-2 p-2 rounded-md inline-block">
                                <FaRegUser />
                            </div>
                            <h1 className="text-xl  tracking-wide text-primary ">Profile</h1>
                        </div>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="relative flex items-center justify-center ">
                                <label htmlFor="profile-picture" className="cursor-pointer">
                                    <img
                                        src={imageSrc}
                                        alt="Profile Image"
                                        className="w-32 h-32 mt-4 rounded-full border-4 border-primary overflow-hidden flex justify-center items-center text-gray-500 bg-gray-200 shadow-lg object-cover"
                                    />
                                    {/* Camera icon positioned inside the image */}
                                    <div className="absolute bottom-1 right-64 sm:block hidden  text-white bg-primary p-1 rounded-full">
                                        <IoCameraOutline />
                                    </div>
                                </label>
                                <input
                                    id="profile-picture"
                                    type="file"
                                    className="hidden" // Hide the input
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 mt-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <CustomerInput
                                        type="text"
                                        value={user.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <div className="text-red-600">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Contact Number
                                    </label>
                                    <CustomerInput
                                        type="text"
                                        value={user.phone_number}
                                        onChange={(e) =>
                                            setData("phone_number", e.target.value)
                                        }
                                    />
                                    {errors.contact_number && (
                                        <div className="text-red-600">
                                            {errors.phone_number}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    value={user.email}
                                    readOnly
                                    className="focus:outline-none focus:ring-0 border  focus:border-primary focus:border   py-2 px-4 w-full rounded-2xl  border-gray-500 bg-slate-300"
                                />
                                <label className="block text-sm  text-gray-700">
                                    Email cannot be changed
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="px-5 py-2 bg-slate-800 text-white rounded-2xl text-center w-full"
                            >
                                {processing
                                    ? "Updating Profile..."
                                    : "Update Profile"}
                            </button>
                        </form>
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}




<div className="mt-8 p-4   rounded-2xl bg-slate-50 transition-all ease-in-out duration-300">
    <h4 className="text-md font-medium text-primary mb-6">Shipment Tracking</h4>
    <div className="space-y-2">
        {receivedDate && (
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between bg-white shadow-sm p-2 rounded-lg space-y-3 lg:space-y-0 lg:space-x-4">
                <div className="flex items-center space-x-2 bg-slate-100 rounded-md px-3 py-1">
                    <MdDoneAll className="text-primary text-xs" />
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-primary">Received</span>
                        <span className="text-[0.6rem] text-green-500 whitespace-nowrap">Delivered to customer</span>
                    </div>
                </div>
                <div className="flex flex-col lg:items-start space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                        <FaCheckCircle className="text-green-500 text-sm    " />
                        <span className=" text-gray-900 font-semibold">{formatDate(receivedDate)} </span>
                    </div>
                    <p className=" text-gray-600 max-w-sm lg:max-w-md">
                        Your order has been successfully delivered and received. Enjoy your purchase!
                    </p>
                </div>
            </div>
        )}
        {arrivedDate && (
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between bg-white shadow-sm p-2 rounded-lg space-y-3 lg:space-y-0 lg:space-x-4">
                <div className="flex items-center space-x-2 bg-slate-100 rounded-md px-3 py-1">
                    <MdLocationOn className="text-primary text-xs" />
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-primary">Arrived</span>
                        <span className="text-[0.6rem] text-purple-500 whitespace-nowrap ">Location</span>
                    </div>
                </div>
                <div className="flex flex-col lg:items-start space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                        <FaCheckCircle className="text-green-500 text-sm    " />
                        <span className=" text-gray-900 font-semibold">{formatDate(arrivedDate)} </span>
                    </div>
                    <p className=" text-gray-600 max-w-sm lg:max-w-md">
                        Your order is on its way and will arrive to {getBarangay(address)}.
                    </p>
                </div>
            </div>
        )}
        {shippedDate && (
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between bg-white shadow-sm p-2 rounded-lg space-y-3 lg:space-y-0 lg:space-x-4">
                <div className="flex items-center space-x-2 bg-slate-100 rounded-md px-3 py-1">
                    <LuTruck className="text-primary text-xs" />
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-primary">Shipped</span>
                        <span className="text-[0.6rem] text-blue-500 whitespace-nowrap">On the way</span>
                    </div>
                </div>
                <div className="flex flex-col lg:items-start space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                        <FaCheckCircle className="text-green-500 text-sm    " />
                        <span className=" text-gray-900 font-semibold">{formatDate(shippedDate)} </span>
                    </div>
                    <p className=" text-gray-600 max-w-sm lg:max-w-md">
                        Your order has shipped and is on its way to {getMunicipal(address)}.
                    </p>
                </div>
            </div>
        )}
        {pickedDate && (
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between bg-white shadow-sm p-2 rounded-lg space-y-3 lg:space-y-0 lg:space-x-4">
                <div className="flex items-center space-x-2 bg-slate-100 rounded-md px-3 py-1">
                    <RiHandHeartFill className="text-primary text-xs" />
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-primary">Picked</span>
                        <span className="text-[0.6rem]  text-yellow-500 whitespace-nowrap">Handled with care</span>
                    </div>
                </div>
                <div className="flex flex-col lg:items-start space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                        <FaCheckCircle className="text-green-500 text-sm    " />
                        <span className=" text-gray-900 font-semibold">{formatDate(pickedDate)} </span>
                    </div>
                    <p className=" text-gray-600 max-w-sm lg:max-w-md">
                        Your items have been picked and are now prepared for packing and shipment.
                    </p>
                </div>
            </div>
        )}
        {processingDate && (
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between bg-white shadow-sm p-2 rounded-lg space-y-3 lg:space-y-0 lg:space-x-4">
                <div className="flex items-center space-x-2 bg-slate-100 rounded-md px-3 py-1">
                    <FaHourglassHalf className="text-primary text-xs" />
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-primary">Processing</span>
                        <span className="text-[0.6rem]  text-red-500 whitespace-nowrap">Awaiting fulfillment</span>
                    </div>
                </div>
                <div className="flex flex-col lg:items-start space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                        <FaCheckCircle className="text-green-500 text-sm    " />
                        <span className=" text-gray-900 font-semibold">{formatDate(processingDate)} </span>
                    </div>
                    <p className=" text-gray-600 max-w-sm lg:max-w-md">
                        Your order is currently being processed and prepared for the next steps. We’ll update you as soon as it progresses.
                    </p>
                </div>
            </div>
        )}
    </div>
</div>







{
    relatedProducts.length > 0 && (
        <div className="mt-20">
            <h1 className="mb-6 text-2xl font-medium tracking-wide uppercase text-slate-900">
                Related Products
            </h1>
            <div className="grid grid-cols-2 gap-8 pb-10 lg:grid-cols-3 xl:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                    <Link
                        key={relatedProduct.id}
                        href={route(
                            "product.show",
                            relatedProduct.id
                        )}
                    >
                        <div className="flex p-4 space-x-2 shadow-lg bg-slate-50 bg-opacity-30 backdrop-blur-md rounded-2xl">
                            {relatedProduct.images &&
                                relatedProduct.images.length >
                                0 ? (
                                relatedProduct.images
                                    .length === 1 ? (
                                    <img
                                        src={`/storage/${relatedProduct.images[0].image_path}`}
                                        alt={`${relatedProduct.name} image 1`}
                                        className="object-cover w-full h-48 mb-4 rounded-lg"
                                    />
                                ) : (
                                    <>
                                        <img
                                            src={`/storage/${relatedProduct.images[0].image_path}`}
                                            alt={`${relatedProduct.name} image 1`}
                                            className="object-cover w-1/2 h-48 mb-4 rounded-lg"
                                        />
                                        {relatedProduct
                                            .images.length >
                                            1 && (
                                                <img
                                                    src={`/storage/${relatedProduct.images[1].image_path}`}
                                                    alt={`${relatedProduct.name} image 2`}
                                                    className="object-cover w-1/2 h-48 mb-4 rounded-lg"
                                                />
                                            )}
                                    </>
                                )
                            ) : (
                                <p className="text-lg text-center text-gray-600">
                                    No Images Available
                                </p>
                            )}
                        </div>
                        <div className="flex items-center justify-between p-3 text-xs ">
                            <div>
                                <h3 className="pb-1 font-semibold text-md">
                                    {relatedProduct.name}
                                </h3>
                                <p className="text-sm">
                                    <FaPesoSign className="inline-block mr-1" />
                                    {Number(
                                        relatedProduct.price
                                    ).toLocaleString(
                                        "en-US",
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }
                                    )}
                                </p>
                            </div>
                            {relatedProduct.stock > 0 ? (
                                <Link
                                    preserveScroll
                                    href={route(
                                        "cart.store"
                                    )}
                                    method="post"
                                    data={{
                                        product_id:
                                            relatedProduct.id,
                                        quantity: 1,
                                    }}
                                    onClick={() =>
                                        handleAddToCart(
                                            product.id
                                        )
                                    }
                                >
                                    <div className="px-3 py-3 text-white rounded-full bg-slate-800">
                                        <GrCart size={15} />
                                    </div>
                                </Link>
                            ) : (
                                <div className="w-full px-2 py-1 text-xs text-center text-gray-600 rounded-full cursor-not-allowed bg-slate-100 sm:w-1/2 sm:py-2">
                                    Out of Stock
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
