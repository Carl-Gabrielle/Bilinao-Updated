import { Link } from "@inertiajs/react";
import { TiArrowDown } from "react-icons/ti";
export default function CustomerLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`w-full  tracking-wider uppercase font-medium inline-flex items-center sm:px-4 px-0 lg:px-4 md:px-0 xl:px-4 text-nowrap py-2 text-sm transition-all duration-300 ease-in-out rounded-lg ${
                active
                    ? "text-white  bg-slate-800"
                    : "text-slate-900 hover:bg-slate-100 transition-colors duration-300 ease-in-out"
            } ${className}`}
        >
            {children}
            {active && <TiArrowDown className="ml-2 text-base" />}
        </Link>
    );
}
