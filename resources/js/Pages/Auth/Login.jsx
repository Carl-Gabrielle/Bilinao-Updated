import React, { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { MdLogin } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Carousel from "@/Components/Carousel";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    const togglePasswordVisibility = () => {
        setData("remember", !data.remember);
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="rounded-t-3xl sm:rounded-none scroll max-w-4xl lg:px-32 p-10 mx-auto w-full sm:h-full order-2 lg:order-1 bg-white overflow-y-auto">
                <div className="mt-5 w-full flex flex-col">
                    <Link
                        href="/sellerLogin"
                        className="inline-flex items-center text-sm px-6 py-2 w-80 mb-2 text-white bg-primary rounded-lg shadow-md transition-colors duration-300 font-semibold"
                    >
                        <FaRegUser className="mr-2" />
                        Log In to Your Seller Account
                        <MdOutlineKeyboardArrowRight className="ml-2" />
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">
                        Welcome to Bili-Nao!👋
                    </h1>
                    <p className="text-gray-600 mb-8">
                        New to Bili-Nao?{" "}
                        <Link
                            href="/register"
                            className="text-primary font-semibold"
                        >
                            Create an Account
                        </Link>
                    </p>
                    <form onSubmit={submit} className="mt-2">
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
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
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
                                onChange={togglePasswordVisibility}
                            />
                            <span className="text-gray-600 ">See Password</span>
                        </div>
                        {canResetPassword && (
                            <div className="mb-6">
                                <Link
                                    href={route("password.request")}
                                    className="text-primary font-semibold"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                        )}
                        <PrimaryButton disabled={processing}>
                            <MdLogin className="mr-2" /> Log in
                        </PrimaryButton>
                    </form>
                    {status && (
                        <div className="mt-4 text-red-500 text-sm">
                            {status}
                        </div>
                    )}
                </div>
            </div>
            <Carousel />
        </GuestLayout>
    );
}
