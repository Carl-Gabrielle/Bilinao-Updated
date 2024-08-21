    import React from 'react';
    import { Head } from "@inertiajs/react";
import CustomerLayout from '@/Layouts/CustomerLayout';


export default function DashboardCustomer  ({auth}) {
    return (
        < CustomerLayout
        user={auth.user}>
        <div className="min-h-screen bg-gray-100">
        <Head title="Customer Dashboard" />

        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900">Customer Dashboard</h1>
            </div>
        </header>

        <main>
            <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome, [Customer Name]!</h2>
                <p className="text-gray-600">Here you can find your recent activities and manage your account.</p>

                {/* Add more components or sections here */}
                <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-700">Recent Orders</h3>
                <div className="mt-4">
                    {/* List of recent orders */}
                    {/* You can map through orders and display them here */}
                </div>
                </div>

                <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-700">Account Settings</h3>
                <div className="mt-4">
                    {/* Link to account settings */}
                    <a href="/account/settings" className="text-blue-500 hover:underline">
                    Manage Account Settings
                    </a>
                </div>
                </div>
            </div>
            </div>
        </main>
        </div>
        </ CustomerLayout>
    );
}
