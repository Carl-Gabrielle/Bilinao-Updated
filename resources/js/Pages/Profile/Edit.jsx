import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationFormAdmin from "./Partials/UpdateProfileInformationAdmin"
import { Head } from "@inertiajs/react";
import DivContainer from "@/Components/DivContainer";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Profile" />
            <DivContainer>
                <div className=" sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-slate-50 bg-opacity-80  backdrop-blur-lg shadow-md rounded-2xl">
                        <UpdateProfileInformationFormAdmin
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>
                    <div className="p-4 sm:p-8 bg-slate-50 bg-opacity-80  backdrop-blur-lg shadow-md   rounded-2xl">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>
            </DivContainer>
        </AuthenticatedLayout>
    );
}
