// src/pages/Home.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminForms = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }



  return (
    <div className="container mx-auto mt-4 overflow-y-scroll">
      <h1 className="text-2xl font-bold mb-4">Gestion de formularios</h1>
      <p className="mb-8">
        Hola {user.given_name}, aquí puedes gestionar los formularios.
      </p>
      {/* Aquí puedes agregar más contenido o componentes relacionados con la administración de formularios */}
      <div className="px-2 flex flex-col items-center">
        <div className="flex items-center justify-evenly bg-white rounded-md mb-4 p-4 md:w-xl cursor-pointer hover:scale-102 transition-all shadow-md">
          <img
          className="h-12 md:h-20"
            src="https://www.uniremington.edu.co/wp-content/uploads/2024/05/xlogo-prueba-2022_saberpro.jpg.pagespeed.ic.id6IdDXuis.webp"
            alt="Saber Pro"
            srcset="https://www.uniremington.edu.co/wp-content/uploads/2024/05/xlogo-prueba-2022_saberpro.jpg.pagespeed.ic.id6IdDXuis.webp"
          />

          <div className="text-sm md:text-md text-slate-500">
            <h2 className="text-orange-500">Examen Saber Pro</h2>
            <p className="text-gray-500 font-bold">Modelo Prediccion XGBOST</p>
            <p>25 Preguntas</p>
            <p>Efectividad 76%</p>
          </div>
        </div>

        <div className="flex items-center justify-evenly bg-white rounded-md mb-4 p-4 md:w-xl cursor-pointer hover:scale-102 transition-all shadow-md">
          <img
          className="h-12 md:h-20"
            src="https://www.uniremington.edu.co/wp-content/uploads/2024/05/Logo-Pruebas-Saber-TyT.jpg"
            alt="Saber Pro"
            srcset="https://www.uniremington.edu.co/wp-content/uploads/2024/05/Logo-Pruebas-Saber-TyT.jpg"
          />

          <div className="text-sm text-slate-500">
            <h2 className="text-orange-500">Examen Saber TyT</h2>
            <p className="text-gray-500 font-bold">Modelo Prediccion CAERAN</p>
            <p>25 Preguntas</p>
            <p>Efectividad <span className="text-slate-950 font-bold">82%</span></p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminForms;
