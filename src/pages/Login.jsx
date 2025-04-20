// src/pages/Login.jsx
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const administradores = ["danielramos9991@gmail.com"];

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleLoginSuccess = (credentialResponse) => {
    if (credentialResponse.credential) {
      // Decodificar el token JWT sin librería externa:
      const decoded = JSON.parse(
        atob(credentialResponse.credential.split(".")[1])
      );

      console.log("Decoded JWT:", decoded);
      console.log(
        "Decoded JWT Name :",
        decoded.name.split(" ")[0] + " " + decoded.name.split(" ")[2]
      );

      const email = decoded.email || "";
      let role = "";
      let given_name =
        capitalizarPrimeraLetra(decoded.name.split(" ")[0]);

      // Regex para docentes: formato: letras.palabra@curnvirtual.edu.co o uninunez.edu.co
      const docenteRegex =
        /^[a-z]+\.[a-z]+@(curnvirtual\.edu\.co|uninunez\.edu\.co)$/i;
      // Regex para estudiantes: formato: letras + dígitos@curnvirtual.edu.co o uninunez.edu.co
      const estudianteRegex =
        /^[a-z]+[0-9]+@(curnvirtual\.edu\.co|uninunez\.edu\.co)$/i;

      if (docenteRegex.test(email)) {
        role = "docente";
      } else if (estudianteRegex.test(email)) {
        role = "estudiante";
      } else if (administradores.includes(email)) {
        // si el email NO esta en la curn pero esta dentro de la lista de administradores asignar el rol de administrador tambien
        role = "administrador";
      } else {
        role = "invitado"; // Asignar rol de invitado si no coincide con ninguno de los anteriores
      }

      const userData = {
        username: decoded.name,
        given_name: given_name,
        picture: decoded.picture,
        email,
        role,
      };

      console.log("User Data:", userData);

      login(userData); // Llama a la función de login del contexto
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Error en el login con Google:", error);
  };

  return (
    <div className="min-h-screen bg-gray-100 min-w-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img
            src="https://www.uninunez.edu.co/images/logotxttealw.svg"
            alt="Logo INUÑEZ"
            className="h-16"
          />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          PrediSaber
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Inicia sesión con tu cuenta de la CURN
        </p>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
            shape="pill"
            text="signup_with"
            width="300"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
