/* eslint-disable @typescript-eslint/no-unused-vars */
import DashboardPage from "./components/Dashboard/DashboardPage";
import { MainLayout } from "./components/layout/MainLayout";
import ProductList from "./components/product-list";
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
