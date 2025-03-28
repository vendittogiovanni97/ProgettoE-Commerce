export interface SidebarLink {
  path: string;
  icon: string; // Classe Font Awesome (es: 'fa-box')
  label: string;
}

export const sidebarLinks: SidebarLink[] = [
  { path: "/", icon: "fa-tachometer-alt", label: "Dashboard" },
  { path: "/products", icon: "fa-box", label: "Prodotti" },
  { path: "/orders", icon: "fa-shopping-cart", label: "Ordini" },
  { path: "/inventory", icon: "fa-warehouse", label: "Inventario" },
  { path: "/users", icon: "fa-users-cog", label: "Gestione Utenti" }, // Ancora presente, ma non più condizionale qui
  { path: "/settings", icon: "fa-cogs", label: "Impostazioni" }, // Ancora presente
  { path: "/profile", icon: "fa-user", label: "Profilo" },
];
