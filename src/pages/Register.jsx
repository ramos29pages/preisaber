// src/pages/Register.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

// Array de usuarios con datos variados
const users = [
  { id: 1, name: "Daniel Ramos", email: "dramosm21@curnvirtual.edu.co", role: "estudiante" },
  { id: 2, name: "Ana Pérez", email: "ana.perez@uninunez.edu.co", role: "docente" },
  { id: 3, name: "Luis Gómez", email: "luisgomez21@curnvirtual.edu.co", role: "estudiante" },
  { id: 4, name: "María Rodríguez", email: "maria.rodriguez@uninunez.edu.co", role: "docente" },
  { id: 5, name: "Carlos Sánchez", email: "carlossanchez21@curnvirtual.edu.co", role: "estudiante" },
  { id: 6, name: "Laura Jiménez", email: "laura.jimenez@uninunez.edu.co", role: "docente" },
];

const Register = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra usuarios en función del término de búsqueda (nombre o email)
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Barra de búsqueda */}
        <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 mb-6 bg-white">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Buscar usuario..."
            className="w-full focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Lista de usuarios */}
        <div className="bg-white shadow rounded-md divide-y divide-gray-200">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="mr-4">
                  <FontAwesomeIcon icon={faUser} className="text-gray-500" size="2x" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
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
