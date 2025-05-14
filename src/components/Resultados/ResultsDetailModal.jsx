export default function ResultsDetailModal({ result, onClose, user }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto">
      {/* Contenedor principal sin overflow-hidden */}
      <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2">
        <div className="flex justify-end p-2">
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Cerrar modal"
          >
            &times;
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Sección izquierda con scroll */}
          <div className="md:w-1/2 p-6 border-r border-gray-200 max-h-[calc(100vh-200px)] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-orange-500">Respuestas</h2>
            {result.responses.map((resp, idx) => (
              <div key={idx} className="mb-4">
                <p className="font-medium">{resp.question}</p>
                <p className="text-gray-700">{resp.response}</p>
              </div>
            ))}
          </div>

          {/* Sección derecha (sin scroll) */}
          <div className="md:w-1/2 p-6 bg-gray-50 flex flex-col items-center justify-center">
            <img 
              src={user.picture} 
              alt={user.name} 
              className="w-32 h-32 rounded-full mb-4 object-cover" 
            />
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-600">Semestre {user.semester}</p>
            <p className="text-gray-500 mt-2">ID: {result.user_id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}