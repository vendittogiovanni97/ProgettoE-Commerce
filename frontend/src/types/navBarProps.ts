export interface NavbarProps {
  pageTitle?: string;
  userName?: string;
}

export interface ExtendedNavbarProps extends NavbarProps {
  sidebarOpen: boolean;
}
