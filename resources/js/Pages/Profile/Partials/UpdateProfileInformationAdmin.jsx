import InputError from "@/Components/InputError";
import { FaRegUser } from "react-icons/fa";
import InputLabel from "@/Components/InputLabel";
import React, { useState, useEffect } from "react";
import { IoCameraOutline } from "react-icons/io5";
import PrimaryButton from "@/Components/PrimaryButton";
import InformationInput from '@/Components/InformationInput';
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateProfileInformationAdmin({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            profile_photo_path: user.profile_photo_path || "",
        });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        patch(route("profile.update"), {
            preserveScroll: true,
        });
    };

    const [imageSrc, setImageSrc] = useState('/images/default-profile.png');
    const [imageFile, setImageFile] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log(file); // Log the file for debugging
            const url = URL.createObjectURL(file);
            setImageSrc(url);
            setImageFile(file);
            setData("profile_photo_path", file);
        }
    };



    return (
        <section>
            <header>
                <div className="flex items-center">
                    <div className="bg-slate-200 mr-2 p-2 rounded-md inline-block">
                        <FaRegUser />
                    </div>
                    <h2 className="text-lg font-medium text-primary">
                        Profile
                    </h2>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information, phone number and email address.
                </p>
            </header>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="relative flex items-center justify-center ">
                    <label htmlFor="profile-picture" className="cursor-pointer">
                        <img
                            src={imageSrc}
                            alt="Profile Image"
                            className="w-32 h-32 mt-4 rounded-full border-4 border-primary overflow-hidden flex justify-center items-center text-gray-500 bg-gray-200 shadow-lg object-cover"
                        />
                        <div className="absolute bottom-1 right-[22rem] sm:block hidden  text-white bg-primary p-1 rounded-full">
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
                    <div>
                        <InputLabel htmlFor="name" value="Name" />
                        <InformationInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <div>
                        <InputLabel htmlFor="name" value="Contact Number" />
                        <InformationInput
                            type="number"
                            id="phone_number"
                            className="mt-1 block w-full"
                            value={data.phone_number}
                            onChange={(e) => setData("phone_number", e.target.value)}
                            required
                            isFocused
                            autoComplete="phone_number"
                        />
                        <InputError className="mt-2" message={errors.phone_number} />
                    </div>
                </div>
                <div>
                    <InputLabel htmlFor="email" value="Email" />
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
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>
                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Update Profile</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Updated.</p>
                    </Transition>
                </div>
            </form>
        </section >
    );
}
