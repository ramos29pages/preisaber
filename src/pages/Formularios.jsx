import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminForms from "../components/AdminForms";
import StudentsForms from "../components/StudentsForms";

const Formularios = () => {
  const { isAuthenticated, user: userAuth } = useAuth();

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
        <StudentsForms />
      </>
    );
  } else {

    return <h1>Este modo no admite vista de formularios.</h1>;
  }
};

export default Formularios;
