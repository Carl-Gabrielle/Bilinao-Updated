import React, { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { MdLogin } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Carousel from "@/Components/Carousel";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
        agreeToPrivacy: false,
    });
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        if (!data.agreeToPrivacy) {
            alert("You must agree to the data privacy policy to continue.");
            return;
        }
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };
    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="rounded-t-3xl sm:rounded-none xl:rounded-r-3xl scroll shadow-inner max-w-4xl lg:px-32 p-10 mx-auto w-full sm:h-full order-2 lg:order-1 bg-slate-50 overflow-auto">
                <div className="mt-5 w-full flex flex-col">
                    <Link
                        href="/sellerLogin"
                        className="inline-flex items-center text-sm px-6 py-2 w-80 mb-2 text-primary border border-primary rounded-2xl shadow-md transition-colors duration-300 font-semibold"
                    >
                        <FaRegUser className="mr-2" />
                        Log In to Your Seller Account
                        <MdOutlineKeyboardArrowRight className="ml-2" />
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">
                        Welcome to Bili-Nao! 👋
                    </h1>
                    <p className="text-gray-600 mb-8">
                        New to Bili-Nao?{" "}
                        <Link
                            href="/register"
                            className="text-slate-800 font-semibold"
                        >
                            Create an Account
                        </Link>
                    </p>
                    <form onSubmit={submit} className="mt-2 z-10">
                        <div className="mb-6">
                            <InputLabel
                                htmlFor="email"
                                value="Email Address"
                                className="block text-sm font-medium text-gray-600"
                            />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData("email", e.target.value)}
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2 text-red-500 text-sm"
                            />
                        </div>
                        <div className="relative mb-6">
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type={data.remember ? "text" : "password"}
                                name="password"
                                value={data.password}
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2 text-red-500 text-sm"
                            />
                        </div>
                        <div className="mb-6 flex items-center gap-2">
                            <Checkbox
                                id="showPasswordLogin"
                                className="cursor-pointer"
                                label="Remember me"
                                checked={data.remember}
                                onChange={() =>
                                    setData("remember", !data.remember)
                                }
                            />
                            <span className="text-gray-600">See Password</span>
                        </div>
                        <div className="mb-6 flex items-center gap-2">
                            <Checkbox
                                id="privacyPolicy"
                                className="cursor-pointer"
                                checked={data.agreeToPrivacy}
                                onChange={() =>
                                    setData("agreeToPrivacy", !data.agreeToPrivacy)
                                }
                            />
                            <span className="text-gray-600">
                                I agree to the{" "}
                                <button
                                    type="button"
                                    className="text-primary  font-semibold underline"
                                    onClick={() => setShowPrivacyModal(true)}
                                >
                                    Data Privacy Policy
                                </button>
                            </span>
                        </div>
                        {canResetPassword && (
                            <div className="mb-6">
                                <Link
                                    href={route("password.request")}
                                    className="text-slate-800 font-semibold"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                        )}
                        <PrimaryButton disabled={processing}>
                            {processing ? "Logging in..." : "Log in"}
                            <MdLogin className="ml-2" />
                        </PrimaryButton>
                    </form>
                    {status && (
                        <div className="mt-4 text-green-500 text-sm">
                            {status}
                        </div>
                    )}
                </div>
            </div>
            <Carousel />
            {showPrivacyModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5">
                    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg h-full overflow-scroll overflow-x-hidden scroll-bar">
                        <div className="flex  items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-primary ">
                                Data Privacy Policy
                            </h2>
                            <button
                                className=" hover:bg-slate-100 p-3 transition-colors duration-300 ease-in-out text-primary rounded-full"
                                onClick={() => setShowPrivacyModal(false)}
                            >
                                < IoClose className="size-5" />
                            </button>
                        </div>
                        <div className="text-gray-600 space-y-4">
                            <div>
                                <h3 className="font-semibold text-primary">Phone Number</h3>
                                <p>
                                    We collect phone numbers from members and
                                    customers of the Bolinao Artist Group
                                    Incorporated on the Bili-Nao E-commerce
                                    Platform. We use these numbers to
                                    communicate about orders, questions, and
                                    updates related to the platform. We will
                                    only use your phone number for these
                                    purposes and will not share it with others
                                    without your permission. We store and
                                    encrypt phone numbers securely to protect
                                    against unauthorized access.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-primary">Contribution</h3>
                                <p>
                                    A contribution refers to the Bolinao Artist
                                    Group Incorporated's financial support to
                                    help the Bili-Nao E-commerce Platform grow.
                                    This includes artwork, crafts, or other
                                    items for sale on the platform. We track all
                                    contributions transparently and use them to
                                    improve the platform and support our
                                    artisans. We handle contribution data
                                    securely and share it only for authorized
                                    reasons, like reporting and accountability.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-primary">
                                    Percentage of Contribution (Bagi)
                                </h3>
                                <p>
                                    The percentage of contribution shows the
                                    share of sales revenue that goes to
                                    individual artisans or the group. On the
                                    Bili-Nao E-commerce Platform, we use this
                                    information to fairly distribute earnings,
                                    recognize efforts, and keep transparency in
                                    our revenue-sharing agreements. We keep
                                    these percentages confidential and only
                                    share them with authorized people when
                                    necessary for financial management and
                                    reporting.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </GuestLayout>
    );
}
