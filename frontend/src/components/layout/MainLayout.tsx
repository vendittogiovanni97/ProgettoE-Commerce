import { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface ComponentProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: ComponentProps) => {
  return (
    <>
      <Sidebar />
      <Navbar />
      {children}
    </>
  );
};
