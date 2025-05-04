// Componente Modal separado
export default function ResultsDetailModal({ result, onClose }) {
    // Datos mock de usuario basados en user_id
    const user = {
      name: 'Juan Pérez',
      semester: '6º Semestre',
      image: 'https://via.placeholder.com/150'
    };
  
    return (
      <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 overflow-hidden">
          <div className="flex justify-end p-2">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
          </div>
          <div className="flex flex-col md:flex-row">
            {/* Izquierda: preguntas y respuestas */}
            <div className="md:w-1/2 p-6 border-r border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-orange-500">Respuestas</h2>
              {result.responses.map((resp, idx) => (
                <div key={idx} className="mb-4">
                  <p className="font-medium">{resp.question}</p>
                  <p className="text-gray-700">{resp.response}</p>
                </div>
              ))}
            </div>
            {/* Derecha: tarjeta de usuario */}
            <div className="md:w-1/2 p-6 bg-gray-50 flex flex-col items-center justify-center">
              <img src={user.image} alt={user.name} className="w-32 h-32 rounded-full mb-4" />
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.semester}</p>
              <p className="text-gray-500 mt-2">ID: {result.user_id}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }