import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUsers } from "../context/UserContext";
import ResponderFormulario from "../components/ResponderFormulario";
import AdminForms from "../components/AdminForms";

const Formularios = () => {
  const { isAuthenticated, user: userAuth } = useAuth();
  const { user: userActive } = useUsers();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (userAuth.role === "administrador" || userAuth.role === "docente") {
    return (
      <>
        <AdminForms />
      </>
    );
  } else if (userAuth.role === "estudiante") {
    return (
      <>
        <h1>
          Hola {userActive.name} desde {userActive?.id}
        </h1>
        <ResponderFormulario />
      </>
    );
  } else {
    return <h1>Este modo no admite vista de formularios.</h1>;
  }
};

export default Formularios;
