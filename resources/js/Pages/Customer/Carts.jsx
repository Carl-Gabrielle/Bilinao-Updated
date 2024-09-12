import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head } from "@inertiajs/react";

export default function Carts({ auth }) {
    return (
        <CustomerLayout user={auth.user}>
            <Head title="About Us" />
            <div className="min-h-screen bg-gray-100 pt-20 pb-1">
                <div className="h-72 w-full bg-lime-700 mt-6 flex items-center justify-center rounded-b-3xl">
                    <h2 className=" text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl text-white text-center">
                        Carts
                    </h2>
                </div>
                <CustomerContainer className="mt-32">
                    <div>
                        <h1>This is Carts page </h1>
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
