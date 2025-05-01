import { useState } from "react";
import { faTrash, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AsignmentMobileTable({ assignments, users, forms, deleteAsign, loadingAssignments }) {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleItem = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <div className="mt-6">
      <div className="bg-white rounded-xl shadow-md border border-orange-200 overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-orange-100 to-orange-50">
          <h3 className="font-semibold text-orange-600 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Asignaciones Realizadas
            <span className="ml-2 bg-orange-500 text-white px-2 py-0.5 rounded-full text-xs">
              {assignments.length}
            </span>
          </h3>
        </div>

        {assignments.length === 0 ? (
          <div className="py-10 flex flex-col items-center justify-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-orange-300 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-orange-500 font-medium">
              No se han realizado asignaciones todavía
            </p>
          </div>
        ) : (
          <div className={`${loadingAssignments ? 'opacity-0' : 'opacity-100'} transition-opacity max-h-96 overflow-y-auto`}>
            <ul className="divide-y divide-orange-100">
              {assignments.map((a, i) => {
                const user = users.find((u) => u.id === a.user_id);
                const form = forms.find((f) => f.id === a.form_id);
                const isExpanded = expandedItem === i;
                
                return (
                  <li 
                    key={i} 
                    className={`transition-colors ${isExpanded ? 'bg-orange-50' : 'bg-white'}`}
                  >
                    <div 
                      className="p-4 flex justify-between items-center cursor-pointer"
                      onClick={() => toggleItem(i)}
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">
                          {user?.name || "Usuario desconocido"}
                        </div>
                        <div className="text-sm text-orange-600 mt-1">
                          {form?.name || "Formulario desconocido"}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteAsign(a.id);
                          }}
                          className="text-rose-500 mr-4 p-2"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <FontAwesomeIcon 
                          icon={isExpanded ? faChevronUp : faChevronDown} 
                          className="text-orange-400 w-4 h-4"
                        />
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 text-sm bg-orange-50">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-gray-500">Asignado por:</p>
                            <p className="font-medium text-gray-800">{a.asigned_by}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Fecha:</p>
                            <p className="font-medium text-gray-800">{a.created_at}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}