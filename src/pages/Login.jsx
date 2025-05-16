import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { ADMINISTRADORES } from "../constants/configuration";
import { useEffect } from "react";

const Login = () => {
  const { login } = useAuth();
  const administradores = ADMINISTRADORES;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem("auth_user");
    localStorage.removeItem("host_email");
    localStorage.removeItem("userRole");
    localStorage.removeItem("pic");
  }, []);

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleLoginSuccess = (credentialResponse) => {
    setIsLoading(true);
    if (credentialResponse.credential) {
      // Decodificar el token JWT sin librería externa:
      const decoded = JSON.parse(
        atob(credentialResponse.credential.split(".")[1])
      );

      // console.log("Decoded JWT:", decoded);
      // console.log(
      //   "Decoded JWT Name :",
      //   decoded.name.split(" ")[0] + " " + decoded.name.split(" ")[2]
      // );

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

      if (administradores.includes(email)) {
        role = "administrador";
      } else if (estudianteRegex.test(email)) {
        role = "estudiante";
      } else if (docenteRegex.test(email)) {
        role = "docente";
      }

      const userData = {
        username: decoded.name,
        given_name: given_name,
        picture: decoded.picture,
        email,
        role,
      };

      // console.log("User Data:", userData);

      setTimeout(() => {
        login(userData); // Llama a la función de login del contexto
        setIsLoading(false);
      }, 100);
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Error en el login con Google:", error);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen h-dic overflow-hidden w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-md relative">
        {/* Decorative elements - Orange accents */}
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-orange-500 rounded-full opacity-20 blur-lg"></div>
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-orange-400 rounded-full opacity-20 blur-lg"></div>
        
        {/* Card container */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden p-8 border border-gray-700 relative z-10">
          <div className="flex flex-col items-center">
            {/* Logo container with orange glow */}
            <div className="relative mb-6 p-4">
              <div className="absolute inset-0 bg-orange-500 opacity-20 rounded-full blur-md"></div>
              <img
                src="https://www.uninunez.edu.co/images/logotxttealw.svg"
                alt="Logo INUÑEZ"
                className="h-16 relative z-10"
              />
            </div>
            
            {/* Title with gradient */}
            <h1 className="text-3xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              PrediSaber
            </h1>
            
            {/* Subtitle */}
            <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mb-6"></div>
            
            <p className="text-gray-300 mb-8 text-center">
              Potencia tu aprendizaje con análisis predictivo
            </p>
            
            {/* Instructions */}
            <p className="text-gray-400 mb-6 text-center text-sm">
              Inicia sesión con tu cuenta institucional para acceder a la plataforma
            </p>
            
            {/* Login button container with animations */}
            <div className="w-full flex justify-center relative">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse delay-150"></div>
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse delay-300"></div>
                </div>
              ) : (
                <div className="transition-all duration-300 hover:scale-105 relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full opacity-70 blur group-hover:opacity-100"></div>
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginFailure}
                    shape="pill"
                    text="signin_with"
                    width="300"
                  />
                </div>
              )}
            </div>
            
            {/* Footer text */}
            <p className="text-gray-500 text-xs mt-8 text-center">
              {/* Predisaber Sistema desarrollado para UNINUÑEZ */}
              By Ramos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;