import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditUserModal from "./EditUserModal";
import asignacionesService from "../services/asignService";
import { fetchFormDetails } from "../services/formService";

export default function RegisterCard({ user, onUserDeleted, onUserUpdated }) {
  const [forms, setForms] = useState([]);
  const [hasAssignments, setHasAssignments] = useState(false);
  const loadedRef = useRef(false); // evita doble ejecución en StrictMode

  useEffect(() => {
    if (loadedRef.current) return;    // si ya cargó, no volver a ejecutar
    loadedRef.current = true;
    const obtenerAsignaciones = async () => {
      try {
        const a = await asignacionesService.obtenerAsignacionPorUserid(user.id);
        if (Array.isArray(a) && a.length > 0) {
          setHasAssignments(true);
          // todas las peticiones en paralelo y un único setForms
          const detalles = await Promise.all(
            a.map(item => fetchFormDetails(item.form_id))
          );
          setForms(detalles);
        } else {
          setHasAssignments(false);
          setForms([]);
        }
      } catch (err) {
        console.error("Error al obtener asignaciones:", err);
      }
    };
    obtenerAsignaciones();
  }, [user.id]);

  const handleDelete = async (userId) => {
    await onUserDeleted(userId);
  };

  const handleUpdate = async (updatedUser) => {
    setIsEditDialogOpen(false);
    await onUserUpdated(updatedUser);
  };

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
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
          <p className="text-xs text-slate-500 w-25 truncate md:w-50 font-semibold">
            {user.email}
          </p>
          <p className="text-xs text-slate-500 truncate w-26 md:w-50 font-semibold">
            Semestre {user.semester}
          </p>

          {hasAssignments && (
            forms.map(form => (
              <div
                key={form.id || form.form_id}
                className="flex items-center gap-1 w-30 md:w-50 font-semibold text-xs text-orange-500 bg-orange-50 p-1 px-2 rounded-md m-1"
              >
                <FontAwesomeIcon icon={faPaperclip} size="s" />
                <p className="truncate">{form.name || "Nombre no disponible"}</p>
              </div>
            ))
          )}


          {/* {hasAssignments ? (
            forms.map(form => (
              <p
                key={form.id || form.form_id}
                className="flex items-center gap-1 font-semibold text-xs text-orange-500 bg-orange-50 p-1 px-2 rounded-md truncate m-1"
              >
                <FontAwesomeIcon icon={faPaperclip} size="s" />
                {form.name || "Nombre no disponible"}
              </p>
            ))
          ) : (
            <p className="flex items-center gap-1 font-semibold text-xs text-rose-400 bg-red-50 p-1 px-2 rounded-md">
              <FontAwesomeIcon icon={faPaperclip} size="s" />
              Sin pruebas asignadas
            </p>
          )} */}

        </div>
      </div>

      <div className="flex items-center">
        <button
          title="Eliminar Registro"
          className="mx-1 text-slate-300 hover:text-slate-500 p-2 rounded-full transition-colors"
          onClick={() => handleDelete(user.id)}
        >
          <FontAwesomeIcon icon={faTrash} className="md:text-xl" />
        </button>
        <ToastContainer />
        <button
          title="Editar Registro"
          className="mx-1 text-orange-500 p-2 rounded-full transition-colors"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <FontAwesomeIcon icon={faEdit} className="md:text-xl" />
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
  );
}
