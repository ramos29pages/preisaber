import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AsignmentDesktopTable({ assignments, users, forms, deleteAsign, loadingAssignments }) {
  return (
    <>
      <div className="mt-8 bg-white p-4 rounded-xl shadow-md border border-orange-200">
        <h3 className="font-semibold mb-3 text-orange-500 flex items-center">
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
          <span className="ml-2 bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs">
            {assignments.length}
          </span>
        </h3>

        {assignments.length === 0 ? (
          <p className="text-orange-500 text-center py-4">
            No se han realizado asignaciones todavía
          </p>
        ) : (
          <div className={`max-h-64 ${loadingAssignments ? 'opacity-0': 'opacity-100'} transition-opacity  overflow-y-auto`}>
            <table className="min-w-full divide-y divide-orange-200">
              <thead className="bg-orange-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                    Formulario
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                    Asignado Por
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                    -
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-orange-100">
                {assignments.map((a, i) => {
                  const user = users.find((u) => u.id === a.user_id);
                  const form = forms.find((f) => f.id === a.form_id);
                  return (
                    <tr key={i} className="hover:bg-orange-50">
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        {user?.name || "Usuario desconocido"}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        {form?.name || "Formulario desconocido"}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        {a.asigned_by}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                        {a.created_at}
                      </td>
                      <td  className="px-3 py-2 whitespace-nowrap text-sm text-rose-500">
                        <button onClick={ ()=> deleteAsign(a.id)}>
                          <FontAwesomeIcon icon={faTrash}/>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
