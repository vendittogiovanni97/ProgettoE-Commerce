import React from "react";
import { sidebarLinks } from "../../types/sideBarProps";
import {
  baseClasses,
  activeClasses,
  inactiveClasses,
} from "../../utils/sidebarUtils";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed top-0 left-0 bottom-0 w-[273px] z-50 flex flex-col text-light-text bg-gradient-to-b from-[#6a11cb] to-[#2575fc] shadow-lg transition-all duration-300 ease-out rounded-tr-3xl rounded-br-large md:translate-x-0">
      <div className="flex items-center justify-between h-navbar min-h-navbar px-7">
        <h2 className="text-white text-3xl font-bold whitespace-nowrap pt-5">
          Magazzino
        </h2>
        <button className="hidden md:flex items-center justify-center text-2xl p-2 pt-8 rounded-full hover:bg-white/20 transition-transform duration-300 hover:rotate-90">
          <i className="text-white fas fa-bars"></i>
        </button>
      </div>

      <nav className="flex-grow overflow-y-auto px-4 pt-9">
        <ul>
          {sidebarLinks.map((link) => (
            <li key={link.path} className="mb-1 group">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                }
              >
                <i
                  className={`fas ${link.icon} fa-fw w-[30px] text-center text-xl mr-5 transition-transform duration-300`}
                ></i>
                <span className="font-medium transition-opacity duration-200">
                  {link.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="text-white p-6 mt-auto">
        <button className="flex items-center justify-center w-full p-3 rounded-4xl bg-white/10 border-2 border-white/30 hover:bg-accent hover:border-accent hover:scale-105 hover:shadow-lg transition-all duration-300 whitespace-nowrap">
          <i className="fas fa-sign-out-alt fa-fw mr-3"></i>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
