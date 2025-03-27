import React from "react";
import { NavLink } from "react-router-dom";

export interface SidebarLink {
  path: string;
  icon: string; // Classe Font Awesome (es: 'fa-box')
  label: string;
}

const sidebarLinks: SidebarLink[] = [
  { path: "/", icon: "fa-tachometer-alt", label: "Dashboard" },
  { path: "/products", icon: "fa-box", label: "Prodotti" },
  { path: "/orders", icon: "fa-shopping-cart", label: "Ordini" },
  { path: "/inventory", icon: "fa-warehouse", label: "Inventario" },
  { path: "/users", icon: "fa-users-cog", label: "Gestione Utenti" }, // Ancora presente, ma non più condizionale qui
  { path: "/settings", icon: "fa-cogs", label: "Impostazioni" }, // Ancora presente
  { path: "/profile", icon: "fa-user", label: "Profilo" },
];

const Sidebar: React.FC = () => {
  // Definisci le classi base e quelle per lo stato attivo
  const baseClasses =
    "flex items-center p-4 m-1 rounded-2xl transition-all duration-300 whitespace-nowrap overflow-hidden text-[18px]";
  const inactiveClasses =
    "text-white/80 hover:text-white hover:bg-white/15 hover:translate-x-1 hover:scale-[1.02]";
  const activeClasses =
    "bg-[var(--accent-color)] text-white font-semibold shadow-md"; // Stile attivo desiderato
  return (
    <aside
      style={{
        background:
          "linear-gradient(180deg, var(--primary-color) 0%, var(--secondary-color) 100%)",
      }}
      className="flex top-0 left-0 h-screen w-[23%] z-50 flex-col text-light-text bg-gradient-to-b from-primary to-secondary shadow-lg transition-all duration-300 ease-out w-sidebar rounded-tr-3xl rounded-br-large md:translate-x-0"
    >
      <div className="flex items-center justify-between h-navbar min-h-navbar px-7">
        <h2
          style={{ color: "white" }}
          className="text-3xl font-bold whitespace-nowrap pt-5"
        >
          Magazzino
        </h2>
        <button className="hidden md:flex items-center justify-center text-2xl p-2 pt-8 rounded-full hover:bg-white/20 transition-transform duration-300 hover:rotate-90">
          <i style={{ color: "white" }} className="fas fa-bars"></i>
        </button>
      </div>

      <nav className="flex-grow overflow-y-auto px-4 pt-9">
        <ul>
          {sidebarLinks.map((link) => (
            <li key={link.path} className="mb-1 group">
              {/* Sostituire 'a' con 'NavLink' per funzionalità router */}
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

      <div style={{ color: "white" }} className="p-6 mt-auto">
        <button className="flex items-center justify-center w-full p-3 rounded-4xl bg-white/10 border-2 border-white/30 hover:bg-accent hover:border-accent hover:scale-105 hover:shadow-lg transition-all duration-300 whitespace-nowrap">
          <i className="fas fa-sign-out-alt fa-fw mr-3"></i>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
