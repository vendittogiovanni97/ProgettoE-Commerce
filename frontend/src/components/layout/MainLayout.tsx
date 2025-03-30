import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Container } from "../../styles/containerStyled";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    const savedState = localStorage.getItem("sidebarOpen");
    return savedState !== null ? JSON.parse(savedState) : true;
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Container sidebarOpen={sidebarOpen}>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <Navbar sidebarOpen={sidebarOpen} />
        <Outlet />
      </Container>
    </>
  );
};
