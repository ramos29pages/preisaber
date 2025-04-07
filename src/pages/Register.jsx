// src/pages/Register.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../context/UserContext";

const Register = () => {
  const { users } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filtrar usuarios según búsqueda
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        {/* Barra de búsqueda y botón agregar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 bg-white flex-1 mr-4">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Buscar usuario..."
              className="w-full focus:outline-none text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="w-10 h-10 bg-orange-500 rounded-lg hover:bg-orange-600 cursor-pointer transition-colors text-white focus:outline-none"
            aria-label="Agregar usuario"
            onClick={() => navigate('/add-registers')}
          >
            <FontAwesomeIcon icon={faUserPlus} size="md" />
          </button>
        </div>

        {/* Lista de usuarios con scroll */}
        <div
          className="bg-white shadow rounded-md divide-y divide-gray-200 overflow-y-auto"
          style={{ height: "calc(100dvh - 60px - 120px)" }}
        >
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="w-10 h-10 overflow-hidden bg-gray-100 rounded-full ring-4 ring-gray-300">
                      <img
                        className="object-cover w-full h-full"
                        src={
                          user.picture ||
                          "https://st4.depositphotos.com/14903220/24649/v/450/depositphotos_246499746-stock-illustration-abstract-sign-avatar-men-icon.jpg"
                        }
                        alt="User avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-orange-500">{user.name}</p>
                    <p className="text-sm text-black truncate w-15 md:w-50">{user.email}</p>
                    <p className="text-xs font-bold text-gray-500">{user.role}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    title="Editar Registro"
                    className="mx-1 text-orange-500 p-2 rounded-full transition-colors"
                    // Aquí implementar lógica para editar
                    onClick={() => navigate(`/add-registers?edit=${user.id}`)}
                  >
                    <FontAwesomeIcon icon={faEdit} size="xl" />
                  </button>
                  {/* <button
                    title="Eliminar Registro"
                    className="mx-1 text-red-500 p-2 rounded-full transition-colors"
                    onClick={() => removeUser(user.id)}
                  >
                    <FontAwesomeIcon icon={faEdit} size="xl" />
                  </button> */}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No se encontraron usuarios.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
