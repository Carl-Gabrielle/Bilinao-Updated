import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { MdOutlineKeyboardArrowLeft, MdLogin } from "react-icons/md";
import { Head, Link } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";
import Bgimage from "./Illustrations/BgImage.jpg";
import SellerInput from "@/Components/SellerInput";

const SellerLogin = () => {
    const { data, setData, post, processing, errors } = useForm({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        post(route("seller.authenticate"), {
            onSuccess: () => {
                window.location.href = route("seller.dashboard");
            },
        });
    };
    useEffect(() => {
        const preloadImage = new Image();
        preloadImage.src = Bgimage;
    }, []);
    return (
        <>
            <Head title="Seller Login" />
            <div
                className="w-full bg-slate-200 h-screen flex items-center justify-center relative"
                style={{
                    backgroundImage: `url(${Bgimage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="absolute inset-0 bg-slate-900 bg-opacity-30 backdrop-blur-sm"></div>
                <div className="relative max-w-6xl mx-auto px-6 w-full">
                    <div className="w-48">
                        <Link href="/">
                            <button
                                className="mb-5 px-6 py-1 bg-white shadow-md bg-opacity-70 backdrop-blur-lg rounded-full font-semibold flex items-center"
                                style={{ cursor: "pointer" }}
                            >
                                <MdOutlineKeyboardArrowLeft className="mr-2" />{" "}
                                Go back
                            </button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col justify-center">
                            <h1 className="text-2xl tracking-normal sm:text-3xl lg:text-5xl font-extrabold text-white">
                                Unleash Your Creativity—Start Selling and Shine!
                            </h1>
                            <p className="mt-4 text-white text-lg">
                                Turn Your Ideas into Global Wonders—Join Us Now!
                            </p>
                        </div>
                        <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-3xl shadow-lg">
                            <div className="px-9 py-8">
                                <h1 className="text-2xl font-bold text-slate-800">
                                    Create Your Bili-Nao Store now
                                </h1>
                                <p className="uppercase text-slate-800 text-sm mt-2">
                                    Enter your username and password to start
                                    selling
                                </p>
                                <form onSubmit={handleLogin} className="mt-5">
                                    <div className="mt-5">
                                        <SellerInput
                                            required
                                            placeholder="Enter your Username"
                                            value={data.username}
                                            onChange={(e) =>
                                                setData(
                                                    "username",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <SellerInput
                                            required
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Enter your Password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    {errors.username && (
                                        <p className="text-red-500 mt-2 text-xs">
                                            {errors.username}
                                        </p>
                                    )}
                                    {errors.password && (
                                        <p className="text-red-500 mt-2 text-xs">
                                            {errors.password}
                                        </p>
                                    )}
                                    <div className="mb-2 flex items-center gap-2 mt-2">
                                        <Checkbox
                                            id="showPasswordLogin"
                                            className="cursor-pointer"
                                            label="Show Password"
                                            checked={showPassword}
                                            onChange={togglePasswordVisibility}
                                        />
                                        <span className="text-slate-800 text-sm ">
                                            See Password
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-gray-800 cursor-pointer font-bold">
                                            Forgot Password?
                                        </span>
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            className="w-full bg-slate-800 text-white py-3 rounded-full transition duration-300 flex items-center justify-center font-bold"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "Logging in..."
                                                : "Log in"}
                                            <MdLogin className="ml-2" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SellerLogin;
