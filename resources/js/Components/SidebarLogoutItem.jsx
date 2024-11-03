import React from 'react';
import { LuLogOut } from 'react-icons/lu';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const SidebarLogoutItem = ({ isSidebarOpen }) => {
    const isActive = route().current("logout");

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-5">
                {!isSidebarOpen && (
                    <div className="ml-1.5">
                        <LuLogOut className={`w-5 h-5 ${isActive ? "text-white" : "text-red-600"}`} />
                    </div>
                )}
                {isSidebarOpen && (
                    <>
                        <LuLogOut className={`w-5 h-5 ${isActive ? "text-white" : "text-red-600"}`} />
                        <span className="text-red-600">Logout</span>
                    </>
                )}
            </div>
            {isSidebarOpen && (
                <MdOutlineKeyboardArrowRight
                    className={`w-5 h-5 ${isActive ? "text-white" : "text-red-600"}`}
                />
            )}
        </div>
    );
};

export default SidebarLogoutItem;
