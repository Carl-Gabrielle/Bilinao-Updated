import SellerLayout from "@/Layouts/SellerLayout";
import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";

export default function RecentOrders({
    auth = {},
    success,
}) {
    const user = auth.user || {};
    const [visibleSuccess, setVisibleSuccess] = useState(!!success);
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setVisibleSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);
    return (
        <SellerLayout user={user}>
            <Head title="Sales Report" />
            <h1>Sales Report</h1>
        </SellerLayout>
    );
}
