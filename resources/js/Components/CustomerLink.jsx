import { Link } from "@inertiajs/react";

export default function CustomerLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`w-full  font-medium inline-flex items-center px-4 text-nowrap py-2 text-sm  transition-all duration-300 ease-in-out rounded-lg ${
                active
                    ? "text-lime-700  font-semibold underline underline-offset-8 "
                    : "text-slate-900 hover:text-slate-700"
            } ${className}`}
        >
            {children}
        </Link>
    );
}
