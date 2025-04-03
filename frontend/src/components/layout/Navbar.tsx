import React, { useEffect, useState } from "react";
import { ExtendedNavbarProps } from "../../types/navBarProps";
import {
  activeButtonClasses,
  baseButtonClasses,
  inactiveButtonClasses,
} from "../../utils/navbarUtils";
import { useLocation } from "react-router-dom";
import NotificationCenter from "./NotificationsCenter";

const Navbar: React.FC<ExtendedNavbarProps> = ({
  pageTitle: defaultPageTitle = "Dashboard",
  userName,
  sidebarOpen,
}) => {
  // Stato per tenere traccia del ruolo selezionato
  const [activeRole, setActiveRole] = useState<"user" | "admin">("admin");
  const [pageTitle, setPageTitle] = useState(defaultPageTitle);

  // Ottieni il percorso corrente usando React Router
  const location = useLocation();

  // Aggiorna il titolo quando cambia il percorso
  useEffect(() => {
    const pathTitleMap: { [key: string]: string } = {
      "/": "Dashboard",
      "/products": "Prodotti",
      "/orders": "Gestione Ordini",
      "/inventory": "Inventario Scorte",
      "/usersManagement": "Gestione Utenti",
    };

    const pathname = location.pathname;
    setPageTitle(pathTitleMap[pathname] || defaultPageTitle);
  }, [location.pathname, defaultPageTitle]);

  return (
    <nav
      className={`fixed ${
        sidebarOpen ? "left-[273px]" : "left-[80px]"
      } top-0 h-[70px] ${
        sidebarOpen ? "w-[calc(100%-273px)]" : "w-[calc(100%-80px)]"
      } z-40 flex items-center justify-between px-4 md:px-8 shadow-lg bg-white/80 backdrop-blur-md transition-all duration-300 ease-out`}
    >
      <div className="flex items-center gap-4">
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
            onClick={() => setActiveRole("user")}
          >
            User
          </button>
          <button
            className={`${baseButtonClasses} ${
              activeRole === "admin"
                ? activeButtonClasses
                : inactiveButtonClasses
            }`}
            onClick={() => setActiveRole("admin")}
          >
            Admin
          </button>
        </div>

        <NotificationCenter />

        <div className="flex items-center gap-3 cursor-pointer group">
          <i className="text-[var(--primary-color)] fas fa-user-circle text-3xl md:text-4xl group-hover:scale-110 transition-transform"></i>
          <span className="text-[var(--secondary-color)] hidden md:inline font-semibold">
            {userName ? `Ciao, ${userName}` : "Ciao, Giovanni!"}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
