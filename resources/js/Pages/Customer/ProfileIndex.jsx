import Banner from "@/Components/Banner";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { LuSettings2 } from "react-icons/lu";
import UpdatePasswordForm from "../Profile/Partials/UpdatePasswordForm";
import UpdateProfileInformation from "../Profile/Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import CustomerContainer from "@/Components/CustomerContainer";

export default function ProfileIndex({ auth, mustVerifyEmail, status }) {
    return (
        <CustomerLayout user={auth.user}>
            <Head title="My Account" />
            <div className="min-h-screen  pt-20 pb-12">
                <Banner title="My Account" />
                <CustomerContainer>
                    <div className=" mb-10 max-w-2xl mx-auto leading-8">
                        <div className="flex items-center">
                            <div className="bg-slate-200 mr-2 p-2 rounded-md">
                                <LuSettings2 />
                            </div>
                            <h1 className="text-2xl  tracking-wide text-primary ">Account Settings</h1>
                        </div>
                        <p className="text-primary">Manage your account settings and preferences</p>
                    </div>
                    <div className="max-w-2xl mx-auto  bg-slate-50 bg-opacity-60 backdrop-blur-lg rounded-2xl shadow-xl p-5  mb-6">
                        <UpdateProfileInformation
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>
                    <div className="max-w-2xl mx-auto  bg-slate-50 bg-opacity-60 backdrop-blur-lg rounded-2xl shadow-xl p-5  mb-6">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </CustomerContainer>
            </div>

        </CustomerLayout>
    );
}
