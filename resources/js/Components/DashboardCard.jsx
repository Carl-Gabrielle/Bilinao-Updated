import React from "react";

export default function DashboardCard({
    children,
    outerStyles = "bg-slate-200 w-full rounded-3xl p-3 shadow-lg ",
    innerStyles = "bg-slate-50 p-5 rounded-xl",
    className = "flex items-center justify-between",
}) {
    return (
        <div className={`${outerStyles}`}>
            <div className={`${innerStyles} ${className}`}> {children}</div>
        </div>
    );
}
