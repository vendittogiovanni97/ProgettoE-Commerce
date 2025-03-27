import DashboardPage from "./components/Dashboard/DashboardPage";
import { MainLayout } from "./components/layout/MainLayout";
import { Container } from "./styles/containerStyled";

function App() {
  return (
    <Container>
      <MainLayout>
        <DashboardPage />
      </MainLayout>
    </Container>
  );
}

export default App;
