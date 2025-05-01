export default function AsignmentFormList({semester, forms, handleBulkAssign}) {
  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow-md border border-orange-200">
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Formularios Disponibles
        </h3>

        {forms.length === 0 ? (
          <p className="text-orange-500 text-center py-4">
            No hay formularios disponibles
          </p>
        ) : (
          <ul className="divide-y divide-orange-100 max-h-64 overflow-y-auto rounded-lg">
            {forms.map((form) => (
              <li
                key={form.id}
                className="p-3 hover:bg-orange-50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <span className="font-medium text-gray-800">{form.name}</span>
                  <button
                    className="px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                    onClick={()=> handleBulkAssign(form.id)}
                  >
                    Asignar a {semester ? `S${semester}` : "Todos"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
