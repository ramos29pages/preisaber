import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import ResultsDetailModal from "./ResultsDetailModal";

export default function ResultsDesktop({ resultados, loading, selectedResult, setSelectedResult }) {
  // Estado para filtros
  const [filters, setFilters] = useState({ userId: "", formId: "", assignedBy: "", prediction: "" });

  // Handler genérico de cambios en filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Aplicar filtros
  const filteredResults = resultados.filter((r) => {
    return (
      r.user_id.toLowerCase().includes(filters.userId.toLowerCase()) ||
      r.form_id.toLowerCase().includes(filters.formId.toLowerCase()) ||
      r.asigned_by.toLowerCase().includes(filters.assignedBy.toLowerCase()) ||
      (filters.prediction === "" || r.prediction.toString() === filters.prediction)
    );
  });

  return (
    <div className="p-6 bg-gray-100 h-dic">
      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Listado de Resultados</h1>

      {/* Filtros */}
      { loading && <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="userId"
          placeholder="Filtrar por User ID"
          value={filters.userId}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="formId"
          placeholder="Filtrar por Form ID"
          value={filters.formId}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="assignedBy"
          placeholder="Filtrar por Asignado por"
          value={filters.assignedBy}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <select
          name="prediction"
          value={filters.prediction}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Todas las predicciones</option>
          <option value="0.2">0.2</option>
          <option value="0.5">0.5</option>
          <option value="1.0">1.0</option>
        </select>
      </div>}

      {
        !loading && <h1>Cargando...</h1>
      }

      {/* Contenedor con scroll solo para el cuerpo de la tabla */}
      <div
        className="overflow-y-auto bg-white rounded-2xl shadow scroll-smooth"
        style={{ maxHeight: "calc(100dvh - 250px)" }}
      >
        <table className="min-w-full table-fixed">
          <thead className="bg-orange-500 text-center text-white sticky top-0">
            <tr>
              <th className="py-3 px-4 z-10">User ID</th>
              <th className="py-3 px-4 z-10">Form ID</th>
              <th className="py-3 px-4 z-10">Asignado por</th>
              <th className="py-3 px-4 z-10">Completado</th>
              <th className="py-3 px-4 z-10">Predicción</th>
              <th className="py-3 px-4 z-10">-</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-200 text-center text-gray-500">
            {filteredResults.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="py-2 px-4">{r.user_id}</td>
                <td className="py-2 px-4">{r.form_id}</td>
                <td className="py-2 px-4">{r.asigned_by}</td>
                <td className="py-2 px-4">{r.completed_at}</td>
                <td className="py-2 px-4">{r.prediction}</td>
                <td className="py-2 px-4 flex justify-center">
                  <button
                    onClick={() => setSelectedResult(r)}
                    className="flex justify-center items-center cursor-pointer bg-orange-50 text-orange-600 px-3 py-1 rounded-2xl hover:bg-orange-600 hover:text-white transition-all"
                  >
                    <FontAwesomeIcon icon={faEye} className="mr-2" /> Ver más
                  </button>
                </td>
              </tr>
            ))}
            {filteredResults.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-gray-400">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedResult && (
        <ResultsDetailModal
          result={selectedResult}
          onClose={() => setSelectedResult(null)}
        />
      )}
    </div>
  );
}
