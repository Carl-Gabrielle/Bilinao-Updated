    import CustomerContainer from "@/Components/CustomerContainer";
    import CustomerLayout from '@/Layouts/CustomerLayout';
    import { Head } from "@inertiajs/react";

    export default function Categories ({ auth,category}){
        const categoryData = category?.data ?? [];
        return (
            <CustomerLayout  user={auth.user}>
                <Head title="Categories"/>
            <div className="min-h-screen bg-gray-100 pt-20">
            <CustomerContainer className="mt-32">
            <div >
                
            </div>
            </CustomerContainer>
            </div>
            </CustomerLayout>
        )
    }