// src/AuthContext.jsx
import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { updateUser } from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [rol, setRol] = useState(null);

  const login = (userData) => {
    // Guarda la información del usuario, por ejemplo, en localStorage si lo deseas.
    localStorage.setItem("userRole", userData.role);
    localStorage.setItem("host_email", userData.email);
    localStorage.setItem("auth_user", JSON.stringify(userData));
    localStorage.setItem("pic", userData.picture);
    console.log('@ramosdev')
    setUser(userData);
    setRol(userData.role);

    if (userData.role === "administrador" || userData.role === "docente") {
      navigate("/dashboard"); // Redirige al usuario a la página de usuarios después de iniciar sesión
    } else if (userData.role === "estudiante") {
      navigate("/formularios"); // Redirige al usuario a la página de inicio después de iniciar sesión
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  const value = {
    user: user,
    rol,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
