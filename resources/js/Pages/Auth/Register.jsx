import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Carousel from "@/Components/Carousel";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        phone_number: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className=" rounded-t-3xl xl:rounded-r-3xl shadow-inner sm:rounded-none scroll-bar max-w-4xl overflow-y-auto lg:px-32 p-10 mx-auto w-full sm:h-full order-2 lg:order-1 bg-slate-50 ">
                <h1 id="text" className="text-2xl font-bold text-gray-800 mb-2">
                    Welcome to Bili-Nao!👋
                </h1>
                <p className="text-gray-600 mb-8">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-slate-800 font-semibold"
                    >
                        Login
                    </Link>
                </p>
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Full Name" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="phone" value="Phone number" />
                        <TextInput
                            id="phone_number"
                            type="number"
                            name="phone_number"
                            value={data.phone_number}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) =>
                                setData("phone_number", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.phone_number}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4 mb-6">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>
                    <div className="pb-10">
                        <PrimaryButton disabled={processing}>
                            Signup
                        </PrimaryButton>
                    </div>
                </form>
            </div>
            <Carousel />
        </GuestLayout>
    );
}