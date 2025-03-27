import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Container } from "../../styles/containerStyled";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <>
      <Container>
        <Sidebar />
        <Navbar />
        <Outlet /> {/* Questo renderizza i componenti delle route */}
      </Container>
    </>
  );
};
