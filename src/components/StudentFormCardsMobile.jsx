// src/components/StudentFormCardsMobile.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFileAlt, 
  faCheckCircle, 
  faArrowRight, 
  faCalendarAlt, 
  faUserCircle, 
  faSearch,
  faListAlt
} from "@fortawesome/free-solid-svg-icons";

export default function StudentFormCardsMobile({ assignments, onCompleteForm, searchQuery, setSearchQuery }) {
  // Filtramos las asignaciones si hay una búsqueda
  const filteredAssignments = searchQuery 
    ? assignments.filter(assignment => 
        assignment.form.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.asigned_by?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : assignments;

  return (
    <div className="w-full space-y-4">
      {/* Barra de búsqueda */}
      <div className="sticky top-0 z-10 bg-gray-50 -mx-4 px-4 py-2 shadow-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar formularios..."
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-sm transition-colors"
          />
          <FontAwesomeIcon 
            icon={faSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Mensaje cuando no hay asignaciones */}
      {filteredAssignments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <FontAwesomeIcon
              icon={faFileAlt}
              className="text-orange-500 text-2xl"
            />
          </div>
          <p className="text-gray-600 font-medium mb-2">
            {searchQuery 
              ? "No se encontraron resultados" 
              : "Sin formularios asignados"}
          </p>
          <p className="text-gray-500 text-sm">
            {searchQuery 
              ? "Intenta con otros términos de búsqueda" 
              : "Te notificaremos cuando recibas nuevas asignaciones"}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-orange-500 hover:text-orange-700 text-sm font-medium"
            >
              Limpiar búsqueda
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Contador de resultados */}
          <div className="flex items-center justify-between px-1 mb-2">
            <div className="flex items-center text-sm text-gray-500">
              <FontAwesomeIcon icon={faListAlt} className="mr-2 text-orange-400" />
              <span>{filteredAssignments.length} {filteredAssignments.length === 1 ? 'formulario' : 'formularios'}</span>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-orange-500 hover:text-orange-700 text-sm font-medium"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Tarjetas para móvil */}
          <div className="space-y-3">
            {filteredAssignments.map((assignment) => (
              <div 
                key={assignment.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:border-orange-200 transition-all"
              >
                <div className="border-l-4 border-orange-500 px-4 py-3 flex items-center justify-between bg-gradient-to-r from-orange-50 to-white">
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="text-orange-500 mr-3"
                    />
                    <div className="font-medium text-gray-900 truncate max-w-[200px]">
                      {assignment.form.name || "Formulario sin título"}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      assignment.status
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {assignment.status ? "Completado" : "Pendiente"}
                  </span>
                </div>
                
                <div className="px-4 py-3 space-y-2">
                  {/* Detalles del formulario */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-500">
                      {assignment.form.questions?.length || 0} {assignment.form.questions?.length === 1 ? 'pregunta' : 'preguntas'}
                    </div>
                    {assignment.status && (
                      <div className="flex items-center text-green-600 text-sm">
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
                        <span>Completado</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Información de asignación */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <FontAwesomeIcon icon={faUserCircle} className="text-gray-400 mr-2" />
                      <span className="truncate">{assignment.asigned_by || "No definido"}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 justify-end">
                      <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400 mr-2" />
                      <span className="truncate">
                        {assignment.created_at
                          ? new Date(assignment.created_at).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'short'
                            })
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Botón de acción */}
                {!assignment.status && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                    <button
                      onClick={() => onCompleteForm(assignment)}
                      className="w-full py-2 bg-orange-500 text-white rounded-lg font-medium text-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors flex items-center justify-center"
                    >
                      Completar formulario
                      <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}