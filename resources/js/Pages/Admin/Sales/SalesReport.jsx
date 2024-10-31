import DivContainer from "@/Components/DivContainer";
import { LiaEditSolid } from "react-icons/lia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function SalesReport({ auth, }) {
    const { user } = auth;


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Sales Report" />
            <DivContainer>
                <div className="w-full h-auto   ">
                    <div className="bg-slate-50 bg-opacity-80 backdrop-blur-lg overflow-hidden shadow-sm rounded-3xl p-6">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Sales Reports
                            </h2>
                        </div>
                    </div>
                </div>
            </DivContainer>
        </AuthenticatedLayout>
    );
}
