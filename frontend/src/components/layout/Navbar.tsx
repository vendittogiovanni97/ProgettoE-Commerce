import React, { useState } from "react";
import { NavbarProps } from "../../types/navBarProps";
import {
  activeButtonClasses,
  baseButtonClasses,
  inactiveButtonClasses,
} from "../../utils/navbarUtils";

const Navbar: React.FC<NavbarProps> = ({
  pageTitle = "Dashboard",
  userName,
}) => {
  // Stato per tenere traccia del ruolo selezionato (inizializzato a 'user')
  const [activeRole, setActiveRole] = useState<"user" | "admin">("user");

  return (
    <nav className="fixed left-[18%] top-0 h-[70px] w-[82%] z-40 flex items-center justify-between px-4 md:px-8 shadow-lg bg-white/80 backdrop-blur-md transition-all duration-300 ease-out">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-primary text-xl p-1">
          <i className="fas fa-bars"></i>
        </button>

        <span className="text-[#6a11cb] text-[1.5em] md:text-2xl font-semibold">
          {pageTitle}
        </span>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center bg-gray-100 p-1 rounded-full">
          <button
            className={`${baseButtonClasses} ${
              activeRole === "user"
                ? activeButtonClasses
                : inactiveButtonClasses
            }`}
            onClick={() => setActiveRole("user")} // Aggiorna lo stato al click
          >
            User
          </button>
          <button
            className={`${baseButtonClasses} ${
              activeRole === "admin"
                ? activeButtonClasses
                : inactiveButtonClasses
            }`}
            onClick={() => setActiveRole("admin")} // Aggiorna lo stato al click
          >
            Admin
          </button>
        </div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <i className="text-[var(--primary-color)] fas fa-user-circle text-primary text-3xl md:text-4xl group-hover:scale-110 transition-transform"></i>
          <span className="text-[var(--secondary-color)] hidden md:inline font-semibold">
            {userName ? `Ciao, ${userName}` : "Ciao, Giovanni!"}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
