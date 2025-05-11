import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

const Header = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const { user, logout } = useAuth();
  let userRol = localStorage.getItem("userRole") === "administrador" || "docente";

  // Array de notificaciones de ejemplo
  const notifications = [
    { id: 1, message: "Nueva tarea asignada", time: "Hace 5 minutos" },
    {
      id: 2,
      message: "Jairo Acosta te ha asignado un formulario.",
      time: "Hace 1 hora",
    },
    {
      id: 3,
      message: "Actualización del sistema completada",
      time: "Hace 3 horas",
    },
    { id: 4, message: "Jairo acosta te asigno el rol Admin", time: "Ayer" },
  ];

  function abreviarNombre(nombreCompleto) {
    const nombres = nombreCompleto.split(" ");
    if (nombres.length >= 2) {
      const primerNombre = nombres[0];
      const primerApellido = nombres[nombres.length - 1];
      return `${primerNombre.charAt(0).toUpperCase()}${primerNombre
        .slice(1)
        .toLowerCase()} ${primerApellido.charAt(0).toUpperCase()}.`;
    } else if (nombres.length === 1) {
      return `${nombres[0].charAt(0).toUpperCase()}${nombres[0]
        .slice(1)
        .toLowerCase()}`;
    } else {
      return ""; // Devuelve una cadena vacía si no hay nombres
    }
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleUserModal = () => {
    setShowUserModal(!showUserModal);
  };

  return (
    <header className="flex items-center animate__animated animate__fadeInDown mt-0 justify-between w-full py-4 px-2 md:px-4 bg-white shadow-md z-1 relative">
      <div className="flex items-center">
        {userRol && (
          <button
            className="p-2 mr-2 text-gray-500 block focus:outline-none md:hidden"
            onClick={onMenuClick}
            aria-label="Mostrar menú"
          >
            <FontAwesomeIcon
              icon={faBars}
              className="w-5 h-5 text-gray-500 fill-current"
            />
          </button>
        )}
        <img
          src="https://www.uninunez.edu.co/images/logotxttealw.svg"
          alt="INUÑEZ Logo"
          className="h-8 md:h-12"
        />
      </div>

      <div className="flex items-center">
        <div className="flex items-center mr-2">
          {!userRol && (
            <button
              className="text-gray-400 text-xl focus:outline-none relative cursor-pointer"
              onClick={toggleNotifications}
              aria-label="Mostrar notificaciones"
            >
              <FontAwesomeIcon icon={faBell} />
              <span className="absolute top-1 md:top-1 right-0 inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-rose-500 rounded-full">
                {/* {notifications.length} */}
              </span>
            </button>
          )}

          {/* Dropdown de notificaciones */}
          {showNotifications && (
            <div className="absolute right-0 w-64 mt-0 bg-white rounded-md shadow-lg top-full z-10 border border-gray-200">
              <div className="py-2 px-3 border-b border-gray-200 font-medium text-gray-700">
                Notificaciones ({notifications.length})
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50"
                  >
                    <p className="text-sm text-gray-900">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="py-2 px-3 text-center text-sm text-orange-500 hover:text-orange-500 cursor-pointer">
                Ver todas las notificaciones
              </div>
            </div>
          )}
        </div>

        <div
          className="flex items-center cursor-pointer mr-4"
          onClick={toggleUserModal}
        >
          {/* <div className="mr-3 text-right">
            <div className="text-sm font-semibold text-gray-900">Daniel Ramos</div>
            <div className="text-xs text-gray-600">Administrador</div>
          </div> */}
          <div className=" px-2">
            <div className="text-xs md:text-sm font-semibold text-gray-900">
              {abreviarNombre(user?.username) || "No name available"}
            </div>
            <div className="text-xs text-orange-500">
              {user?.role === "administrador"
                ? "Administrador"
                : user?.role === "docente"
                ? "Docente"
                : "Estudiante"}
            </div>
          </div>

          <div className="w-10 h-10 overflow-hidden bg-gray-100 rounded-full ring-4 ring-gray-300">
            <img
              className="object-cover w-full h-full"
              src={
                user?.picture ||
                "https://st4.depositphotos.com/14903220/24649/v/450/depositphotos_246499746-stock-illustration-abstract-sign-avatar-men-icon.jpg"
              }
              alt="User avatar"
            />

            {/* Modal de usuario */}
            {showUserModal && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                <div className="p-4 border-b border-gray-200">
                  <div className="text-sm font-semibold text-gray-900">
                    {user?.username || "Usuario"}
                  </div>
                  <div className="text-xs text-gray-600">
                    {user?.role === "administrador"
                      ? "Administrador"
                      : user?.role === "docente"
                      ? "Docente"
                      : "Estudiante"}
                  </div>
                </div>
                <div className="p-4">
                  <button
                    onClick={logout}
                    className="flex items-center w-full p-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      className="w-4 h-4 mr-2"
                    />
                    Cerrar sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
