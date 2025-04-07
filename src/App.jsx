// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AddRegister from "./pages/AddRegister";
import Login from "./pages/Login";
import LayoutDashboard from "./layout/LayoutDashboard";
import Unauthorized from "./pages/Unauthorized";
import Preview from "./pages/Preview";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route
              path="/"
              element={
                <ProtectedRoute requiredRole={["administrador", "estudiante", "docente"]}>
                  <LayoutDashboard>
                    <Home />
                  </LayoutDashboard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/registros"
              element={
                <ProtectedRoute requiredRole={["administrador", "docente"]}>
                  <LayoutDashboard>
                    <Register />
                  </LayoutDashboard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/formularios"
              element={
                <ProtectedRoute requiredRole={["administrador", "docente", "estudiante"]}>
                  <LayoutDashboard>
                    <Register />
                  </LayoutDashboard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-registers"
              element={
                <ProtectedRoute requiredRole={["administrador", "docente"]}>
                  <LayoutDashboard>
                    <AddRegister />
                  </LayoutDashboard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/preview"
              element={
                <ProtectedRoute requiredRole={["administrador", "docente"]}>
                  <LayoutDashboard>
                    <Preview />
                  </LayoutDashboard>
                </ProtectedRoute>
              }
            />
            {/* Más rutas según necesidad */}
          </Routes>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
