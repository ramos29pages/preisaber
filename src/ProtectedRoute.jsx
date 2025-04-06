// src/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = [''] }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si se especifica un rol requerido, verifica que el usuario tenga ese rol
  if (requiredRole.length > 0 && !requiredRole.includes(user.role)) {
    // Puedes redirigir o mostrar un mensaje de acceso no autorizado
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
