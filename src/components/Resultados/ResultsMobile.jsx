import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faEye } from '@fortawesome/free-solid-svg-icons';


export default function ResultsMobile({resultados, selectedResult, setSelectedResult}) {

  return (
    <div className="p-4 bg-gray-100 scroll-hidden h-dic overflow-y-scroll ">
      <div className="space-y-4">
        {resultados.map(r => (
          <div key={r.id} className="bg-white rounded-2xl shadow p-4 flex flex-col">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="font-medium">{r.user_id}</p>
              </div>
              <button
                onClick={() => setSelectedResult(r)}
                className="flex items-center bg-orange-500 text-white px-3 py-1 rounded-2xl hover:bg-orange-600 transition"
              >
                <FontAwesomeIcon icon={faEye} className="mr-1" />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div>
                <p>Form ID</p>
                <p className="font-medium">{r.form_id}</p>
              </div>
              <div>
                <p>Asignado</p>
                <p className="font-medium">{r.asigned_by}</p>
              </div>
              <div>
                <p>Completado</p>
                <p className="font-medium">{r.completed_at}</p>
              </div>
              <div>
                <p>Predicción</p>
                <p className="font-medium">{r.prediction}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {resultados.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-gray-400">
                  <FontAwesomeIcon className='mr-2' icon={faDatabase}/>
                  No hay conexion con la base de datos.
                </td>
              </tr>
            )}
      {selectedResult && (
        <DetailModal result={selectedResult} onClose={() => setSelectedResult(null)} />
      )}
    </div>
  );
}

// Componente Modal separado (versión mobile responsiva)
function DetailModal({ result, onClose }) {
  const user = {
    name: 'Juan Pérez',
    semester: '6º Semestre',
    image: 'https://via.placeholder.com/150'
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex justify-end p-2">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <div className="space-y-4 p-4">
          {/* Tarjeta usuario */}
          <div className="flex items-center space-x-4">
            <img src={user.image} alt={user.name} className="w-16 h-16 rounded-full" />
            <div>
              <h3 className="text-lg font-semibold text-orange-500">{user.name}</h3>
              <p className="text-gray-600">{user.semester}</p>
              <p className="text-gray-500 text-sm">ID: {result.user_id}</p>
            </div>
          </div>
          {/* Respuestas */}
          <div>
            <h2 className="text-md font-semibold mb-2 text-orange-500">Respuestas</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {result.responses.map((resp, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-sm">{resp.question}</p>
                  <p className="text-gray-700 text-sm">{resp.response}</p>
                </div>
              ))}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
