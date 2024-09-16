import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaRegUser } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { BsBasket2 } from "react-icons/bs";
import { MdProductionQuantityLimits } from "react-icons/md";
import CustomerContainer from "@/Components/CustomerContainer";
import DivContainer from "@/Components/DivContainer";
export default function AdminDashboard({ auth }) {
    const { user } = auth;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="min-h-screen  ">
                <DivContainer>
                    <div className="w-full h-screen   ">
                        <div className="w-full h-32 px-6 py-6 bg-white rounded-3xl">
                            <h1>
                                Hi, <span>{user.name}</span>
                            </h1>
                        </div>
                    </div>
                </DivContainer>
            </div>
        </AuthenticatedLayout>
    );
}
