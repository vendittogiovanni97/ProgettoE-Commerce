import React, { useEffect } from "react";
import { sidebarLinks, SidebarProps } from "../../types/sideBarProps";
import {
  baseClasses,
  activeClasses,
  inactiveClasses,
} from "../../utils/sidebarUtils";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 
                ${isOpen ? "w-[273px]" : "w-[80px]"} 
                z-50 flex flex-col text-light-text 
                bg-gradient-to-b from-[#6a11cb] to-[#2575fc] 
                shadow-lg transition-all duration-300 ease-out 
                rounded-tr-3xl rounded-br-large md:translate-x-0`}
    >
      <div
        className={`flex items-center ${
          isOpen ? "justify-between" : "justify-center"
        } h-navbar min-h-navbar ${isOpen ? "px-7" : "px-0"}`}
      >
        {isOpen && (
          <h2 className="text-white text-3xl font-bold whitespace-nowrap pt-5">
            Magazzino
          </h2>
        )}
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center text-2xl p-2 pt-8 rounded-full hover:bg-white/20 transition-transform duration-300 hover:rotate-90"
        >
          <i className={`text-white fas ${isOpen ? "fa-bars" : "fa-bars"}`}></i>
        </button>
      </div>

      <nav className="flex-grow overflow-y-auto px-4 pt-9">
        <ul>
          {sidebarLinks.map((link) => (
            <li key={link.path} className="mb-1 group">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `${baseClasses} ${
                    isActive ? activeClasses : inactiveClasses
                  } ${!isOpen ? "justify-center" : ""}`
                }
                title={!isOpen ? link.label : ""}
              >
                <i
                  className={`fas ${
                    link.icon
                  } fa-fw w-[30px] text-center text-xl ${
                    isOpen ? "mr-5" : "mr-0"
                  } transition-transform duration-300`}
                ></i>
                {isOpen && (
                  <span className="font-medium transition-opacity duration-200">
                    {link.label}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`text-white p-6 mt-auto ${
          !isOpen ? "flex justify-center p-4" : ""
        }`}
      >
        <button
          className={`flex items-center ${isOpen ? "justify-center" : ""} ${
            !isOpen ? "w-10 h-10 p-0" : "w-full p-3"
          } rounded-4xl bg-white/10 border-2 border-white/30 hover:bg-[#ff4081] hover:border-[#ff4081] hover:scale-105 hover:shadow-lg transition-all duration-300 whitespace-nowrap`}
        >
          <i className="fas fa-sign-out-alt fa-fw mr-3"></i>
          {isOpen && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
