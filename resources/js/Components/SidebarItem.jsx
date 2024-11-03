import React from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const SidebarItem = ({ icon: Icon, label, routeName, isSidebarOpen }) => {
    const isActive = route().current(routeName);

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-5">
                {!isSidebarOpen && (
                    <div className="ml-1.5">
                        <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-900"}`} />
                    </div>
                )}
                {isSidebarOpen && (
                    <>
                        <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-900"}`} />
                        <span>{label}</span>
                    </>
                )}
            </div>

            {isSidebarOpen && (
                <div className="ml-auto">
                    <MdOutlineKeyboardArrowRight
                        className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-900"}`}
                    />
                </div>
            )}
        </div>
    );
};

export default SidebarItem;
