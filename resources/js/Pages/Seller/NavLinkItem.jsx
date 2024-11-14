import React from 'react';
import NavLink from "@/Components/NavLink";
import { MdOutlineDashboard, MdOutlineKeyboardArrowRight } from 'react-icons/md';

const NavLinkItem = ({ to, label, icon: Icon, isActive, handleClick }) => {
    return (
        <NavLink
            href={to}
            active={isActive}
            onClick={handleClick}
            className={`flex items-center justify-between rounded-lg transition-colors ${isActive ? 'bg-gray-800' : 'hover:bg-gray-100'
                }`}
        >
            <div className="flex items-center space-x-3">
                <Icon
                    className={`size-4 ${isActive ? 'text-slate-50' : 'text-slate-800'}`}
                />
                <span>{label}</span>
            </div>
            <MdOutlineKeyboardArrowRight
                className={`size-5 ${isActive ? 'text-slate-50' : 'text-slate-800'}`}
            />
        </NavLink>
    );
};

export default NavLinkItem;
