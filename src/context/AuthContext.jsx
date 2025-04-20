// src/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Guarda la información del usuario, por ejemplo, en localStorage si lo deseas.
    localStorage.setItem('userRole', userData.role);
    setUser(userData);
    navigate('/dashboard'); // Redirige al usuario a la página de inicio después de iniciar sesión
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
