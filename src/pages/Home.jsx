// src/pages/Home.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Metrics from '../components/Metrics';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if ( user.role === 'docente') {
    return (
      <h1>Bienvenido {user.given_name}</h1>
    );
  } else if (user.role === 'administrador') {
    return (
      <>
      <h1 className='text-orange-500 text-2xl font-semibold mb-8' >Bienvenido 
        <span className='text-orange-500 text-2xl font-bold ml-1'>
        {user.given_name}
        </span> 
      </h1>
      <div className="flex flex-col items-center h-screen overflow-scroll">
      <Metrics />
      <Metrics />
      </div>
      </>
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
