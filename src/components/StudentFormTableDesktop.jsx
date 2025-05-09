import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faCheckCircle,
  faArrowRight,
  faCalendarAlt,
  faUserCircle,
  faSearch,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

export default function StudentFormTableDesktop({ assignments, onCompleteForm, searchQuery, setSearchQuery }) {
  // Filtramos las asignaciones si hay una búsqueda
  const filteredAssignments = searchQuery
    ? assignments.filter(assignment =>
        assignment.form.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.asigned_by?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : assignments;

  return (
    <section className="w-full p-4 bg-gray-50 rounded-2xl shadow-sm">
      {/* Barra de búsqueda */}
      <div className="mb-6 relative max-w-md">
        <label htmlFor="search" className="sr-only">Buscar formularios</label>
        <input
          id="search"
          type="search"
          placeholder="Buscar formularios..."
          value={searchQuery || ''}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
          aria-label="Buscar formularios"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Limpiar búsqueda"
          >
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        )}
      </div>

      {/* Mensaje cuando no hay asignaciones */}
      {filteredAssignments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <FontAwesomeIcon
            icon={faFileAlt}
            className="text-orange-300 text-6xl mb-4"
          />
          <p className="text-gray-500 text-lg">
            {searchQuery
              ? "No se encontraron formularios que coincidan con tu búsqueda."
              : "No tienes formularios asignados en este momento."}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-orange-500 hover:text-orange-700 font-medium transition"
            >
              Limpiar búsqueda
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table
              className="min-w-full table-auto divide-y divide-gray-200"
              role="table"
              aria-label="Tabla de formularios asignados"
            >
              <thead className="bg-gradient-to-r from-orange-50 to-white sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Formulario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Asignado por
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredAssignments.map((assignment, index) => (
                  <tr
                    key={assignment.id}
                    className={`transition-colors duration-150 focus-within:bg-orange-50 hover:bg-orange-50 ${index % 2 === 0 ? 'bg-white' : 'bg-orange-50/50'}`}
                    tabIndex={0}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={faFileAlt}
                            className="text-orange-500"
                            size="lg"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {assignment.form.name || "Formulario sin título"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {assignment.form.questions?.length || 0}{' '}
                            {assignment.form.questions?.length === 1 ? 'pregunta' : 'preguntas'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${assignment.status ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}
                      >
                        {assignment.status ? (
                          <>
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-1" /> Completado
                          </>
                        ) : (
                          'Pendiente'
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-700">
                        <FontAwesomeIcon icon={faUserCircle} className="text-gray-400 mr-2" />
                        <span className="truncate max-w-[150px]">
                          {assignment.asigned_by || 'No definido'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400 mr-2" />
                        {assignment.created_at
                          ? new Date(assignment.created_at).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })
                          : 'No definida'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {!assignment.status ? (
                        <button
                          onClick={() => onCompleteForm(assignment)}
                          className="inline-flex items-center px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition"
                        >
                          Completar
                          <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                        </button>
                      ) : (
                        <span className="text-sm text-green-600 font-medium">
                          <FontAwesomeIcon icon={faCheckCircle} className="mr-1" /> Listo
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
