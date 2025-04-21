// src/pages/Home.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if ( user.role === 'docente') {
    return (
        <h1>Hola mundo</h1>
    );
  } else if (user.role === 'administrador') {
    return (
        <h1>Hola {user.given_name}</h1>
    );
  }
  else if (user.role === 'estudiante') {
    return (
        <h1>Hola estudiante</h1>
    );
  } else {
    return (
        <h1>Hola invitado</h1>
    );
  }

};

export default Home;
