import React, { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import { fetchForms } from "../services/formService";

// Servicio simulado
const formService = {
  getUsers: () => getUsers(),
  getForms: () => fetchForms(),
  assignForm: (userId, formId) =>
    Promise.resolve({ userId, formId, assignedAt: new Date() }),
};

export default function FormAssignmentComponent() {
  const [users, setUsers] = useState([]);
  const [forms, setForms] = useState([]);
  const [semester, setSemester] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersData = await formService.getUsers();
        const formsData = await formService.getForms();
        setUsers(usersData);
        setForms(formsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssign = async (uId, fId) => {
    try {
      const assignment = await formService.assignForm(uId, fId);
      setAssignments((prev) => [...prev, assignment]);
    } catch (error) {
      console.error("Error assigning form:", error);
    }
  };

  const handleBulkAssign = (formId) => {
    filteredUsers.forEach((user) => handleAssign(user.id, formId));
  };

  // Filtrado de usuarios por semestre
  const filteredUsers = users.filter(
    (u) => semester === "" || u.semester === +semester
  );

  // Obtener semestres únicos para el selector
  const uniqueSemesters = [...new Set(users.map((u) => u.semester))].sort((a, b) => a - b);

  return (
    <div className="max-w-7xl mx-auto md:px-4 overflow-y-scroll h-dic md:h-140 rounded-2xl">
      <h2 className="text-2xl bg-gray-50 py-2 sticky top-0 font-bold mb-6 text-orange-500 text-center md:text-left">
        Asignación de Formularios
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Selector de semestre */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-orange-500">
              Filtrar por Semestre:
            </label>
            <select
              className="w-full p-3 border-2 border-orange-300 rounded-lg bg-white focus:outline-none focus:border-orange-500 transition-colors"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="">Todos los semestres</option>
              {uniqueSemesters.map((s) => (
                <option key={s} value={s}>
                  Semestre {s}
                </option>
              ))}
            </select>
          </div>

          {/* Grid para Formularios y Usuarios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lista de formularios */}
            <div className="bg-white p-4 rounded-xl shadow-md border border-orange-200">
              <h3 className="font-semibold mb-3 text-orange-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Formularios Disponibles
              </h3>
              
              {forms.length === 0 ? (
                <p className="text-orange-500 text-center py-4">No hay formularios disponibles</p>
              ) : (
                <ul className="divide-y divide-orange-100 max-h-64 overflow-y-auto rounded-lg">
                  {forms.map((form) => (
                    <li key={form.id} className="p-3 hover:bg-orange-50 transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <span className="font-medium text-gray-800">{form.name}</span>
                        <button
                          className="px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                          onClick={() => handleBulkAssign(form.id)}
                        >
                          Asignar a {semester ? `S${semester}` : "Todos"}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Lista de usuarios filtrados */}
            <div className="bg-white p-4 rounded-xl shadow-md border border-orange-200">
              <h3 className="font-semibold mb-3 text-orange-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Usuarios {semester ? `(Semestre ${semester})` : "(Todos)"}
                <span className="ml-2 bg-orange-100 text-orange-500 px-2 py-0.5 rounded-full text-xs">
                  {filteredUsers.length}
                </span>
              </h3>
              
              {filteredUsers.length === 0 ? (
                <p className="text-orange-500 text-center py-4">No hay usuarios para este semestre</p>
              ) : (
                <ul className="divide-y divide-orange-100 max-h-64 overflow-y-auto rounded-lg">
                  {filteredUsers.map((user) => (
                    <li key={user.id} className="p-3 hover:bg-orange-50 transition-colors">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">{user.email}</span>
                        {user.correo && (
                          <span className="text-sm text-gray-500">{user.correo}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Asignaciones realizadas */}
          <div className="mt-8 bg-white p-4 rounded-xl shadow-md border border-orange-200">
            <h3 className="font-semibold mb-3 text-orange-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Asignaciones Realizadas
              <span className="ml-2 bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs">
                {assignments.length}
              </span>
            </h3>
            
            {assignments.length === 0 ? (
              <p className="text-orange-500 text-center py-4">No se han realizado asignaciones todavía</p>
            ) : (
              <div className="max-h-64 overflow-y-auto">
                <table className="min-w-full divide-y divide-orange-200">
                  <thead className="bg-orange-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Usuario</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Formulario</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-orange-100">
                    {assignments.map((a, i) => {
                      const user = users.find((u) => u.id === a.userId);
                      const form = forms.find((f) => f.id === a.formId);
                      return (
                        <tr key={i} className="hover:bg-orange-50">
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">{user?.email || "Usuario desconocido"}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">{form?.name || "Formulario desconocido"}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{a.assignedAt.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}