import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPages";
import Dashboard from "../pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "../context/Auth.Provider";
import { MainLayout } from "../components/layout/MainLayout";
import ProductList from "../pages/Product-list";

const AppRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Route pubbliche */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" />

          {/* Route protette */}
          <Route
            path="/"
            element={
              //<ProtectedRoute>
              <Dashboard />
              //</ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              //<ProtectedRoute>
              <ProductList />
              //</ProtectedRoute>
            }
          />

          {/* Route per ruoli specifici */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <div>Admin Dashboard</div>
              </ProtectedRoute>
            }
          />
          {/* Redirect alla dashboard per la root */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Route 404 */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
