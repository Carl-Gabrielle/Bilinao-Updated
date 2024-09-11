import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head } from "@inertiajs/react";

export default function Shop({ auth }) {
    return (
        <CustomerLayout user={auth.user}>
            <Head title="About Us" />
            <div className="min-h-screen bg-gray-100 pt-20 pb-1">
                <CustomerContainer className="mt-32">
                    <div>
                        <h1>This is shop page </h1>
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
