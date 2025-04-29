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
import AddUserForm from "./components/AddUserForm";
import Formularios from "./pages/Formularios";
import ModelManager from "./components/ModelManager";
import Resultados from "./pages/Resultados";



function App() {


  const rolesForHome = ["administrador", "estudiante", "docente"];
  const rolesForRegister = ["administrador", "docente"];
  const rolesForAddRegister = ["administrador", "docente"];
  const rolesForPreview = ["administrador", "docente"];
  // const rolesForUnauthorized = ["administrador", "estudiante", "docente"];
  // const rolesForLogin = ["administrador", "estudiante", "docente"];
  const rolesForFormularios = ["administrador", "docente", "estudiante"];



  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRole={rolesForHome}>
                  <LayoutDashboard>
                  <Home />
                  </LayoutDashboard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/usuarios"
              element={
                <ProtectedRoute requiredRole={rolesForRegister}>
                  <LayoutDashboard>
                    <Register />
                  </LayoutDashboard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/formularios"
              element={
                <ProtectedRoute requiredRole={rolesForFormularios}>
                  <LayoutDashboard>
                    <Formularios />
                  </LayoutDashboard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/modelos"
              element={
                <ProtectedRoute requiredRole={rolesForFormularios}>
                  <LayoutDashboard>
                    <ModelManager />
                  </LayoutDashboard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-registers"
              element={
                <ProtectedRoute requiredRole={rolesForAddRegister}>
                  <LayoutDashboard>
                    <AddRegister />
                  </LayoutDashboard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-user"
              element={
                <ProtectedRoute requiredRole={rolesForAddRegister}>
                  <LayoutDashboard>
                    <AddUserForm />
                  </LayoutDashboard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/preview"
              element={
                <ProtectedRoute requiredRole={rolesForPreview}>
                  <LayoutDashboard>
                    <Preview />
                  </LayoutDashboard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/resultados"
              element={
                <ProtectedRoute requiredRole={rolesForPreview}>
                  <LayoutDashboard>
                    <Resultados/>
                  </LayoutDashboard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/asiganciones"
              element={
                <ProtectedRoute requiredRole={rolesForPreview}>
                  <LayoutDashboard>
                  <Resultados/>
                    
                  </LayoutDashboard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/predisaber"
              element={
                <ProtectedRoute requiredRole={rolesForPreview}>
                  <LayoutDashboard>
                  <Resultados/>
                    
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
