/* eslint-disable @typescript-eslint/no-unused-vars */
import { MainLayout } from "./components/layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import ProductList from "./pages/product-list";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/product" element={<ProductList />} />
      </Route>
    </Routes>
  );
}

export default App;
