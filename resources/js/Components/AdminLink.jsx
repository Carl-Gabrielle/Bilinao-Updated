import { Link } from "@inertiajs/react";

export default function AdminLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`w-full  inline-flex items-center px-4 text-nowrap py-2 text-sm  transition-all duration-300 ease-in-out rounded-lg ${
                active ? "bg-[#548235] text-white " : " hover:bg-gray-100"
            } ${className}`}
        >
            {children}
        </Link>
    );
}