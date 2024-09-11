import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full  font-medium inline-flex items-center px-4 text-nowrap py-2 text-sm  transition-all duration-300 ease-in-out rounded-lg ${
                active
                    ? 'bg-lime-700 text-white shadow-xl'
                    : 'text-slate-900    hover:bg-gray-100'
            } ${className}`}
        >
            {children}
        </Link>
    );
}
