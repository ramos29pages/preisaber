import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUserPlus, faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { toast } from "react-toastify";

export default function EditUserModal({ user, onUserUpdated, onClose }) {
  const [editedUser, setEditedUser] = useState({ ...user });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      //  Llamada a tu servicio de actualización de usuario
      await onUserUpdated(editedUser); // Notificar al componente padre
      onClose();
      console.log("Usuario actualizado:", editedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error al actualizar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-orange-600 text-xl font-semibold mb-4">
          Editar Usuario
        </h2>
        <p className="text-gray-700 mb-4">
          Realiza los cambios necesarios para actualizar la información del
          usuario.
        </p>
        <div className="grid grid-cols-4 items-center gap-4 mb-4">
          <label
            htmlFor="name"
            className="text-right text-orange-500 font-medium"
          >
            Nombre
          </label>
          <input
            id="name"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
            className="col-span-3 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4 mb-4">
          <label
            htmlFor="email"
            className="text-right text-orange-500 font-medium"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            className="col-span-3 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4 mb-4">
          <label
            htmlFor="role"
            className="text-right text-orange-500 font-medium"
          >
            Rol
          </label>
          <input
            id="role"
            name="role"
            value={editedUser.role}
            onChange={handleChange}
            className="col-span-3 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4 mb-4">
          <label
            htmlFor="semester"
            className="text-right text-orange-500 font-medium"
          >
            Semestre
          </label>
          <input
            id="semester"
            name="semester"
            value={editedUser.semester}
            onChange={handleChange}
            className="col-span-3 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4 mb-4">
          <label
            htmlFor="identificacion"
            className="text-right text-orange-500 font-medium"
          >
            Identificación
          </label>
          <input
            id="identificacion"
            name="identificacion"
            value={editedUser.identificacion}
            onChange={handleChange}
            className="col-span-3 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4 mb-4">
          <label
            htmlFor="tipo_prueba"
            className="text-right text-orange-500 font-medium"
          >
            Tipo de Prueba
          </label>
          <input
            id="tipo_prueba"
            name="tipo_prueba"
            value={editedUser.tipo_prueba}
            onChange={handleChange}
            className="col-span-3 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
