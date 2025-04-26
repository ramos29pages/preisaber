import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditUserModal from "./EditUserModal";

export default function RegisterCard({ user, onUserDeleted, onUserUpdated }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDelete = async (userId) => {
    await onUserDeleted(userId);
  };

  const handleUpdate = async (user) => {
    setIsEditDialogOpen(false);
    await onUserUpdated(user);
  };

  return (
    <>
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
            <p className="text-xs text-slate-500 truncate font-semibold w-26 md:w-50">
              {user.email}
            </p>
            <p className="font-semibold text-xs max-w-40 text-orange-400 bg-orange-50 p-1 px-2 rounded-md">
              <FontAwesomeIcon icon={faPaperclip} size="s" /> Prueba{" "}
              {user.tipo_prueba.toLowerCase()}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <button
            title="Eliminar Registro"
            className="mx-1 text-slate-300 hover:text-slate-500 cursor-pointer p-2 rounded-full transition-colors"
            onClick={() => handleDelete(user.id)}
          >
            <FontAwesomeIcon icon={faTrash} size="xl" />
          </button>
          <ToastContainer />
          <button
            title="Editar Registro"
            className="mx-1 text-orange-500 p-2 rounded-full cursor-pointer transition-colors"
            onClick={() => setIsEditDialogOpen(true)} // Abrir modal
          >
            <FontAwesomeIcon icon={faEdit} size="xl" />
          </button>
          {isEditDialogOpen && (
            <EditUserModal
              user={user}
              onUserUpdated={handleUpdate}
              onClose={() => setIsEditDialogOpen(false)}
            />
          )}
        </div>
      </div>
    </>
  );
}
