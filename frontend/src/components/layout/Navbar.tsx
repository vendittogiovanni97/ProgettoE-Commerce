import React, { useState } from "react";

export interface NavbarProps {
  pageTitle?: string;
  userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  pageTitle = "Dashboard", // Valore di default
  userName,
}) => {
  // Stato per tenere traccia del ruolo selezionato (inizializzato a 'user')
  const [activeRole, setActiveRole] = useState<"user" | "admin">("user");

  const baseButtonClasses =
    "py-1.5 px-4 rounded-full text-sm font-medium transition-all duration-300 border-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50";
  // Classi specifiche per il bottone attivo
  const activeButtonClasses = "bg-[var(--primary-color)] text-white shadow-sm";

  // Classi specifiche per il bottone inattivo
  const inactiveButtonClasses =
    "bg-transparent text-dark-text hover:bg-primary/10";

  return (
    <nav className="fixed left-[18%] top-0 h-[70px] w-[82%] z-40 flex items-center justify-between px-4 md:px-8 shadow-lg bg-white/80 backdrop-blur-md transition-all duration-300 ease-out">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-primary text-xl p-1">
          <i className="fas fa-bars"></i>
        </button>

        <span
          style={{ color: "var(--primary-color)" }}
          className="text-[1.5em] md:text-2xl font-semibold"
        >
          {pageTitle}
        </span>
      </div>
      <div className="flex items-center gap-6">
        {/* --- CONTENITORE PER IL ROLE SWITCHER --- */}
        {/* Questo div ha lo sfondo grigio chiaro e la forma a pillola */}
        <div className="hidden md:flex items-center bg-gray-100 p-1 rounded-full">
          <button
            // Combina classi base + classi condizionali attive/inattive
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
        {/* --- FINE ROLE SWITCHER --- */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <i
            style={{ color: "var(--primary-color)" }}
            className="fas fa-user-circle text-primary text-3xl md:text-4xl group-hover:scale-110 transition-transform"
          ></i>
          <span
            style={{ color: "var(--secondary-color)" }}
            className="hidden md:inline font-semibold"
          >
            {userName ? `Ciao, ${userName}` : "Ciao, Giovanni!"}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
