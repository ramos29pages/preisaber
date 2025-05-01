export default function AsignmentUserList({semester, filteredUsers}) {
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          Usuarios {semester ? `(Semestre ${semester})` : "(Todos)"}
          <span className="ml-2 bg-orange-100 text-orange-500 px-2 py-0.5 rounded-full text-xs">
            {filteredUsers.length}
          </span>
        </h3>

        {filteredUsers.length === 0 ? (
          <p className="text-orange-500 text-center py-4">
            No hay usuarios para este semestre
          </p>
        ) : (
          <ul className="divide-y divide-orange-100 max-h-64 overflow-y-auto rounded-lg">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                className="p-3 hover:bg-orange-50 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">
                    {user.email}
                  </span>
                  {user.correo && (
                    <span className="text-sm text-gray-500">{user.correo}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
