export default function DashboardCard({
    children,
    outerStyles = "bg-slate-200 w-full rounded-3xl p-3 shadow-lg flex flex-col",
    innerStyles = "bg-slate-50 p-5 rounded-xl flex-1",
    className = "flex items-center justify-between",
}) {
    return (
        <div className={`${outerStyles}`}>
            <div className={`${innerStyles} ${className}`}>{children}</div>
        </div>
    );
}
