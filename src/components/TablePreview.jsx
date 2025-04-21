import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { faWarning } from "@fortawesome/free-solid-svg-icons/faWarning";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../context/UserContext";
import { useState } from "react";

export default function TablePreview({ data }) {
  const navigate = useNavigate();

  const { createUser } = useUsers();
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const transformUser = (row) => {
    return {
      name: row.nombre,
      email: row.correo,
      role: row.role ? row.role : "estudiante",
      semester: "5",
      identificacion: row.identificacion,
      tipo_prueba: row.tipo_prueba,
      picture: `https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg`,
    };
  };

  // Función de validación para cada registro (sobre los datos originales del CSV)
  const validateUser = (user) => {
    const errors = {};

    // Validar correo (regex simple)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.correo)) {
      errors.correo = "Formato de correo inválido.";
    }

    // Validar identificación (debe ser numérico)
    if (
      isNaN(user.identificacion) ||
      user.identificacion.toString().trim() === ""
    ) {
      errors.identificacion = "La identificación debe ser un número válido.";
    }

    // Validar tipo de prueba
    const tipo = user.tipo_prueba.toLowerCase();
    if (tipo !== "tecnologica" && tipo !== "profesional") {
      errors.tipo_prueba =
        "El tipo de prueba debe ser 'tecnologica' o 'profesional'.";
    }

    return Object.keys(errors).length === 0;
  };

  const saveToDB = async () => {
    setSaveError("");
    setSaving(true);

    // Validar cada registro (con los datos del CSV)
    for (let row of data) {
      if (!validateUser(row)) {
        setSaveError(
          "Existen errores en algunos registros. Verifica la información."
        );
        setSaving(false);
        return;
      }
    }

    // Transformar y simular el guardado de cada usuario
    try {
      for (let row of data) {
        const transformed = transformUser(row);
        await createUser(transformed);
      }
      // Una vez guardados, redirigir a la ruta de registros
      navigate("/registros");
    } catch (error) {
      console.error("Error al guardar:", error);
      setSaveError("Ocurrió un error al guardar los datos.");
    } finally {
      setSaving(false);
    }
  };

  const cancelOperation = () => {
    navigate("/registros");
  };

  return (
    <div className="max-w-screen flex flex-col h-[calc(100vh-100px)] p-4 bg-rose-50">
      <h1 className="text-2xl font-bold text-orange-500 mb-4 text-center">
        Vista previa de datos
      </h1>

      {/* Contenedor scrollable para la tabla */}
      <div className="flex-grow overflow-y-auto">
        <div className="overflow-x-auto shadow rounded-md">
          <table className="min-w-full divide-y divide-orange-200">
            <thead className="bg-orange-500">
              <tr>
                <th className="px-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider hidden md:table-cell">
                  Identificación
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider hidden md:table-cell">
                  Correo Institucional
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Tipo de prueba
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-orange-200">
              {data.map((row, index) => (
                <tr key={index} className="hover:bg-orange-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 hidden md:table-cell">
                    {row.identificacion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {row.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 hidden md:table-cell">
                    {row.correo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {row.tipo_prueba}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <button
                      title="Eliminar Registro"
                      className="mx-1 text-red-500 cursor-pointer hover:text-red-600 p-2 rounded-full transition-colors"
                    >
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </button>
                    <button
                      title="Editar Registro"
                      className="mx-1 text-orange-500 hover:text-orange-600 p-2 cursor-pointer rounded-full transition-colors"
                    >
                      <FontAwesomeIcon icon={faEdit} size="lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mensaje de error (si existe) */}
      {saveError && (
        <p className="text-red-500 mt-4 text-center">
          <FontAwesomeIcon icon={faWarning} size="sm" /> {saveError}
        </p>
      )}

      {/* Footer fijo con botones */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={cancelOperation}
          className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded transition-colors cursor-pointer"
        >
          Cancelar
        </button>
        <button
          onClick={saveToDB}
          disabled={saving}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition-colors cursor-pointer"
        >
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </div>
  );
}
