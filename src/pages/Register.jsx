import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddRegisterModal from "../components/AddRegisterModal";
import { faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useUsers } from "../context/UserContext";
import { SkeletonUser } from "../components/SkeletonUser";
import RegisterCard from "../components/RegisterCard";
import Swal from "sweetalert2";

const Register = () => {
  const [loading, setLoading] = useState(true); // ✅ Reintroducido para manejar carga
  const [searchTerm, setSearchTerm] = useState("");
  const [_showAddButtons, setShowAddButtons] = useState(false);
  const { users, removeUser, editUser } = useUsers();

    

  useEffect(() => {
    // Simula el fin de la carga una vez que los usuarios están disponibles
    if (users) {
      setLoading(false);
    }
  }, [users]);

  // Filtrar usuarios según el término de búsqueda
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Eliminar usuario
  const handlerDeleteUser = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede revertir.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F97316",
        cancelButtonColor: "#64748B",
        confirmButtonText: "Sí, bórralo.",
      });

      if (result.isConfirmed) {
        await removeUser(id);
        Swal.fire("¡Hecho!", "El usuario ha sido eliminado.", "success");
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  // Actualizar usuario
  const handlerUpdateUser = async (user) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro de actualizar?",
        text: "Esta acción no se puede revertir.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F97316",
        cancelButtonColor: "#64748B",
        confirmButtonText: "Sí, actualiza.",
      });

      if (result.isConfirmed) {
        await editUser(user);
        Swal.fire("¡Hecho!", "El usuario ha sido actualizado.", "success");
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  return (
    <div className="py-4 scroll-hidden h-screen">
      <div className="max-w-4xl mx-auto">
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
            aria-label="Agregar usuarios"
            onClick={() => setShowAddButtons(true)}
          >
            <FontAwesomeIcon icon={faUserPlus} size="md" />
          </button>
        </div>

        {/* Mostrar conteo solo si no está cargando */}
        {!loading && (
          <p className="text-slate-400 text-xs mb-4">
            Mostrando
            <span className="mx-1 font-bold text-slate-400">
              {filteredUsers.length}
            </span>
            de
            <span className="mx-1 font-bold text-slate-400">
              {users.length}
            </span>
            .
          </p>
        )}

        {/* Lista de usuarios con scroll */}
        <div
          className="bg-white shadow rounded-md divide-y divide-gray-200 overflow-y-auto"
          style={{ height: "calc(100dvh - 240px)" }} // Ajusta la altura máxima
        >
          {_showAddButtons && (
            <AddRegisterModal setShowAddButtons={setShowAddButtons} />
          )}

          {/* Lógica condicional para renderizar contenido */}
          {loading ? (
            <>
              <SkeletonUser />
              <SkeletonUser />
              <SkeletonUser />
            </>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <RegisterCard
                key={user.id}
                onUserDeleted={handlerDeleteUser}
                onUserUpdated={handlerUpdateUser}
                user={user}
              />
            ))
          ) : searchTerm ? (
            <p className="text-center text-slate-400 py-4">
              No se encontraron usuarios para "{searchTerm}"
            </p>
          ) : users.length === 0 ? (
            <p className="text-center text-slate-400 py-4">
              No hay usuarios disponibles
            </p>
          ) : (
            <p className="text-center text-slate-400 py-4">
              No hay usuarios para mostrar
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
