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
            className={`w-full  inline-flex items-center px-4 text-nowrap  py-3 text-sm  transition-all duration-300 ease-in-out rounded-2xl ${active ? "bg-slate-800 text-white " : " hover:bg-slate-200"
                } ${className}`}
        >
            {children}
        </Link>
    );
}
