// src/components/TablePreview.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faWarning } from "@fortawesome/free-solid-svg-icons/faWarning";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../context/UserContext";
import { useState } from "react";

export default function TablePreview({ data }) {
  const navigate = useNavigate();
  const { createUser } = useUsers();
  const [rows, setRows] = useState(
    data.map((r) => ({ ...r, isEditing: false }))
  );
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const transformUser = (row) => ({
    name: row.nombre,
    email: row.correo,
    role: row.role || "estudiante",
    semester: row.semestre || "0",
    identificacion: row.identificacion,
    tipo_prueba: row.tipo_prueba || "tecnologica",
    picture: `https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg`,
  });

  const validateUser = (user) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.correo)) return false;
    if (isNaN(user.identificacion) || String(user.identificacion).trim() === "")
      return false;
    const tipo = user.tipo_prueba.toLowerCase();
    if (tipo !== "tecnologica" && tipo !== "profesional") return false;
    return true;
  };

  const handleDelete = (idx) => {
    setRows(rows.filter((_, i) => i !== idx));
  };

  const handleEditToggle = (idx) => {
    setRows(
      rows.map((r, i) =>
        i === idx ? { ...r, isEditing: !r.isEditing, draft: { ...r } } : r
      )
    );
  };

  const handleFieldChange = (idx, field, value) => {
    setRows(
      rows.map((r, i) =>
        i === idx ? { ...r, draft: { ...r.draft, [field]: value } } : r
      )
    );
  };

  const handleSaveRow = (idx) => {
    const row = rows[idx];
    if (!validateUser(row.draft)) {
      setSaveError("Datos inválidos en la fila editada.");
      return;
    }
    setRows(
      rows.map((r, i) => (i === idx ? { ...r.draft, isEditing: false } : r))
    );
    setSaveError("");
  };

  const handleCancelRow = (idx) => {
    setRows(rows.map((r, i) => (i === idx ? { ...r, isEditing: false } : r)));
    setSaveError("");
  };

  const saveToDB = async () => {
    setSaveError("");
    setSaving(true);
    const plain = rows.map((r) => ({ ...r }));
    for (let row of plain) {
      if (!validateUser(row)) {
        setSaveError(
          "Existen errores en algunos registros. Verifica la información."
        );
        setSaving(false);
        return;
      }
    }
    try {
      for (let row of plain) {
        await createUser(transformUser(row));
      }
      navigate("/usuarios");
    } catch (error) {
      setSaveError(`Error al guardar: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const cancelOperation = () => navigate("/usuarios");

  return (
    <div className="max-w-screen flex flex-col h-[calc(100vh-100px)] p-4 bg-slate-50">
      <h1 className="text-2xl font-bold text-orange-500 mb-4 text-center">
        Vista previa de datos
      </h1>
      <div className="flex-grow overflow-y-auto">
        <div className="overflow-x-auto shadow rounded-md">
          <table className="min-w-full divide-y divide-orange-200">
            <thead className="bg-orange-500">
              <tr>
                <th className="px-2 py-3 text-left text-xs font-medium text-white uppercase hidden md:table-cell">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">
                  Nombre
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase hidden md:table-cell">
                  Correo
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase hidden md:table-cell">
                  Semestre
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">
                  Tipo prueba
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-orange-200">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-100">
                  {row.isEditing ? (
                    <>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <input
                          className="border p-1 rounded border-slate-400 text-gray-600 w-full"
                          value={row.draft.identificacion}
                          onChange={(e) =>
                            handleFieldChange(
                              idx,
                              "identificacion",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          className="border p-1 w-full rounded border-slate-400 text-gray-600"
                          value={row.draft.nombre}
                          onChange={(e) =>
                            handleFieldChange(idx, "nombre", e.target.value)
                          }
                        />
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <input
                          className="border p-1 w-full rounded border-slate-400 text-gray-600"
                          value={row.draft.correo}
                          onChange={(e) =>
                            handleFieldChange(idx, "correo", e.target.value)
                          }
                        />
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <input
                          className="border p-1 w-full rounded border-slate-400 text-gray-600"
                          value={row.draft.semestre}
                          onChange={(e) =>
                            handleFieldChange(idx, "semestre", e.target.value)
                          }
                        />
                      </td>
                      <td className="px-6 py-4 ">
                        <input
                          className="border p-1 w-full rounded  border-slate-400 text-gray-600"
                          value={row.draft.tipo_prueba}
                          onChange={(e) =>
                            handleFieldChange(
                              idx,
                              "tipo_prueba",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="px-6 py-4 text-center ">
                        <button
                          onClick={() => handleSaveRow(idx)}
                          className="mx-1 text-green-700 rounded cursor-pointer bg-green-50 p-2"
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button
                          onClick={() => handleCancelRow(idx)}
                          className="mx-1 p-2 text-rose-700 bg-rose-50 cursor-pointer rounded"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 hidden md:table-cell">
                        {row.identificacion}
                      </td>
                      <td className="px-6 py-4">{row.nombre}</td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        {row.correo}
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        {row.semestre}
                      </td>
                      <td className="px-6 py-4">{row.tipo_prueba}</td>
                      <td className="px-6 py-4 flex text-center">
                        <button
                          onClick={() => handleEditToggle(idx)}
                          className="mx-1 text-orange-500 hover:text-orange-600 p-2 rounded-full"
                        >
                          <FontAwesomeIcon icon={faEdit} size="sm" />
                        </button>
                        <button
                          onClick={() => handleDelete(idx)}
                          className="mx-1 text-red-500 hover:text-red-600 p-2 rounded-full"
                        >
                          <FontAwesomeIcon icon={faTrash} size="sm" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {saveError && (
        <p className="text-red-500 mt-4 text-center">
          <FontAwesomeIcon icon={faWarning} size="sm" /> {saveError}
        </p>
      )}

      <div className="mt-4 flex justify-between">
        <button
          onClick={cancelOperation}
          className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded"
        >
          Cancelar
        </button>
        <button
          onClick={saveToDB}
          disabled={saving}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
        >
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </div>
  );
}
