import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="h-screen overflow-y-hidden bg-slate-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
                {children}
            </div>
        </div>
    );
}
