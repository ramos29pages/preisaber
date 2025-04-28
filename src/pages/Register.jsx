// src/pages/Register.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddRegisterModal from "../components/AddRegisterModal";
import { faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
import { useUsers } from "../context/UserContext";
// import { getUsers } from "../services/userService";
import { SkeletonUser } from "../components/SkeletonUser";
import RegisterCard from "../components/RegisterCard";
import Swal from "sweetalert2";

const Register = () => {
  // const [loading, setLoading] = useState(true);
  let [_showAddButtons, setShowAddButtons] = useState(false);

  const { users, user, removeUser, editUser } = useUsers();

  console.log("USER ACTIVE", user);
  // const [users, setUsers] = useState([]);

  console.log(users);

  const [searchTerm, setSearchTerm] = useState("");
  // const navigate = useNavigate();

  //eliminar usuario
  const handlerDeleteUser = async (id) => {
    try {
      Swal.fire({
        title: "Estás seguro ?",
        text: "Esta accion no se puede revertir!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F97316",
        cancelButtonColor: "#64748B",
        confirmButtonText: "Si, bórralo!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await removeUser(id); // Use the removeUser function from the context
          Swal.fire({
            title: "Hecho !",
            text: "El usuario ha sido eliminado.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      // toast.error("Error al eliminar el usuario");
    }
  };

  //actualizar usuario
  const handlerUpdateUser = async (user) => {
    try {
      Swal.fire({
        title: "Estás seguro de actualizar ?",
        text: "Esta accion no se puede revertir!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F97316",
        cancelButtonColor: "#64748B",
        confirmButtonText: "Si, Actualiza!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await editUser(user); // Use the removeUser function from the context
          Swal.fire({
            title: "Hecho !",
            text: "El usuario ha sido actualizado.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      // toast.error("Error al eliminar el usuario");
    }
  };

  // Filtrar usuarios según búsqueda
  let filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 " >
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
            aria-label="Agregar usuarios"
            onClick={() => setShowAddButtons(true)}
          >
            <FontAwesomeIcon icon={faUserPlus} size="md" />
          </button>
        </div>

        <p className="text-slate-400 text-xs mb-4">
          Mostrando
          <span className="mx-1 font-bold text-slate-400">{filteredUsers.length}</span>
           de 
          <span className="mx-1 font-bold text-slate-400">{users.length}</span>
          .
        </p>

        {/* Lista de usuarios con scroll */}
        <div
          className="bg-white shadow rounded-md divide-y divide-gray-200 overflow-y-auto"
          style={{ height: "calc(100dvh - 60px - 120px)" }}
        >
          {_showAddButtons && (
            <AddRegisterModal setShowAddButtons={setShowAddButtons} />
          )}

          {/* lista de usuarios con filtros funciando */}

          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <RegisterCard
                onUserDeleted={handlerDeleteUser}
                onUserUpdated={handlerUpdateUser}
                user={user}
              />
            ))
          ) : (
            <div>
              <SkeletonUser />
              <SkeletonUser />
              <SkeletonUser />
              <SkeletonUser />
              <SkeletonUser />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
