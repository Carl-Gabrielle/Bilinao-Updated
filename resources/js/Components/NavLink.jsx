import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`w-full  font-medium inline-flex items-center justify-between  px-4 text-nowrap py-3 text-sm  transition-all duration-300 rounded-2xl ease-in-out  ${active
                ? "text-white  bg-slate-800"
                : "text-slate-900 hover:bg-gray-100"
                } ${className}`}
        >
            {children}
        </Link>
    );
}
