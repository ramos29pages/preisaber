// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./pages/Home"; // Página de inici
import Register from "./pages/Register"; // Página de registro
import Login from "./pages/Login";
import LayoutDashboard from "./layout/LayoutDashboard"; // Ejemplo de dashboard con Header y contenido
import Unauthorized from "./pages/Unauthorized"; // Página para mostrar acceso no autorizado

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/"
            element={
              <ProtectedRoute requiredRole={["administrador", "estudiante", "docente"]}>
                <LayoutDashboard>
                  <Home></Home>
                </LayoutDashboard>
              </ProtectedRoute>
            }
          />
          <Route
            path="/registros"
            element={
              <ProtectedRoute requiredRole={["administrador", "docente"]}>
                <LayoutDashboard>
                  <Register></Register>
                </LayoutDashboard>
              </ProtectedRoute>
            }
          />
          <Route
            path="/formularios"
            element={
              <ProtectedRoute requiredRole={["administrador", "docente", "estudiante"]}>
                <LayoutDashboard>
                  <Register></Register>
                </LayoutDashboard>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="administrador">
                <LayoutDashboard />
              </ProtectedRoute>
            }
          />
          {/* Agrega más rutas según tus necesidades */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
