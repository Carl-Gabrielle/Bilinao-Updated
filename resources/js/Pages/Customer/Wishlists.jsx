import CustomerLayout from "@/Layouts/CustomerLayout";
import Banner from "@/Components/Banner";
import CustomerContainer from "@/Components/CustomerContainer";
import { Head } from "@inertiajs/react";

export default function Wishlists({ auth }) {
    return (
        <CustomerLayout user={auth.user}>
            <Head title="My Wishlists" />
            <div className="min-h-screen pt-20 pb-1">
                <Banner title="My Wishlists" />
                <CustomerContainer>
                    <div className="flex items-center space-x-3">
                        <hr className="w-28 border border-slate-800 mb-6" />
                        <h1 className="font-bold text-2xl mb-6 text-slate-800 uppercase tracking-widest">
                            Your Saved Wishlists
                        </h1>
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
